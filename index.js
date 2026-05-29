import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { setupBot } from './botLogic.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token || token.includes('your-telegram-token')) {
  console.error('❌ ERROR: TELEGRAM_BOT_TOKEN no configurado en el archivo .env.');
  process.exit(1);
}

// Inicializar el bot en modo polling (escuchando activamente) - SOLO PARA DESARROLLO LOCAL
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Valanze_bot está activo en modo LOCAL y escuchando mensajes...');

// Configurar todos los comandos y lógica
setupBot(bot);
