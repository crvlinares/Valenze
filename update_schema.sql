-- ========================================================
-- Valanze Bot - SQL Schema UPDATE (Fase 2)
-- Ejecuta este script en el SQL Editor de Supabase
-- ========================================================

-- 1. Agregar la columna de categoría a la tabla de transacciones
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Varios';

-- 2. Función RPC para generar el reporte agrupado por categoría en el mes actual
-- Esta función hace el cálculo matemático dentro de Postgres, reduciendo el consumo de RAM de Vercel a cero.
CREATE OR REPLACE FUNCTION get_user_report(uid bigint)
RETURNS TABLE(category text, total numeric) AS $$
BEGIN
  RETURN QUERY
  SELECT t.category, SUM(t.amount) AS total
  FROM public.transactions t
  WHERE t.telegram_id = uid 
    AND t.type = 'gasto'
    AND date_trunc('month', t.created_at) = date_trunc('month', timezone('utc'::text, now()))
  GROUP BY t.category
  ORDER BY total DESC;
END;
$$ LANGUAGE plpgsql;
