import { runAuditorsTests } from '../tests/auditors.test.js';
import { runCorrectorTests } from '../tests/corrector.test.js';
import { runGatesTests } from '../tests/gates.test.js';
import { runReporterTests } from '../tests/reporter.test.js';
import { runReviewerServiceTests } from '../tests/reviewer-service.test.js';

async function main() {
  console.log('🚀 Running @kdl/reviewer Unit & Integration Test Suite...\n');
  try {
    await runAuditorsTests();
    await runCorrectorTests();
    await runGatesTests();
    await runReporterTests();
    await runReviewerServiceTests();
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/REVIEWER TEST SUITES PASSED (5/5 100%)');
    console.log('==================================================');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();
