import { StageDefinition } from '../types/orchestrator.types.js';

export class StageScheduler {
  public static getExecutableBatches(stages: StageDefinition[], completedStageIds: Set<string>): StageDefinition[][] {
    const batches: StageDefinition[][] = [];
    const remaining = new Set(stages.map((s) => s.id));
    const finished = new Set(completedStageIds);

    while (remaining.size > 0) {
      const currentBatch: StageDefinition[] = [];

      for (const stage of stages) {
        if (remaining.has(stage.id)) {
          const depsSatisfied = stage.dependencies.every((d) => finished.has(d));
          if (depsSatisfied) {
            currentBatch.push(stage);
          }
        }
      }

      if (currentBatch.length === 0) {
        throw new Error('Cyclic dependency or unresolvable stage graph detected');
      }

      batches.push(currentBatch);
      for (const stage of currentBatch) {
        remaining.delete(stage.id);
        finished.add(stage.id);
      }
    }

    return batches;
  }
}
