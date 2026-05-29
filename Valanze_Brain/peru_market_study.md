# Estudio de Mercado Peruano y Business Model Canvas (BMC)

Este documento presenta una investigación profunda sobre el comportamiento financiero del consumidor peruano, analiza la competencia local y propone la viabilidad de utilizar **Supabase** desde el primer día, culminando con el Business Model Canvas (BMC) para tu startup.

---

## 1. Viabilidad de usar Supabase en el MVP (Plan Gratuito)

**Sí, es totalmente posible y muy recomendado utilizar Supabase desde el inicio del MVP.** 

Supabase ofrece una capa gratuita sumamente generosa que elimina la necesidad de programar y hospedar un backend tradicional.

### Beneficios del Plan Gratuito de Supabase para tu MVP:
1. **Base de Datos PostgreSQL Dedicada**: Hasta 500 MB de almacenamiento (suficiente para millones de registros de transacciones de texto de tus primeros usuarios).
2. **Autenticación Integrada**: Soporta registro de usuarios por Email, Google o incluso **Magic Links** (enlace de acceso rápido sin contraseña) para hasta 50,000 usuarios activos mensuales.
3. **API REST Instantánea**: Supabase crea automáticamente endpoints de consulta seguros basados en las tablas de tu base de datos.
4. **Almacenamiento de Archivos**: Hasta 1 GB gratuito, lo cual es ideal si en el futuro queremos guardar los audios de voz (notas de voz) de los usuarios para procesarlos.

```
[App Web / Bot de Telegram] ────(Llamada API directa con Supabase JS SDK)────► [Supabase (DB & Auth)]
 (HTML/CSS/JS en local)                                                        (Servicios en la Nube Gratis)
```

---

## 2. Investigación del Consumidor Peruano: Dolores y Patrones Financieros

Basado en el **Índice de Inclusión Financiera de Credicorp** e informes de la **SBS** y el **BCRP**, el comportamiento financiero del peruano promedio presenta características y desafíos muy particulares:

### A. Dolores Clave del Consumidor Peruano
1. **El "Descontrol de Yape/Plin"**: Con más de 15 millones de usuarios en Yape, los peruanos yapean montos pequeños constantemente (pasajes, menú, emoliente, snacks). Debido a que no hay fricción al yapear, el dinero "desaparece" de la cuenta sin que el usuario se dé cuenta. Yape **no categoriza ni analiza** en qué gastas.
2. **Desconfianza y Temor a la Ciberdelincuencia**: Existe una justificada resistencia a vincular cuentas bancarias directamente a apps de terceros debido a las constantes olas de phishing y robos. Una app que no pide claves de banco es mejor recibida.
3. **Flujos de Ingreso Variables e Informalidad**: Más del 70% del empleo en Perú es informal. Gran parte de los usuarios no tiene un "salario fijo" mensual a fin de mes, sino ingresos variables semanales o diarios, lo que hace que los presupuestos tradicionales rígidos no funcionen.

### B. Patrones y "Hacks" Financieros del Peruano
* **El Ahorro bajo el Colchón**: El ahorro informal sigue siendo masivo. Los peruanos ahorran guardando dinero físico en sobres o latas en sus casas.
* **Las "Juntas"**: Es el sistema de ahorro grupal y cooperativo más famoso de Perú. Un grupo de amigos, compañeros de trabajo o familiares aporta una cuota mensual (ej: S/. 100) y cada mes un miembro del grupo recibe el pozo acumulado. Es una forma de financiamiento sin intereses basada en la confianza.
* **Uso Intensivo del Tipo de Cambio**: El peruano promedio suele ahorrar o endeudarse en dólares (ej: para pagar alquileres, autos o tecnología) pero recibe sus ingresos en soles, lo que lo obliga a cotizar el tipo de cambio constantemente en plataformas web (Kambista, Rextie).

---

## 3. Adaptando el MVP al Contexto Peruano

Sabiendo esto, no debemos crear una copia de una app norteamericana. Nuestro MVP debe incorporar funcionalidades con **identidad peruana**:

1. **Auto-Detección de Yape/Plin (Conversacional)**:
   * El algoritmo debe reconocer frases peruanas comunes: *"Yapeé 12 soles por almuerzo"*, *"Plineé 10 a Juan por el taxi"*, *"Retiré 50 del cajero"*, *"Cambié 100 dólares en Kambista"*.
2. **Simulador Conversacional de "Juntas"**:
   * Permitir que el bot entienda: *"Metí 100 soles a la junta de la oficina"*. La app restará ese dinero de su balance disponible y lo colocará en una categoría de "Ahorro Grupal".
3. **Control de "Gastos Hormiga" con Micro-Metas**:
   * Mostrar una alerta especial de "Cuidado con el Yape" si acumula muchos micro-gastos yapeados en el día.

---

## 4. Business Model Canvas (BMC)

Este lienzo de modelo de negocio estructura el proyecto como una empresa fintech viable y escalable:

| **Socios Clave** | **Actividades Clave** | **Propuestas de Valor** | **Relación con Clientes** | **Segmentos de Clientes** |
| :--- | :--- | :--- | :--- | :--- |
| • **Google Cloud / Supabase**: Proveedores de nube.<br>• **Telegram/WhatsApp**: Plataformas de comunicación.<br>• **Fintechs de Cambio de Divisas (ej. Kambista)**: Socios para referidos.<br>• **Microfinancieras y Cajas Municipales**: Socios B2B para integración futura. | • Desarrollo y mejora del algoritmo de análisis de texto (NLP).<br>• Mantenimiento del dashboard web.<br>• Campañas de educación financiera digital en redes sociales (TikTok/Instagram) para generar confianza. | **"El registro de gastos más rápido de Perú, por chat o audio de voz"**<br>• Cero conexión a bancos para máxima seguridad.<br>• Rastreador de Yape/Plin instantáneo.<br>• Dashboard visual sencillo que te dice a dónde se fue tu dinero. | • Automatizada y amigable (el bot habla de forma coloquial y peruana: *"Listo, guardado"*).<br>• Comunidad de educación y soporte mediante canales de Telegram/WhatsApp. | **B2C (Mercado Masivo)**:<br>• Jóvenes peruanos (18-35 años) usuarios activos de Yape/Plin que sufren de descontrol de gastos y "gastos hormiga".<br>**B2B (Empresas)**:<br>• Cajas Municipales que buscan ofrecer herramientas PFM a sus ahorradores. |
| | **Recursos Clave** | | **Canales** | |
| | • Base de datos Supabase (PostgreSQL).<br>• Algoritmo de extracción NLP.<br>• Reputación de marca y comunidad de usuarios. | | • Bots de Telegram y WhatsApp.<br>• Web App responsiva.<br>• Marketing de contenido en TikTok e Instagram (viralidad financiera). | |
| **Estructura de Costos** | **Flujos de Ingresos** |
| • **Costos de Servidores (Nube)**: $0 inicial (Supabase free), escalando según volumen.<br>• **APIs de WhatsApp**: Costos marginales de Meta por plantilla de mensaje.<br>• **Marketing/Publicidad**: Enfocado en contenido orgánico viral (bajo costo inicial). | • **Suscripción Premium (S/. 9.90 / mes)**: Acceso a WhatsApp, notas de voz y sincronización automática a Google Sheets.<br>• **Comisiones por Referidos Financieros**: Ingresos por recomendar a usuarios con capacidad de ahorro productos formales (ej. cuentas remuneradas, cambio de divisas). |
