import { parseMessage } from './parser.js';
import { insertTransaction, getBalance, deleteLastTransaction, getAdminClient, getReport, exportTransactions } from './db.js';

export async function handleMessage(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const userId = msg.from.id;

  if (!text) return;

  // Comando /start
  if (text.startsWith('/start')) {
    const helpMessage = `👋 ¡Hola! Soy *Valanze*, tu asistente financiero en Telegram 💸.

Mi trabajo es ayudarte a registrar tus gastos e ingresos de la manera más rápida posible. ¡Olvídate de las hojas de cálculo!

✍️ **¿Cómo registrar un gasto o ingreso?**
Escríbeme el monto seguido del concepto (o viceversa):
• \`15.50 menu\`  → Registra un gasto de S/ 15.50
• \`taxi 12\`     → Registra un gasto de S/ 12.00
• \`+100 de papa\` → Registra un ingreso de S/ 100.00 (usa el signo *+*)
• \`sueldo 2500\`  → Registra un ingreso (usa palabras clave como *sueldo* o *pago*)

📊 **Comandos disponibles:**
• /balance - Revisa el total de ingresos, gastos y saldo.
• /reporte - Muestra en qué categorías estás gastando más este mes.
• /exportar - Descarga todo tu historial en formato Excel (CSV).
• /novedades - Entérate de las últimas mejoras del bot.
• /legal - Política de Privacidad y Términos de Uso.`;

    await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    return;
  }

  // Comando /novedades (Patch Notes)
  if (text.startsWith('/novedades')) {
    const novedadesMessage = `🚀 *Notas del Parche v1.1 - Fase de Seguridad* 🚀\n\n` +
      `✅ *Zero-Trust Security:* Nadie, ni siquiera nuestros servidores, puede acceder a tus datos financieros sin una firma digital criptográfica de tu cuenta de Telegram.\n` +
      `✅ *Escudo Anti-Spam:* Implementamos límites de peticiones por minuto para prevenir ataques al bot.\n` +
      `✅ *IA más inteligente:* El bot ahora ignora porcentajes (ej. "50% de descuento") y se protege contra números absurdamente gigantes para evitar errores matemáticos.\n\n` +
      `¡Gracias por ser parte de la Beta Privada de Valanze!`;
    await bot.sendMessage(chatId, novedadesMessage, { parse_mode: 'Markdown' });
    return;
  }

  // Comando /balance
  if (text.startsWith('/balance')) {
    try {

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
  if (text.startsWith('/admin_stats')) {
    if (!process.env.ADMIN_TELEGRAM_ID || msg.from.id.toString() !== process.env.ADMIN_TELEGRAM_ID) {
      return; // Ignorar silenciosamente si no es el admin
    }
    try {
      const adminClient = getAdminClient();
      if (!adminClient) {
        await bot.sendMessage(chatId, '⚠️ Simulación: Supabase no conectado.');
        return;
      }

      // Obtener todas las transacciones (usando rol de admin temporal)
      const { data, error } = await adminClient.from('transactions').select('*');
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

  // Comando /reporte
  if (text.startsWith('/reporte')) {
    try {
      const data = await getReport(userId);
      
      if (!data || data.length === 0) {
        await bot.sendMessage(chatId, '📊 Aún no tienes gastos registrados este mes para generar un reporte.');
        return;
      }

      let reportMsg = `📊 *Tu Reporte de Gastos del Mes*\n\n`;
      let total = 0;
      
      data.forEach(row => {
        const val = parseFloat(row.total);
        total += val;
        reportMsg += `🔸 *${row.category}*: S/ ${val.toFixed(2)}\n`;
      });
      
      reportMsg += `\n💸 *Gasto Total del Mes:* S/ ${total.toFixed(2)}`;
      await bot.sendMessage(chatId, reportMsg, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error generando reporte:', error);
      await bot.sendMessage(chatId, '❌ Hubo un error al generar tu reporte mensual.');
    }
    return;
  }

  // Comando /seguridad
  if (text.startsWith('/seguridad')) {
    const securityMsg = `🛡️ **Seguridad y Privacidad en Valanze**

1️⃣ **Cero Virus:** Valanze es un bot oficial de Telegram. No tienes que descargar ninguna app externa ni instalar archivos APK.
2️⃣ **Privacidad Total:** Tus datos NO se comparten con bancos, SUNAT ni agencias de publicidad.
3️⃣ **Encriptación:** Tu información financiera se guarda en servidores seguros en la nube (AWS) protegidos bajo los estándares de Supabase.
4️⃣ **Tú tienes el control:** Valanze no pide tus contraseñas del banco ni se conecta a tus tarjetas. Es un registro manual y 100% privado.

Tu tranquilidad es nuestra prioridad. 🔒`;
    await bot.sendMessage(chatId, securityMsg, { parse_mode: 'Markdown' });
    return;
  }

  // Comando /legal
  if (text.startsWith('/legal')) {
    const legalMsg = `📄 *Política de Privacidad y Términos de Uso*\n\n` +
      `Valanze cumple con la normativa peruana vigente (Ley N° 29733 de Protección de Datos Personales).\n\n` +
      `1️⃣ *Recopilación:* Solo recopilamos tu ID de Telegram y las transacciones que registras voluntariamente.\n` +
      `2️⃣ *Uso:* No vendemos, alquilamos ni compartimos tus datos con terceros, bancos o SUNAT.\n` +
      `3️⃣ *Arquitectura Zero-Trust:* Tu información financiera requiere una firma criptográfica única asociada a tu cuenta para ser leída. Ni siquiera nuestros desarrolladores pueden acceder a ella directamente.\n` +
      `4️⃣ *Derechos ARCO:* Puedes solicitar la eliminación total y permanente de tus registros contactando a soporte.\n\n` +
      `*Nota sobre funcionalidades futuras:* Si en el futuro Valanze permite el registro por notas de voz o fotos de recibos, dichos archivos multimedia no serán almacenados permanentemente en nuestros servidores; solo se extraerá el texto numérico.\n\n` +
      `Al usar Valanze, aceptas estas condiciones.`;
    await bot.sendMessage(chatId, legalMsg, { parse_mode: 'Markdown' });
    return;
  }

  // Comando /exportar
  if (text.startsWith('/exportar')) {
    try {
      const data = await exportTransactions(userId);
      if (!data || data.length === 0) {
        await bot.sendMessage(chatId, '📊 Aún no tienes gastos registrados para exportar.');
        return;
      }

      await bot.sendMessage(chatId, '⏳ Generando tu reporte Excel (CSV)...');

      // Generar CSV en memoria usando BOM para que Excel reconozca tildes (UTF-8)
      let csvString = '\uFEFFFecha,Tipo,Monto,Categoría,Concepto\n';
      data.forEach(row => {
        const dateStr = new Date(row.created_at).toISOString().split('T')[0];
        // Escapar comillas en la descripción para formato CSV válido
        const desc = `"${row.description.replace(/"/g, '""')}"`;
        csvString += `${dateStr},${row.type},${row.amount},${row.category},${desc}\n`;
      });

      const fileOptions = {
        filename: 'Reporte_Valanze.csv',
        contentType: 'text/csv',
      };

      await bot.sendDocument(chatId, Buffer.from(csvString, 'utf-8'), {
        caption: '✅ Aquí tienes tu historial completo de registros.'
      }, fileOptions);

    } catch (error) {
      console.error('Error exportando CSV:', error);
      await bot.sendMessage(chatId, '❌ Hubo un error al generar tu archivo.');
    }
    return;
  }

  // Comando /ayuda
  if (text.startsWith('/ayuda')) {
    const helpOptions = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '❓ ¿Cómo anoto mis gastos?', callback_data: 'help_register' }],
          [{ text: '🗑️ Me equivoqué, ¿cómo borro?', callback_data: 'help_undo' }],
          [{ text: '📞 Hablar con un humano', callback_data: 'help_support' }]
        ]
      }
    };
    await bot.sendMessage(chatId, '🆘 **Centro de Ayuda Valanze**\n\n¿En qué te puedo ayudar hoy? Elige una opción:', { parse_mode: 'Markdown', ...helpOptions });
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

  const { amount, description, type, category } = parsed;
  const username = msg.from.username;

  const typeIcon = type === 'ingreso' ? '📥' : '💸';
  const typeText = type === 'ingreso' ? 'Ingreso' : 'Gasto';
  // Evitar mostrar categoría si es ingreso (para no confundir al usuario)
  const categoryDisplay = type === 'gasto' ? `\n🏷️ *Categoría:* ${category}` : '';

  try {
    await insertTransaction({ telegramId: userId, username, amount, description, type, category, rawText: text });

    const successMessage = `✅ Registrado: *${typeText}* ${typeIcon}
💰 *Monto:* S/ ${amount.toFixed(2)}
📝 *Concepto:* "${description}"${categoryDisplay}`;

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
  } else if (data === 'help_register') {
    await bot.sendMessage(chatId, '📝 **Para registrar algo solo escríbelo:**\n\nEjemplo de Gasto: `15 almuerzo`\nEjemplo de Ingreso: `+50 pago`\n\nNo necesitas usar comandos ni menús complejos, yo entiendo tu texto automáticamente.', { parse_mode: 'Markdown' });
    await bot.answerCallbackQuery(callbackQuery.id);
  } else if (data === 'help_undo') {
    await bot.sendMessage(chatId, '🗑️ **¿Te equivocaste?**\n\nCada vez que registras algo, aparecerá un botón que dice `❌ Deshacer registro` debajo del mensaje de confirmación. Solo tócalo y se borrará al instante.', { parse_mode: 'Markdown' });
    await bot.answerCallbackQuery(callbackQuery.id);
  } else if (data === 'help_support') {
    await bot.sendMessage(chatId, '📞 **Soporte Directo**\n\nComo somos una aplicación en versión Beta, tu retroalimentación vale oro. Si algo falla, escríbele un mensaje directo al fundador de Valanze para que lo solucione hoy mismo.', { parse_mode: 'Markdown' });
    await bot.answerCallbackQuery(callbackQuery.id);
  }
}
