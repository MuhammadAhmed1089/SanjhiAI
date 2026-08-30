# Sanjhi WhatsApp Bot — Implementation Changelog

**Date:** 2026-08-30
**Scope:** WhatsApp conversational bot (implementation_plan.md)

---

## Files Created (13 new files)

### `backend/bot/index.js`
Entry point — exports `registerBotListener(sock)` that hooks into baileys `messages.upsert` event.

### `backend/bot/messageRouter.js`
Routes incoming WhatsApp messages:
- Filters out own messages, status broadcasts, group messages, and stale messages (>30s)
- Handles voice notes via STT, text messages directly
- Routes to auth flow (unauthenticated) or Groq agent (authenticated)
- Implements rate limiting (30 msg/min via Redis)

### `backend/bot/authFlow.js`
Deterministic state machine for login/signup OTP flow (no LLM):
- States: new → awaiting_choice → awaiting_name/awaiting_phone_confirm → awaiting_otp → authenticated
- Supports bilingual input (Urdu script, Roman Urdu, English)
- Sends OTP via existing `/api/auth/otp/send` endpoint
- Verifies via `/api/auth/otp/verify` and stores JWT in Redis session
- For signup: collects name, then updates profile via PUT after verification

### `backend/bot/sessionManager.js`
Redis session CRUD using ioredis:
- Session key: `sanjhi:wa_session:{phone}`, 24h sliding TTL
- Rate limiting key: `sanjhi:wa_ratelimit:{phone}`, 60s window, 30 msg max
- Functions: getSession, createSession, updateSession, deleteSession, refreshTTL, incrementOtpAttempts, checkRateLimit

### `backend/bot/stt.js`
Speech-to-text via Groq Whisper:
- Downloads WhatsApp audio (OGG/OPUS) via baileys `downloadMediaMessage`
- Converts OGG → MP3 via fluent-ffmpeg
- Transcribes with `whisper-large-v3` model
- Cleans up temp files

### `backend/bot/agent.js`
Groq function-calling agent using `llama-3.3-70b-versatile`:
- System prompt enforces bilingual replies, WhatsApp formatting, blocked actions
- Up to 3 tool-call turns per user message
- Maintains last 12 messages (6 turns) in session conversationHistory
- Handles SESSION_EXPIRED responses by triggering re-login flow

### `backend/bot/formatter.js`
Language detection and formatting utilities:
- Detects: Urdu script (Unicode range), Roman Urdu (keyword matching), English (default)
- Amount formatting: `Rs. X,XXX` (PK locale)
- Date formatting, word truncation (max 200 words)

### `backend/bot/tools/index.js`
Tool definitions array (11 tools for Groq function-calling) + executor dispatcher:
- get_dashboard, list_my_committees, get_committee_detail, create_committee, join_committee_by_code
- get_my_payments, submit_my_payment, file_complaint, get_my_complaints, get_notifications, logout

### `backend/bot/tools/dashboard.js`
Calls `GET /api/dashboard` with user JWT.

### `backend/bot/tools/committees.js`
Calls committee endpoints:
- `GET /api/committees` — list user's committees
- `GET /api/committees/:id` — committee detail
- `POST /api/committees` — create committee
- `POST /api/committees/join` — join by invite code

### `backend/bot/tools/payments.js`
Calls payment endpoints:
- `GET /api/payments/my` — payment history + upcoming dues
- `POST /api/committees/:id/cycles/:cycleId/payments` — submit self-reported payment

### `backend/bot/tools/complaints.js`
Calls complaint endpoints:
- `POST /api/complaints` — file complaint
- `GET /api/complaints/my` — user's complaints

### `backend/bot/tools/notifications.js`
Calls `GET /api/notifications` for user's recent notifications.

---

## Files Modified (3 files)

### `backend/utilities/whatsappGateway.js`
- Made `connection.update` callback `async`
- Added try-catch wrapped dynamic import of bot module + `registerBotListener(sock)` call after `isConnected = true`
- If bot module fails, gateway still functions normally (OTP sending unaffected)

### `.env`
Added 3 new variables:
```
REDIS_URL=redis://localhost:6379
BOT_SESSION_TTL_HOURS=24
BOT_OTP_TIMEOUT_MINUTES=10
```

### `backend/.envexample`
Added same 3 new variables for documentation.

---

## No Changes Made To
- Frontend (src/)
- Database schema
- Existing API routes or controllers
- Existing JWT utilities
- Existing OTP service
- Package.json (all deps already present: ioredis, fluent-ffmpeg, @ffmpeg-installer/ffmpeg, groq-sdk, baileys)

---

## Prerequisites to Run
1. **Redis** must be running locally (or at REDIS_URL)
2. **GROQ_API_KEY** must be set in .env
3. WhatsApp must be linked (scan QR on startup)

---

## Bug Fixes — 2026-08-30

### Fix 1: Auth flow stuck on welcome message
**File:** `backend/bot/authFlow.js`
**Issue:** Session was created with `state: 'new'` and never transitioned to `'awaiting_choice'`. Every subsequent message re-entered the "new" branch and re-sent the welcome message.
**Fix:** `createSession(phone, { state: 'awaiting_choice' })` — session starts directly in awaiting_choice state.

### Fix 2: Phone number not extracted from sender (LID JID resolution)
**File:** `backend/bot/messageRouter.js`
**Issue:** Baileys v7 uses LID-based JIDs (e.g., `12345@lid`) instead of phone-based JIDs. The old `extractPhone()` would return the LID number, not the real phone.
**Fix:** Added LID resolution via `.whatsapp_auth/lid-mapping-{LID}_reverse.json` files with in-memory cache.

### Fix 3: End session command added
**File:** `backend/bot/messageRouter.js`
**Issue:** No way for users to reset their bot session once authenticated.
**Fix:** Added `isEndSessionCommand()` check. Keywords: "end session", "end", "reset", "restart", "start over", "ختم", "بند", "khatam", "band karo", "dobara shuru". Deletes Redis session and shows farewell message.
