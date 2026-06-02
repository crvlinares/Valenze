# Valanze - Conversational Finance Assistant 💸

> A frictionless, chat-based personal finance tracker built on top of the Telegram API. Valanze replaces complex spreadsheets and heavy mobile apps with natural language inputs.

## 🚀 The Problem & Solution
Tracking personal expenses shouldn't feel like a second job. Traditional apps suffer from high drop-off rates because opening an app, finding a category, and typing a number creates too much friction.
**Valanze** solves this by living where users already spend their time: chat apps. By sending a simple message like `15 lunch` or `+500 salary`, the bot instantly parses, categorizes, and updates the user's financial balance.

## 🛠️ Tech Stack
*   **Platform:** Node.js
*   **Interface:** Telegram Bot API (via `node-telegram-bot-api`)
*   **Database:** Supabase (PostgreSQL)
*   **Deployment:** Vercel (Serverless Functions)

## 🏗️ Architecture
Valanze uses a **Hybrid Architecture** to maximize development speed and production scalability:
1.  **Local Development:** Uses Long Polling (`botLogic.js` and `index.js`) for instant feedback and debugging without needing ngrok or public URLs.
2.  **Production:** Uses a Webhook approach (`api/webhook.js`) deployed on Vercel Serverless Functions. The bot only consumes compute resources when a user sends a message, ensuring costs remain at exactly $0 during the initial scaling phase.

## ⚙️ Features
*   **Natural Language Parsing:** Auto-detects income (`+`, `ingreso`, `sueldo`) vs expenses based on contextual keywords.
*   **Interactive UI:** Uses Telegram Inline Keyboards for one-tap actions (e.g., Undo last transaction).
*   **Automated Retention (CRON):** Daily serverless CRON jobs ping inactive users at 8:30 PM to remind them to log their expenses.
*   **Admin Dashboard:** Secret Telegram commands (`/admin_stats`) for real-time global KPIs (DAUs, Transaction Volume) without needing an external web panel.

## 📚 Technical & Commercial Audit
For investors, technical auditors, or contributors, please read the full Due Diligence document:
👉 [Read the Technical & Commercial Audit (TECHNICAL_AUDIT.md)](TECHNICAL_AUDIT.md)

## 💻 Local Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with `TELEGRAM_BOT_TOKEN`, `SUPABASE_URL`, and `SUPABASE_KEY`.
4. Run `node index.js` to start local polling.
