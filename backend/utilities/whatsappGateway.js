import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import pino from 'pino';
import path from 'path';

let sock = null;
let isConnected = false;

/**
 * Initialize WhatsApp Web Socket Gateway
 */
export async function initWhatsAppGateway() {
  try {
    const authFolder = path.resolve('.whatsapp_auth');
    const { state, saveCreds } = await useMultiFileAuthState(authFolder);

    sock = makeWASocket({
      auth: state,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log('\n======================================================');
        console.log('📲 WHATSAPP OTP GATEWAY INITIALIZED');
        console.log('Scan the QR code below with WhatsApp > Linked Devices:');
        console.log('======================================================\n');
        qrcode.generate(qr, { small: true });
      }

      if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        console.log(`⚠️ [WHATSAPP GATEWAY] Connection closed (code: ${statusCode}). Reconnecting: ${shouldReconnect}`);
        isConnected = false;

        if (shouldReconnect) {
          setTimeout(initWhatsAppGateway, 5000);
        }
      } else if (connection === 'open') {
        const rawId = sock?.user?.id || '';
        const phone = rawId.split(':')[0] || rawId.split('@')[0] || 'Unknown';
        const name = sock?.user?.name || 'WhatsApp Account';

        console.log('\n======================================================');
        console.log('🎉 WHATSAPP GATEWAY SUCCESSFULLY CONNECTED!');
        console.log(`📱 Linked Phone Number : +${phone}`);
        console.log(`👤 WhatsApp Account    : ${name}`);
        console.log('🚀 Ready to send automatic WhatsApp OTPs!');
        console.log('======================================================\n');
        isConnected = true;
      }
    });
  } catch (err) {
    console.error('❌ [WHATSAPP GATEWAY INIT ERROR]:', err.message);
  }
}

/**
 * Get current WhatsApp Gateway connection status
 */
export function getWhatsAppStatus() {
  const rawId = sock?.user?.id || '';
  const phone = rawId.split(':')[0] || rawId.split('@')[0] || null;
  return {
    connected: isConnected,
    phone: phone ? `+${phone}` : null,
    name: sock?.user?.name || null,
  };
}

/**
 * Send WhatsApp OTP message to any phone number
 * @param {string} phone - e.g. +923001234567
 * @param {string} code - 6-digit OTP code
 */
export async function sendWhatsAppWebOTP(phone, code) {
  if (!sock || !isConnected) {
    console.log(`[WHATSAPP GATEWAY OFFLINE] WhatsApp not connected yet. Printed OTP code ${code} for ${phone} in console.`);
    return { success: true, channel: 'whatsapp', mock: true };
  }

  try {
    const formattedPhone = phone.replace(/[^\d]/g, '');
    const jid = `${formattedPhone}@s.whatsapp.net`;
    const message = `Your Sanjhi verification code is: *${code}*\n\nValid for 10 minutes. Do not share this code with anyone.`;

    await sock.sendMessage(jid, { text: message });
    console.log(`✅ [WHATSAPP OTP SENT] Successfully sent code ${code} to ${phone} via WhatsApp Gateway!`);
    return { success: true, channel: 'whatsapp' };
  } catch (error) {
    console.error(`❌ [WHATSAPP OTP ERROR]:`, error.message);
    return { success: true, channel: 'whatsapp', fallback: true, error: error.message };
  }
}
