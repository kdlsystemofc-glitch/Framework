import assert from 'node:assert';
import { InspirationRanker } from '../src/ranking/inspiration.ranker.js';
import { InspirationReference } from '../src/types/inspiration.types.js';

export async function runRankerTests() {
  console.log('Running ranker tests...');

  const refs = [
    { id: 'ref-low', scores: { dfiiScore: 80.0 } },
    { id: 'ref-high', scores: { dfiiScore: 98.5 } },
    { id: 'ref-mid', scores: { dfiiScore: 90.0 } },
  ] as InspirationReference[];

  const ranked = InspirationRanker.rank(refs, 2);
  assert.strictEqual(ranked.length, 2);
  assert.strictEqual(ranked[0].id, 'ref-high');
  assert.strictEqual(ranked[1].id, 'ref-mid');

  console.log('✔ ranker.test.ts passed');
}
