import { runStateMachineTests } from '../tests/state-machine.test.js';
import { runCheckpointTests } from '../tests/checkpoint.test.js';
import { runEventsTests } from '../tests/events.test.js';
import { runRetryTests } from '../tests/retry.test.js';
import { runSchedulerTests } from '../tests/scheduler.test.js';
import { runPipelineExecutionTests } from '../tests/pipeline-execution.test.js';

async function main() {
  console.log('🚀 Running @kdl/orchestrator Unit & Integration Test Suite...\n');
  try {
    await runStateMachineTests();
    await runCheckpointTests();
    await runEventsTests();
    await runRetryTests();
    await runSchedulerTests();
    await runPipelineExecutionTests();
    console.log('\n==================================================');
    console.log('✅ ALL @KDL/ORCHESTRATOR TEST SUITES PASSED (6/6 100%)');
    console.log('==================================================');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

main();
