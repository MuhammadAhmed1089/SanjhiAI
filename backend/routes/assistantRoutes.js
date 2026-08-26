import express from 'express';
import { handleAssistantChat } from '../controller/assistantController.js';
import { requireAuth } from '../utilities/jwt.js';

const router = express.Router();

router.post('/chat', requireAuth, handleAssistantChat);

export default function(app) {
  app.use('/api/assistant', router);
}
