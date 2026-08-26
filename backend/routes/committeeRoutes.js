import express from 'express';
import multer from 'multer';
import {
  createCommittee,
  getMyCommittees,
  getCommittee,
  parseCommitteeAIAudio,
  parseCommitteeAIText,
  joinByCode,
  updateMemberRequestStatus,
} from '../controller/committeeController.js';
import { requireAuth } from '../utilities/jwt.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// AI Natural Language Parsing
router.post('/parse-ai-audio', upload.single('audio'), parseCommitteeAIAudio);
router.post('/parse-ai-text', parseCommitteeAIText);

// Protected routes
router.post('/', requireAuth, createCommittee);
router.get('/', requireAuth, getMyCommittees);
router.get('/:id', requireAuth, getCommittee);
router.post('/join', requireAuth, joinByCode);
router.patch('/:id/requests/:memberId', requireAuth, updateMemberRequestStatus);

export default router;
