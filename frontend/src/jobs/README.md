# Scheduled jobs (cron / queue-based)

- reminders.job.js       — payment due-date reminders (FR-NOTIF-01)
- cycleRollover.job.js   — advance committee to next cycle after full payout (FR-PAYOUT-01)
- riskFlagEval.job.js    — evaluate "At Risk" heuristic ahead of each cycle's due date (FR-TRUST-02)

All jobs should run on a queue-based system per NFR 4.3 (Scalability & Reliability).
