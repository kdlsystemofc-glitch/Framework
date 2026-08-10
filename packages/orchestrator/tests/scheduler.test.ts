import assert from 'node:assert';
import { StageScheduler } from '../src/scheduler/stage.scheduler.js';
import { StageDefinition } from '../src/types/orchestrator.types.js';

export async function runSchedulerTests() {
  console.log('Running stage scheduler tests...');

  const stages: StageDefinition[] = [
    { id: 'stage-A', name: 'A', description: '', dependencies: [], retryPolicy: { maxAttempts: 1, backoffMs: 0, timeoutMs: 100 }, failurePolicy: 'halt', executor: async () => {} },
    { id: 'stage-B', name: 'B', description: '', dependencies: ['stage-A'], retryPolicy: { maxAttempts: 1, backoffMs: 0, timeoutMs: 100 }, failurePolicy: 'halt', executor: async () => {} },
    { id: 'stage-C', name: 'C', description: '', dependencies: ['stage-A'], retryPolicy: { maxAttempts: 1, backoffMs: 0, timeoutMs: 100 }, failurePolicy: 'halt', executor: async () => {} },
    { id: 'stage-D', name: 'D', description: '', dependencies: ['stage-B', 'stage-C'], retryPolicy: { maxAttempts: 1, backoffMs: 0, timeoutMs: 100 }, failurePolicy: 'halt', executor: async () => {} },
  ];

  const batches = StageScheduler.getExecutableBatches(stages, new Set());
  assert.strictEqual(batches.length, 3);
  assert.strictEqual(batches[0].map((s) => s.id).join(','), 'stage-A');
  assert.strictEqual(batches[1].map((s) => s.id).join(','), 'stage-B,stage-C');
  assert.strictEqual(batches[2].map((s) => s.id).join(','), 'stage-D');

  console.log('✔ scheduler.test.ts passed');
}
