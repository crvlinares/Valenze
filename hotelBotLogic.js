export async function handleHotelMessage(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text ? msg.text.toLowerCase() : '';

  if (!text) return;

  if (text.startsWith('/start')) {
    const welcome = `🏨 **Bienvenido al Sistema Operativo Demo Hostel**\n\nEste es un prototipo interactivo para demostración. \nIntenta enviar uno de estos comandos:\n\n🧹 \`limpia 204\`\n🍹 \`bar -2 pisco sour\`\n👨‍🍳 \`reserva cocina 3 personas\``;
    await bot.sendMessage(chatId, welcome, { parse_mode: 'Markdown' });
    return;
  }

  // Simulación: Limpieza
  if (text.includes('limpia') || text.includes('limpio')) {
    const habitacion = text.match(/\d+/) ? text.match(/\d+/)[0] : 'asignada';
    await bot.sendMessage(chatId, `✅ **Habitación ${habitacion} marcada como LIMPIA.**\n🖥️ _(Se ha actualizado la pantalla de recepción a color Verde)_`, { parse_mode: 'Markdown' });
    return;
  }

  // Simulación: Bar / Inventario
  if (text.includes('bar') || text.includes('pisco') || text.includes('cerveza')) {
    await bot.sendMessage(chatId, `🍹 **Inventario de Bar actualizado.**\n✅ Se descontó el consumo con éxito.\n\n⚠️ **ALERTA AL GERENTE:** Quedan menos de 5 botellas de este producto en stock.`, { parse_mode: 'Markdown' });
    return;
  }

  // Simulación: Actividades / Reservas
  if (text.includes('reserva') || text.includes('cocina') || text.includes('clase')) {
    await bot.sendMessage(chatId, `👨‍🍳 **Reserva confirmada.**\nLos cupos han sido separados en el sistema central de actividades del hostel.`, { parse_mode: 'Markdown' });
    return;
  }

  // Fallback
  await bot.sendMessage(chatId, `🤔 Comando no reconocido en la demo. \nPrueba escribir:\n- \`limpia 105\`\n- \`bar -2 pisco\`\n- \`reserva cocina\``, { parse_mode: 'Markdown' });
}
