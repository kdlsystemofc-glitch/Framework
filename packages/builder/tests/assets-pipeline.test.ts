import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { AssetsPipeline } from '../src/assets/assets.pipeline.js';

export async function runAssetsPipelineTests() {
  console.log('Running assets pipeline tests...');

  const tmpDir = path.resolve(process.cwd(), 'temp', 'assets-pipeline-test-dir');
  const logoDir = path.join(tmpDir, 'Assets', 'logo');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(logoDir, { recursive: true });

  // Create dummy logo file
  const logoPath = path.join(logoDir, 'logo.png');
  fs.writeFileSync(logoPath, Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082', 'hex'));

  const result = AssetsPipeline.processAssets(tmpDir);

  assert.strictEqual(result.generated.length > 0, true, 'Must process generated assets');
  assert.ok(result.manifest.logo, 'Must resolve logo in manifest');
  assert.strictEqual(result.manifest.logo.role, 'logo');

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('✔ assets-pipeline.test.ts passed');
}
