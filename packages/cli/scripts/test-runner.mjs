console.log('🚀 Running @kdl/cli Unit & Integration Test Suite...\n');

(async () => {
  try {
    await import('../tests/cli.test.ts');
    await import('../tests/framework-loader.test.ts');
    await import('../tests/config.test.ts');
    await import('../tests/logger.test.ts');
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/CLI TEST SUITES PASSED (4/4 Suites 100%)');
    console.log('==================================================');
  } catch (err) {
    console.error('❌ Test suite failed:', err);
    process.exit(1);
  }
})();
