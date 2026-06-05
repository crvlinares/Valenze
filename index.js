import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { handleMessage, handleCallbackQuery } from './botLogic.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token || token.includes('your-telegram-token')) {
  console.error('❌ ERROR: TELEGRAM_BOT_TOKEN no configurado en el archivo .env.');
  process.exit(1);
}

// Inicializar el bot en modo polling (escuchando activamente) - SOLO PARA DESARROLLO LOCAL
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Valenze_bot está activo en modo LOCAL y escuchando mensajes...');

bot.on('message', async (msg) => {
  await handleMessage(bot, msg);
});

bot.on('callback_query', async (callbackQuery) => {
  await handleCallbackQuery(bot, callbackQuery);
});
