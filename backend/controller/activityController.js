import { query } from '../config/db.js';

export async function getUserActivities(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    // Unified query to fetch activities from multiple sources
    // Types: payment, payout, member_request, organizer_approval
    const activitiesRes = await query(
      `
      -- Payments made by user
      SELECT 
          'payment' as type,
          p.id,
          CAST(p.status AS TEXT) as status,
          p.submitted_at as created_at,
          c.name as committee_name,
          'Payment for cycle ' || cy.cycle_number as description
      FROM payments p
      JOIN cycles cy ON p.cycle_id = cy.id
      JOIN committees c ON cy.committee_id = c.id
      WHERE p.user_id = $1

      UNION ALL

      -- Payouts received by user
      SELECT 
          'payout' as type,
          cy.id,
          CAST(cy.payout_status AS TEXT) as status,
          cy.payout_sent_at as created_at,
          c.name as committee_name,
          'Payout received for cycle ' || cy.cycle_number as description
      FROM cycles cy
      JOIN committees c ON cy.committee_id = c.id
      WHERE cy.recipient_user_id = $1 AND cy.payout_sent_at IS NOT NULL

      UNION ALL

      -- Member requests status
      SELECT 
          'member_request' as type,
          m.id,
          CAST(m.status AS TEXT) as status,
          m.created_at as created_at,
          c.name as committee_name,
          'Join request status: ' || m.status as description
      FROM members m
      JOIN committees c ON m.committee_id = c.id
      WHERE m.user_id = $1

      UNION ALL

      -- Organizer view of join requests
      SELECT 
          'organizer_approval' as type,
          m.id,
          CAST(m.status AS TEXT) as status,
          m.created_at as created_at,
          c.name as committee_name,
          'New member request for your committee' as description
      FROM members m
      JOIN committees c ON m.committee_id = c.id
      JOIN organizers o ON o.committee_id = c.id
      WHERE o.user_id = $1 AND m.status = 'pending'
      
      ORDER BY created_at DESC
      LIMIT 50;
      `,
      [userId]
    );

    return res.status(200).json({
      activities: activitiesRes.rows,
    });
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return res.status(500).json({ error: 'Failed to fetch activities.' });
  }
}
