import express from 'express';
import {
  sendOTPController,
  verifyOTPController,
  resendOTPController,
  loginWithPasswordController,
  getProfileController,
  setupProfileController,
  getSessionController,
  logoutController,
} from '../controller/authController.js';
import { requireAuth } from '../utilities/jwt.js';

const router = express.Router();

// Public OTP & Auth routes
router.post('/otp/send', sendOTPController);
router.post('/otp/verify', verifyOTPController);
router.post('/otp/resend', resendOTPController);
router.post('/login-password', loginWithPasswordController);

// Protected routes (Requires Bearer Token)
router.get('/profile', requireAuth, getProfileController);
router.put('/profile', requireAuth, setupProfileController);
router.patch('/profile', requireAuth, setupProfileController);
router.get('/session', requireAuth, getSessionController);
router.post('/logout', requireAuth, logoutController);

export default router;

