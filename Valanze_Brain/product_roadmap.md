# Cronograma de Lanzamiento y Hoja de Ruta del Producto (Roadmap)

Este documento establece un plan por fases para lanzar un Producto Mínimo Viable (MVP) extremadamente simple y define los momentos exactos para agregar funciones avanzadas, monetizar y escalar el negocio basándonos en la validación real de los usuarios.

---

## Cronograma por Fases: Del Prototipo al SaaS Global

```
[Fase 1: MVP Telegram] ──► [Fase 2: Visualización Web] ──► [Fase 3: Monetización] ──► [Fase 4: Escala WhatsApp/SaaS]
 (20 Beta Users Gratis)      (Tablas y Gráficos Básicos)      (S/. 5 - 9.90 / mes)         (Supabase + Meta API)
```

---

### Fase 1: El MVP Ultra-Simple (Mes 1 - Validación de Hábito)
El objetivo exclusivo de esta fase es verificar si los usuarios realmente utilizan un chat para apuntar sus gastos diarios en su rutina real.

*   **Alcance Técnico**:
    *   Un Bot de Telegram gratuito (ej: `@MiGastoBot`).
    *   Conexión a una base de datos simple (Google Sheets o una tabla única en Supabase).
    *   **Lógica de entrada básica**: El usuario escribe *"menú 15"* o *"taxi 10"*. El bot extrae el concepto y el monto, lo guarda en la base de datos y responde: *"Registrado: menú por S/. 15.00"* 👍.
*   **Grupo de Prueba**: **20 usuarios beta gratuitos** (amigos, familiares o contactos seleccionados en Perú).
*   **Métrica de Éxito**: Que al menos 10 de los 20 usuarios registren sus gastos de forma constante durante 14 días seguidos. Si la gente deja de usarlo a los 3 días por pereza, sabremos que debemos ajustar el flujo antes de gastar en más código.
*   **Costo de Operación**: **$0 USD**.

---

### Fase 2: Visualización y Feedback (Mes 2 - Aporte de Valor)
Una vez que validamos que los 20 usuarios tienen el hábito de registrar por Telegram, les damos una herramienta para que vean sus estadísticas sin abrumarlos.

*   **Nuevas Funcionalidades**:
    *   **Link de Dashboard Básico**: El bot de Telegram te envía un botón: *"Ver mis gráficos"*. Al hacer clic, se abre una página web sencilla que lee tu historial y te muestra un gráfico de dona con tus gastos del mes y una tabla filtrable.
    *   **Notificación de Recordatorio (Nudge)**: El bot te escribe a las 9:00 PM de forma amigable si no has registrado nada en el día: *"Hola, ¿tuviste algún gasto hoy?"*.
*   **Métrica de Éxito**: Retención de usuarios activa y solicitudes de nuevas funciones por parte de los beta testers.

---

### Fase 3: Monetización y Voz (Mes 3 a 4 - Primeros Ingresos)
Llegó el momento de probar si los usuarios están dispuestos a pagar por la practicidad del servicio.

*   **Estrategia Comercial**:
    *   Introducir el cobro de una suscripción muy baja (ej: S/. 5.00 al mes como precio de lanzamiento para los primeros 100 usuarios).
*   **Nuevas Funcionalidades (Premium)**:
    *   **Audios de Voz**: El usuario puede enviar notas de voz al bot de Telegram y la app las procesa automáticamente.
    *   **Exportación a Excel**: El usuario puede descargar su tabla de transacciones mensual.
*   **Métrica de Éxito**: Alcanzar **100 clientes de pago** (validando que el modelo de negocio tiene sentido comercial).

---

### Fase 4: Migración a SaaS Completo y WhatsApp (Mes 5+)
Con un modelo de negocio validado y clientes pagando, escalamos el producto para el mercado masivo global.

*   **Evolución Tecnológica**:
    *   Migración definitiva de la base de datos a un esquema multi-usuario estructurado en **Supabase**.
    *   Lanzamiento del Bot oficial en **WhatsApp Business API** (financiado por los ingresos de la suscripción de la Fase 3).
    *   Implementación de gamificación (rachas y retos de ahorro) y asesoría financiera activa en el chat.
    *   Alianzas de afiliación (cross-selling de cuentas de ahorro o cambios de dólares).
