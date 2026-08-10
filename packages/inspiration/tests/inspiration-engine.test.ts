import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { InspirationEngine } from '../src/services/inspiration.service.js';
import { InspirationCache } from '../src/cache/inspiration.cache.js';

export async function runInspirationEngineTests() {
  console.log('Running inspiration-engine integration tests...');

  const tmpCacheFile = path.join(process.cwd(), 'temp', '.test-engine-cache.json');
  if (fs.existsSync(tmpCacheFile)) {
    fs.unlinkSync(tmpCacheFile);
  }

  const cache = new InspirationCache(tmpCacheFile);
  const engine = new InspirationEngine(undefined, cache);

  const result = await engine.discover('restaurants');

  assert.strictEqual(result.sector, 'restaurants');
  assert.strictEqual(result.totalFetched >= 10, true);
  assert.strictEqual(result.topReferences.length, 5);
  assert.strictEqual(typeof result.synthesizedTokens.colors.dominant60, 'string');
  assert.strictEqual(typeof result.bestPractices.sector, 'string');

  if (fs.existsSync(tmpCacheFile)) {
    fs.unlinkSync(tmpCacheFile);
  }

  console.log('✔ inspiration-engine.test.ts passed');
}
