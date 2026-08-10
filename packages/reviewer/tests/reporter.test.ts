import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { FinalAuditReporter } from '../src/reports/final-audit.reporter.js';
import { ReviewResult } from '../src/types/reviewer.types.js';

export async function runReporterTests() {
  console.log('Running final audit reporter tests...');

  const tmpPath = path.join(process.cwd(), 'temp', 'reporter-test');
  const mockResult: ReviewResult = {
    projectName: 'Test Audit',
    projectPath: tmpPath,
    iterationCount: 1,
    overallScore: 98,
    auditorResults: [],
    qualityGates: [{ name: 'Performance Score', score: 98, minRequiredScore: 90, passed: true }],
    passedAllGates: true,
    totalIssuesFound: 0,
    totalAutoFixesApplied: 0,
    finalReportPath: '',
  };

  const reportPath = FinalAuditReporter.generateReport(tmpPath, mockResult);
  assert.strictEqual(fs.existsSync(reportPath), true);

  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true });
  }

  console.log('✔ reporter.test.ts passed');
}
