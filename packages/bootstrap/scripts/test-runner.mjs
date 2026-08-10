console.log('🚀 Running @kdl/bootstrap Unit & Integration Test Suite...\n');

(async () => {
  try {
    await import('../tests/classifier.test.js');
    await import('../tests/scanner.test.js');
    await import('../tests/validator.test.js');
    await import('../tests/bootstrap-engine.test.js');
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/BOOTSTRAP TEST SUITES PASSED (4/4 100%)');
    console.log('==================================================');
  } catch (err) {
    console.error('❌ Test suite failed:', err);
    process.exit(1);
  }
})();
