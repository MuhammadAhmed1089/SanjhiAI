import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Setup or reset Firebase Invisible reCAPTCHA Verifier
 * @param {string} containerId - ID of DOM element for recaptcha
 */
export function setupRecaptcha(containerId = 'recaptcha-container') {
  // 1. Clear previous instance if present
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      // Ignore cleanup error
    }
    window.recaptchaVerifier = null;
  }

  // 2. Ensure container inner HTML is cleared to prevent re-render errors
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }

  // 3. Create fresh RecaptchaVerifier instance
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      console.warn('reCAPTCHA expired, clearing verifier');
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          // Ignore
        }
        window.recaptchaVerifier = null;
      }
    },
  });

  return window.recaptchaVerifier;
}

/**
 * Send SMS OTP using Firebase Phone Auth
 * @param {string} phoneNumber - Full phone number in E.164 format (e.g. +923001234567)
 * @param {RecaptchaVerifier} verifier
 * @returns {Promise<import('firebase/auth').ConfirmationResult>}
 */
export async function sendFirebasePhoneOTP(phoneNumber, verifier) {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error('Firebase Phone Auth Error:', error);
    // Reset recaptcha verifier on failure so retries work smoothly
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        // Ignore
      }
      window.recaptchaVerifier = null;
    }
    const container = document.getElementById('recaptcha-container');
    if (container) container.innerHTML = '';
    throw error;
  }
}

