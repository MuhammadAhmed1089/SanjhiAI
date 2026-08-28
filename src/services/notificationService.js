/**
 * notificationService.js
 */
import api from '../api';

const BASE = '/notifications';

export function getNotifications() {
  return api.get(BASE);
}

export function getUnreadCount() {
  return api.get(`${BASE}/unread-count`);
}

export function markAsRead(id) {
  return api.patch(`${BASE}/${id}/read`);
}
