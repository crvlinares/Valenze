import TelegramBot from 'node-telegram-bot-api';
import { supabase } from '../db.js';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

export default async function handler(req, res) {
  // Autenticación oficial de Vercel Cron
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send('No autorizado');
  }

  try {
    if (!supabase) {
      return res.status(500).send('Supabase no configurado');
    }

    // 1. Obtener todos los usuarios únicos (Basado en el historial de transacciones)
    const { data: usersData, error: usersError } = await supabase
      .from('transactions')
      .select('telegramId, username');

    if (usersError) throw usersError;

    // Extraer IDs únicos
    const uniqueUsers = [...new Map(usersData.map(item => [item.telegramId, item])).values()];

    // 2. Obtener las transacciones del DÍA DE HOY (Hora UTC, compensada para Perú UTC-5)
    // Para simplificar el MVP, enviaremos el recordatorio a TODOS los usuarios activos 
    // preguntándoles cómo les fue en el día, ya que Vercel Serverless tiene límite de tiempo
    // y hacer consultas complejas por usuario puede excederlo.
    
    let sentCount = 0;
    
    for (const user of uniqueUsers) {
      if (user.telegramId) {
        try {
          const message = `🌙 ¡Buenas noches, ${user.username || 'amigo'}!\n\nPara que no se te escape ni un sol, ¿tuviste algún gasto el día de hoy que olvidaste registrar?\n\n👉 Solo escríbelo aquí abajo (ej. \`cena 20\`). Si no gastaste nada, ¡felicidades por el ahorro! 🎉`;
          
          await bot.sendMessage(user.telegramId, message, { parse_mode: 'Markdown' });
          sentCount++;
        } catch (err) {
          console.error(`Error enviando a ${user.telegramId}:`, err);
          // Si el usuario bloqueó al bot, fallará aquí, pero continuamos con los demás.
        }
      }
    }

    return res.status(200).send(`Recordatorios enviados a ${sentCount} usuarios.`);
  } catch (error) {
    console.error('Error en cron job:', error);
    return res.status(500).send('Error ejecutando cron');
  }
}
