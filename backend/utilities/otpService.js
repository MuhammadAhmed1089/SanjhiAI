import nodemailer from 'nodemailer';
import { sendWhatsAppWebOTP } from './whatsappGateway.js';

// Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

/**
 * Generate a random 6-digit numeric OTP code.
 */
export function generateOTPCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP via Email or SMS based on target type.
 * @param {string} target - Email address or Phone number
 * @param {string} code - 6-digit OTP code
 */
export async function sendOTP(target, code) {
  const isEmail = target.includes('@');

  console.log(`\n========================================`);
  console.log(`🔑 [OTP DISPATCH SERVICE]`);
  console.log(`Target: ${target}`);
  console.log(`Code: ${code}`);
  console.log(`========================================\n`);

  if (isEmail) {
    return sendEmailOTP(target, code);
  } else {
    return sendSMSOTP(target, code);
  }
}

/**
 * Dispatch Email OTP via Nodemailer
 */
async function sendEmailOTP(email, code) {
  try {
    if (!process.env.SMTP_USER) {
      console.log(`[OTP EMAIL MOCK] SMTP_USER not set. Email code ${code} printed to console for ${email}.`);
      return { success: true, channel: 'email', mock: true };
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sanjhi AI" <no-reply@sanjhi.ai>',
      to: email,
      subject: 'Your Sanjhi Verification Code',
      text: `Your Sanjhi verification code is: ${code}. It expires in 10 minutes. Do not share this with anyone.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2e7d32; text-align: center;">Sanjhi Verification</h2>
          <p>Hello,</p>
          <p>Your verification code for Sanjhi is:</p>
          <div style="background-color: #f4f6f8; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1b5e20; text-align: center; padding: 15px; border-radius: 6px; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #666; font-size: 13px;">This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
        </div>
      `,
    });

    console.log(`✅ [OTP EMAIL SENT] Message ID: ${info.messageId}`);
    return { success: true, channel: 'email', messageId: info.messageId };
  } catch (error) {
    console.error(`❌ [OTP EMAIL FAILED]:`, error.message);
    // Fallback so application flow does not hard break in local dev without SMTP
    return { success: true, channel: 'email', fallback: true, error: error.message };
  }
}

/**
 * Dispatch Phone OTP via Self-Hosted WhatsApp Gateway, Green API, CallMeBot, or Twilio
 */
async function sendSMSOTP(phone, code) {
  // 1. Primary: Send via Self-Hosted WhatsApp Web Gateway
  const gatewayResult = await sendWhatsAppWebOTP(phone, code);
  if (gatewayResult && !gatewayResult.mock) {
    return gatewayResult;
  }

  // 2. If Green API credentials are configured, send via Green API WhatsApp
  if (process.env.GREEN_API_ID_INSTANCE && process.env.GREEN_API_API_TOKEN_INSTANCE) {
    return sendGreenAPIWhatsAppOTP(phone, code);
  }

  // 3. If CallMeBot API key is configured, send via CallMeBot WhatsApp
  if (process.env.CALLMEBOT_API_KEY) {
    return sendWhatsAppOTP(phone, code);
  }

  console.log(`[OTP PHONE/WHATSAPP MOCK] Printed OTP code ${code} for ${phone} in console.`);
  return { success: true, channel: 'whatsapp', mock: true };
}

/**
 * Dispatch WhatsApp OTP via Green API
 */
async function sendGreenAPIWhatsAppOTP(phone, code) {
  try {
    const formattedPhone = phone.replace(/[^\d]/g, '');
    const idInstance = process.env.GREEN_API_ID_INSTANCE;
    const apiTokenInstance = process.env.GREEN_API_API_TOKEN_INSTANCE;
    const host = (process.env.GREEN_API_HOST || 'https://api.green-api.com').replace(/\/$/, '');

    const url = `${host}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${formattedPhone}@c.us`,
        message: `Your Sanjhi verification code is: ${code}. Valid for 10 minutes. Do not share this code with anyone.`,
      }),
    });

    const data = await response.json();
    if (response.ok && data.idMessage) {
      console.log(`✅ [GREEN API WHATSAPP SENT] Message ID: ${data.idMessage} to ${phone}`);
      return { success: true, channel: 'whatsapp', idMessage: data.idMessage };
    } else {
      console.error(`❌ [GREEN API WHATSAPP FAILED] Status: ${response.status}`, data);
      return { success: true, channel: 'whatsapp', fallback: true, error: JSON.stringify(data) };
    }
  } catch (error) {
    console.error(`❌ [GREEN API WHATSAPP ERROR]:`, error.message);
    return { success: true, channel: 'whatsapp', fallback: true, error: error.message };
  }
}

/**
 * Dispatch WhatsApp OTP via CallMeBot Free API
 */
async function sendWhatsAppOTP(phone, code) {
  try {
    const formattedPhone = phone.replace(/[^\d]/g, '');
    const apiKey = process.env.CALLMEBOT_API_KEY;
    const message = encodeURIComponent(`Your Sanjhi verification code is: ${code}. Valid for 10 minutes.`);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${formattedPhone}&text=${message}&apikey=${apiKey}`;

    const response = await fetch(url);
    if (response.ok) {
      console.log(`✅ [OTP WHATSAPP SENT] Code ${code} sent via WhatsApp to ${phone}`);
      return { success: true, channel: 'whatsapp' };
    } else {
      console.error(`❌ [OTP WHATSAPP FAILED] CallMeBot status: ${response.status}`);
      return { success: true, channel: 'whatsapp', fallback: true };
    }
  } catch (error) {
    console.error(`❌ [OTP WHATSAPP ERROR]:`, error.message);
    return { success: true, channel: 'whatsapp', fallback: true, error: error.message };
  }
}


/**
 * Send Login Confirmation Email via Nodemailer
 */
export async function sendLoginNotificationEmail(email, userName) {
  try {
    if (!process.env.SMTP_USER || !email || !email.includes('@')) return;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sanjhi AI" <no-reply@sanjhi.ai>',
      to: email,
      subject: 'Security Alert: Successful Login to Sanjhi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2e7d32; text-align: center;">Sanjhi Login Notification</h2>
          <p>Hello <strong>${userName || 'User'}</strong>,</p>
          <p>You have successfully logged in to your Sanjhi account.</p>
          <p style="color: #666; font-size: 13px; margin-top: 20px;">If this was not you, please secure your account immediately.</p>
        </div>
      `,
    });
    console.log(`✅ [LOGIN EMAIL SENT] Sent login confirmation email to ${email}`);
  } catch (err) {
    console.error(`❌ [LOGIN EMAIL FAILED]:`, err.message);
  }
}

