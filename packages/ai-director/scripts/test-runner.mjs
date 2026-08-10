import { runReasonerTests } from '../tests/reasoner.test.js';
import { runDNATests } from '../tests/dna.test.js';
import { runDecisionTests } from '../tests/decision.test.js';
import { runConstraintsTests } from '../tests/constraints.test.js';
import { runOriginalityTests } from '../tests/originality.test.js';
import { runAIDirectorTests } from '../tests/ai-director.test.js';

async function main() {
  console.log('🚀 Running @kdl/ai-director Unit & Integration Test Suite...\n');
  try {
    await runReasonerTests();
    await runDNATests();
    await runDecisionTests();
    await runConstraintsTests();
    await runOriginalityTests();
    await runAIDirectorTests();
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/AI-DIRECTOR TEST SUITES PASSED (6/6 100%)');
    console.log('==================================================');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();
