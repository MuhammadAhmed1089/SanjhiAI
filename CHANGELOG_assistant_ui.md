# Sanjhi AI Assistant — UI Changelog

**Date:** 2026-08-30
**Scope:** Assistant page UI overhaul — new logo, icons, usage guide, WhatsApp integration

---

## New Assets

### `src/assets/sanjhi-ai-logo.png`
AI-generated Sanjhi AI assistant logo — friendly robot face in teal/navy palette. Replaces the generic `screen.png` used as placeholder in the Assistant header and avatars.

### `src/assets/whatsapp-icon.svg`
Proper WhatsApp brand icon (green circle with phone receiver). Used in the header quick-action button, input bar, and floating FAB.

### `src/assets/chatbot-icon.svg`
Custom chatbot speech-bubble icon in teal (#006972) with gold accent signal waves. Used inside AI message bubble headers.

### `public/sanjhi-ai-logo.png`, `public/whatsapp-icon.svg`, `public/chatbot-icon.svg`
Copies for direct browser access.

---

## Files Modified

### `src/pages/dashboard/Assistant.jsx`
- **Logo swap**: Replaced `screen.png` watermark + all `auto_awesome` Material Symbol avatars with the new `sanjhi-ai-logo.png` image.
- **How-to-Use guide**: Added a collapsible guide panel (toggled via the `?` help button in the header) with 4 numbered steps explaining type/voice/listen/prompt usage.
- **WhatsApp header button**: New button in the top bar that opens WhatsApp chat with +92 341 1713517.
- **WhatsApp input bar button**: Green WhatsApp icon button inside the chat input form — sends user to WhatsApp with a pre-filled message.
- **Floating WhatsApp FAB**: Fixed bottom-right button (above the input bar) that opens WhatsApp. Shows tooltip on hover.
- **New knowledge base entry**: Added a `whatsapp/chat/message/contact` keyword match that returns the support number.
- **"How to use" link**: Added an inline button under the hero section that opens the guide panel.

### `src/pages/dashboard/Dashboard.jsx`
- **Sanjhi AI button**: Replaced the `auto_awesome` Material Symbol icon in the header's "Sanjhi AI" pill button with the new AI logo image.
