import { runHTMLBuilderTests } from '../tests/html-builder.test.js';
import { runAssetsPipelineTests } from '../tests/assets-pipeline.test.js';
import { runMotionPipelineTests } from '../tests/motion-pipeline.test.js';
import { runSEOPipelineTests } from '../tests/seo-pipeline.test.js';
import { runComponentLibraryTests } from '../tests/component-library.test.js';
import { runBuilderServiceTests } from '../tests/builder-service.test.js';

async function main() {
  console.log('🚀 Running @kdl/builder Unit & Integration Test Suite...\n');
  try {
    await runHTMLBuilderTests();
    await runAssetsPipelineTests();
    await runMotionPipelineTests();
    await runSEOPipelineTests();
    await runComponentLibraryTests();
    await runBuilderServiceTests();
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/BUILDER TEST SUITES PASSED (6/6 100%)');
    console.log('==================================================');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();
