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

-- 4. Crear políticas de acceso (opcional si usas la service_role key, que se salta RLS)
-- Para este MVP, si usas la "service_role" key de Supabase en tu archivo .env,
-- el bot tendrá acceso total automáticamente sin necesidad de políticas adicionales.
-- Si prefieres usar la "anon" key, ejecuta la siguiente política para permitir lectura y escritura:
CREATE POLICY "Permitir acceso total al bot de Telegram" ON public.transactions
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
