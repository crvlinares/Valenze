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

import jwt from 'jsonwebtoken';

export function getClientForUser(telegramId) {
  if (!supabaseUrl || !supabaseKey) return null;
  
  if (!process.env.SUPABASE_JWT_SECRET) {
    console.warn('Falta SUPABASE_JWT_SECRET. Usando cliente sin firmar.');
    return createClient(supabaseUrl, supabaseKey);
  }

  // Firmar un JWT válido por 1 hora con el ID del usuario
  const token = jwt.sign(
    {
      role: 'authenticated',
      telegram_id: telegramId.toString()
    },
    process.env.SUPABASE_JWT_SECRET,
    { expiresIn: '1h' }
  );

  return createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
}

export function getAdminClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  if (!process.env.SUPABASE_JWT_SECRET) return createClient(supabaseUrl, supabaseKey);

  // Firmar un JWT con rol service_role para saltarse RLS temporalmente
  const token = jwt.sign(
    { role: 'service_role' },
    process.env.SUPABASE_JWT_SECRET,
    { expiresIn: '5m' }
  );

  return createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
}

export async function insertTransaction({ telegramId, username, amount, description, type, rawText }) {
  const client = getClientForUser(telegramId);
  if (!client) throw new Error('Base de datos no configurada.');

  const { data, error } = await client
    .from('transactions')
    .insert([{
      telegram_id: telegramId,
      telegram_username: username || null,
      amount,
      description,
      type,
      raw_text: rawText
    }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getBalance(telegramId) {
  const client = getClientForUser(telegramId);
  if (!client) throw new Error('Base de datos no configurada.');

  const { data, error } = await client.rpc('get_user_balance', { uid: telegramId });
  if (error) throw error;

  if (!data || data.length === 0) return { income: 0, expenses: 0, balance: 0 };
  const income = parseFloat(data[0].income) || 0;
  const expenses = parseFloat(data[0].expenses) || 0;
  return { income, expenses, balance: income - expenses };
}

export async function deleteLastTransaction(telegramId) {
  const client = getClientForUser(telegramId);
  if (!client) throw new Error('Base de datos no configurada.');

  const { data, error: fetchError } = await client
    .from('transactions')
    .select('id, amount, description, type')
    .eq('telegram_id', telegramId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (fetchError) throw fetchError;
  if (!data || data.length === 0) return null;

  const lastTx = data[0];
  const { error: deleteError } = await client
    .from('transactions')
    .delete()
    .eq('id', lastTx.id);

  if (deleteError) throw deleteError;
  return lastTx;
}
