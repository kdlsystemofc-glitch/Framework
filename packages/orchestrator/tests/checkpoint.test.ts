import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { CheckpointManager } from '../src/checkpoint/checkpoint.manager.js';
import { PipelineCheckpoint } from '../src/types/orchestrator.types.js';

export async function runCheckpointTests() {
  console.log('Running checkpoint manager tests...');

  const tmpPath = path.join(process.cwd(), 'temp', 'checkpoint-test');
  const mgr = new CheckpointManager(tmpPath);

  const mockCheckpoint: PipelineCheckpoint = {
    executionId: 'exec-123',
    pipelineId: 'landing-page',
    projectName: 'Test Project',
    state: 'RUNNING',
    stageCheckpoints: {},
    updatedAt: new Date().toISOString(),
  };

  mgr.savePipelineCheckpoint(mockCheckpoint);
  assert.strictEqual(mgr.hasIncompleteRun(), true);

  const loaded = mgr.loadPipelineCheckpoint();
  assert.strictEqual(loaded?.executionId, 'exec-123');

  mgr.clearCheckpoints();
  assert.strictEqual(mgr.hasIncompleteRun(), false);

  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true });
  }

  console.log('✔ checkpoint.test.ts passed');
}
