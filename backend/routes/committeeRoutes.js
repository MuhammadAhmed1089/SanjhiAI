import express from 'express';
import {
  createCommittee,
  getMyCommittees,
  getCommittee,
  parseCommitteeAI,
  joinByCode,
} from '../controller/committeeController.js';
import { requireAuth } from '../utilities/jwt.js';

const router = express.Router();

// AI Natural Language Parsing (Open / optional auth)
router.post('/parse-ai', parseCommitteeAI);

// Protected routes (Requires valid Bearer token)
router.post('/', requireAuth, createCommittee);
router.get('/', requireAuth, getMyCommittees);
router.get('/:id', requireAuth, getCommittee);
router.post('/join', requireAuth, joinByCode);

export default router;
