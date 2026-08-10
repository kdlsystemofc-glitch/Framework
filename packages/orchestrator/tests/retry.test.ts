import assert from 'node:assert';
import { RetryHandler } from '../src/retry/retry.handler.js';

export async function runRetryTests() {
  console.log('Running retry handler tests...');

  let calls = 0;
  const mockTask = async () => {
    calls++;
    if (calls < 3) {
      throw new Error('Temporary failure');
    }
    return 'SUCCESS';
  };

  const result = await RetryHandler.executeWithRetry(mockTask, {
    maxAttempts: 4,
    backoffMs: 10,
    timeoutMs: 5000,
  });

  assert.strictEqual(result, 'SUCCESS');
  assert.strictEqual(calls, 3);

  console.log('✔ retry.test.ts passed');
}
