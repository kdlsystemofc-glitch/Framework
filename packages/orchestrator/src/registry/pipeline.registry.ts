import { PipelineDefinition } from '../types/orchestrator.types.js';

export class PipelineRegistry {
  private static instance: PipelineRegistry;
  private pipelines = new Map<string, PipelineDefinition>();

  public static getInstance(): PipelineRegistry {
    if (!PipelineRegistry.instance) {
      PipelineRegistry.instance = new PipelineRegistry();
    }
    return PipelineRegistry.instance;
  }

  public registerPipeline(pipeline: PipelineDefinition): void {
    this.pipelines.set(pipeline.id, pipeline);
  }

  public getPipeline(id: string): PipelineDefinition {
    const pipeline = this.pipelines.get(id);
    if (!pipeline) {
      throw new Error(`Pipeline '${id}' not registered in PipelineRegistry`);
    }
    return pipeline;
  }

  public listPipelines(): string[] {
    return Array.from(this.pipelines.keys());
  }
}
