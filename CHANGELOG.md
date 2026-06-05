# Valanze - Changelog (Notas del Parche)

Todas las actualizaciones y mejoras notables de este proyecto serán documentadas en este archivo.

## [v1.1.0] - 2026-06-04 (Parche de Seguridad y Estabilidad)
**Categoría:** Fase 1.5 - Robustez Técnica

### Agregado
- **Zero-Trust RLS:** Las transacciones ahora usan JWTs temporales firmados criptográficamente para evitar fugas de datos.
- **Escudo Anti-Spam:** Sistema de Rate Limiting agregado al webhook para rechazar más de 20 mensajes por minuto por usuario.
- **Pruebas Unitarias:** Se agregaron tests automatizados nativos (`parser.test.js`) para prevenir regresiones en el sistema central de lectura de mensajes.
- **Comando Novedades:** Nuevo comando `/novedades` para que los usuarios puedan leer los "Patch Notes" en la app.

### Cambiado
- **Parser Inteligente:** El bot ahora descarta automáticamente signos de porcentaje (`%`) para evitar registrar "50% de descuento" como "S/ 50".
- **Límites Seguros:** El bot ahora rechaza transacciones superiores a 1,000,000 para evitar desbordamientos matemáticos o errores de base de datos.
- **Truncamiento:** Las descripciones de los gastos se truncan inteligentemente a 50 caracteres antes de ir a la base de datos para mantener los dashboards limpios.

### Eliminado
- **Service Role Key:** Se eliminó la recomendación y uso del SuperAdmin Key de Vercel en cumplimiento con auditorías de seguridad estrictas.

---

## [v1.0.0] - 2026-05-XX
**Categoría:** Lanzamiento MVP Básico
- Lanzamiento de la funcionalidad básica de registro de transacciones mediante chat.
- Configuración de arquitectura dual (Webhook + Polling).
- Comandos básicos (`/start`, `/balance`, `/deshacer`).
