import express from 'express';
import {
  getUserNotifications,
  markNotificationAsRead,
  getUnreadNotificationCount,
} from '../controller/notificationController.js';
import { requireAuth } from '../utilities/jwt.js';

const router = express.Router();

router.get('/', requireAuth, getUserNotifications);
router.get('/unread-count', requireAuth, getUnreadNotificationCount);
router.patch('/:id/read', requireAuth, markNotificationAsRead);

export default function(app) {
  app.use('/api/notifications', router);
}
