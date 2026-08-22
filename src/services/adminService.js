/**
 * adminService.js — Platform admin operations.
 *
 * Maps to: admins, admin_action_logs tables + admin-scoped views
 * of users, committees, complaints.
 */
import api from './api';

const BASE = '/admin';

// ─── Dashboard / Overview ────────────────────────────────────

/**
 * Get admin dashboard overview stats.
 * @returns {Promise<{ total_users, total_committees, active_complaints, total_payments, ... }>}
 */
export function getOverview() {
  return api.get(`${BASE}/overview`);
}

// ─── User Management ─────────────────────────────────────────

/**
 * List all users (admin view).
 * @param {{ search?: string, is_suspended?: boolean, page?: number, limit?: number }} params
 */
export function getUsers(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`${BASE}/users?${qs}`);
}

/**
 * Get a user's full details (admin view).
 * @param {string} userId
 */
export function getUser(userId) {
  return api.get(`${BASE}/users/${userId}`);
}

/**
 * Suspend a user.
 * @param {string} userId
 * @param {{ notes?: string }} payload
 */
export function suspendUser(userId, payload = {}) {
  return api.post(`${BASE}/users/${userId}/suspend`, payload);
}

/**
 * Unsuspend a user.
 * @param {string} userId
 */
export function unsuspendUser(userId) {
  return api.post(`${BASE}/users/${userId}/unsuspend`);
}

// ─── Committee Management ────────────────────────────────────

/**
 * List all committees (admin view).
 * @param {{ status?: string, search?: string, page?: number, limit?: number }} params
 */
export function getCommittees(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`${BASE}/committees?${qs}`);
}

/**
 * Get committee details (admin view with extra info).
 * @param {string} committeeId
 */
export function getCommittee(committeeId) {
  return api.get(`${BASE}/committees/${committeeId}`);
}

/**
 * Freeze a committee.
 * @param {string} committeeId
 * @param {{ notes?: string }} payload
 */
export function freezeCommittee(committeeId, payload = {}) {
  return api.post(`${BASE}/committees/${committeeId}/freeze`, payload);
}

/**
 * Unfreeze a committee.
 * @param {string} committeeId
 */
export function unfreezeCommittee(committeeId) {
  return api.post(`${BASE}/committees/${committeeId}/unfreeze`);
}

// ─── Complaints / Disputes ───────────────────────────────────

/**
 * List all complaints (admin view).
 * @param {{ status?: string, priority?: string, category?: string, page?: number, limit?: number }} params
 */
export function getComplaints(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`${BASE}/complaints?${qs}`);
}

/**
 * Get complaint details (admin view with AI summary).
 * @param {string} complaintId
 */
export function getComplaint(complaintId) {
  return api.get(`${BASE}/complaints/${complaintId}`);
}

/**
 * Resolve a complaint.
 * @param {string} complaintId
 * @param {{ notes?: string }} payload
 */
export function resolveComplaint(complaintId, payload = {}) {
  return api.post(`${BASE}/complaints/${complaintId}/resolve`, payload);
}

/**
 * Dismiss a complaint.
 * @param {string} complaintId
 * @param {{ notes?: string }} payload
 */
export function dismissComplaint(complaintId, payload = {}) {
  return api.post(`${BASE}/complaints/${complaintId}/dismiss`, payload);
}

// ─── Activity Logs ───────────────────────────────────────────

/**
 * Get admin action logs.
 * @param {{ admin_id?: string, action_type?: string, page?: number, limit?: number }} params
 */
export function getActivityLogs(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`${BASE}/logs?${qs}`);
}

// ─── Risk Flags ──────────────────────────────────────────────

/**
 * Get risk flags for a committee.
 * @param {string} committeeId
 */
export function getRiskFlags(committeeId) {
  return api.get(`${BASE}/committees/${committeeId}/risk-flags`);
}

/**
 * Clear a risk flag.
 * @param {string} flagId
 * @param {{ notes?: string }} payload
 */
export function clearRiskFlag(flagId, payload = {}) {
  return api.post(`/admin/risk-flags/${flagId}/clear`, payload);
}
