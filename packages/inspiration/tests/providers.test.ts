import assert from 'node:assert';
import { AwwwardsProvider } from '../src/providers/awwwards.provider.js';
import { GodlyProvider } from '../src/providers/godly.provider.js';

export async function runProvidersTests() {
  console.log('Running providers tests...');

  const awwwards = new AwwwardsProvider();
  const awwwardRefs = await awwwards.fetchReferences('restaurants');
  assert.strictEqual(awwwardRefs.length, 1);
  assert.strictEqual(awwwardRefs[0].source, 'Awwwards');
  assert.strictEqual(awwwardRefs[0].sector, 'restaurants');

  const godly = new GodlyProvider();
  const godlyRefs = await godly.fetchReferences('fashion');
  assert.strictEqual(godlyRefs.length, 1);
  assert.strictEqual(godlyRefs[0].source, 'Godly');

  console.log('✔ providers.test.ts passed');
}
