import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Verificar si las variables de entorno están correctamente configuradas
const isConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  supabaseKey && 
  supabaseKey !== 'your-supabase-anon-key';

if (!isConfigured) {
  console.warn('⚠️ Supabase no está configurado en .env. El bot no podrá guardar datos en Supabase.');
}

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * Registra una nueva transacción (gasto o ingreso) en Supabase.
 * 
 * @param {object} params
 * @param {number} params.telegramId
 * @param {string} params.username
 * @param {number} params.amount
 * @param {string} params.description
 * @param {'gasto' | 'ingreso'} params.type
 * @param {string} params.rawText
 */
export async function insertTransaction({ telegramId, username, amount, description, type, rawText }) {
  if (!supabase) {
    throw new Error('Base de datos no configurada. Edita el archivo .env con tus credenciales de Supabase.');
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        telegram_id: telegramId,
        telegram_username: username || null,
        amount,
        description,
        type,
        raw_text: rawText
      }
    ])
    .select();

  if (error) {
    console.error('Error al insertar transacción:', error);
    throw error;
  }

  return data[0];
}

export async function getBalance(telegramId) {
  if (!supabase) {
    throw new Error('Base de datos no configurada. Edita el archivo .env con tus credenciales de Supabase.');
  }

  const { data, error } = await supabase.rpc('get_user_balance', { uid: telegramId });

  if (error) {
    console.error('Error al obtener balance:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    return { income: 0, expenses: 0, balance: 0 };
  }

  const income = parseFloat(data[0].income) || 0;
  const expenses = parseFloat(data[0].expenses) || 0;

  return {
    income,
    expenses,
    balance: income - expenses
  };
}

/**
 * Elimina la última transacción registrada por el usuario (función deshacer).
 * 
 * @param {number} telegramId 
 * @returns {Promise<{amount: number, description: string, type: string} | null>} La transacción eliminada, o null si no había ninguna.
 */
export async function deleteLastTransaction(telegramId) {
  if (!supabase) {
    throw new Error('Base de datos no configurada. Edita el archivo .env con tus credenciales de Supabase.');
  }

  // Obtener el ID de la transacción más reciente del usuario
  const { data, error: fetchError } = await supabase
    .from('transactions')
    .select('id, amount, description, type')
    .eq('telegram_id', telegramId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error('Error al buscar la última transacción:', fetchError);
    throw fetchError;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const lastTx = data[0];

  // Eliminar la transacción por su ID
  const { error: deleteError } = await supabase
    .from('transactions')
    .delete()
    .eq('id', lastTx.id);

  if (deleteError) {
    console.error('Error al eliminar transacción:', deleteError);
    throw deleteError;
  }

  return lastTx;
}
