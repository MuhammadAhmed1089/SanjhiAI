import { query, pool } from '../config/db.js';

/**
 * Maps frontend interval input to database ENUM: '15_days', '1_month', '2_months'
 */
function normalizeIntervalType(input) {
  if (!input) return '1_month';
  const str = input.toString().toLowerCase().replace(/[\s-]/g, '_');
  if (str.includes('15')) return '15_days';
  if (str.includes('2')) return '2_months';
  return '1_month';
}

/**
 * Maps frontend account provider input to database ENUM: 'jazzcash', 'easypaisa', 'bank'
 */
function normalizeAccountType(input) {
  if (!input) return 'jazzcash';
  const str = input.toString().toLowerCase();
  if (str.includes('easy')) return 'easypaisa';
  if (str.includes('bank')) return 'bank';
  return 'jazzcash';
}

/**
 * Helper to generate a unique random invite code (e.g., SANJHI-8492K)
 */
function generateInviteCode() {
  const num = Math.floor(1000 + Math.random() * 9000);
  const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `SANJHI-${num}${char}`;
}

/**
 * Helper to calculate cycle due dates given a start date & interval
 */
function calculateDueDate(startDate, cycleIndex, intervalType) {
  const d = new Date(startDate);
  if (intervalType === '15_days') {
    d.setDate(d.getDate() + (cycleIndex - 1) * 15);
  } else if (intervalType === '2_months') {
    d.setMonth(d.getMonth() + (cycleIndex - 1) * 2);
  } else {
    // 1_month default
    d.setMonth(d.getMonth() + (cycleIndex - 1));
  }
  return d.toISOString().split('T')[0];
}

/**
 * POST /api/committees
 * Creates a new committee within an atomic PostgreSQL transaction.
 * Inserts: committees -> collection_accounts -> organizers -> members (founding) -> cycles
 */
export async function createCommittee(req, res) {
  const client = await pool.connect();

  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required to create a committee.' });
    }

    const {
      name,
      contribution_amount,
      contributionAmount,
      capacity,
      interval_type,
      intervalType,
      payout_order_type,
      collection_account,
      account_title,
      account_number,
      account_type,
      accountTitle,
      accountNumber,
      provider,
      startDate,
    } = req.body;

    const committeeName = (name || 'New Savings Committee').trim();
    const amount = parseFloat(contribution_amount || contributionAmount || 5000);
    const cap = parseInt(capacity, 10) || 10;
    const normInterval = normalizeIntervalType(interval_type || intervalType);
    const normProvider = normalizeAccountType(
      collection_account?.account_type || collection_account?.provider || account_type || provider
    );
    const accTitle = (
      collection_account?.account_title || collection_account?.accountTitle || account_title || accountTitle || 'Primary Account'
    ).trim();
    const accNum = (
      collection_account?.account_number || collection_account?.accountNumber || account_number || accountNumber || '03000000000'
    ).trim();

    if (amount <= 0 || cap <= 1) {
      return res.status(400).json({ error: 'Valid contribution amount (>0) and member capacity (>1) are required.' });
    }

    const inviteCode = generateInviteCode();
    const inviteLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/join/${inviteCode}`;

    // BEGIN TRANSACTION
    await client.query('BEGIN');

    // 1. Insert Committee
    const committeeRes = await client.query(
      `INSERT INTO committees (
        created_by, name, contribution_amount, capacity, interval_type, duration_cycles, payout_order_type, status, invite_code, invite_link
      ) VALUES ($1, $2, $3, $4, $5, $6, 'fixed', 'active', $7, $8)
      RETURNING *`,
      [userId, committeeName, amount, cap, normInterval, cap, inviteCode, inviteLink]
    );

    const committee = committeeRes.rows[0];

    // 2. Insert Collection Account
    const accountRes = await client.query(
      `INSERT INTO collection_accounts (
        committee_id, account_type, account_number, account_title, is_active
      ) VALUES ($1, $2, $3, $4, true)
      RETURNING *`,
      [committee.id, normProvider, accNum, accTitle]
    );

    // 3. Insert Organizer Record
    await client.query(
      `INSERT INTO organizers (user_id, committee_id) VALUES ($1, $2)`,
      [userId, committee.id]
    );

    // 4. Insert Founding Member (Organizer is turn 1 approved member)
    await client.query(
      `INSERT INTO members (user_id, committee_id, status, payout_turn_order, joined_at)
       VALUES ($1, $2, 'approved', 1, NOW())`,
      [userId, committee.id]
    );

    // 5. Auto-generate initial Cycles 1..N
    const cycleStartDate = startDate ? new Date(startDate) : new Date();
    const cyclesCreated = [];

    for (let i = 1; i <= cap; i++) {
      const dueDateStr = calculateDueDate(cycleStartDate, i, normInterval);
      const recipientId = i === 1 ? userId : null; // Turn 1 is founding organizer

      const cycleRes = await client.query(
        `INSERT INTO cycles (
          committee_id, cycle_number, due_date, status, recipient_user_id, payout_status
        ) VALUES ($1, $2, $3, 'collecting', $4, 'pending')
        RETURNING *`,
        [committee.id, i, dueDateStr, recipientId]
      );

      cyclesCreated.push(cycleRes.rows[0]);
    }

    // COMMIT TRANSACTION
    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Committee created successfully!',
      committee,
      collectionAccount: accountRes.rows[0],
      inviteCode: committee.invite_code,
      inviteLink: committee.invite_link,
      totalCycles: cap,
      cyclesCreatedCount: cyclesCreated.length,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating committee:', error);
    return res.status(500).json({ error: error.message || 'Failed to create committee in database.' });
  } finally {
    client.release();
  }
}

/**
 * GET /api/committees
 * Fetches all committees the authenticated user belongs to (organizer, co-organizer, or member)
 */
export async function getMyCommittees(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const committeesRes = await query(
      `SELECT DISTINCT c.*,
        ca.account_type, ca.account_number, ca.account_title,
        (SELECT COUNT(*) FROM members m WHERE m.committee_id = c.id AND m.status = 'approved') AS member_count,
        CASE 
          WHEN o.user_id = $1 THEN 'organizer'
          WHEN co.user_id = $1 AND co.demoted_at IS NULL THEN 'co_organizer'
          ELSE 'member'
        END AS my_role
       FROM committees c
       LEFT JOIN collection_accounts ca ON ca.committee_id = c.id AND ca.is_active = true
       LEFT JOIN organizers o ON o.committee_id = c.id
       LEFT JOIN co_organizers co ON co.committee_id = c.id
       LEFT JOIN members m ON m.committee_id = c.id
       WHERE o.user_id = $1 OR co.user_id = $1 OR m.user_id = $1
       ORDER BY c.created_at DESC`,
      [userId]
    );

    return res.status(200).json({
      committees: committeesRes.rows,
    });
  } catch (error) {
    console.error('Error fetching committees:', error);
    return res.status(500).json({ error: 'Failed to fetch committees.' });
  }
}

/**
 * GET /api/committees/:id
 * Fetches a single committee by ID with members, active collection account, and current cycle
 */
export async function getCommittee(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const committeeRes = await query(
      `SELECT c.*,
        ca.account_type, ca.account_number, ca.account_title,
        u.full_name AS organizer_name, u.email AS organizer_email, u.phone_number AS organizer_phone
       FROM committees c
       LEFT JOIN collection_accounts ca ON ca.committee_id = c.id AND ca.is_active = true
       LEFT JOIN users u ON u.id = c.created_by
       WHERE c.id = $1`,
      [id]
    );

    if (committeeRes.rows.length === 0) {
      return res.status(404).json({ error: 'Committee not found.' });
    }

    const committee = committeeRes.rows[0];

    // Members list
    const membersRes = await query(
      `SELECT m.*, u.full_name, u.email, u.phone_number, u.profile_photo_url,
        ts.score AS trust_score
       FROM members m
       JOIN users u ON u.id = m.user_id
       LEFT JOIN trust_scores ts ON ts.user_id = u.id
       WHERE m.committee_id = $1
       ORDER BY m.payout_turn_order ASC NULLS LAST, m.created_at ASC`,
      [id]
    );

    // Active cycles
    const cyclesRes = await query(
      `SELECT cy.*, u.full_name AS recipient_name
       FROM cycles cy
       LEFT JOIN users u ON u.id = cy.recipient_user_id
       WHERE cy.committee_id = $1
       ORDER BY cy.cycle_number ASC`,
      [id]
    );

    return res.status(200).json({
      committee,
      members: membersRes.rows,
      cycles: cyclesRes.rows,
    });
  } catch (error) {
    console.error('Error fetching committee details:', error);
    return res.status(500).json({ error: 'Failed to fetch committee details.' });
  }
}

/**
 * POST /api/committees/parse-ai
 * Parses natural language prompt into structured committee params
 */
export async function parseCommitteeAI(req, res) {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text prompt is required for AI parsing.' });
    }

    const numMatch = text.match(/(\d+)\s*(people|members|person|users)/i);
    const amountMatch = text.match(/(?:Rs\.?|INR|\$)\s*([\d,]+)|([\d,]+)\s*(?:rupees|monthly|rs)/i);

    let capacity = numMatch ? parseInt(numMatch[1], 10) : 10;
    let contribution_amount = amountMatch ? parseFloat((amountMatch[1] || amountMatch[2]).replace(/,/g, '')) : 5000;
    
    let interval_type = '1_month';
    if (/15\s*days?/i.test(text)) interval_type = '15_days';
    if (/2\s*months?/i.test(text)) interval_type = '2_months';

    const name = text.length > 30 ? `${text.slice(0, 25)}... Fund` : `${text} Pool`;

    return res.status(200).json({
      parsed: {
        name,
        contribution_amount,
        capacity,
        interval_type,
        duration_cycles: capacity,
      },
    });
  } catch (error) {
    console.error('Error in parseCommitteeAI:', error);
    return res.status(500).json({ error: 'Failed to parse AI prompt.' });
  }
}

/**
 * POST /api/committees/join
 * Joins a committee using an invite code
 */
export async function joinByCode(req, res) {
  try {
    const userId = req.user?.userId;
    const { invite_code } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (!invite_code) {
      return res.status(400).json({ error: 'Invite code is required.' });
    }

    const committeeRes = await query(
      `SELECT * FROM committees WHERE invite_code = $1 AND status = 'active'`,
      [invite_code.trim().toUpperCase()]
    );

    if (committeeRes.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid or inactive committee invite code.' });
    }

    const committee = committeeRes.rows[0];

    // Check member count limit
    const countRes = await query(
      `SELECT COUNT(*) FROM members WHERE committee_id = $1 AND status = 'approved'`,
      [committee.id]
    );

    const currentCount = parseInt(countRes.rows[0].count, 10);
    if (currentCount >= committee.capacity) {
      return res.status(400).json({ error: 'This committee pool is already at full capacity.' });
    }

    // Insert or update member status
    const nextTurn = currentCount + 1;

    const memberRes = await query(
      `INSERT INTO members (user_id, committee_id, status, payout_turn_order, joined_at)
       VALUES ($1, $2, 'approved', $3, NOW())
       ON CONFLICT (user_id, committee_id) DO UPDATE SET status = 'approved', joined_at = NOW()
       RETURNING *`,
      [userId, committee.id, nextTurn]
    );

    return res.status(200).json({
      message: 'Successfully joined committee pool!',
      committee,
      member: memberRes.rows[0],
    });
  } catch (error) {
    console.error('Error joining committee by code:', error);
    return res.status(500).json({ error: 'Failed to join committee.' });
  }
}
