/**
 * complaintRoutes.js — User-facing complaint filing and retrieval routes.
 */

import { Router } from 'express';
import { requireAuth } from '../utilities/jwt.js';
import { fileComplaint, getMyComplaints, getComplaintById } from '../controller/complaintController.js';

const router = Router();

// POST /api/complaints — File a new complaint (triggers AI investigation)
router.post('/', requireAuth, fileComplaint);

// GET /api/complaints/my — Get user's own complaints
router.get('/my', requireAuth, getMyComplaints);

// GET /api/complaints/:id — Get specific complaint with case file
router.get('/:id', requireAuth, getComplaintById);

export default router;
