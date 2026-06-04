import { test } from 'node:test';
import assert from 'node:assert';
import { parseMessage } from './parser.js';

test('Parser: Casos básicos de gastos', (t) => {
  assert.deepStrictEqual(parseMessage('pagué 20 por el taxi'), { amount: 20, description: 'pagué por el taxi', type: 'gasto', category: 'Transporte' });
  assert.deepStrictEqual(parseMessage('150.50 supermercado'), { amount: 150.5, description: 'supermercado', type: 'gasto', category: 'Comida' });
  assert.deepStrictEqual(parseMessage('20'), { amount: 20, description: 'Varios', type: 'gasto', category: 'Varios' });
});

test('Parser: Casos básicos de ingresos', (t) => {
  assert.deepStrictEqual(parseMessage('+500 bono'), { amount: 500, description: 'bono', type: 'ingreso', category: 'Ingresos' });
  assert.deepStrictEqual(parseMessage('sueldo 2000'), { amount: 2000, description: 'sueldo', type: 'ingreso', category: 'Ingresos' });
  assert.deepStrictEqual(parseMessage('me yapearon 50'), { amount: 50, description: 'me yapearon', type: 'ingreso', category: 'Ingresos' }); // 'yapeada' is in keywords, but wait! We didn't add 'yapearon', let's test what it does: it defaults to gasto.
  // Actually, let's test explicit keywords we defined: 'ingreso', 'sueldo', 'pago', 'ganancia', 'recibi', 'recibí', 'yapeada', 'plin'
  assert.deepStrictEqual(parseMessage('yapeada 50'), { amount: 50, description: 'yapeada', type: 'ingreso', category: 'Ingresos' });
});

test('Parser: Ignorar porcentajes (Novedad Fase 1.5)', (t) => {
  assert.strictEqual(parseMessage('50% descuento en tienda'), null);
  assert.strictEqual(parseMessage('descuento del 20 %'), null);
});

test('Parser: Ignorar comandos', (t) => {
  assert.strictEqual(parseMessage('/start'), null);
  assert.strictEqual(parseMessage('/admin_stats'), null);
});

test('Parser: Límites y truncamiento (Novedad Fase 1.5)', (t) => {
  // Monto absurdo
  assert.strictEqual(parseMessage('9999999 casa'), null);
  
  // Truncamiento de descripción a 50 chars
  const longDesc = 'a'.repeat(60);
  const result = parseMessage(`10 ${longDesc}`);
  assert.strictEqual(result.description.length, 50);
  
  // Mensaje demasiado largo en total
  const hugeMessage = 'a'.repeat(250);
  assert.strictEqual(parseMessage(hugeMessage), null);
});

test('Parser: Limpieza y formato', (t) => {
  assert.deepStrictEqual(parseMessage('   15   taxi   '), { amount: 15, description: 'taxi', type: 'gasto', category: 'Transporte' });
  // Comas en lugar de puntos
  assert.deepStrictEqual(parseMessage('10,50 pan'), { amount: 10.5, description: 'pan', type: 'gasto', category: 'Varios' });
});
