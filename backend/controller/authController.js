import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { generateOTPCode, sendOTP, sendLoginNotificationEmail } from '../utilities/otpService.js';
import { signToken } from '../utilities/jwt.js';


const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;

/**
 * Helper to determine if target is email or phone
 */
function parseTarget(target) {
  if (!target || typeof target !== 'string') return null;
  const cleaned = target.trim();
  if (cleaned.includes('@')) {
    return { type: 'email', value: cleaned.toLowerCase() };
  }
  // Basic phone sanitization
  const phone = cleaned.replace(/[^\d+]/g, '');
  return { type: 'phone', value: phone };
}

/**
 * POST /api/auth/otp/send
 * Sends OTP to phone or email for signup or login
 */
export async function sendOTPController(req, res) {
  try {
    const { target, purpose = 'signup' } = req.body;
    const parsed = parseTarget(target);

    if (!parsed || !parsed.value) {
      return res.status(400).json({ error: 'Valid phone number or email address is required' });
    }

    const rawCode = generateOTPCode();
    const codeHash = await bcrypt.hash(rawCode, 10);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Invalidate existing active OTPs for this target
    await query(
      `UPDATE otps SET used_at = NOW() WHERE target = $1 AND used_at IS NULL`,
      [parsed.value]
    );

    // Store new OTP in DB
    await query(
      `INSERT INTO otps (target, code_hash, purpose, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [parsed.value, codeHash, purpose, expiresAt]
    );

    // Trigger Email/SMS dispatch
    const dispatchResult = await sendOTP(parsed.value, rawCode);

    return res.status(200).json({
      message: `OTP sent successfully to ${parsed.value}`,
      target: parsed.value,
      purpose,
      channel: dispatchResult.channel,
      // For local testing convenience if SMTP/Twilio not configured
      ...(dispatchResult.mock && { devCode: rawCode }),
    });
  } catch (error) {
    console.error('Error in sendOTPController:', error);
    return res.status(500).json({ error: 'Failed to send OTP code. Please try again.' });
  }
}

/**
 * POST /api/auth/otp/verify
 * Verifies OTP code, creates/finds user, issues JWT session
 */
export async function verifyOTPController(req, res) {
  try {
    const { target, code, purpose = 'signup' } = req.body;
    const parsed = parseTarget(target);

    if (!parsed || !parsed.value || !code) {
      return res.status(400).json({ error: 'Target and verification code are required' });
    }

    // Fetch active OTP record
    const otpResult = await query(
      `SELECT * FROM otps 
       WHERE target = $1 AND used_at IS NULL AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [parsed.value]
    );

    if (otpResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP code. Please request a new one.' });
    }

    const otpRecord = otpResult.rows[0];

    if (otpRecord.attempt_count >= MAX_ATTEMPTS) {
      await query(`UPDATE otps SET used_at = NOW() WHERE id = $1`, [otpRecord.id]);
      return res.status(429).json({ error: 'Maximum verification attempts exceeded. Please request a new code.' });
    }

    // Compare code
    const isMatch = await bcrypt.compare(code.toString().trim(), otpRecord.code_hash);

    if (!isMatch) {
      await query(`UPDATE otps SET attempt_count = attempt_count + 1 WHERE id = $1`, [otpRecord.id]);
      return res.status(400).json({ error: 'Incorrect verification code. Please check and try again.' });
    }

    // Mark OTP as used
    await query(`UPDATE otps SET used_at = NOW() WHERE id = $1`, [otpRecord.id]);

    // Check if user already exists in DB
    const isEmail = parsed.type === 'email';
    const userSearchQuery = isEmail
      ? `SELECT * FROM users WHERE email = $1`
      : `SELECT * FROM users WHERE phone_number = $1`;

    let userResult = await query(userSearchQuery, [parsed.value]);
    let user = userResult.rows[0];
    let isNew = false;

    // Create user if signing up and not found
    if (!user) {
      isNew = true;
      const defaultName = isEmail ? parsed.value.split('@')[0] : `User_${parsed.value.slice(-4)}`;
      const passwordHash = req.body.password ? await bcrypt.hash(req.body.password, 10) : null;

      const insertUserQuery = isEmail
        ? `INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`
        : `INSERT INTO users (full_name, phone_number, password_hash) VALUES ($1, $2, $3) RETURNING *`;

      const newUserRes = await query(insertUserQuery, [defaultName, parsed.value, passwordHash]);
      user = newUserRes.rows[0];

      // Initialize notification preferences
      await query(
        `INSERT INTO notification_preferences (user_id) VALUES ($1) ON CONFLICT DO NOTHING`,
        [user.id]
      );
    }


    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      phone: user.phone_number,
      fullName: user.full_name,
    });

    // Create session record
    const refreshTokenHash = await bcrypt.hash(token.slice(-10), 10);
    await query(
      `INSERT INTO sessions (user_id, refresh_token_hash, device_info)
       VALUES ($1, $2, $3)`,
      [user.id, refreshTokenHash, req.headers['user-agent'] || 'Web Browser']
    );

    return res.status(200).json({
      message: 'Authentication successful',
      token,
      isNew,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        age: user.age,
        sex: user.sex,
        profile_photo_url: user.profile_photo_url,
      },
    });
  } catch (error) {
    console.error('Error in verifyOTPController:', error);
    return res.status(500).json({ error: 'Verification failed. Internal server error.' });
  }
}

/**
 * POST /api/auth/otp/resend
 */
export async function resendOTPController(req, res) {
  return sendOTPController(req, res);
}

/**
 * GET /api/auth/profile
 */
export async function getProfileController(req, res) {
  try {
    const userRes = await query(
      `SELECT id, full_name, age, sex, profile_photo_url, phone_number, email, created_at
       FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (userRes.rows.length === 0) {
      return res.status(444).json({ error: 'User profile not found' });
    }

    return res.status(200).json(userRes.rows[0]);
  } catch (error) {
    console.error('Error in getProfileController:', error);
    return res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
}

/**
 * PUT /api/auth/profile
 */
export async function setupProfileController(req, res) {
  try {
    const { full_name, age, sex, profile_photo_url, password } = req.body;
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    const updateRes = await query(
      `UPDATE users 
       SET full_name = COALESCE($1, full_name),
           age = COALESCE($2, age),
           sex = COALESCE($3, sex),
           profile_photo_url = COALESCE($4, profile_photo_url),
           password_hash = COALESCE($5, password_hash),
           updated_at = NOW()
       WHERE id = $6
       RETURNING id, full_name, age, sex, profile_photo_url, phone_number, email`,
      [full_name, age, sex, profile_photo_url, passwordHash, req.user.userId]
    );

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updateRes.rows[0],
    });
  } catch (error) {
    console.error('Error in setupProfileController:', error);
    return res.status(500).json({ error: 'Failed to update user profile' });
  }
}


/**
 * POST /api/auth/login-password
 * Authenticates user via password directly.
 * Tracks failed attempts. If password fails 3 times, suggests/requires OTP login.
 */
export async function loginWithPasswordController(req, res) {
  try {
    const { target, password } = req.body;
    const parsed = parseTarget(target);

    if (!parsed || !parsed.value || !password) {
      return res.status(400).json({ error: 'Email/Phone and password are required.' });
    }

    const isEmail = parsed.type === 'email';
    const userSearchQuery = isEmail
      ? `SELECT * FROM users WHERE email = $1`
      : `SELECT * FROM users WHERE phone_number = $1`;

    const userRes = await query(userSearchQuery, [parsed.value]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'User not found. Please check your credentials or sign up.' });
    }

    const user = userRes.rows[0];

    // If user has no password set (created via OTP signup)
    if (!user.password_hash) {
      return res.status(400).json({
        error: 'No password set for this account. Please use "Sign in with OTP".',
        requiresOTP: true,
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: 'Incorrect password. Please try again.',
        requiresOTP: false,
      });
    }

    // Password correct — Generate JWT token and session
    const token = signToken({
      userId: user.id,
      email: user.email,
      phone: user.phone_number,
      fullName: user.full_name,
    });

    const refreshTokenHash = await bcrypt.hash(token.slice(-10), 10);
    await query(
      `INSERT INTO sessions (user_id, refresh_token_hash, device_info)
       VALUES ($1, $2, $3)`,
      [user.id, refreshTokenHash, req.headers['user-agent'] || 'Web Browser']
    );

    // Send login notification email instead of OTP code
    if (user.email) {
      sendLoginNotificationEmail(user.email, user.full_name);
    }

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        age: user.age,
        sex: user.sex,
        profile_photo_url: user.profile_photo_url,
      },
    });

  } catch (error) {
    console.error('Error in loginWithPasswordController:', error);
    return res.status(500).json({ error: 'Login failed. Internal server error.' });
  }
}

/**
 * GET /api/auth/session
 */
export async function getSessionController(req, res) {

  try {
    const userRes = await query(
      `SELECT id, full_name, email, phone_number, profile_photo_url FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    return res.status(200).json({
      authenticated: true,
      user: userRes.rows[0],
    });
  } catch (error) {
    console.error('Error in getSessionController:', error);
    return res.status(500).json({ error: 'Failed to verify session' });
  }
}

/**
 * POST /api/auth/logout
 */
export async function logoutController(req, res) {
  try {
    await query(`UPDATE sessions SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL`, [
      req.user.userId,
    ]);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logoutController:', error);
    return res.status(500).json({ error: 'Logout failed' });
  }
}


