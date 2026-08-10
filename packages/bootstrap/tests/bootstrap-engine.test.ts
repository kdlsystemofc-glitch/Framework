import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { BootstrapEngine } from '../src/index.js';

console.log('Running bootstrap-engine integration tests...');
const tmpDir = path.join(os.tmpdir(), `kdl-bootstrap-test-${Date.now()}`);
fs.mkdirSync(path.join(tmpDir, 'briefing'), { recursive: true });
fs.writeFileSync(path.join(tmpDir, 'briefing', 'briefing.txt'), 'TW Modas Client Briefing');

const result = await BootstrapEngine.execute(tmpDir);

assert.strictEqual(result.createdDirectories.length, 11); // 'briefing' already existed
assert.ok(fs.existsSync(path.join(tmpDir, 'project-index.json')));
assert.ok(fs.existsSync(path.join(tmpDir, 'PROJECT_STATUS.json')));
assert.ok(fs.existsSync(path.join(tmpDir, 'PROJECT_ANALYSIS.md')));
assert.ok(fs.existsSync(path.join(tmpDir, 'reports', 'bootstrap-report.md')));

if (fs.existsSync(tmpDir)) {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
console.log('✔ bootstrap-engine.test.ts passed');
