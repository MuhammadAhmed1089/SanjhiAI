# Sanjhi — Web

React web app. Screens map to SRS Section 6 (Dashboard, Committees, Support, Profile,
plus a separate Admin console).

- src/features/  — one folder per functional area (auth, committees, invitations,
  payments, trust, support, admin), matching backend/src/modules for consistency.
- src/components/ — shared/presentational components (ledger status chips, committee
  cards, etc).
- src/services/  — API client wrappers.
