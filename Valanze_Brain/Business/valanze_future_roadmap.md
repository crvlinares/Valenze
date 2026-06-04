# Cronograma y Evolución del Producto (Roadmap Interno)

Este documento es nuestro mapa de ruta privado para saber exactamente qué construir, cuándo construirlo y en qué momento empezar a cobrar. Nos mantendrá enfocados para no programar cosas que la gente aún no necesita.

---

## 🎯 Fase 1: Validación y "Pegajosidad" (ESTADO ACTUAL)
**Meta:** 20 a 100 Usuarios Activos.
**Objetivo:** Demostrar que la gente prefiere el bot antes que Excel y que lo usan por más de 3 días seguidos.

*   ✅ **MVP Core:** Registro de ingresos y gastos por chat.
*   ✅ **Comando de Balance:** `/balance` en tiempo real.
*   ✅ **Retención:** Cron Job automático a las 8:30 PM para recordar el registro.
*   ✅ **Soporte Ágil:** Menú interactivo de `/ayuda` y botón de deshacer.
*   ⏳ **Siguiente paso:** Conseguir tráfico orgánico (TikTok, WhatsApp, LinkedIn).

---

## 🚀 Fase 2: Experiencia "Aha!" y Auto-Categorización (Próximo Mes)
**Meta:** 100 a 500 Usuarios Activos.
**Objetivo:** Automatizar el trabajo para que la IA haga el trabajo pesado y la experiencia se vuelva mágica.

*   **Auto-Categorización por Palabras Clave:** Si envían "15 taxi", el bot lo guarda bajo la categoría *Transporte* automáticamente sin que el usuario lo diga. (Se usará una lista de palabras clave Regex en Node.js).
*   **Comando `/exportar`:** El usuario pide un Excel y el bot le devuelve un archivo `.csv` con todos sus datos del mes. Esto da muchísima confianza porque sienten que "son dueños de su data".
*   **Reportes Semanales Automáticos:** Los domingos por la noche, el bot envía un pequeño texto automático: *"Esta semana gastaste S/ 150. Tu mayor gasto fue: Comida (S/ 80)"*.

---

## 💎 Fase 3: Monetización (Valanze PRO) y Dashboard Web (Mes 3)
**Meta:** Llegar a 1,000 Usuarios (5% Pagando S/. 9.90 = ~S/ 500 MRR).
**Objetivo:** Introducir el muro de pago (Paywall) justificando el cobro con funciones premium (Visuales y de Inteligencia Artificial).

*   **Mini Dashboard Web (Frontend):** Conectar Next.js a Supabase. El usuario entra a `app.valanze.com`, se loguea con Telegram, y ve gráficos de torta súper profesionales (Dashboard Visual).
*   **Soporte de Audios (Premium):** El usuario paga para poder enviar notas de voz al bot (*"Oye Valanze, acabo de gastar 50 lucas en el cine"*). Conectaremos el bot a la API de Whisper (OpenAI) para transcribirlo.
*   **Límites del Plan Free:** El plan gratuito solo mostrará los últimos 30 días de historial. Para ver meses pasados o exportar a Excel, el usuario deberá actualizar a Valanze PRO.

---

## 🏢 Fase 4: Pivot B2B (Valanze Negocios) (Mes 6)
**Meta:** 10 Clientes B2B pagando S/. 150 al mes (= S/ 1,500 MRR).
**Objetivo:** Usar todo el código aprendido para venderle a empresas.

*   **Valanze Hoteles / Caja Chica:** Adaptar la base de datos a `Multi-Tenant` (Multi-usuario con roles).
*   **Web Panel B2B:** Un panel para que el administrador/recepcionista vea la actividad de sus empleados en tiempo real.
