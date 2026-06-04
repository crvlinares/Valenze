# Política de Privacidad y Términos de Uso - Valanze Bot

**Última actualización:** Junio 2026

En **Valanze** respetamos tu privacidad y cumplimos con la normativa peruana vigente, específicamente la **Ley N° 29733 (Ley de Protección de Datos Personales)** y su Reglamento.

## 1. ¿Qué datos recopilamos?
Cuando utilizas Valanze a través de Telegram, recopilamos única y exclusivamente:
- Tu ID público de Telegram y tu nombre de usuario (para identificarte).
- Los montos, fechas y descripciones de texto de los gastos e ingresos que decides registrar en el chat.

## 2. ¿Para qué usamos tus datos?
- Para proporcionarte reportes financieros y calcular tu balance personal en tiempo real.
- **No** vendemos, alquilamos ni compartimos tus datos financieros con terceros, agencias de publicidad o burós de crédito.

## 3. Seguridad y Zero-Trust
Hemos diseñado Valanze bajo una arquitectura de "Confianza Cero" (Zero-Trust). 
- Los datos se almacenan en servidores seguros (PostgreSQL) con políticas estrictas de seguridad a nivel de fila (RLS). 
- Nadie, ni siquiera los desarrolladores de Valanze, puede acceder a tus registros financieros gracias a que el sistema requiere una firma criptográfica (JWT) generada dinámicamente desde tu cuenta de Telegram.

## 4. Tus Derechos (Derechos ARCO)
De acuerdo a la Ley peruana, tienes derecho a **Acceder, Rectificar, Cancelar u Oponerte** al uso de tus datos. 
Si deseas eliminar todo tu historial financiero de nuestros servidores, puedes contactar al soporte y tu cuenta será borrada de forma permanente e irrecuperable.

## 5. Futuras Integraciones (Vouchers y Audios)
Valanze está diseñado para evolucionar. En el futuro, podríamos ofrecer la lectura de recibos mediante fotos o registro de gastos mediante notas de voz. Si implementamos estas funciones, cualquier imagen o audio será procesado en tiempo real y **no será almacenado permanentemente** en nuestros servidores, extrayendo únicamente el valor numérico y el texto descriptivo.

---
*Al utilizar el bot de Valanze, aceptas estas condiciones.*
