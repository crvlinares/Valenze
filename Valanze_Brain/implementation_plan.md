# Plan de Implementación: App de Finanzas Conversacionales - MVP Telegram (Fase 1)

Este documento detalla el plan de desarrollo técnico para construir la **Fase 1 (MVP)** utilizando **Supabase** como base de datos en su plan gratuito y un **Bot de Telegram** como interfaz conversacional para 20 usuarios.

---

## 1. Arquitectura Técnica de la Fase 1 (Con Supabase)

Para evitar la complejidad de migrar datos de Google Sheets a una base de datos más adelante, utilizaremos el **Plan Gratuito de Supabase** desde el primer día. Esto nos permite estructurar la información de forma profesional y segura.

```
[Usuario (Telegram App)] ──(Envía texto)──► [Servidores de Telegram]
                                                   │
                                                   ▼ (Webhook HTTP POST)
[Supabase (DB PostgreSQL)] ◄── [Backend Script (Parser & Conector API)]
```

*   **Telegram Bot API**: Canal de comunicación 100% gratuito.
*   **Conector/Parser**: Un pequeño script en JavaScript (puede ejecutarse en un entorno serverless gratis o directamente en un script de integración) que recibe el mensaje de Telegram, extrae la información y llama a la API de Supabase.
*   **Base de Datos (Supabase)**: Almacena los registros estructurados de los 20 usuarios en una base de datos relacional PostgreSQL de forma privada.

---

## 2. Modelado de Datos (Tablas en Supabase)

### Tabla: `transacciones`
*   `id`: Entero (Clave primaria autoincremental).
*   `telegram_id`: Texto (Identificador único de la cuenta de Telegram del usuario).
*   `fecha`: Timestamp (Fecha y hora del registro).
*   `tipo`: Texto (`"Gasto"` o `"Ingreso"`).
*   `descripcion`: Texto (Concepto del registro, ej: *"sueldo"*, *"menú"*).
*   `monto`: Decimal (Valor numérico de la transacción).
*   `texto_original`: Texto (Mensaje bruto enviado por el usuario).

---

## 3. Comandos y Lógica del Bot (Complejidad del MVP)

Agregar la funcionalidad de **Ingresos** y consulta de **Balance** es sumamente sencillo y no añade complejidad al desarrollo. Definiremos las siguientes reglas:

### A. Registro de Gastos (Por defecto)
*   Si el usuario escribe el concepto seguido del monto (o viceversa), se registra como **Gasto**.
    *   Ejemplo: *"menu 15"* o *"taxi 12"* $\rightarrow$ Tipo: `Gasto`, Monto: `15.00` / `12.00`.

### B. Registro de Ingresos (Comando especial o símbolo `+`)
*   Para registrar un ingreso, el usuario antepone el signo **`+`** o escribe la palabra **`ingreso`**.
    *   Ejemplo: *"+1000 sueldo"*, *"ingreso 150 venta"*.
    *   **Lógica**: El parser detecta el signo `+` o la palabra clave, extrae el número como monto y la descripción, y lo registra como Tipo: `Ingreso`.

### C. Comandos del Chat
1.  **`/start`**: Da la bienvenida y explica cómo usar el bot.
2.  **`/balance`**: Consulta Supabase, suma todos los ingresos del usuario, resta todos sus gastos y le responde:
    *   *"💰 **Tu Balance Actual**: S/. 450.00\n📈 Ingresos: S/. 1,000.00\n📉 Gastos: S/. 550.00"*
3.  **`/help`**: Muestra ejemplos rápidos de registro.

---

## 4. Comparativa con Aplicaciones Existentes (Dolores y Enfoque)

Según los documentos investigados, las apps que más se asemejan a este MVP por su filosofía de análisis de texto e ingresos/gastos son:

1.  **Shmoney / CountPesa (Kenia)**:
    *   *Semejanza*: Procesan texto plano localmente (notificaciones de SMS) para calcular saldos y balances consolidados de dinero móvil. Nuestra lógica de parsing es idéntica, pero usando la app de Telegram.
2.  **Axio (India)**:
    *   *Semejanza*: Es un asistente financiero que estructura mensajes de texto en una base de datos centralizada de gastos.
3.  **Monefy (Latam) / Actual Budget (Europa)**:
    *   *Semejanza*: Se centran en el balance neto simple (Ingresos - Gastos) sin integrarse a cuentas bancarias complejas, permitiendo al usuario ver de inmediato cuánto dinero le queda disponible en sus billeteras manuales.

---

## 5. Plan de Verificación

*   **Prueba de Gasto**: Escribir *"almuerzo 18"*. Verificar que el bot responda: *"Registrado gasto: almuerzo por S/. 18.00"*.
*   **Prueba de Ingreso**: Escribir *"+1200 sueldo"*. Verificar que responda: *"Registrado ingreso: sueldo por S/. 1,200.00"*.
*   **Prueba de Balance**: Enviar el comando `/balance` y verificar que la operación matemática (1200 - 18 = 1182) sea correcta y se muestre en pantalla.
