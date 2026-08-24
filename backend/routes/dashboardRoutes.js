import express from 'express';
import { requireAuth } from '../utilities/jwt.js';
import { getDashboardOverviewController } from '../controller/dashboardController.js';

const router = express.Router();

// GET /api/dashboard - Get authenticated user's dashboard overview data
router.get('/', requireAuth, getDashboardOverviewController);

export default router;
