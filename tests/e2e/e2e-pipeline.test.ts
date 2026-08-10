import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { OrchestratorEngine } from '../../packages/orchestrator/dist/index.js';

export async function runE2ETests() {
  console.log('🚀 Running KDL Framework End-to-End E2E Integration Test Suite...\n');

  const realProjPath = path.resolve('examples/real-project');
  const engine = new OrchestratorEngine();

  const ctx = await engine.executePipeline(
    'L\'Étoile Fine Dining E2E Test',
    realProjPath,
    'restaurants',
    'landing-page'
  );

  console.log('Validating physical E2E artifacts...');
  assert.strictEqual(ctx.projectName, 'L\'Étoile Fine Dining E2E Test');
  assert.strictEqual(!!ctx.bootstrap, true);
  assert.strictEqual(!!ctx.inspiration, true);
  assert.strictEqual(!!ctx.director, true);
  assert.strictEqual(!!ctx.build, true);
  assert.strictEqual(!!ctx.review, true);

  const htmlPath = path.join(realProjPath, 'landing', 'index.html');
  assert.strictEqual(fs.existsSync(htmlPath), true);

  const finalAuditReportPath = path.join(realProjPath, 'reports', 'FINAL_AUDIT.md');
  assert.strictEqual(fs.existsSync(finalAuditReportPath), true);

  const execReportPath = path.join(realProjPath, 'reports', 'EXECUTION_REPORT.md');
  assert.strictEqual(fs.existsSync(execReportPath), true);

  console.log('==================================================');
  console.log('✅ KDL E2E INTEGRATION TEST PASSED (100%)');
  console.log('==================================================');
}

runE2ETests().catch((err) => {
  console.error('❌ E2E Test failed:', err);
  process.exit(1);
});
