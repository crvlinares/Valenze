-- ========================================================
-- Valanze Bot - SQL Schema para Supabase
-- Ejecuta este script en el SQL Editor de Supabase
-- ========================================================

-- 1. Crear la tabla de transacciones
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  telegram_id BIGINT NOT NULL,
  telegram_username TEXT,
  type TEXT NOT NULL CHECK (type IN ('gasto', 'ingreso')),
  amount NUMERIC(12, 2) NOT NULL,
  description TEXT NOT NULL,
  raw_text TEXT
);

-- 2. Crear un índice para búsquedas rápidas por usuario de Telegram
CREATE INDEX IF NOT EXISTS transactions_telegram_id_idx ON public.transactions (telegram_id);

-- 3. Habilitar la seguridad a nivel de fila (Row Level Security - RLS)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 4. Funciones RPC (Remote Procedure Calls) para optimización de rendimiento
-- Esta función calcula el balance directamente en la base de datos para no saturar la memoria RAM.
CREATE OR REPLACE FUNCTION get_user_balance(uid bigint)
RETURNS TABLE(income numeric, expenses numeric) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(CASE WHEN type = 'ingreso' THEN amount ELSE 0 END), 0) AS income,
    COALESCE(SUM(CASE WHEN type = 'gasto' THEN amount ELSE 0 END), 0) AS expenses
  FROM transactions
  WHERE telegram_id = uid;
END;
$$ LANGUAGE plpgsql;

-- Nota de Seguridad:
-- Valanze utiliza la "service_role" key exclusivamente desde el backend protegido (Vercel)
-- para insertar registros autenticados. El acceso público anónimo está totalmente bloqueado por RLS.
