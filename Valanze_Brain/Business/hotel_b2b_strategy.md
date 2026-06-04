# Plan Estratégico B2B: Valanze "Hoteles" (Property Management Conversacional)

El sector hotelero (especialmente hoteles boutique, hostales y alojamientos medianos) es un nicho excelente. Tienen flujos de dinero constantes, pero sufren de una terrible desconexión entre la recepción y el personal operativo (limpieza, mantenimiento).

---

## 1. Análisis de Procesos en Hotelería y sus "Dolores"

En un hotel pequeño/mediano, la comunicación suele ser un caos a través de radios (walkie-talkies) o grupos de WhatsApp súper desordenados.

1.  **Limpieza (Housekeeping):** 
    *   *El problema:* La recepcionista no sabe si una habitación ya fue limpiada hasta que la mucama baja a recepción o le escribe por un grupo de WhatsApp que se llena de mensajes.
2.  **Minibar e Inventario de Habitación:** 
    *   *El problema:* El huésped se va (check-out) y recepción no sabe si consumió algo del minibar porque la mucama aún no ha revisado, perdiendo esa venta.
3.  **Mantenimiento:** 
    *   *El problema:* Se rompe la terma de la habitación 204. Se anota en un papelito en recepción y se olvida.
4.  **Reservas (Booking):** 
    *   *El problema:* Llevar el calendario (quién entra, quién sale) de forma manual.

---

## 2. La Solución "Valanze Hoteles" (El Bot Operativo)

En lugar de obligar a las mucamas y al personal de mantenimiento a instalar una app compleja o usar un Excel, **usan el bot de Telegram**.

*   **Para la Mucama (Limpieza):**
    Entra a la habitación 102, limpia, saca el celular y le manda al bot: `limpia 102`.
    *Magia:* El bot actualiza la base de datos y en la pantalla de la recepción la habitación 102 se pinta de color **Verde (Lista)**.
*   **Para el Minibar:**
    La mucama revisa la 102 y le escribe al bot: `consumo 102 2 aguas`.
    *Magia:* El bot lo añade automáticamente a la cuenta del huésped en Supabase.
*   **Para Mantenimiento:**
    La mucama nota que el aire acondicionado no funciona y escribe: `roto 102 aire`.
    *Magia:* El bot crea un "ticket" y le envía un mensaje automático al de mantenimiento: *"⚠️ Mantenimiento requerido en 102: aire"*.

---

## 3. Comparativa Tecnológica: Valanze Personal vs Valanze Hoteles

Para construir esto, la tecnología base es la misma (Supabase + Telegram + Vercel), pero la arquitectura de datos cambia radicalmente.

| Característica | Valanze Personal (Actual B2C) | Valanze Hoteles (Nuevo B2B) |
| :--- | :--- | :--- |
| **Arquitectura** | `Single-User`. Cada `telegram_id` es independiente. El usuario solo ve sus propios gastos. | `Multi-Tenant` (Multi-usuario). Un Hotel tiene **múltiples** empleados (muchos `telegram_id`s conectados al mismo hotel). |
| **Permisos (Roles)** | No existen roles. Eres el dueño de tus datos. | Existen **Roles**. El `telegram_id` de la mucama solo puede enviar comandos de limpieza. El `telegram_id` del Gerente puede ver reportes financieros. |
| **Dashboard Web** | Opcional (Fase 2). El usuario puede vivir 100% en Telegram. | **Obligatorio.** La recepcionista necesita estar sentada viendo una web con "cuadraditos" de colores (Habitaciones) que cambian en tiempo real cuando el bot recibe mensajes. |
| **Comandos del Bot** | `/balance`, `15 menu`, `+100 sueldo` | `limpia 102`, `roto 304`, `consumo 101 coca cola` |
| **Suscripción (Precio)**| S/. 5 a S/. 9 mensuales. | S/. 150 a S/. 300 mensuales (SaaS B2B). |

---

> [!IMPORTANT]
> ## ⚠️ User Review Required
> 
> Como CEO, considero que el nicho hotelero es altamente rentable y la solución técnica es brillante, pero **requiere construir un Dashboard Web para la Recepción desde el Día 1** (la recepcionista no puede trabajar solo viendo un chat de Telegram, necesita un panel visual).
> 
> 1. **¿Te gustaría que diseñemos la base de datos (Supabase) para este sistema hotelero y veamos cómo estructurarlo?**
> 2. **¿Conoces a algún dueño o recepcionista de hotel/hostal al que le podamos preguntar si este sistema por Telegram les solucionaría la vida antes de escribir el código?** (Esta es la regla de oro: vender antes de programar).
