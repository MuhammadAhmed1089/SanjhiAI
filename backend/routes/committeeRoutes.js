import express from 'express';
import multer from 'multer';
import {
  createCommittee,
  getMyCommittees,
  getCommittee,
  parseCommitteeAIAudio,
  parseCommitteeAIText,
  getCommitteeByCode,
  joinByCode,
  getJoinRequests,
  updateMemberRequestStatus,
  addMemberDirectly,
  searchUsers,
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
router.get('/code/:code', getCommitteeByCode);
router.get('/:id/members/requests', requireAuth, getJoinRequests);
router.get('/:id/members/search-users', requireAuth, searchUsers);
router.post('/:id/members/add', requireAuth, addMemberDirectly);
router.post('/join', requireAuth, joinByCode);
router.patch('/:id/members/:memberId/approve', requireAuth, (req, res) => { req.body.status = 'approved'; updateMemberRequestStatus(req, res); });
router.patch('/:id/members/:memberId/reject', requireAuth, (req, res) => { req.body.status = 'rejected'; updateMemberRequestStatus(req, res); });
router.patch('/:id/requests/:memberId', requireAuth, updateMemberRequestStatus);

export default router;
