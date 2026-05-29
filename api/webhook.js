import TelegramBot from 'node-telegram-bot-api';
import { setupBot } from '../botLogic.js';

// Vercel inyecta las variables de entorno automáticamente si las configuras en su panel
const token = process.env.TELEGRAM_BOT_TOKEN;

// Inicializamos el bot SIN modo polling
const bot = new TelegramBot(token);

// Configuramos los comandos usando nuestra lógica compartida
setupBot(bot);

export default async function handler(req, res) {
  try {
    // Si la solicitud es POST, viene de Telegram
    if (req.method === 'POST') {
      const { body } = req;
      
      // Pasar el body de Telegram a nuestro bot para que lo procese
      bot.processUpdate(body);
      
      return res.status(200).send('OK');
    }
    
    // Si alguien entra a la URL desde un navegador
    return res.status(200).send('Valanze Telegram Bot Webhook is running!');
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).send('Error');
  }
}
