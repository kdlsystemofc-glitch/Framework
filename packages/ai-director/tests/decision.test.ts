import assert from 'node:assert';
import { DecisionLogger } from '../src/decision-engine/decision-logger.js';
import { InspirationDiscoveryResult } from '@kdl/inspiration';

export async function runDecisionTests() {
  console.log('Running decision logger tests...');

  const mockInspiration = {
    synthesizedTokens: {
      colors: { dominant60: '#000', accent10: '#fff' },
      layout: { bentoAsymmetryRatio: 0.65 },
      motion: { easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  } as unknown as InspirationDiscoveryResult;

  const ledger = DecisionLogger.generateLedger('Test Decision', mockInspiration);
  assert.strictEqual(ledger.entries.length, 3);
  assert.strictEqual(ledger.entries[0].topic, 'Color Palette Strategy');

  console.log('✔ decision.test.ts passed');
}
