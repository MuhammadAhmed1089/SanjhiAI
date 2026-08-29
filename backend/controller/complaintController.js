/**
 * complaintController.js — User-facing complaint filing and case file retrieval.
 *
 * Provides endpoints for:
 * - POST /api/complaints — File a new complaint (triggers AI investigation)
 * - GET /api/complaints/my — Get user's own complaints
 * - GET /api/complaints/:id — Get specific complaint with case file
 */

import { query } from '../config/db.js';
import { processComplaint } from '../utilities/complaintAgent/index.js';

const MAX_DESCRIPTION_LENGTH = 3000; // Cost control per plan

/**
 * POST /api/complaints
 * File a new complaint. Triggers AI investigation asynchronously.
 */
export async function fileComplaint(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const { accused_user_id, committee_id, category, description, evidence_url } = req.body;

    // Validation
    if (!category || !description) {
      return res.status(400).json({ error: 'Category and description are required.' });
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return res.status(400).json({
        error: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less. Current length: ${description.length}`,
      });
    }

    const validCategories = ['payment_dispute', 'harassment', 'suspected_fraud', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: `Invalid category. Must be one of: ${validCategories.join(', ')}` });
    }

    // Insert complaint
    const insertRes = await query(
      `INSERT INTO complaints (filed_by, accused_user_id, committee_id, category, description, evidence_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [userId, accused_user_id || null, committee_id || null, category, description, evidence_url || null]
    );

    const complaint = insertRes.rows[0];

    // Trigger AI investigation asynchronously (don't block user response)
    processComplaint(complaint.id).catch((err) => {
      console.error(`[Complaint Agent] Background investigation failed for ${complaint.id}:`, err.message);
    });

    return res.status(201).json({
      message: 'Complaint filed successfully. AI investigation in progress.',
      complaint: {
        id: complaint.id,
        status: complaint.status,
        created_at: complaint.created_at,
      },
    });
  } catch (err) {
    console.error('Error filing complaint:', err);
    return res.status(500).json({ error: 'Failed to file complaint.' });
  }
}

/**
 * GET /api/complaints/my
 * Get all complaints filed by the authenticated user.
 */
export async function getMyComplaints(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const result = await query(
      `SELECT cmp.*, c.name AS committee_name
       FROM complaints cmp
       LEFT JOIN committees c ON c.id = cmp.committee_id
       WHERE cmp.filed_by = $1
       ORDER BY cmp.created_at DESC`,
      [userId]
    );

    return res.status(200).json({ complaints: result.rows });
  } catch (err) {
    console.error('Error fetching user complaints:', err);
    return res.status(500).json({ error: 'Failed to fetch complaints.' });
  }
}

/**
 * GET /api/complaints/:id
 * Get a specific complaint with its AI case file.
 */
export async function getComplaintById(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const { id } = req.params;

    const result = await query(
      `SELECT cmp.*, c.name AS committee_name
       FROM complaints cmp
       LEFT JOIN committees c ON c.id = cmp.committee_id
       WHERE cmp.id = $1 AND (cmp.filed_by = $2 OR cmp.accused_user_id = $2)`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found or access denied.' });
    }

    return res.status(200).json({ complaint: result.rows[0] });
  } catch (err) {
    console.error('Error fetching complaint:', err);
    return res.status(500).json({ error: 'Failed to fetch complaint.' });
  }
}
