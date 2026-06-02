import TelegramBot from 'node-telegram-bot-api';
import { handleHotelMessage } from '../hotelBotLogic.js';

// Usamos el token fijo proporcionado para la demo
const token = '8521262565:AAG7eoeXZln_ST_mmRku8Fx65zPelcc-2xQ';
const bot = new TelegramBot(token);

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
