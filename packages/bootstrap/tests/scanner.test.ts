import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { FolderScanner } from '../src/scanner/folder.scanner.js';

console.log('Running scanner tests...');
const tmpDir = path.join(os.tmpdir(), `kdl-scanner-test-${Date.now()}`);
fs.mkdirSync(path.join(tmpDir, 'briefing'), { recursive: true });
fs.writeFileSync(path.join(tmpDir, 'briefing', 'briefing.txt'), 'Sample client briefing content');

const scanner = new FolderScanner(tmpDir);
const { files, directories } = scanner.scan();

assert.strictEqual(files.length, 1);
assert.strictEqual(files[0].filename, 'briefing.txt');
assert.ok(files[0].sha256.length > 0);

if (fs.existsSync(tmpDir)) {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
console.log('✔ scanner.test.ts passed');
