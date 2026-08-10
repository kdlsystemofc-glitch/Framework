import { runProvidersTests } from '../tests/providers.test.js';
import { runExtractorsTests } from '../tests/extractors.test.js';
import { runAnalyzerTests } from '../tests/analyzer.test.js';
import { runCacheTests } from '../tests/cache.test.js';
import { runRankerTests } from '../tests/ranker.test.js';
import { runInspirationEngineTests } from '../tests/inspiration-engine.test.js';

async function main() {
  console.log('🚀 Running @kdl/inspiration Unit & Integration Test Suite...\n');
  try {
    await runProvidersTests();
    await runExtractorsTests();
    await runAnalyzerTests();
    await runCacheTests();
    await runRankerTests();
    await runInspirationEngineTests();
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/INSPIRATION TEST SUITES PASSED (6/6 100%)');
    console.log('==================================================');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();
