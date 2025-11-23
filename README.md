# Telegram Dice

A simple Telegram bot that **automatically rolls dice**, stores results, and calculates the **average score** on request.

> Built with Node.js and `node-telegram-bot-api`.

---

## ✅ Features

- 🎲 Automatically rolls dice every few seconds
- 📥 Stores all dice values in an array
- 📊 Shows roll count, total sum & average
- ▶️ `/start` — begin auto dice rolling
- ⏹ `/stop` — stop rolling & show final stats
- 📈 `/result` — instantly view current stats

---

## 📦 Requirements

- Node.js 16+
- Telegram Bot Token from [@BotFather](https://t.me/BotFather)

---

## 🔧 Installation

```bash
git clone <repo-url>
cd dice
npm install
```

Create a `.env` file:

```env
BOT_TOKEN=your_telegram_bot_token_here
```

---

## 🚀 Start the bot

```bash
node index.js
```

---

## 🧠 How it works

- Bot uses `setInterval()` to roll dice continuously
- Each result is pushed into an array
- `/result` or `/stop` calculates:
  - total rolls
  - sum of values
  - average value

---

## 📁 Project Structure

```
dice/
├─ index.js
├─ .env
├─ package.json
└─ node_modules/
```

---

## ✅ Example Commands

| Command  | Description |
|----------|-------------|
| `/start` | Start auto dice rolling |
| `/result`| Show stats & average |
| `/stop`  | Stop and display final results |

---

## 📝 License

Free to use, modify, and improve 🎯

---

Happy rolling! 🎲😄
