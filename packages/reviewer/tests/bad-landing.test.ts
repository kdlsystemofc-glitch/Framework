import assert from 'node:assert';
import path from 'node:path';
import { ReviewerService } from '../src/services/reviewer.service.js';

export async function runBadLandingTests() {
  console.log('Running Bad Landing Reprobation tests...');

  const badProjectPath = path.resolve(process.cwd(), '../../tests/fixtures/bad-landing');

  const reviewer = new ReviewerService();
  const result = await reviewer.runReview({
    projectPath: badProjectPath,
    projectName: 'Bad Landing Test Project',
    clientContext: { businessName: { value: 'Real Client Name', isConfirmed: true } },
  });

  // Requirement 33: The Reviewer MUST fail bad landing fixture
  assert.strictEqual(result.passedAllGates, false, 'Bad landing fixture MUST NOT pass quality gates');
  assert.ok(result.totalIssuesFound > 0, 'Bad landing fixture MUST produce audit issues');
  assert.ok(result.failedGatesCount > 0 || result.notMeasuredGatesCount > 0, 'Bad landing fixture MUST have failed or unmeasured gates');

  console.log('✔ bad-landing.test.ts passed (Bad Landing Reprobated as Expected)');
}
