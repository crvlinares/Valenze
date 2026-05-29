# Lista de Tareas: MVP Bot de Finanzas en Telegram (Fase 1)

## Fase 1: Configuración de Entornos y Base de Datos
- [x] Crear el proyecto en Supabase.
- [x] Definir la tabla `transactions` con la estructura acordada (telegram_id, amount, category, etc.).
- [x] Registrar el bot en Telegram a través de `@BotFather` para obtener el Token.

## Fase 2: Desarrollo del Webhook y Lógica del Bot (Supabase Edge Functions)
- [x] Inicializar entorno de desarrollo local (Supabase CLI, TypeScript). (Nota: Iniciado en Node.js local para testing rápido).
- [x] Crear la función webhook que recibirá los mensajes de Telegram. (Implementado polling local para debuggear).
- [x] Implementar el "Parser Híbrido Determinista" (Regex para extraer monto y concepto).
- [x] Conectar la función con la base de datos de Supabase para insertar registros.

## Fase 3: Comandos Especiales e Interacciones
- [x] Implementar el comando `/start` con mensaje de bienvenida y onboarding interactivo.
- [x] Añadir lógica para diferenciar ingresos (ej. usando `+` o la palabra `ingreso`).
- [x] Implementar el comando `/balance` (sumar ingresos, restar gastos filtrando por `telegram_id`).
- [x] Implementar botones interactivos de Telegram (Inline Keyboards) de confirmación `[Deshacer]`.

## Fase 4: Pruebas Locales y Despliegue
- [x] Ejecutar el entorno local y probar los mensajes simulando a Telegram.
- [x] Desplegar la función en la nube (Vercel Serverless Functions).
- [x] Conectar la URL pública a la API de Webhook de Telegram.
- [x] Pruebas finales en vivo y preparación del link para los usuarios beta.
