import { query } from '../config/db.js';
import { getCache, setCache } from '../config/redis.js';

/**
 * GET /api/dashboard
 * Returns personalized dashboard metrics, trust score, active committees,
 * financial totals, next payout cycle, and recent notifications.
 */
export async function getDashboardOverviewController(req, res) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized. User ID not found in token.' });
    }

    const cacheKey = `sanjhi:cache:dashboard:${userId}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    // 1. Fetch user profile
    const userResult = await query(
      `SELECT id, full_name, email, phone_number, age, sex, profile_photo_url, created_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User profile not found.' });
    }
    const user = userResult.rows[0];

    // 2. Fetch trust score (or return default if new user)
    const scoreResult = await query(
      `SELECT score, on_time_rate, completed_committees_count, last_calculated_at
       FROM trust_scores WHERE user_id = $1`,
      [userId]
    );

    const trustScore = scoreResult.rows.length > 0
      ? {
          score: Math.round(parseFloat(scoreResult.rows[0].score)),
          onTimeRate: Math.round(parseFloat(scoreResult.rows[0].on_time_rate) * 100),
          completedCommittees: scoreResult.rows[0].completed_committees_count,
        }
      : {
          score: 850,
          onTimeRate: 94,
          completedCommittees: 0,
        };

    // 3. Fetch Total Amount Contributed (sum of confirmed 'paid' payments)
    const paidSumResult = await query(
      `SELECT COALESCE(SUM(c.contribution_amount), 0) AS total_contributed,
              COUNT(p.id) AS paid_cycles_count
       FROM payments p
       JOIN cycles cy ON p.cycle_id = cy.id
       JOIN committees c ON cy.committee_id = c.id
       WHERE p.user_id = $1 AND p.status = 'paid'`,
      [userId]
    );

    const totalContributed = parseFloat(paidSumResult.rows[0].total_contributed) || 0;
    const completedCyclesCount = parseInt(paidSumResult.rows[0].paid_cycles_count, 10) || 0;

    // 4. Fetch Next Payout Cycle for this user
    const nextPayoutResult = await query(
      `SELECT cy.id AS cycle_id, cy.cycle_number, cy.due_date, c.name AS committee_name,
              (c.contribution_amount * c.capacity) AS total_payout
       FROM cycles cy
       JOIN committees c ON cy.committee_id = c.id
       WHERE cy.recipient_user_id = $1
         AND cy.status = 'collecting'
       ORDER BY cy.due_date ASC
       LIMIT 1`,
      [userId]
    );

    const nextPayout = nextPayoutResult.rows.length > 0
      ? {
          committeeName: nextPayoutResult.rows[0].committee_name,
          turnNumber: nextPayoutResult.rows[0].cycle_number,
          dueDate: nextPayoutResult.rows[0].due_date,
          amount: parseFloat(nextPayoutResult.rows[0].total_payout),
        }
      : null;

    // 5. Fetch User's Active Committees across all roles (Organizer, Co-Organizer, Member)
    const committeesResult = await query(
      `SELECT 
          c.id,
          c.name,
          c.contribution_amount,
          c.capacity,
          c.interval_type,
          c.status AS committee_status,
          CASE 
            WHEN o.user_id IS NOT NULL THEN 'Organizer'
            WHEN co.user_id IS NOT NULL THEN 'Co-Organizer'
            ELSE 'Member'
          END AS user_role,
          (
            SELECT COUNT(*) FROM members m 
            WHERE m.committee_id = c.id AND m.status = 'approved'
          ) AS member_count,
          (
            SELECT COUNT(*) FROM cycles cy 
            WHERE cy.committee_id = c.id AND cy.payout_status = 'confirmed'
          ) AS completed_cycles
       FROM committees c
       LEFT JOIN organizers o ON o.committee_id = c.id AND o.user_id = $1
       LEFT JOIN co_organizers co ON co.committee_id = c.id AND co.user_id = $1 AND co.demoted_at IS NULL
       LEFT JOIN members m ON m.committee_id = c.id AND m.user_id = $1
       WHERE (o.user_id IS NOT NULL OR co.user_id IS NOT NULL OR (m.user_id IS NOT NULL AND m.status = 'approved'))
         AND c.status != 'closed'
       ORDER BY c.created_at DESC`,
      [userId]
    );

    const committees = committeesResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      contributionAmount: parseFloat(row.contribution_amount),
      capacity: parseInt(row.capacity, 10),
      intervalType: row.interval_type,
      status: row.committee_status,
      userRole: row.user_role,
      memberCount: parseInt(row.member_count, 10) || 1,
      completedCycles: parseInt(row.completed_cycles, 10) || 0,
      totalPool: parseFloat(row.contribution_amount) * parseInt(row.capacity, 10),
    }));

    // 6. Fetch Recent Notifications
    const notificationsResult = await query(
      `SELECT id, type, channel, content, related_committee_id, created_at, read_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 5`,
      [userId]
    );

    const notifications = notificationsResult.rows.map((n) => ({
      id: n.id,
      type: n.type,
      channel: n.channel,
      content: n.content,
      createdAt: n.created_at,
      readAt: n.read_at,
    }));

    // Return aggregated payload
    const responsePayload = {
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phoneNumber: user.phone_number,
        photoUrl: user.profile_photo_url,
      },
      trustScore,
      financialSummary: {
        totalContributed,
        completedCyclesCount,
        nextPayout,
      },
      committees,
      recentNotifications: notifications,
    };

    // Cache user dashboard for 20 seconds
    await setCache(cacheKey, responsePayload, 20);

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error('Error in getDashboardOverviewController:', error);
    return res.status(500).json({ error: 'Failed to fetch dashboard data.' });
  }
}
