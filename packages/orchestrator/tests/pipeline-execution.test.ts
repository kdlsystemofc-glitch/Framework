import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { OrchestratorEngine } from '../src/core/orchestrator.service.js';

export async function runPipelineExecutionTests() {
  console.log('Running end-to-end pipeline execution tests...');

  const tmpPath = path.join(process.cwd(), 'temp', 'orchestrator-test-proj');
  fs.mkdirSync(tmpPath, { recursive: true });

  const engine = new OrchestratorEngine();
  const ctx = await engine.executePipeline('Orchestrated Test Landing', tmpPath, 'restaurants', 'landing-page');

  assert.strictEqual(ctx.projectName, 'Orchestrated Test Landing');
  assert.strictEqual(!!ctx.bootstrap, true);
  assert.strictEqual(!!ctx.inspiration, true);
  assert.strictEqual(!!ctx.director, true);
  assert.strictEqual(!!ctx.build, true);
  assert.strictEqual(!!ctx.review, true);

  const reportPath = path.join(tmpPath, 'reports', 'EXECUTION_REPORT.md');
  assert.strictEqual(fs.existsSync(reportPath), true);

  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true });
  }

  console.log('✔ pipeline-execution.test.ts passed');
}
