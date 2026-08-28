import { query } from '../config/db.js';

/**
 * Helper to create a notification for a user
 */
export async function createNotification(userId, type, channel, content, relatedCommitteeId = null) {
  try {
    const res = await query(
      `INSERT INTO notifications (user_id, type, channel, content, related_committee_id, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [userId, type, channel || 'in_app', content, relatedCommitteeId]
    );
    return res.rows[0];
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
}

/**
 * GET /api/notifications
 * Fetches all notifications for the authenticated user
 */
export async function getUserNotifications(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const result = await query(
      `SELECT n.*, c.name AS committee_name
       FROM notifications n
       LEFT JOIN committees c ON c.id = n.related_committee_id
       WHERE n.user_id = $1
       ORDER BY n.created_at DESC`,
      [userId]
    );

    return res.status(200).json({
      notifications: result.rows,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
}

/**
 * PATCH /api/notifications/:id/read
 * Marks a notification as read
 */
export async function markNotificationAsRead(req, res) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const result = await query(
      `UPDATE notifications
       SET read_at = NOW()
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found.' });
    }

    return res.status(200).json({
      message: 'Notification marked as read.',
      notification: result.rows[0],
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return res.status(500).json({ error: 'Failed to update notification.' });
  }
}

/**
 * GET /api/notifications/unread-count
 * Returns the count of unread notifications
 */
export async function getUnreadNotificationCount(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const result = await query(
      `SELECT COUNT(*)
       FROM notifications
       WHERE user_id = $1 AND read_at IS NULL`,
      [userId]
    );

    return res.status(200).json({
      count: parseInt(result.rows[0].count, 10),
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return res.status(500).json({ error: 'Failed to fetch unread count.' });
  }
}
