# Mapeo de Aplicaciones y Categorías No Contempladas

Este análisis cruza las 3 opciones de MVP propuestas con los casos reales descritos en los documentos de arquitectura y benchmarks, identificando qué apps se asemejan a nuestras ideas y qué otros enfoques estamos dejando fuera por ahora.

---

## 1. Relación de los Documentos con Nuestras 3 Opciones

A continuación se detalla qué aplicaciones de los documentos de arquitectura siguen filosofías similares a nuestras opciones de MVP, clasificadas con **al menos 3 ejemplos por zona geográfica relevante**.

### A. Semejantes a la Opción 1 (Ecosistema Google Sheets / Excel / Híbrido)
Son apps que permiten exportar datos, modelar escenarios libres o se integran con flujos de trabajo personalizados (hojas de cálculo):

1. **Oceanía (Australia/Nueva Zelanda)**:
   * **Sharesight**: Especializada en consolidar portafolios y generar reportes fiscales que los usuarios del movimiento FIRE (independencia financiera) exportan y combinan en Microsoft Excel para análisis avanzados.
   * **PocketSmith**: Permite la exportación masiva de transacciones transfronterizas que luego los usuarios ingieren en sus propios modelos de hojas de cálculo personalizados para tener flexibilidad sin restricciones de interfaz.
2. **Norteamérica**:
   * **Quicken Simplifi**: Se conecta con software tradicional de contabilidad de escritorio y permite exportar e interactuar con formatos de hojas de cálculo tradicionales para control detallado.
3. **Europa / Global**:
   * **Buxfer**: Muy orientada a usuarios avanzados que prefieren hacer proyecciones ("forecasting") y exportar datos limpios para modelar en Excel/Google Sheets.

### B. Semejantes a la Opción 2 (PC/Móvil Totalmente Offline y Manual)
Apps que priorizan la privacidad absoluta, el registro manual rápido y funcionan sin necesidad de conectarse a internet o a las credenciales del banco:

1. **Latinoamérica (Foco principal de entrada manual)**:
   * **Organizze (Brasil)**: Funciona completamente sin conexión a internet y su propuesta de valor central es no solicitar credenciales bancarias por seguridad.
   * **Monefy (Uso regional)**: Diseñada para introducir transacciones en un solo clic de forma manual, ideal para gastos cotidianos en efectivo.
   * **Gastos Diarios**: Enfocada en capturar los "gastos hormiga" del día a día mediante entrada manual directa y gráficos reactivos locales.
2. **Europa / Global**:
   * **Actual Budget**: Alternativa de código abierto y local que prioriza la privacidad descentralizada y el control de datos por parte del usuario sin exponerlos en la nube.
   * **Goodbudget**: Basada en el método tradicional de sobres manuales, donde el usuario crea y administra sus categorías manualmente sin automatización bancaria.
3. **Asia**:
   * **Toshl Finance**: Diseñada para registrar transacciones de forma manual en múltiples divisas (ideal para viajeros), con gráficos y base de datos local.

### C. Semejantes a la Opción 3 (App Móvil con Entrada de Datos/Mensajería/Voz)
Apps que operan en teléfonos móviles y capturan transacciones procesando texto de mensajes (SMS) o datos de forma local:

1. **Asia (India / Japón)**:
   * **Axio (India)**: Automatiza el registro de gastos leyendo en segundo plano los mensajes SMS que envían los bancos al celular.
   * **Zaim (Japón)**: Permite registrar gastos tomando fotos a los recibos de papel físicos (OCR) para evitar el registro escrito.
2. **África (Kenia)**:
   * **Shmoney / CountPesa**: Apps móviles que interceptan localmente los SMS de la red de dinero móvil M-Pesa para estructurar los gastos sin salir del dispositivo.
3. **Latinoamérica**:
   * **Mobills (Brasil)**: App móvil enfocada en alertas restrictivas inmediatas en el celular cuando el usuario está a punto de sobrepasar su límite diario.

---

## 2. ¿Qué tipos de aplicaciones NO estamos contemplando?

Al diseñar herramientas sencillas de registro (manuales o de Sheets), estamos dejando fuera 4 categorías complejas de la industria PFM (Gestión de Finanzas Personales):

### Categoría 1: Apps de Negociación y Conserjería Automatizada (SaaS Activo)
Estas apps no solo registran datos, sino que actúan en representación del usuario para ahorrarle dinero de forma activa.
* **Norteamérica**: **Rocket Money** (detecta suscripciones olvidadas y las cancela con un clic, además de llamar a los proveedores para negociar rebajas de tarifas).
* **Europa**: **Snoop** (a través de *Snoop Bot*, analiza tus facturas y te cambia de proveedor de luz, internet o seguros automáticamente si encuentra tarifas más baratas).
* **Oceanía**: **Finder App** (correlaciona tu gasto con tu puntaje de crédito para recomendarte activamente refinanciar tu hipoteca o cambiar de banco).

### Categoría 2: Super-Apps de Inversión y Ahorro Inflexible (Wealth Management)
Apps que bloquean el dinero o lo mueven directamente a la bolsa de valores para ganarle a la inflación.
* **África (Nigeria)**: 
  * **PiggyVest** (función *SafeLock*, un candado digital que prohíbe físicamente al usuario retirar su propio dinero hasta una fecha determinada).
  * **Cowrywise** (conecta los ahorros directamente con fondos mutuos regulados por la SEC que rinden entre 18% y 25% anual).
* **Oceanía (Australia)**: **Raiz** y **Spaceship** (realizan micro-inversiones automáticas redondeando tus compras del día a día y metiendo el excedente en carteras de acciones).
* **Asia (India)**: **Groww** y **INDmoney** (dashboards que integran tus gastos con tu portafolio de acciones, fondos mutuos y optimización de impuestos).

### Categoría 3: Agregadores Multibancarios de APIs (Open Banking Tradicional)
Apps que requieren conectarse en tiempo real a las bases de datos de todos tus bancos mediante contratos regulatorios de latencia cero.
* **Europa**: **Emma** (utiliza APIs del Open Banking europeo y calcula el "True Balance" restando de tu saldo real las suscripciones futuras).
* **Latinoamérica**: **Finerio (México)** (agregador bancario de cuentas y tarjetas).
* **Oceanía**: **Frollo (Australia)** (utiliza el marco estatal CDR para jalar balances sin latencia).

### Categoría 4: Neobancos y Billeteras Digitales Remuneradas (Ecosistemas de Pago)
No son herramientas de presupuesto aisladas; son los bancos donde la gente realmente guarda y gasta su dinero.
* **Latinoamérica**: **Nubank** (neobanco masivo con cuentas remuneradas y tarjetas), **Nequi (Colombia)** (billetera digital con metas de ahorro), **Mercado Pago** y **Ualá** (ecosistemas de tarjetas prepago).
* **Oriente Medio**: **Liv (EAU)** (banco digital enfocado en el estilo de vida de jóvenes, que combina cuentas con división de cuentas con amigos).
* **África**: **Kuda (Nigeria)** (banco digital sin comisiones con la funcionalidad *Spend+Save*).

---

## Resumen de Dirección Estratégica

Para tu MVP, **no estamos contemplando** la conexión directa con bancos (Categoría 3), ni la custodia de dinero o inversiones (Categoría 2), ni el cobro/banco digital (Categoría 4), ni la negociación automatizada (Categoría 1). 

Esto es **positivo** porque:
* Evitamos barreras legales pesadas en Perú (Superintendencia de Banca y Seguros - SBS).
* No dependemos de integraciones costosas o inestables con bancos locales.
* Nos enfocamos 100% en la **experiencia de usuario conversacional (fácil, rápida e inteligente)**, que es el verdadero diferenciador para resolver el descontrol de gastos hormiga y del efectivo.
