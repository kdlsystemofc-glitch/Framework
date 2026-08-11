import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult, BuildOptions, LandingBuildInput } from '../types/builder.types.js';
import { BuildPipeline } from '../pipeline/build.pipeline.js';
import { OutputManager } from '../filesystem/output.manager.js';
import { HTMLBuilder } from '../builders/html.builder.js';

export class BuilderEngine {
  private pipeline: BuildPipeline;

  constructor(customPipeline?: BuildPipeline) {
    this.pipeline = customPipeline || new BuildPipeline();
  }

  public async buildLanding(
    directorResult: AIDirectorResult,
    projectPath: string,
    options?: BuildOptions,
    buildInput?: LandingBuildInput
  ): Promise<BuildOutputResult> {
    OutputManager.ensureOutputDirectories(projectPath);
    const target = options?.target || 'html';
    const builder = this.pipeline.getBuilder(target);

    if (builder instanceof HTMLBuilder) {
      return await builder.build(directorResult, projectPath, options, buildInput);
    }

    return await builder.build(directorResult, projectPath, options);
  }
}
