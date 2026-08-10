import assert from 'node:assert';
import { runCLI } from '../src/index.js';

console.log('Running CLI tests...');
await runCLI(['node', 'kdl', '--help'], true);
await runCLI(['node', 'kdl', 'version'], true);
assert.strictEqual(process.exitCode, undefined, 'process.exitCode should be undefined on help/version');
console.log('✔ cli.test.ts passed');
