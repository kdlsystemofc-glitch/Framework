import { runAuditorsTests } from '../tests/auditors.test.js';
import { runCorrectorTests } from '../tests/corrector.test.js';
import { runGatesTests } from '../tests/gates.test.js';
import { runReporterTests } from '../tests/reporter.test.js';
import { runReviewerServiceTests } from '../tests/reviewer-service.test.js';
import { runBadLandingTests } from '../tests/bad-landing.test.js';
import { runScoreAntiFraudTests } from '../tests/score-anti-fraud.test.js';

async function main() {
  console.log('🚀 Running @kdl/reviewer Unit & Integration Test Suite...\n');
  try {
    await runAuditorsTests();
    await runCorrectorTests();
    await runGatesTests();
    await runReporterTests();
    await runReviewerServiceTests();
    await runBadLandingTests();
    await runScoreAntiFraudTests();
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/REVIEWER TEST SUITES PASSED (7/7 100%)');
    console.log('==================================================');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();
