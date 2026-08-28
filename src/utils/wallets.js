/**
 * wallets.js — Wallet app deep linking + clipboard helpers.
 *
 * Neither JazzCash nor EasyPaisa documents public deep-link parameters for
 * pre-filling a money transfer from a third-party web page, so the reliable
 * pattern is: open the wallet app directly (Android intent URL with a Play
 * Store fallback; iOS custom scheme) and give the user one-tap copy for the
 * account number / amount. Package names below should be re-verified on a
 * real device if an app update changes them.
 */

export const WALLETS = {
  jazzcash: {
    label: 'JazzCash',
    scheme: 'jazzcash',
    androidPackage: 'com.techlogix.mobilinkcustomer',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.techlogix.mobilinkcustomer',
    brandColor: '#c8102e',
  },
  easypaisa: {
    label: 'EasyPaisa',
    scheme: 'easypaisa',
    androidPackage: 'pk.com.telenor.phoenix',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=pk.com.telenor.phoenix',
    brandColor: '#00a651',
  },
  bank: {
    label: 'Bank Transfer',
    scheme: null,
    androidPackage: null,
    playStoreUrl: null,
    brandColor: '#006972',
  },
};

export function getWallet(accountType) {
  const key = String(accountType || '').toLowerCase();
  if (key.includes('easy')) return WALLETS.easypaisa;
  if (key.includes('bank')) return WALLETS.bank;
  return WALLETS.jazzcash;
}

export function detectPlatform() {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document)) return 'ios';
  return 'desktop';
}

/**
 * Android Chrome intent URL. If the app is installed it opens; otherwise
 * Chrome falls back to browser_fallback_url (the Play Store listing).
 */
export function buildAndroidIntentUrl(wallet) {
  if (!wallet?.androidPackage) return null;
  const fallback = encodeURIComponent(wallet.playStoreUrl);
  return `intent://#Intent;scheme=${wallet.scheme};package=${wallet.androidPackage};S.browser_fallback_url=${fallback};end`;
}

/**
 * Open the wallet app on the current device.
 * Returns 'opened' | 'fallback' | 'unavailable' so the caller can show a hint.
 */
export function openWalletApp(wallet) {
  if (!wallet?.scheme) return 'unavailable';
  const platform = detectPlatform();

  if (platform === 'android') {
    const intentUrl = buildAndroidIntentUrl(wallet);
    if (intentUrl) {
      window.location.href = intentUrl;
      return 'opened';
    }
    return 'unavailable';
  }

  if (platform === 'ios') {
    // No way to detect installation reliably; attempt the scheme. If the app
    // is missing iOS shows its own "cannot open" dialog — acceptable here.
    window.location.href = `${wallet.scheme}://`;
    return 'opened';
  }

  return 'unavailable';
}

/**
 * Copy text to the clipboard with a fallback for browsers / contexts where
 * the async Clipboard API is unavailable (non-secure origins, older WebViews).
 */
export async function copyText(text) {
  const value = String(text ?? '');
  if (!value) return false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // fall through to legacy path
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
