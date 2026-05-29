# Integración de Canales de Chat (WhatsApp, Telegram y Web)

Este documento explica las opciones de canales de chat reales (WhatsApp, Telegram, App Web propia) para tu aplicación de finanzas, las herramientas actuales en el mercado que facilitan esto, y cómo estructurar la conexión.

---

## 1. Comparativa de Canales de Chat para el MVP

| Canal | Dificultad Técnica | Costos de Operación | Experiencia de Usuario (UX) |
| :--- | :--- | :--- | :--- |
| **App Web Propia (WhatsApp Clone)** | **Muy Baja** | **$0 USD** (Gratis para siempre) | **Excelente**: Se abre en el navegador (PC/móvil) con un diseño que imita a WhatsApp, y al costado puedes ver gráficos dinámicos que no se pueden mostrar dentro de un chat real. |
| **Telegram Bot** | **Baja-Media** | **$0 USD** (Gratis para siempre) | **Muy buena**: El usuario agrega al bot en Telegram, le envía mensajes de texto o notas de voz, y el bot responde. No tiene gráficos avanzados dentro del chat (solo texto). |
| **WhatsApp Bot (Oficial)** | **Alta** | **Variable** (Cargos de Meta por mensaje después del límite gratuito) | **Excelente**: Está en la app de chat que todo el mundo usa a diario. Requiere verificación de empresa en Meta. |
| **WhatsApp Bot (No oficial / Automatización)** | **Media** | **Gratis o Bajo costo** | **Buena**: Se usa una app en Android que lee notificaciones de WhatsApp y las reenvía a Google Sheets, o un servidor puente. |

---

## 2. Herramientas Actuales en el Mercado (No-Code y Low-Code)

Si deseas conectar chats reales con Google Sheets sin programar bases de datos complejas, estas herramientas son las líderes de la industria:

### A. Make.com (Anteriormente Integromat)
Es una plataforma de automatización visual de arrastrar y soltar. Es la más potente y económica para este propósito.
* **Cómo funciona**: Creas un escenario con 3 bloques:
  1. *Bloque Telegram/WhatsApp*: Recibe el mensaje del usuario.
  2. *Bloque OpenAI/ChatGPT (opcional)*: Interpreta el texto (ej: extrae el dinero y la categoría).
  3. *Bloque Google Sheets*: Inserta los datos en la hoja.
* **Costo**: Capa gratuita generosa (hasta 1,000 operaciones al mes).

### B. Zapier
Similar a Make, pero más popular en el mercado norteamericano y más costosa.
* **Cómo funciona**: Creas un "Zap" que conecta Telegram/WhatsApp con Google Sheets.
* **Costo**: Capa gratuita limitada a 100 tareas mensuales.

### C. Landbot.io o ManyChat
Plataformas específicas para crear bots conversacionales visuales con ramificaciones de preguntas.
* **Cómo funciona**: Diseñas el flujo del chat visualmente (ej: Bot pregunta "Monto?", luego "Categoría?"). Se conecta con Google Sheets con un clic.
* **Costo**: De pago (desde $30 - $40 USD mensuales).

---

## 3. La Solución Inteligente e Inmediata: Telegram + Google Apps Script (100% Gratis)

Para un MVP con **cero costo**, hay un truco tecnológico muy elegante: **usar tu Google Apps Script como el "cerebro" de un Bot de Telegram**.

No necesitas servidores, ni hosting, ni pagar herramientas como Make.

```
[Usuario en Telegram] ──► [Servidores de Telegram] 
                                    │ (Webhook)
                                    ▼
[Fila en Google Sheets] ◄── [Google Apps Script] (Procesa el texto y responde)
```

### ¿Cómo funciona este flujo?
1. **Crear el Bot**: Hablas con el bot oficial de Telegram `@BotFather` (el creador de bots) y le pides crear uno nuevo. Te dará un código secreto de acceso llamado **Token API**.
2. **Conectar con Google**: En tu código de Google Apps Script, registramos ese Token. Le decimos a Telegram: *"Cada vez que alguien le escriba a mi Bot, envíame el mensaje a mi hoja de cálculo"*.
3. **El Proceso**:
   * Escribes al bot en tu Telegram: *"Taxi 12 soles"*
   * Telegram se lo envía a Google Sheets.
   * Google Sheets extrae el número `12` y la categoría `Transporte`, añade la fila y le responde a tu Telegram: *"¡Gasto guardado con éxito! 🚗"*

---

## Recomendación de Ruta de Desarrollo

Como no tienes experiencia técnica, para que no te estanques en configuraciones complejas, te sugiero dos fases:

* **Paso 1: Prototipo Web Propia (Fase Visual)**: Construimos una página web que parece un chat de WhatsApp con un Dashboard al costado. Esto te sirve para probar el algoritmo en español ("yapeé", "soles", etc.) y ver cómo se actualizan los gráficos de inmediato. Es ideal para mostrar tu idea a inversores o socios.
* **Paso 2: Integración con Telegram (Fase Real)**: Una vez que el algoritmo de análisis de texto funcione perfectamente en la web, conectamos ese mismo algoritmo a un **Bot de Telegram gratuito** para que puedas registrar tus gastos reales desde tu celular en la calle.
