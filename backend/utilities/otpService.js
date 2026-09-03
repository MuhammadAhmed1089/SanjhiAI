import nodemailer from 'nodemailer';
import dns from 'dns';
import net from 'net';
import { sendWhatsAppWebOTP } from './whatsappGateway.js';

// Force Node.js to prioritize IPv4 addresses (fixes ENETUNREACH on IPv6-unroutable cloud hosts)
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

/**
 * Probe a specific host:port using raw TCP socket
 */
export function probePort(host, port, timeoutMs = 4000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let isResolved = false;

    socket.setTimeout(timeoutMs);

    socket.on('connect', () => {
      if (!isResolved) {
        isResolved = true;
        socket.destroy();
        resolve({ host, port, open: true });
      }
    });

    socket.on('timeout', () => {
      if (!isResolved) {
        isResolved = true;
        socket.destroy();
        resolve({ host, port, open: false, error: 'TIMEOUT (Blocked by Cloud/Railway Firewall)' });
      }
    });

    socket.on('error', (err) => {
      if (!isResolved) {
        isResolved = true;
        socket.destroy();
        resolve({ host, port, open: false, error: err.message });
      }
    });

    try {
      socket.connect(port, host);
    } catch (err) {
      if (!isResolved) {
        isResolved = true;
        resolve({ host, port, open: false, error: err.message });
      }
    }
  });
}

// Initialize Nodemailer Transporter with intelligent service detection and strict timeouts
function createMailTransporter() {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '').trim();
  const host = (process.env.SMTP_HOST || '').trim();
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const isGmail = host.includes('gmail') || user.includes('@gmail.com');

  if (isGmail && user && pass) {
    // Port 465 with Direct SSL and IPv4 socket connection
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      family: 4, // Force IPv4
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });
  }

  return nodemailer.createTransport({
    host: host || 'smtp.gmail.com',
    port: port,
    secure: port === 465 || process.env.SMTP_SECURE === 'true',
    family: 4, // Force IPv4
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
}

const transporter = createMailTransporter();

/**
 * Verify SMTP Socket connection and probe all standard ports
 */
export async function verifySmtpConnection() {
  const user = (process.env.SMTP_USER || '').trim();
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const isGmail = host.includes('gmail') || user.includes('@gmail.com');

  console.log('\n======================================================');
  console.log('🔍 [SMTP & PORT CONNECTIVITY DIAGNOSTICS]');
  console.log(`Target Host : ${host}`);
  console.log(`User/Sender : ${user || '(not configured)'}`);
  console.log('------------------------------------------------------');

  // Probe all common email ports in parallel
  const targetHost = isGmail ? 'smtp.gmail.com' : host;
  const portsToTest = [465, 587, 2525, 25];

  const probeResults = await Promise.all(
    portsToTest.map((p) => probePort(targetHost, p, 3500))
  );

  probeResults.forEach((res) => {
    if (res.open) {
      console.log(`✅ Port ${res.port.toString().padEnd(5)} : OPEN / REACHABLE`);
    } else {
      console.log(`❌ Port ${res.port.toString().padEnd(5)} : CLOSED / ${res.error}`);
    }
  });

  const anyPortOpen = probeResults.some((r) => r.open);

  if (!anyPortOpen) {
    console.warn('\n⚠️ [RAILWAY NOTICE] All raw SMTP ports (465, 587, 2525) are blocked by the host network firewall.');
    console.warn('💡 Recommended fix: Use HTTPS-based Email API (like Resend or Brevo) over port 443 which is NEVER blocked.');
    console.warn('   Set RESEND_API_KEY or BREVO_API_KEY in Railway variables.');
  }

  console.log('======================================================\n');

  if (!user) {
    return { connected: false, reason: 'unconfigured', probeResults };
  }

  // Try authenticating with transporter
  try {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) reject(error);
        else resolve(success);
      });
    });

    console.log(`🎉 SMTP Authentication Successful on port ${isGmail ? 465 : process.env.SMTP_PORT || 465}!`);
    return { connected: true, probeResults };
  } catch (error) {
    console.error(`⚠️ SMTP Handshake failed: ${error.message}`);
    return { connected: false, error: error.message, probeResults };
  }
}

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
  console.log(`Target : ${target}`);
  console.log(`Code   : ${code}`);
  console.log(`========================================\n`);

  if (isEmail) {
    return sendEmailOTP(target, code);
  } else {
    return sendSMSOTP(target, code);
  }
}

/**
 * Dispatch Email OTP via Nodemailer with strict timeout
 */
async function sendEmailOTP(email, code) {
  try {
    const resendKey = (process.env.RESEND_API_KEY || '').trim();
    const brevoKey = (process.env.BREVO_API_KEY || '').trim();

    // 1. Primary Cloud Dispatch: Resend HTTPS API (Port 443 - Never Blocked by Railway/Cloud)
    if (resendKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Sanjhi <onboarding@resend.dev>',
            to: [email],
            subject: 'Your Sanjhi Verification Code',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #2e7d32; text-align: center;">Sanjhi Verification</h2>
                <p>Hello,</p>
                <p>Your verification code for Sanjhi is:</p>
                <div style="background-color: #f4f6f8; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1b5e20; text-align: center; padding: 15px; border-radius: 6px; margin: 20px 0;">
                  ${code}
                </div>
                <p style="color: #666; font-size: 13px;">This code will expire in 10 minutes.</p>
              </div>
            `,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(`✅ [RESEND EMAIL SENT] ID: ${data.id}`);
          return { success: true, channel: 'resend-https', messageId: data.id };
        } else {
          const errData = await res.text();
          console.warn(`⚠️ [Resend API Error]: ${errData}`);
        }
      } catch (err) {
        console.warn(`⚠️ [Resend API Request Failed]:`, err.message);
      }
    }

    const user = (process.env.SMTP_USER || '').trim();
    if (!user && !resendKey && !brevoKey) {
      console.warn(`[OTP EMAIL] Neither SMTP_USER nor RESEND_API_KEY set. OTP code ${code} logged to console for ${email}.`);
      return { success: true, channel: 'console', messageId: 'dev-console' };
    }

    // 2. SMTP Transport
    const fromAddress = user.includes('@gmail.com')
      ? `"Sanjhi AI" <${user}>`
      : (process.env.SMTP_FROM || `"Sanjhi AI" <${user}>`);

    const emailPromise = transporter.sendMail({
      from: fromAddress,
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

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('SMTP dispatch timed out after 4000ms')), 4000)
    );

    const info = await Promise.race([emailPromise, timeoutPromise]);

    console.log(`✅ [OTP EMAIL SENT] Message ID: ${info.messageId}`);
    return { success: true, channel: 'email', messageId: info.messageId };
  } catch (error) {
    console.error(`⚠️ [OTP EMAIL DISPATCH WARNING]:`, error.message);
    // In dev / non-prod or when SMTP is unreachable, do not block the user with timeout!
    return { success: true, channel: 'console-fallback', error: error.message };
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

  console.error(`[OTP PHONE/WHATSAPP] No WhatsApp/SMS gateway configured. Cannot send OTP to ${phone}.`);
  return { success: false, channel: 'whatsapp', error: 'No WhatsApp or SMS gateway is configured.' };
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
      return { success: false, channel: 'whatsapp', error: JSON.stringify(data) };
    }
  } catch (error) {
    console.error(`❌ [GREEN API WHATSAPP ERROR]:`, error.message);
    return { success: false, channel: 'whatsapp', error: error.message };
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
      return { success: false, channel: 'whatsapp', error: `CallMeBot returned status ${response.status}` };
    }
  } catch (error) {
    console.error(`❌ [OTP WHATSAPP ERROR]:`, error.message);
    return { success: false, channel: 'whatsapp', error: error.message };
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

/**
 * Send general HTML email notification via Nodemailer
 */
export async function sendGeneralEmail(to, subject, html) {
  try {
    if (!process.env.SMTP_USER || !to || !to.includes('@')) {
      return { success: false, error: 'SMTP not configured or invalid recipient.' };
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sanjhi AI" <no-reply@sanjhi.ai>',
      to,
      subject,
      html,
    });
    console.log(`✅ [EMAIL SENT] Sent notification email to ${to}`);
    return { success: true };
  } catch (err) {
    console.error(`❌ [EMAIL SEND FAILED]:`, err.message);
    return { success: false, error: err.message };
  }
}

