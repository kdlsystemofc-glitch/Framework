import assert from 'node:assert';
import { FrameworkLoader } from '../src/core/framework-loader.js';
import { Orchestrator } from '../src/core/orchestrator.js';

console.log('Running framework-loader tests...');
const loader = new FrameworkLoader('c:/Framework');
const root = loader.findFrameworkRoot();
assert.ok(root.toLowerCase().includes('framework'), 'Root should contain framework');

const manifest = loader.loadManifest();
assert.strictEqual(manifest.version, '1.0.0', 'Manifest version should be 1.0.0');
assert.strictEqual(manifest.phases.length, 12, 'Should load 12 phases');

const orchestrator = new Orchestrator('c:/Framework');
const state = orchestrator.initSession('test-gourmet', 'Fine Dining');
assert.strictEqual(state.getState().projectName, 'test-gourmet');
assert.strictEqual(state.getState().niche, 'Fine Dining');
console.log('✔ framework-loader.test.ts passed');
