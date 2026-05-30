import { parseMessage } from './parser.js';
import { insertTransaction, getBalance, deleteLastTransaction, supabase } from './db.js';

export async function handleMessage(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const userId = msg.from.id;

  if (!text) return;

  // Comando /start
  if (text.startsWith('/start')) {
    const helpMessage = `¡Hola! Soy *Valanze*, tu asistente financiero en Telegram 💸.

Mi trabajo es ayudarte a registrar tus gastos e ingresos de la manera más rápida posible. ¡Olvídate de las hojas de cálculo!

✍️ **¿Cómo registrar un gasto o ingreso?**
Escríbeme el monto seguido del concepto (o viceversa):
• \`15.50 menu\`  → Registra un gasto de S/ 15.50
• \`taxi 12\`     → Registra un gasto de S/ 12.00
• \`+100 de papa\` → Registra un ingreso de S/ 100.00 (usa el signo *+*)
• \`sueldo 2500\`  → Registra un ingreso (usa palabras clave como *sueldo* o *pago*)

📊 **Comandos disponibles:**
• /balance - Revisa el total de tus ingresos, gastos y tu saldo disponible.
• /start - Muestra este mensaje de ayuda.`;

    await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    return;
  }

  // Comando /balance
  if (text.startsWith('/balance')) {
    try {
      if (!supabase) {
        await bot.sendMessage(chatId, '⚠️ *Modo Simulación:* Supabase no está configurado.', { parse_mode: 'Markdown' });
        return;
      }

      const { income, expenses, balance } = await getBalance(userId);
      const balanceMessage = `📊 **Tu Balance Financiero:**

📥 *Ingresos:* S/ ${income.toFixed(2)}
💸 *Gastos:* S/ ${expenses.toFixed(2)}
━━━━━━━━━━━━━━━━━━
💰 *Saldo Neto:* **S/ ${balance.toFixed(2)}**`;

      await bot.sendMessage(chatId, balanceMessage, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error en comando /balance:', error);
      await bot.sendMessage(chatId, '❌ Ocurrió un error al consultar tu balance.');
    }
    return;
  }

  // Comando secreto /admin_stats
  if (text.startsWith('/admin_stats valanze2026')) {
    try {
      if (!supabase) {
        await bot.sendMessage(chatId, '⚠️ Simulación: Supabase no conectado.');
        return;
      }

      // Obtener todas las transacciones
      const { data, error } = await supabase.from('transactions').select('*');
      if (error) throw error;

      // Calcular estadísticas
      const totalTx = data.length;
      const uniqueUsers = new Set(data.map(tx => tx.telegramId)).size;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Inicio del día
      
      const txToday = data.filter(tx => new Date(tx.fecha) >= today);
      const uniqueUsersToday = new Set(txToday.map(tx => tx.telegramId)).size;
      
      const incomeTotal = data.filter(tx => tx.type === 'ingreso').reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
      const expenseTotal = data.filter(tx => tx.type === 'gasto').reduce((acc, tx) => acc + parseFloat(tx.amount), 0);

      const report = `📊 **REPORTE GLOBAL VALANZE**
👤 *Usuarios Históricos:* ${uniqueUsers}
🔥 *Usuarios Activos Hoy:* ${uniqueUsersToday}
📝 *Transacciones Hoy:* ${txToday.length} (Total histórico: ${totalTx})
📥 *Volumen Ingresos:* S/ ${incomeTotal.toFixed(2)}
💸 *Volumen Gastos:* S/ ${expenseTotal.toFixed(2)}`;

      await bot.sendMessage(chatId, report, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error admin_stats:', error);
      await bot.sendMessage(chatId, '❌ Error generando reporte.');
    }
    return;
  }

  // Si empieza con '/' pero no es comando conocido
  if (text.startsWith('/')) return;

  // --- Manejo de mensajes normales (Registro) ---
  const parsed = parseMessage(text);
  if (!parsed) {
    await bot.sendMessage(chatId, '🤔 No logré entender el registro. Escribe un monto y un concepto (ej. `12 taxi` o `+50 de papa`).');
    return;
  }

  const { amount, description, type } = parsed;
  const username = msg.from.username;

  const typeIcon = type === 'ingreso' ? '📥' : '💸';
  const typeText = type === 'ingreso' ? 'Ingreso' : 'Gasto';

  try {
    if (!supabase) {
      await bot.sendMessage(chatId, `⚠️ Simulación:\n${typeIcon} *${typeText}*: S/ ${amount.toFixed(2)}\n📝 *Concepto*: "${description}"`, { parse_mode: 'Markdown' });
      return;
    }

    await insertTransaction({ telegramId: userId, username, amount, description, type, rawText: text });

    const successMessage = `✅ Registrado: *${typeText}* ${typeIcon}
💰 *Monto:* S/ ${amount.toFixed(2)}
📝 *Concepto:* "${description}"`;

    await bot.sendMessage(chatId, successMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '❌ Deshacer registro', callback_data: 'undo_last' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error procesando mensaje:', error);
    await bot.sendMessage(chatId, '❌ Hubo un error al guardar el registro.');
  }
}

export async function handleCallbackQuery(bot, callbackQuery) {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;

  if (data === 'undo_last') {
    try {
      if (!supabase) {
        await bot.answerCallbackQuery(callbackQuery.id, { text: 'No disponible en simulación.', show_alert: true });
        return;
      }

      const deletedTx = await deleteLastTransaction(userId);
      if (deletedTx) {
        await bot.answerCallbackQuery(callbackQuery.id, { text: '¡Registro eliminado!' });
        const typeText = deletedTx.type === 'ingreso' ? 'Ingreso 📥' : 'Gasto 💸';
        await bot.editMessageText(`🗑️ *Registro Eliminado:*\n*${typeText}* de S/ ${parseFloat(deletedTx.amount).toFixed(2)} por "${deletedTx.description}"`, {
          chat_id: chatId,
          message_id: msg.message_id,
          parse_mode: 'Markdown'
        });
      } else {
        await bot.answerCallbackQuery(callbackQuery.id, { text: 'No hay registros recientes.', show_alert: true });
      }
    } catch (error) {
      console.error('Error al deshacer:', error);
      await bot.answerCallbackQuery(callbackQuery.id, { text: 'Error al deshacer.', show_alert: true });
    }
  }
}
