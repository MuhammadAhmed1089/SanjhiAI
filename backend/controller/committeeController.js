import { query, pool } from '../config/db.js';
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { createNotification } from './notificationController.js';

const SYSTEM_EXTRACTION_PROMPT = `You are an expert multilingual assistant for a Pakistani Peer-to-Peer Savings Committee (Kameti / BC / Chit Fund) app called Sanjhi.
Extract committee parameters from user input which can be in English, Urdu (Arabic script), Roman Urdu (English alphabet Urdu like "18 members, har mahine 2500 dena, commitee ka name Sabzazar Al-Kareem store"), or Hindi.

Extract the following JSON schema strictly:
{
  "name": string (The name of the committee. If mentioned in quotes or with "name ...", extract the exact name cleanly without extra quotes. If no name specified, return a meaningful title like "Savings Pool"),
  "contribution_amount": number (The periodic contribution amount in PKR per member, e.g. 2500, 5000. Convert Urdu terms like "5 hazar" -> 5000, "dus hazar" -> 10000),
  "capacity": number (Total number of members/slots, e.g. 18. Understand terms like "18 members", "18 log", "18 banday", "18 afraad", "18 mahine duration"),
  "interval_type": "15_days" | "1_month" | "2_months" (Default to "1_month" unless specified like "15 din", "har 15 din" -> "15_days", "do mahine" -> "2_months")
}

Return ONLY valid JSON matching this schema. No explanations, no markdown formatting outside of JSON.`;

/**
 * Fallback smart regex parser for Roman Urdu, Urdu and English if Groq is unavailable
 */
function fallbackLocalParse(text) {
  let name = '';
  const nameQuoteMatch = text.match(/["']([^"']+)["']/);
  if (nameQuoteMatch) {
    name = nameQuoteMatch[1].trim();
  } else {
    const nameMatch = text.match(/(?:name|naam|nam)\s*(?:is|hoga|rakho|:)?\s*([a-zA-Z0-9\s\-]+?)(?:\s*(?:hoga|rakho|aur|with|$))/i);
    if (nameMatch && nameMatch[1].trim().length > 2) {
      name = nameMatch[1].trim();
    } else {
      name = 'Sanjhi Savings Pool';
    }
  }

  const memberMatch = text.match(/(\d+)\s*(?:members?|log|banday|afraad|person|people|mahine|months?)/i);
  const capacity = memberMatch ? parseInt(memberMatch[1], 10) : 10;

  let contribution_amount = 5000;
  const thousandMatch = text.match(/(\d+)\s*(?:hazar|hazaar|k\b)/i);
  const directAmountMatch = text.match(/(?:Rs\.?|pkr|inr|\$)?\s*(\d{3,7})/i);
  
  if (thousandMatch) {
    contribution_amount = parseInt(thousandMatch[1], 10) * 1000;
  } else if (directAmountMatch) {
    contribution_amount = parseInt(directAmountMatch[1], 10);
  }

  let interval_type = '1_month';
  if (/15\s*(?:din|days?)/i.test(text)) interval_type = '15_days';
  if (/2\s*(?:mahine|months?)/i.test(text)) interval_type = '2_months';

  return {
    name,
    contribution_amount,
    capacity,
    interval_type,
  };
}

export async function parseCommitteeAIText(req, res) {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text prompt is required.' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'your_groq_api_key_here' || apiKey.trim() === '') {
      const parsed = fallbackLocalParse(text);
      return res.status(200).json({ parsed });
    }

    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_EXTRACTION_PROMPT },
        { role: 'user', content: `Extract from this text: "${text}"` }
      ],
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' },
    });

    const parsedContent = JSON.parse(chatCompletion.choices[0].message.content);
    return res.status(200).json({ parsed: parsedContent });
  } catch (error) {
    console.error('Error in parseCommitteeAIText, using fallback:', error.message);
    const parsed = fallbackLocalParse(req.body?.text || '');
    return res.status(200).json({ parsed });
  }
}

function normalizeIntervalType(input) {
  if (!input) return '1_month';
  const str = input.toString().toLowerCase().replace(/[\s-]/g, '_');
  if (str.includes('15')) return '15_days';
  if (str.includes('2')) return '2_months';
  return '1_month';
}

function normalizeAccountType(input) {
  if (!input) return 'jazzcash';
  const str = input.toString().toLowerCase();
  if (str.includes('easy')) return 'easypaisa';
  if (str.includes('bank')) return 'bank';
  return 'jazzcash';
}

function generateInviteCode() {
  const num = Math.floor(1000 + Math.random() * 9000);
  const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `SANJHI-${num}${char}`;
}

function calculateDueDate(startDate, cycleIndex, intervalType) {
  const d = new Date(startDate);
  if (intervalType === '15_days') {
    d.setDate(d.getDate() + (cycleIndex - 1) * 15);
  } else if (intervalType === '2_months') {
    d.setMonth(d.getMonth() + (cycleIndex - 1) * 2);
  } else {
    d.setMonth(d.getMonth() + (cycleIndex - 1));
  }
  return d.toISOString().split('T')[0];
}

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

    await client.query('BEGIN');

    const committeeRes = await client.query(
      `INSERT INTO committees (
        created_by, name, contribution_amount, capacity, interval_type, duration_cycles, payout_order_type, status, invite_code, invite_link
      ) VALUES ($1, $2, $3, $4, $5, $6, 'fixed', 'active', $7, $8)
      RETURNING *`,
      [userId, committeeName, amount, cap, normInterval, cap, inviteCode, inviteLink]
    );

    const committee = committeeRes.rows[0];

    const accountRes = await client.query(
      `INSERT INTO collection_accounts (
        committee_id, account_type, account_number, account_title, is_active
      ) VALUES ($1, $2, $3, $4, true)
      RETURNING *`,
      [committee.id, normProvider, accNum, accTitle]
    );

    await client.query(
      `INSERT INTO organizers (user_id, committee_id) VALUES ($1, $2)`,
      [userId, committee.id]
    );

    await client.query(
      `INSERT INTO members (user_id, committee_id, status, payout_turn_order, joined_at)
       VALUES ($1, $2, 'approved', 1, NOW())`,
      [userId, committee.id]
    );

    const cycleStartDate = startDate ? new Date(startDate) : new Date();
    const cyclesCreated = [];
    const poolPayoutAmount = amount * cap; // Total pool amount per cycle

    for (let i = 1; i <= cap; i++) {
      const dueDateStr = calculateDueDate(cycleStartDate, i, normInterval);
      const recipientId = i === 1 ? userId : null;

      const cycleRes = await client.query(
        `INSERT INTO cycles (
          committee_id, cycle_number, due_date, status, recipient_user_id, payout_status, amount
        ) VALUES ($1, $2, $3, 'collecting', $4, 'pending', $5)
        RETURNING *`,
        [committee.id, i, dueDateStr, recipientId, poolPayoutAmount]
      );

      cyclesCreated.push(cycleRes.rows[0]);
    }

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

export async function getCommittee(req, res) {
  try {
    const { id } = req.params;

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (!isUuid) {
      return res.status(404).json({ error: 'Committee not found.' });
    }

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

export async function parseCommitteeAIAudio(req, res) {
  const tempFilePath = path.join(os.tmpdir(), `audio-${Date.now()}.webm`);
  try {
    if (!req.file) return res.status(400).json({ error: 'Audio file is required.' });
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-large-v3-turbo",
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [{
        role: "system",
        content: SYSTEM_EXTRACTION_PROMPT
      }, {
        role: "user",
        content: `Extract from this text: "${transcription.text}"`
      }],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
    });
    
    return res.status(200).json({ parsed: JSON.parse(chatCompletion.choices[0].message.content), transcript: transcription.text });
  } catch (error) {
    console.error('Error in parseCommitteeAIAudio:', error);
    if (req.body?.text) {
      const parsed = fallbackLocalParse(req.body.text);
      return res.status(200).json({ parsed, transcript: req.body.text });
    }
    return res.status(500).json({ error: 'Failed to process audio.' });
  } finally {
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
  }
}

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

    const memberRes = await query(
      `INSERT INTO members (user_id, committee_id, status, joined_at)
       VALUES ($1, $2, 'pending', NOW())
       ON CONFLICT (user_id, committee_id) DO UPDATE SET status = 'pending', joined_at = NOW()
       RETURNING *`,
      [userId, committee.id]
    );

    // Notify Organizer
    const orgRes = await query(`SELECT user_id FROM organizers WHERE committee_id = $1`, [committee.id]);
    if (orgRes.rows.length > 0) {
      const orgUserId = orgRes.rows[0].user_id;
      await createNotification(
        orgUserId,
        'join_request',
        'in_app',
        `A new participant requested to join your committee "${committee.name}".`,
        committee.id
      );
    }

    return res.status(200).json({
      message: 'Join request submitted successfully. Waiting for organizer approval!',
      committee,
      member: memberRes.rows[0],
    });
  } catch (error) {
    console.error('Error joining committee by code:', error);
    return res.status(500).json({ error: 'Failed to join committee.' });
  }
}

/**
 * PATCH /api/committees/:id/requests/:memberId
 * Organizer approves or rejects a member's join request
 */
export async function updateMemberRequestStatus(req, res) {
  try {
    const userId = req.user?.userId;
    const { id: committeeId, memberId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be approved or rejected.' });
    }

    // Verify user is organizer of this committee
    const orgRes = await query(
      `SELECT * FROM organizers WHERE committee_id = $1 AND user_id = $2`,
      [committeeId, userId]
    );

    if (orgRes.rows.length === 0) {
      return res.status(403).json({ error: 'Only the organizer can approve or reject join requests.' });
    }

    let payoutTurnOrder = null;
    if (status === 'approved') {
      const countRes = await query(
        `SELECT COUNT(*) FROM members WHERE committee_id = $1 AND status = 'approved'`,
        [committeeId]
      );
      payoutTurnOrder = parseInt(countRes.rows[0].count, 10) + 1;
    }

    const updateRes = await query(
      `UPDATE members 
       SET status = $1, payout_turn_order = COALESCE($2, payout_turn_order)
       WHERE id = $3 AND committee_id = $4
       RETURNING *`,
      [status, payoutTurnOrder, memberId, committeeId]
    );

    if (updateRes.rows.length === 0) {
      return res.status(404).json({ error: 'Member request not found.' });
    }

    const updatedMember = updateRes.rows[0];

    // Fetch committee name for notification
    const commRes = await query(`SELECT name FROM committees WHERE id = $1`, [committeeId]);
    const commName = commRes.rows[0]?.name || 'Committee';

    // Notify Member of Approval / Rejection
    await createNotification(
      updatedMember.user_id,
      'approval_status',
      'in_app',
      status === 'approved'
        ? `Your request to join "${commName}" has been approved by the organizer! 🎉`
        : `Your request to join "${commName}" was declined by the organizer.`,
      committeeId
    );

    return res.status(200).json({
      message: `Member request successfully ${status}!`,
      member: updatedMember,
    });
  } catch (error) {
    console.error('Error updating member request status:', error);
    return res.status(500).json({ error: 'Failed to update member status.' });
  }
}
