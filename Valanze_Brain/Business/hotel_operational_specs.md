# Especificaciones Técnicas y Operativas: Valanze Hoteles

Este documento detalla el alcance operativo del sistema para presentarlo a gerentes y dueños de hoteles. Define exactamente qué operaciones cubre la plataforma y cómo se integra con los procesos de reservas y reseñas.

---

## 1. Alcance Operativo (¿Qué operaciones cubrimos hoy?)

Valanze Hoteles está diseñado para ser el "cerebro operativo interno" del hotel, eliminando el papel y los grupos de WhatsApp. Cubrimos 4 pilares:

1.  **Limpieza en Tiempo Real (Housekeeping):** El personal de limpieza cambia el estado de las habitaciones mediante comandos de chat (`limpia 204`). La recepción ve un mapa visual de habitaciones que cambia de rojo (sucia) a verde (lista) al instante, agilizando el check-in.
2.  **Gestión de Mantenimiento (Ticketing):** Reportes instantáneos de daños (`roto 105 tv`). El sistema alerta al técnico y el administrador puede medir cuánto tarda en repararse.
3.  **Auditoría de Minibar/Consumos:** La mucama reporta el consumo exacto antes de que el huésped llegue a recepción (`consumo 301 2 aguas`), evitando fugas de dinero por cobros olvidados en el check-out.
4.  **Dashboard de Recepción (Panel de Control):** Una pantalla web donde el recepcionista tiene la vista de pájaro de todo el hotel (ocupación, limpieza, tickets abiertos).

---

## 2. Gestión de Reservas (Booking) y Recepción

No somos una agencia de viajes (como Booking.com o Expedia), somos el sistema de gestión del hotel (PMS - Property Management System).

*   **Fase 1 (MVP Manual):** La recepcionista registra las nuevas reservas que entran por teléfono o por Booking.com directamente en el Panel Web de Valanze (o enviando un comando al bot: `reserva 204 Juan Perez 15-ago 18-ago`). El sistema bloquea las fechas y crea la cuenta del huésped.
*   **Fase 2 (Integración API):** Podemos conectar Valanze mediante API directamente con Booking.com y Airbnb (Channel Manager). Así, si alguien reserva en Booking, el calendario de Valanze se bloquea automáticamente sin intervención humana.

---

## 3. Automatización de Reseñas (Reputation Management)

Podemos abarcar la gestión de reputación online convirtiéndola en un proceso automático para atrapar quejas antes de que lleguen a internet.

*   **Flujo Inteligente de Reseñas:**
    1. Durante el check-out, el sistema (vía WhatsApp/Telegram o SMS) le envía un mensaje automático al huésped: *"¡Gracias por visitar Hostal Las Piedras! ¿Cómo calificarías tu estadía del 1 al 5?"*
    2. **Si el huésped responde 4 o 5:** El bot le responde: *"¡Nos alegra mucho! ¿Nos ayudarías copiando tu experiencia en TripAdvisor/Google Maps? [Link]"*. (Multiplicamos las reseñas positivas públicas).
    3. **Si el huésped responde 1, 2 o 3:** El bot le responde: *"Lamentamos escuchar eso. ¿Qué falló para poder mejorarlo de inmediato?"*. (Atrapamos la queja de forma privada y le llega una alerta al gerente, evitando que destruyan la reputación pública del hotel).

---

> [!IMPORTANT]
> ## ⚠️ User Review Required (Para ti y el Dueño del Hotel)
> 
> Esta propuesta es muy ambiciosa y altamente cobrable (un hotel pagaría feliz $100-$200 USD mensuales por esto).
> 
> 1. **Para el dueño:** De todas estas funciones (Limpieza, Reservas, Reseñas Inteligentes), ¿cuál es su prioridad número 1 para el primer mes de uso?
> 2. **Para ti (CEO):** ¿Quieres que estructuremos la base de datos para atacar el módulo de "Reseñas Inteligentes" (que es el más fácil de programar con bots) o el módulo de "Panel de Limpieza en vivo"?
