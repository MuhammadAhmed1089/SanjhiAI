/**
 * api.js — Centralized HTTP client for the Sanjhi frontend.
 *
 * Usage:
 *   import api from './api';
 *   const data = await api.get('/committees');
 *   const created = await api.post('/committees', { name: 'Pool', ... });
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Retrieves the stored auth token (JWT) from localStorage.
 */
function getToken() {
  return localStorage.getItem('sanjhi_token');
}

/**
 * Stores the auth token after login / signup.
 */
export function setToken(token) {
  localStorage.setItem('sanjhi_token', token);
}

/**
 * Removes the auth token on logout.
 */
export function clearToken() {
  localStorage.removeItem('sanjhi_token');
}

/**
 * Core request function — every HTTP method funnels through here.
 *
 * @param {string} endpoint  Path relative to BASE_URL, e.g. '/auth/otp'
 * @param {object} options   fetch options (method, body, headers…)
 * @returns {Promise<any>}   Parsed JSON response
 */
async function request(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = { ...options, headers };

  // If body is a plain object, stringify it automatically
  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  // FormData uploads — let the browser set Content-Type with the boundary
  if (config.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  // Handle 204 No Content
  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Build a consistent error shape
    const error = new Error(data?.message || data?.error || `Request failed (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/** Convenience wrappers */
const api = {
  get: (endpoint, opts) => request(endpoint, { ...opts, method: 'GET' }),
  post: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'POST', body }),
  put: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'PUT', body }),
  patch: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'PATCH', body }),
  delete: (endpoint, opts) => request(endpoint, { ...opts, method: 'DELETE' }),

  /** Upload a file (FormData) */
  upload: (endpoint, formData, opts) =>
    request(endpoint, { ...opts, method: 'POST', body: formData }),
};

export default api;
