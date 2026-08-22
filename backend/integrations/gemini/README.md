# Gemini integration

Wraps calls to the Google Gemini API (free tier). Used by three features, each with
an independent manual fallback so a rate-limit/outage on one never blocks another:

- chatbot module (FR-BOT-01) — FAQ/how-to answers
- committees module (FR-CC-02) — natural-language committee setup parsing
- support module (FR-SUPPORT-02) — complaint summary + suggested priority
