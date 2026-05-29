import { parseMessage } from './parser.js';
import { insertTransaction, getBalance, deleteLastTransaction, supabase } from './db.js';

export function setupBot(bot) {
  // Comando /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
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
• /start - Muestra este mensaje de ayuda.

💡 Si te equivocas en un registro, presiona el botón *Deshacer* inmediatamente después de registrarlo.`;

    bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
  });

  // Comando /balance
  bot.onText(/\/balance/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
      if (!supabase) {
        bot.sendMessage(chatId, '⚠️ *Modo Simulación:* Supabase no está configurado.', { parse_mode: 'Markdown' });
        return;
      }

      const { income, expenses, balance } = await getBalance(userId);
      const balanceMessage = `📊 **Tu Balance Financiero:**

📥 *Ingresos:* S/ ${income.toFixed(2)}
💸 *Gastos:* S/ ${expenses.toFixed(2)}
━━━━━━━━━━━━━━━━━━
💰 *Saldo Neto:* **S/ ${balance.toFixed(2)}**`;

      bot.sendMessage(chatId, balanceMessage, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error en comando /balance:', error);
      bot.sendMessage(chatId, '❌ Ocurrió un error al consultar tu balance.');
    }
  });

  // Manejo de mensajes normales (Registro de transacciones)
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text || text.startsWith('/')) return;

    const parsed = parseMessage(text);
    if (!parsed) {
      bot.sendMessage(chatId, '🤔 No logré entender el registro. Escribe un monto y un concepto (ej. `12 taxi` o `+50 de papa`).');
      return;
    }

    const { amount, description, type } = parsed;
    const username = msg.from.username;
    const userId = msg.from.id;

    const typeIcon = type === 'ingreso' ? '📥' : '💸';
    const typeText = type === 'ingreso' ? 'Ingreso' : 'Gasto';

    try {
      if (!supabase) {
        bot.sendMessage(chatId, `⚠️ Simulación:\n${typeIcon} *${typeText}*: S/ ${amount.toFixed(2)}\n📝 *Concepto*: "${description}"`, { parse_mode: 'Markdown' });
        return;
      }

      await insertTransaction({ telegramId: userId, username, amount, description, type, rawText: text });

      const successMessage = `✅ Registrado: *${typeText}* ${typeIcon}
💰 *Monto:* S/ ${amount.toFixed(2)}
📝 *Concepto:* "${description}"`;

      bot.sendMessage(chatId, successMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '❌ Deshacer registro', callback_data: 'undo_last' }]
          ]
        }
      });
    } catch (error) {
      console.error('Error procesando mensaje:', error);
      bot.sendMessage(chatId, '❌ Hubo un error al guardar el registro.');
    }
  });

  // Manejo de interacciones de botones (Deshacer)
  bot.on('callback_query', async (callbackQuery) => {
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;
    const userId = callbackQuery.from.id;
    const data = callbackQuery.data;

    if (data === 'undo_last') {
      try {
        if (!supabase) {
          bot.answerCallbackQuery(callbackQuery.id, { text: 'No disponible en simulación.', show_alert: true });
          return;
        }

        const deletedTx = await deleteLastTransaction(userId);
        if (deletedTx) {
          bot.answerCallbackQuery(callbackQuery.id, { text: '¡Registro eliminado!' });
          const typeText = deletedTx.type === 'ingreso' ? 'Ingreso 📥' : 'Gasto 💸';
          bot.editMessageText(`🗑️ *Registro Eliminado:*\n*${typeText}* de S/ ${parseFloat(deletedTx.amount).toFixed(2)} por "${deletedTx.description}"`, {
            chat_id: chatId,
            message_id: msg.message_id,
            parse_mode: 'Markdown'
          });
        } else {
          bot.answerCallbackQuery(callbackQuery.id, { text: 'No hay registros recientes.', show_alert: true });
        }
      } catch (error) {
        console.error('Error al deshacer:', error);
        bot.answerCallbackQuery(callbackQuery.id, { text: 'Error al deshacer.', show_alert: true });
      }
    }
  });
}
