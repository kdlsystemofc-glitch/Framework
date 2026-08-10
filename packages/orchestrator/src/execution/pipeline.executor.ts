import { PipelineDefinition, SharedExecutionContext, PipelineCheckpoint, StageCheckpoint, PipelineState } from '../types/orchestrator.types.js';
import { StateMachine } from '../state/state-machine.js';
import { CheckpointManager } from '../checkpoint/checkpoint.manager.js';
import { RetryHandler } from '../retry/retry.handler.js';
import { StageScheduler } from '../scheduler/stage.scheduler.js';
import { EventBus } from '../events/event-bus.js';
import { FatalPipelineError } from '../errors/pipeline.errors.js';

export class PipelineExecutor {
  private eventBus = EventBus.getInstance();

  public async executePipeline(
    pipeline: PipelineDefinition,
    context: SharedExecutionContext,
    resumeMode = false
  ): Promise<SharedExecutionContext> {
    const checkpointManager = new CheckpointManager(context.projectPath);
    const stateMachine = new StateMachine();

    let checkpoint: PipelineCheckpoint;

    if (resumeMode && checkpointManager.hasIncompleteRun()) {
      checkpoint = checkpointManager.loadPipelineCheckpoint()!;
      stateMachine.transitionTo('INITIALIZING');
    } else {
      checkpointManager.clearCheckpoints();
      stateMachine.transitionTo('INITIALIZING');
      checkpoint = {
        executionId: context.executionId,
        pipelineId: pipeline.id,
        projectName: context.projectName,
        state: 'INITIALIZING',
        stageCheckpoints: {},
        updatedAt: new Date().toISOString(),
      };
    }

    this.eventBus.emit({
      type: 'pipeline.started',
      executionId: context.executionId,
      timestamp: new Date().toISOString(),
      payload: { pipelineId: pipeline.id, projectName: context.projectName },
    });

    stateMachine.transitionTo('RUNNING');
    checkpoint.state = 'RUNNING';
    checkpointManager.savePipelineCheckpoint(checkpoint);

    const completedStageIds = new Set<string>();
    for (const [sId, cp] of Object.entries(checkpoint.stageCheckpoints)) {
      if (cp.status === 'COMPLETED') {
        completedStageIds.add(sId);
      }
    }

    try {
      const batches = StageScheduler.getExecutableBatches(pipeline.stages, completedStageIds);

      for (const batch of batches) {
        // Execute batch stages in parallel
        await Promise.all(
          batch.map(async (stage) => {
            if (completedStageIds.has(stage.id)) {
              this.eventBus.emit({
                type: 'pipeline.stage.skipped',
                executionId: context.executionId,
                stageId: stage.id,
                timestamp: new Date().toISOString(),
              });
              return;
            }

            this.eventBus.emit({
              type: 'pipeline.stage.started',
              executionId: context.executionId,
              stageId: stage.id,
              timestamp: new Date().toISOString(),
            });

            const startTime = Date.now();
            let attempts = 0;

            try {
              await RetryHandler.executeWithRetry(
                async () => await stage.executor(context),
                stage.retryPolicy,
                (att, err) => {
                  attempts = att;
                  this.eventBus.emit({
                    type: 'pipeline.stage.retrying',
                    executionId: context.executionId,
                    stageId: stage.id,
                    timestamp: new Date().toISOString(),
                    payload: { attempt: att, error: err.message },
                  });
                }
              );

              const durationMs = Date.now() - startTime;
              const stageCp: StageCheckpoint = {
                stageId: stage.id,
                status: 'COMPLETED',
                attempts: Math.max(1, attempts),
                durationMs,
                completedAt: new Date().toISOString(),
              };

              checkpoint.stageCheckpoints[stage.id] = stageCp;
              checkpointManager.saveStageCheckpoint(stage.id, stageCp);
              checkpointManager.savePipelineCheckpoint(checkpoint);
              completedStageIds.add(stage.id);

              this.eventBus.emit({
                type: 'pipeline.stage.completed',
                executionId: context.executionId,
                stageId: stage.id,
                timestamp: new Date().toISOString(),
                payload: { durationMs },
              });
            } catch (err) {
              const errorMsg = err instanceof Error ? err.message : String(err);
              const stageCp: StageCheckpoint = {
                stageId: stage.id,
                status: 'FAILED',
                attempts,
                durationMs: Date.now() - startTime,
                error: errorMsg,
              };

              checkpoint.stageCheckpoints[stage.id] = stageCp;
              checkpointManager.saveStageCheckpoint(stage.id, stageCp);

              this.eventBus.emit({
                type: 'pipeline.stage.failed',
                executionId: context.executionId,
                stageId: stage.id,
                timestamp: new Date().toISOString(),
                payload: { error: errorMsg },
              });

              if (stage.failurePolicy === 'halt') {
                throw new FatalPipelineError(`Stage '${stage.id}' failed: ${errorMsg}`);
              }
            }
          })
        );
      }

      stateMachine.transitionTo('COMPLETED');
      checkpoint.state = 'COMPLETED';
      checkpointManager.savePipelineCheckpoint(checkpoint);

      this.eventBus.emit({
        type: 'pipeline.completed',
        executionId: context.executionId,
        timestamp: new Date().toISOString(),
      });

      return context;
    } catch (err) {
      stateMachine.transitionTo('FAILED');
      checkpoint.state = 'FAILED';
      checkpointManager.savePipelineCheckpoint(checkpoint);

      this.eventBus.emit({
        type: 'pipeline.failed',
        executionId: context.executionId,
        timestamp: new Date().toISOString(),
        payload: { error: err instanceof Error ? err.message : String(err) },
      });

      throw err;
    }
  }
}
