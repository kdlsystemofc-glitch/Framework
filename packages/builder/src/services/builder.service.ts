import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult, BuildOptions } from '../types/builder.types.js';
import { BuildPipeline } from '../pipeline/build.pipeline.js';
import { OutputManager } from '../filesystem/output.manager.js';

export class BuilderEngine {
  private pipeline: BuildPipeline;

  constructor(customPipeline?: BuildPipeline) {
    this.pipeline = customPipeline || new BuildPipeline();
  }

  public async buildLanding(
    directorResult: AIDirectorResult,
    projectPath: string,
    options?: BuildOptions
  ): Promise<BuildOutputResult> {
    OutputManager.ensureOutputDirectories(projectPath);
    const target = options?.target || 'html';
    const builder = this.pipeline.getBuilder(target);

    return await builder.build(directorResult, projectPath, options);
  }
}
