# Sanjhi WhatsApp Bot — Implementation Plan

## Overview

Build a fully conversational WhatsApp bot that allows Sanjhi users to interact with
the platform in natural Urdu or English — including voice notes — without opening the web app.
The bot uses Groq function-calling as the "tool layer", Redis for session state,
and plugs directly into the existing baileys gateway and backend APIs.

> [!IMPORTANT]
> **No changes to existing frontend, DB schema, or any existing API routes.**
> All new code lives in `backend/bot/` and hooks into `whatsappGateway.js`.

---

## Scope

### ✅ Allowed via WhatsApp Bot
- View dashboard (trust score, balance, upcoming payouts)
- List my committees
- Create a new committee (via natural language)
- Join a committee by invite code
- View committee details (members, cycle, next payout)
- Submit my own payment (self-reported)
- View my payment history
- File a complaint against a member
- View my complaints and their status
- Get notifications summary

### ❌ Explicitly Blocked
- **Marking another user's payment as paid** (organizer action) — use web app
- **Profile settings changes** (name, photo, email, notification prefs) — use web app
- **Admin actions** — entirely off-limits
- **Releasing payouts** — use web app (financial-critical)

---

## Architecture

```
WhatsApp User (voice note OR text)
         ↓
  baileys sock.ev.on('messages.upsert')   ← hook into existing gateway
         ↓
  bot/messageRouter.js
    Is audio? → bot/stt.js (Groq Whisper) → transcript
    Is text?  → pass through
         ↓
  bot/sessionManager.js (Redis via ioredis)
    Not authenticated → bot/authFlow.js  (state machine)
    Authenticated     → bot/agent.js     (Groq function calling)
         ↓
  bot/tools/index.js  (calls existing /api/* routes with user JWT)
         ↓
  bot/formatter.js  (formats response in detected language)
         ↓
  sock.sendMessage(jid, { text: reply })
```

---

## New File Structure

```
backend/
  bot/
    index.js              ← Entry point, registers listener on existing sock
    messageRouter.js      ← Routes incoming messages to auth flow or agent
    authFlow.js           ← Auth state machine (login / signup OTP flow)
    sessionManager.js     ← Redis session CRUD (ioredis)
    stt.js                ← Groq Whisper speech-to-text
    agent.js              ← Groq LLM with function calling
    formatter.js          ← Language detection + reply formatting
    tools/
      index.js            ← Tool definitions array + executor dispatcher
      dashboard.js        ← get_dashboard tool
      committees.js       ← list_committees, get_committee, create_committee, join_committee
      payments.js         ← get_my_payments, submit_my_payment
      complaints.js       ← file_complaint, get_my_complaints
      notifications.js    ← get_notifications
```

---

## Phase 1 — Dependencies & Environment

### New Packages
```bash
npm install ioredis
npm install fluent-ffmpeg @ffmpeg-installer/ffmpeg
```

### New `.env` Variables
```env
REDIS_URL=redis://localhost:6379
BOT_SESSION_TTL_HOURS=24
BOT_OTP_TIMEOUT_MINUTES=10
```

### Redis Session Schema
```
Key:   "sanjhi:wa_session:+923001234567"
TTL:   86400 seconds (24h, refreshed on every message)

Value (JSON):
{
  "state": "authenticated",
  "jwt": "eyJhbGci...",
  "userId": "uuid",
  "userName": "Ahmed",
  "detectedLang": "ur",
  "pendingOtpPhone": null,
  "otpAttempts": 0,
  "conversationHistory": []
}

States:
  "new"                    → First contact
  "awaiting_choice"        → Waiting for Login / Signup selection
  "awaiting_phone_confirm" → Asked if they want to use their WA number
  "awaiting_custom_phone"  → Asked for a different phone number
  "awaiting_otp"           → OTP sent, waiting for code entry
  "awaiting_name"          → Signup only — asking for full name
  "authenticated"          → Has valid JWT, ready for tool calls
```

---

## Phase 2 — WhatsApp Message Listener Hook

### `backend/bot/index.js`
Exports `registerBotListener(sock)` called once connection is `open`.

**Only change to existing `whatsappGateway.js`** (2 lines after `isConnected = true`):
```js
import { registerBotListener } from '../bot/index.js';
registerBotListener(sock);
```

**Listener filters out:**
- Own messages (bot's own JID)
- Status updates (`status@broadcast`)
- Group messages (`@g.us` JIDs)
- Messages older than 30 seconds (avoids reply-storm on reconnect)

**Extracts:**
- `jid` (sender's phone)
- Message type: `conversation`, `extendedTextMessage`, or `audioMessage`
- Content: text string or audio buffer

---

## Phase 3 — Speech-to-Text Module

### `backend/bot/stt.js`

```
Input:  WhatsApp message object (audioMessage type)
Output: transcribed text string

Pipeline:
  1. downloadMediaMessage(msg) → Buffer (OGG/OPUS)
  2. Write to os.tmpdir()/{uuid}.ogg
  3. fluent-ffmpeg converts .ogg → .mp3
  4. Groq Whisper API call:
       model: "whisper-large-v3"
       file: fs.createReadStream(mp3Path)
       response_format: "text"
       language: undefined (auto-detect)
  5. Cleanup temp files
  6. Return transcript string
```

> [!NOTE]
> `whisper-large-v3` auto-detects Urdu (both Roman script and spoken Nastaliq)
> and English with high accuracy. No language hint needed.

---

## Phase 4 — Session Manager

### `backend/bot/sessionManager.js`

```js
getSession(phone)           → session object | null
createSession(phone, data)  → saves session, sets TTL
updateSession(phone, patch) → merges patch, resets TTL
deleteSession(phone)        → removes key (logout)
refreshTTL(phone)           → extends TTL on every message
incrementOtpAttempts(phone) → returns new attempt count
```

- TTL resets on every incoming message (24h sliding window)
- If inactive 24h → session gone, user must re-login next time they message
- `logout` intent from LLM triggers `deleteSession()`

---

## Phase 5 — Auth Flow State Machine

### `backend/bot/authFlow.js`

Pure deterministic state machine — **no LLM involved** for reliability.
Keyword matching is case-insensitive and handles Urdu script variants.

```
STATE: new / null
  Action: Send bilingual welcome message
  Transition: → "awaiting_choice"

STATE: awaiting_choice
  "1" | "login" | "لاگ ان" | "log in"
    → login path → "awaiting_phone_confirm"
  "2" | "signup" | "register" | "نیا اکاؤنٹ" | "نیا"
    → signup path → "awaiting_name" (ask for full name first)
  anything else → re-send menu

STATE: awaiting_name  [signup only]
  Any text → save as pendingName
  → "awaiting_phone_confirm"

STATE: awaiting_phone_confirm
  "1" | "yes" | "ہاں" | "ha" | "haan"
    → use WA number as phone
    → POST /api/auth/otp/send { phone: waPhone, name: pendingName? }
    → "awaiting_otp"
  "2" | "no" | "نہیں" | "different" | "alag"
    → "awaiting_custom_phone"

STATE: awaiting_custom_phone
  Valid +92xxxxxxxxxx or 03xxxxxxxxx
    → normalize to E.164
    → POST /api/auth/otp/send { phone, name: pendingName? }
    → "awaiting_otp"
  Invalid format → ask again

STATE: awaiting_otp
  6-digit number
    → POST /api/auth/otp/verify { phone: pendingPhone, otp: input }
    ✅ → save JWT, userId, userName → state: "authenticated"
    ❌ → increment attempts
        attempts < 3 → "Wrong code, try again (X attempts left)"
        attempts >= 3 → reset to "new", "Too many attempts. Please start over."
  "resend" | "dobara" | "دوبارہ"
    → POST /api/auth/otp/resend { phone }
    → reset attempts to 0, stay in "awaiting_otp"
```

### Welcome Message
```
🙏 *Sanjhi میں خوش آمدید!*
Welcome to *Sanjhi* — Pakistan's trusted committee savings platform.

آپ کیا کرنا چاہتے ہیں؟ / What would you like to do?

1️⃣ *لاگ ان* / Login
2️⃣ *نیا اکاؤنٹ بنائیں* / Sign Up

_Reply with 1 or 2_
```

### OTP Prompt
```
🔐 آپ کا OTP بھیج دیا گیا ہے۔
Your OTP has been sent to *{phone}*

6 ہندسوں کا کوڈ یہاں لکھیں:
Please enter the 6-digit code:

_Valid for 10 minutes. Type "resend" to get a new code._
```

### Success Message
```
✅ *{userName}، خوش آمدید!*
Welcome back, *{userName}*!

آپ کیا کرنا چاہتے ہیں؟ / What would you like to do?
• میری کمیٹیاں / My committees
• ڈیش بورڈ / Dashboard
• ادائیگی / Payments
• شکایت / File complaint
```

---

## Phase 6 — Groq Function-Calling Agent

### `backend/bot/agent.js`

**Model:** `llama-3.3-70b-versatile`
(supports tool/function calling + strong multilingual performance)

**Conversation History:**
- Last 6 message turns stored in `session.conversationHistory`
- Passed to Groq as `messages` array for multi-turn context
- Enables: "now show me details of the second one" after a list

### System Prompt
```
You are Sanjhi Bot — a bilingual WhatsApp assistant for Sanjhi,
Pakistan's trusted peer-to-peer committee savings platform.

LANGUAGE:
- Detect language from each user message (English, Roman Urdu, or Urdu script)
- Always reply in the SAME language the user used
- Keep replies SHORT and conversational — this is WhatsApp, not a web page
- Use *bold* for names and amounts, _italic_ for hints
- Max 3 emojis per reply

PERSONALITY: Friendly, trustworthy, concise. Always confirm before creating
or joining anything. Ask for missing info naturally.

BLOCKED ACTIONS — if user asks for any of these, politely refuse and say
to use the web app at sanjhi.pk:
- Marking someone else's payment as paid
- Changing profile (name, photo, email, notification settings)
- Any admin actions

TOOL USE: Call the right tool. If required info is missing, ask for it.
After tool result, reply in natural language — do NOT return raw JSON.
```

---

## Phase 7 — Tool Definitions & Executors

### Tools List

| Tool Name | API Endpoint | Method |
|---|---|---|
| `get_dashboard` | `/api/dashboard` | GET |
| `list_my_committees` | `/api/committees` | GET |
| `get_committee_detail` | `/api/committees/:id` | GET |
| `create_committee` | `/api/committees` | POST |
| `join_committee_by_code` | `/api/committees/join` | POST |
| `get_my_payments` | `/api/payments/my` | GET |
| `submit_my_payment` | `/api/committees/:id/cycles/:cycleId/payments` | POST |
| `file_complaint` | `/api/complaints` | POST |
| `get_my_complaints` | `/api/complaints/my` | GET |
| `get_notifications` | `/api/notifications` | GET |
| `logout` | (local session delete) | — |

All tools make internal `fetch` calls to `http://127.0.0.1:3000/api/...`
with `Authorization: Bearer {session.jwt}` header.

### Tool Executor Flow
```js
async function executeTool(toolName, args, session) {
  // 1. Route to correct tool file
  // 2. Make internal API call with session.jwt
  // 3. Return structured result object { success, data, error }
}
```

### `submit_my_payment` Guard
Inside the tool executor, before calling the API, validate:
```js
// Ensure committee_id belongs to the calling user's memberships
// If user is not a member → return error "You are not a member of this committee"
// This is a secondary safety check on top of the system prompt restriction
```

---

## Phase 8 — Formatter & Language Detection

### `backend/bot/formatter.js`

**Detection Logic (priority order):**
1. Urdu Unicode block (`\u0600-\u06FF`) → `"ur"`
2. Roman Urdu keywords: `meri|mera|meri|karo|kia|dikhao|batao|haan|nahi|aur|committee|kamiti` → `"ur-roman"`
3. Default → `"en"`

**Language saved in session** so multi-turn stays consistent
(user says "meri committees dikhao" → next reply also in Roman Urdu even if short).

**WhatsApp Formatting Rules:**
- `*text*` for bold (names, amounts, important info)
- `_text_` for italic (hints, secondary info)
- Bullet points with `•`
- Max 200 words per reply
- English numerals even in Urdu text (Rs. 5,000 not ۵٬۰۰۰)
- No HTML tags

---

## Phase 9 — Guard Rails & Error Handling

### Blocked Action Response
```
⚠️ یہ کام WhatsApp bot سے نہیں کیا جا سکتا۔
This action isn't available on WhatsApp for security.

ویب ایپ استعمال کریں: / Please use the web app:
🌐 *sanjhi.pk*
```

### Rate Limiting (Redis-based)
```
Key: "sanjhi:wa_ratelimit:{phone}"
TTL: 60 seconds
Max: 30 messages per minute

If exceeded:
"⏸️ آہستہ! / Slow down! Please wait a moment before sending more messages."
```

### API Error Handling
```
401 Unauthorized → session.jwt expired → deleteSession() → re-login flow
404 Not Found    → "یہ کمیٹی نہیں ملی / Committee not found"
500 Server Error → "سرور میں مسئلہ / Server error. Please try again."
Network Error    → "کنکشن مسئلہ / Connection issue. Please try again in a moment."
```

### Session Expiry (24h inactive)
```
⏰ آپ کا سیشن ختم ہو گیا۔
Your session has expired.

[Automatically restarts welcome flow]
```

### STT Failure
```
🎤 آواز سمجھ نہیں آئی۔ / Couldn't understand the voice note.
براہ کرم دوبارہ بھیجیں یا text لکھیں۔
Please resend or type your message instead.
```

---

## Phase 10 — Integration into `whatsappGateway.js`

**Only existing file that changes** — two lines added:

```js
// backend/utilities/whatsappGateway.js
// In the connection === 'open' block, after: isConnected = true;

const { registerBotListener } = await import('../bot/index.js');
registerBotListener(sock);
```

Dynamic import ensures bot module only loads after WhatsApp is live.
If bot module has an error, `initWhatsAppGateway()` still completes normally.

---

## Verification Plan

### Unit Tests
- [ ] `stt.js` — send 5s Urdu voice note, verify transcript accuracy
- [ ] `sessionManager.js` — get/set/update/delete/TTL reset in Redis
- [ ] `authFlow.js` — step through all states with mock input
- [ ] Each tool executor — call with real JWT from test account

### Integration Tests
- [ ] Full login: new phone → welcome → OTP → authenticated → dashboard
- [ ] Full signup: new phone → welcome → name → OTP → authenticated
- [ ] Voice (Urdu) → STT → function call → Urdu reply
- [ ] Voice (English) → STT → function call → English reply
- [ ] Multi-turn: "committees" → "tell me about the second one"
- [ ] Blocked action → correct refusal message
- [ ] Wrong OTP ×3 → reset to new state
- [ ] Rate limit trigger → throttle message

### Manual WhatsApp Scenarios
- [ ] Text in English → English reply
- [ ] Text in Roman Urdu → Roman Urdu reply
- [ ] Text in Urdu script → Urdu script reply
- [ ] Voice note in Urdu → correct task performed
- [ ] Voice note in English → correct task performed
- [ ] Create committee by voice → confirmation prompt → created
- [ ] Submit payment → correctly submitted, not organizer-confirming

---

## New Packages Summary

| Package | Purpose |
|---|---|
| `ioredis` | Redis client for session storage |
| `fluent-ffmpeg` | OGG → MP3 audio conversion |
| `@ffmpeg-installer/ffmpeg` | ffmpeg binary bundled for Node |

**Already available (no new installs):**
- Groq Whisper STT → `groq-sdk` ✅
- Groq LLM function calling → `groq-sdk` ✅
- WhatsApp I/O → `@whiskeysockets/baileys` ✅
- Auth & OTP → existing controllers ✅

---

## Timeline Estimate

| Phase | Task | Time |
|---|---|---|
| 1 | Deps, Redis, env | 30 min |
| 2 | Message listener hook | 1 hr |
| 3 | Whisper STT module | 1 hr |
| 4 | Redis session manager | 1 hr |
| 5 | Auth state machine | 2 hrs |
| 6 | Groq agent + system prompt | 1.5 hrs |
| 7 | Tool definitions + executors (all 11 tools) | 3 hrs |
| 8 | Bilingual formatter | 1 hr |
| 9 | Guard rails + error handling | 1 hr |
| 10 | Integration + full testing | 2 hrs |
| **Total** | | **~14 hrs** |
