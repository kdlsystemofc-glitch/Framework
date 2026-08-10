import assert from 'node:assert';
import { ConfigService } from '../src/services/config.service.js';
import path from 'path';
import fs from 'fs';
import os from 'os';

console.log('Running config tests...');
const tmpFile = path.join(os.tmpdir(), `.kdlrc-test-${Date.now()}.json`);
const service = new ConfigService(tmpFile);

const config = service.getConfig();
assert.strictEqual(config.activeProfile, 'default');

service.setActiveProfile('production');
assert.strictEqual(service.getActiveProfile().name, 'production');

if (fs.existsSync(tmpFile)) {
  fs.unlinkSync(tmpFile);
}
console.log('✔ config.test.ts passed');
