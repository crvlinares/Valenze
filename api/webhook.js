import TelegramBot from 'node-telegram-bot-api';
import { handleMessage, handleCallbackQuery } from '../botLogic.js';

// Vercel inyecta las variables de entorno automáticamente si las configuras en su panel
const token = process.env.TELEGRAM_BOT_TOKEN;

// Inicializamos el bot SIN modo polling
const bot = new TelegramBot(token);

const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 20;

function isRateLimited(telegramId) {
  if (!telegramId) return false;
  const now = Date.now();
  if (!rateLimitCache.has(telegramId)) {
    rateLimitCache.set(telegramId, { count: 1, startTime: now });
    return false;
  }
  const data = rateLimitCache.get(telegramId);
  if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitCache.set(telegramId, { count: 1, startTime: now });
    return false;
  }
  data.count++;
  return data.count > MAX_REQUESTS_PER_WINDOW;
}

export default async function handler(req, res) {
  try {
    // Si la solicitud es POST, viene supuestamente de Telegram
    if (req.method === 'POST') {
      
      // Seguridad: Validar que el webhook realmente venga de nuestro bot de Telegram
      const secretToken = req.headers['x-telegram-bot-api-secret-token'];
      if (process.env.TELEGRAM_SECRET_TOKEN && secretToken !== process.env.TELEGRAM_SECRET_TOKEN) {
        console.error('Intento de webhook no autorizado detectado.');
        return res.status(401).send('Unauthorized');
      }

      const update = req.body;
      
      if (update.message) {
        const telegramId = update.message.from?.id;
        
        // Anti-Spam: Rate Limiting
        if (isRateLimited(telegramId)) {
          console.warn(`Rate limit excedido para el usuario ${telegramId}`);
          return res.status(429).send('Too Many Requests');
        }

        await handleMessage(bot, update.message);
      } else if (update.callback_query) {
        await handleCallbackQuery(bot, update.callback_query);
      }
      
      return res.status(200).send('OK');
    }
    
    // Si alguien entra a la URL desde un navegador
    return res.status(200).send('Valanze Telegram Bot Webhook is running perfectly!');
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).send('Error');
  }
}
