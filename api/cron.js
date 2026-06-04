import TelegramBot from 'node-telegram-bot-api';
import { getAdminClient } from '../db.js';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

export default async function handler(req, res) {
  // Autenticación oficial de Vercel Cron
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send('No autorizado');
  }

  try {
    const adminClient = getAdminClient();
    if (!adminClient) {
      return res.status(500).send('Supabase no configurado');
    }

    // 1. Obtener todos los usuarios únicos (Basado en el historial de transacciones)
    const { data: usersData, error: usersError } = await adminClient
      .from('transactions')
      .select('telegram_id, telegram_username');

    if (usersError) throw usersError;

    // Extraer IDs únicos
    const uniqueUsers = [...new Map(usersData.map(item => [item.telegram_id, item])).values()];

    let sentCount = 0;
    
    for (const user of uniqueUsers) {
      if (user.telegram_id) {
        try {
          const message = `🌙 ¡Buenas noches, ${user.telegram_username || 'amigo'}!\n\nPara que no se te escape ni un sol, ¿tuviste algún gasto el día de hoy que olvidaste registrar?\n\n👉 Solo escríbelo aquí abajo (ej. \`cena 20\`). Si no gastaste nada, ¡felicidades por el ahorro! 🎉`;
          
          await bot.sendMessage(user.telegram_id, message, { parse_mode: 'Markdown' });
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
