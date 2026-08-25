import express from 'express';
import multer from 'multer';
import {
  createCommittee,
  getMyCommittees,
  getCommittee,
  parseCommitteeAIAudio,
  parseCommitteeAIText,
  joinByCode,
} from '../controller/committeeController.js';
import { requireAuth } from '../utilities/jwt.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// AI Natural Language Parsing (Open / optional auth)
router.post('/parse-ai-audio', upload.single('audio'), parseCommitteeAIAudio);
router.post('/parse-ai-text', parseCommitteeAIText);

// Protected routes (Requires valid Bearer token)
router.post('/', requireAuth, createCommittee);
router.get('/', requireAuth, getMyCommittees);
router.get('/:id', requireAuth, getCommittee);
router.post('/join', requireAuth, joinByCode);

export default router;
