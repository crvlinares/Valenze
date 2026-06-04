/**
 * Analiza un mensaje de texto para extraer el monto, descripción y tipo de transacción.
 * Retorna null si el mensaje no parece ser una transacción válida o excede límites.
 * 
 * @param {string} text 
 * @returns {{ amount: number, description: string, type: 'gasto' | 'ingreso' } | null}
 */
export function parseMessage(text) {
  if (!text || typeof text !== 'string') return null;
  
  // Límite de longitud para evitar spam
  if (text.length > 200) return null;

  const trimmed = text.trim();
  
  // Ignorar comandos de Telegram
  if (trimmed.startsWith('/')) return null;

  // Regex: Busca un número. (?!\\s*%) asegura que no esté seguido por un símbolo de porcentaje.
  const numberRegex = /(?:^|\s)([+-]?\d+(?:[.,]\d+)?)(?!\s*%)(?:\s|$)/;
  const match = trimmed.match(numberRegex);
  
  if (!match) return null;

  const rawNumber = match[1];
  let amount = parseFloat(rawNumber.replace(',', '.'));
  if (isNaN(amount)) return null;

  // Almacenar siempre montos positivos
  amount = Math.abs(amount);

  // Límite máximo para evitar números absurdos (Petición del auditor)
  if (amount > 1000000) return null;

  // Extraer la descripción quitando el número del mensaje original
  let description = trimmed.replace(rawNumber, '').trim();
  
  // Si no hay descripción, asignar un valor por defecto
  if (!description) {
    description = 'Varios';
  }

  // Limpiar espacios dobles y truncar a máximo 50 caracteres para la BD
  description = description.replace(/\s+/g, ' ').substring(0, 50).trim();

  // Determinar el tipo (gasto o ingreso)
  let type = 'gasto';
  const lowercaseDesc = description.toLowerCase();

  // Lista de palabras clave que denotan un ingreso
  const ingresoKeywords = ['ingreso', 'sueldo', 'pago', 'ganancia', 'recibi', 'recibí', 'yapea', 'plin'];
  
  const isExplicitIncome = rawNumber.startsWith('+') || 
                           ingresoKeywords.some(keyword => lowercaseDesc.includes(keyword));

  if (isExplicitIncome) {
    type = 'ingreso';
  }

  return {
    amount,
    description,
    type
  };
}
