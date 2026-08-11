import { runStateMachineTests } from '../tests/state-machine.test.js';
import { runCheckpointTests } from '../tests/checkpoint.test.js';
import { runEventsTests } from '../tests/events.test.js';
import { runRetryTests } from '../tests/retry.test.js';
import { runSchedulerTests } from '../tests/scheduler.test.js';
import { runPipelineExecutionTests } from '../tests/pipeline-execution.test.js';
import { runGeminiProviderTests } from '../tests/gemini-provider.test.js';
import { runFromArtifactsTests } from '../tests/from-artifacts.test.js';
import { execSync } from 'child_process';

async function main() {
  console.log('🚀 Running @kdl/orchestrator Unit & Integration Test Suite...\n');
  try {
    await runStateMachineTests();
    await runCheckpointTests();
    await runEventsTests();
    await runRetryTests();
    await runSchedulerTests();
    await runPipelineExecutionTests();
    await runGeminiProviderTests();
    await runFromArtifactsTests();
    
    console.log('Running methodology-runtime.test.ts...');
    execSync('node --import tsx tests/methodology-runtime.test.ts', { stdio: 'inherit' });

    console.log('Running anti-hardcode.test.ts...');
    execSync('node --import tsx tests/anti-hardcode.test.ts', { stdio: 'inherit' });

    console.log('\n==================================================');
    console.log('✅ ALL @KDL/ORCHESTRATOR TEST SUITES PASSED (10/10 100%)');
    console.log('==================================================');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();
