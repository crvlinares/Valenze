import TelegramBot from 'node-telegram-bot-api';
import { handleHotelMessage } from '../hotelBotLogic.js';

// Usar variable de entorno, NUNCA hardcodear secretos
const token = process.env.HOTEL_BOT_TOKEN;
const bot = token ? new TelegramBot(token) : null;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    
    if (body.message) {
      await handleHotelMessage(bot, body.message);
    }
    
    return res.status(200).send('OK');
  } else {
    // Si no es POST, enviamos una respuesta básica para verificar que el endpoint funciona
    return res.status(200).send('Webhook del Bot de Demo Hostel Valanze activo.');
  }
}
