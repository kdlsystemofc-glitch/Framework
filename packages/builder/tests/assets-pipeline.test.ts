import assert from 'node:assert';
import { AssetsPipeline } from '../src/assets/assets.pipeline.js';

export async function runAssetsPipelineTests() {
  console.log('Running assets pipeline tests...');

  const assets = AssetsPipeline.processAssets(process.cwd());
  assert.strictEqual(assets.length > 0, true);
  assert.strictEqual(assets[0].optimizedFormat, 'webp');

  console.log('✔ assets-pipeline.test.ts passed');
}
