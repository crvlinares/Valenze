# Arquitectura Técnica y Costos: Valanze Hoteles

A diferencia del MVP B2C donde cada usuario está aislado, el entorno B2B requiere una arquitectura **Multi-Tenant** (Multiusuario). Varios empleados interactúan sobre la misma "entidad" (el hotel).

## 1. Diseño de Base de Datos (Supabase) - Solo Diseño Conceptual

Para soportar este modelo, necesitamos 4 tablas principales con sus respectivas políticas de seguridad (RLS) para que un empleado del Hotel A no pueda ver los datos del Hotel B.

1.  **Tabla `hotels` (Los Clientes B2B)**
    *   `id`: UUID (Primary Key)
    *   `name`: Texto (ej. "Hostal Las Piedras")
    *   `subscription_status`: Texto (Activo / Inactivo)

2.  **Tabla `employees` (Los Usuarios de Telegram)**
    *   `telegram_id`: BigInt (Primary Key)
    *   `hotel_id`: UUID (Foreign Key a `hotels`)
    *   `role`: Texto (`"admin"`, `"recepcion"`, `"mucama"`, `"mantenimiento"`)
    *   `name`: Texto (Nombre del empleado)

3.  **Tabla `rooms` (Las Habitaciones)**
    *   `id`: UUID
    *   `hotel_id`: UUID
    *   `room_number`: Texto (ej. "101")
    *   `status`: Texto (`"sucia"`, `"limpiando"`, `"lista"`, `"mantenimiento"`)

4.  **Tabla `logs_and_tickets` (El Historial de Acciones del Bot)**
    *   `id`: UUID
    *   `hotel_id`: UUID
    *   `room_id`: UUID (Foreign Key a `rooms`)
    *   `employee_id`: BigInt (Quién reportó)
    *   `action_type`: Texto (`"limpieza"`, `"consumo_minibar"`, `"ticket_mantenimiento"`)
    *   `description`: Texto (ej. "Consumió 2 aguas" o "Foco quemado")
    *   `created_at`: Timestamp

## 2. Estructura de Costos del Negocio (Mantenimiento)

La enorme ventaja de esta arquitectura es que los costos de infraestructura son increíblemente bajos, lo que nos da márgenes de ganancia (Profit Margins) de más del 90%.

| Herramienta | Costo Fase Inicial (0 - 5 Hoteles) | Costo Escala (+20 Hoteles) | ¿Por qué cobra esto? |
| :--- | :--- | :--- | :--- |
| **Telegram Bot API** | **$0 / mes** | **$0 / mes** | Telegram es 100% gratuito sin importar cuántos mensajes envíen los hoteles. |
| **Vercel (Servidor Web)** | **$0 / mes** (Plan Hobby) | **$20 / mes** (Plan Pro) | Cuando muchos hoteles envíen miles de mensajes al día, necesitaremos el plan Pro para que no haya límites de ejecución. |
| **Supabase (Base de Datos)**| **$0 / mes** (Plan Free) | **$25 / mes** (Plan Pro) | El plan Pro de Supabase es necesario a escala para tener respaldos automáticos diarios (Backups) y bases de datos más grandes. |
| **Dominio Web (.com)** | **$12 / año** | **$12 / año** | El nombre de tu marca (ej. valanzehotels.com). |

**Resumen de Costos:**
Puedes validar y operar con tus primeros 5 clientes B2B gastando exactamente **$0 mensuales**.
Cuando el negocio crezca, tus costos operativos fijos en la nube serán de aprox. **$45 USD mensuales**. Si le cobras a cada hotel $50 USD al mes, ¡con un solo cliente ya cubres toda la infraestructura tecnológica de todos los demás!

---

> [!IMPORTANT]
> ## ⚠️ User Review Required
> Revisa este esquema de tablas. ¿Ves alguna métrica o dato extra de un hotel que deberíamos estar guardando (ej. control de sábanas, tiempo que tarda la mucama en limpiar)?
