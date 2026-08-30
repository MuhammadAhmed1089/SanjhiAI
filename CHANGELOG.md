# Changelog

## 2026-08-30 — Public Marketplace Exclude Own Committees

### Fixed
- **Public committees no longer list committees the user already belongs to**
  - `backend/controller/committeeController.js` `getPublicCommittees` now excludes committees where the current user is the organizer, a co-organizer, or an approved/pending member.
  - `joinByCode` now rejects join requests with a clear error if the user is already part of the committee.

## 2026-08-30 — OTP Production Dispatch & Remove Dev Screen Navigator

### Fixed
- **Sign in with code no longer runs in dev/mock mode**
  - Removed `devCode` display from `OTPVerification`, `LoginForm`, `SignUpForm`, `ForgotPassword`, and `Profile` add-contact flow.
  - Frontend no longer pre-fills or surfaces any dev/testing OTP code.

### Changed
- **Backend OTP dispatch now requires a real channel**
  - `backend/utilities/otpService.js` and `backend/utilities/whatsappGateway.js` return `success: false` when no SMTP/WhatsApp gateway is available instead of silently mocking.
  - `backend/controller/authController.js` returns a `500` error to the client when OTP dispatch fails, so the UI shows a clear failure message instead of pretending the code was sent.
  - Removed `devCode` from `sendOTPController` and `sendContactOTPController` responses.

### Removed
- **Floating dev screen navigator**
  - Removed `ScreenNav` (plus/dashboard FAB) from `src/App.jsx` so it no longer appears on every screen.

## 2026-08-30 — Public Committees & CNIC Verification

### Added
- **Public committee marketplace**
  - New `/committees/public` page to discover and request to join public savings pools.
  - Category filters, search, and public committee cards.
  - Dashboard quick action, bottom-nav "Explore" tab, and lazy-loaded route.
- **CNIC verification flow**
  - `CnicVerificationModal` component for entering CNIC number and uploading front/back images.
  - Backend endpoints `POST /api/auth/cnic/submit` and `GET /api/auth/cnic/status`.
  - Authenticated image serving at `GET /api/uploads/cnic/:filename` (admin-or-self access).
- **Admin CNIC verification panel**
  - New `/admin/cnic-verification` page listing pending submissions.
  - Approve/reject workflow with rejection reason and in-app notifications.
  - Admin sidebar and mobile nav CNIC entry.
- **Public/private committee toggle**
  - Organizer can request to toggle visibility.
  - Immediate toggle when no co-organizer exists; pending approval workflow when co-organizers exist.
  - New backend endpoints `POST /api/committees/:id/request-public-toggle` and `POST /api/committees/:id/approve-public-toggle`.
- **Committee creation public fields**
  - "List on Public Marketplace" toggle, category dropdown, description, and rules fields.

### Changed
- `database/DDL/sanjhiAI_DDL.sql`
  - Added CNIC columns to `users` and public marketplace columns to `committees`.
  - Extended `notification_type` enum with `cnic_verified`, `cnic_rejected`, `public_toggle_request`, `public_toggle_approved`.
  - Updated `admin_action_type` enum to uppercase values including `VERIFY_CNIC` and `REJECT_CNIC`.
- `backend/controller/adminController.js`
  - Replaced hardcoded `true AS cnic_verified` with real `cnic_status` and added CNIC admin controllers.
- `backend/controller/committeeController.js`
  - `createCommittee` now accepts `is_public`, `category`, `description`, `rules`.
  - `joinByCode` enforces `cnic_status === 'verified'` for public committees and returns `CNIC_REQUIRED` error.
  - Join requests now include `cnic_status` for badge display.
- `backend/server.js`
  - Added runtime migrations for public committee columns, CNIC columns, and notification/admin enum values.
- `src/pages/admin/AdminUsers.jsx`
  - Added CNIC status filters, badges, and details in user modal.
- `src/pages/committee/JoinCommittee.jsx`
  - Handles `CNIC_REQUIRED` by opening the CNIC verification modal.

### Security
- CNIC images are stored on disk but served only through an authenticated endpoint; not exposed via the public `/uploads` static mount.
- Multer file filter restricts CNIC uploads to JPEG/PNG/WebP, max 5 MB per file.
