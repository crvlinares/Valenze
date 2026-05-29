/**
 * Analiza un mensaje de texto para extraer el monto, descripción y tipo de transacción.
 * Retorna null si el mensaje no parece ser una transacción (ej. comandos o texto plano).
 * 
 * @param {string} text 
 * @returns {{ amount: number, description: string, type: 'gasto' | 'ingreso' } | null}
 */
export function parseMessage(text) {
  if (!text) return null;
  const trimmed = text.trim();
  
  // Ignorar comandos de Telegram
  if (trimmed.startsWith('/')) return null;

  // Regex para buscar el primer número (entero o decimal con punto/coma)
  // Permite un signo opcional (+ o -) al inicio
  const numberRegex = /(?:^|\s)([+-]?\d+(?:[.,]\d+)?)(?:\s|$)/;
  const match = trimmed.match(numberRegex);
  
  if (!match) return null;

  const rawNumber = match[1];
  let amount = parseFloat(rawNumber.replace(',', '.'));
  if (isNaN(amount)) return null;

  // Extraer la descripción quitando el número del mensaje original
  let description = trimmed.replace(rawNumber, '').trim();
  
  // Si no hay descripción, asignar un valor por defecto
  if (!description) {
    description = 'Varios';
  }

  // Limpiar espacios dobles
  description = description.replace(/\s+/g, ' ');

  // Determinar el tipo (gasto o ingreso)
  let type = 'gasto';
  const lowercaseDesc = description.toLowerCase();

  // Lista de palabras clave que denotan un ingreso
  const ingresoKeywords = ['ingreso', 'sueldo', 'pago', 'ganancia', 'recibi', 'recibí', 'yapeada', 'plin'];
  
  const isExplicitIncome = rawNumber.startsWith('+') || 
                           ingresoKeywords.some(keyword => lowercaseDesc.includes(keyword));

  if (isExplicitIncome) {
    type = 'ingreso';
  }

  // Almacenar siempre montos positivos en la BD, la columna 'type' define el flujo
  amount = Math.abs(amount);

  return {
    amount,
    description,
    type
  };
}
