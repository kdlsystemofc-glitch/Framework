import { BuildOutputResult } from '@kdl/builder';
import { AIDirectorResult } from '@kdl/ai-director';
import { ReviewResult } from '../types/reviewer.types.js';
import { ReviewPipeline } from '../pipeline/review.pipeline.js';

export class ReviewerEngine {
  private pipeline: ReviewPipeline;

  constructor(customPipeline?: ReviewPipeline) {
    this.pipeline = customPipeline || new ReviewPipeline();
  }

  public async reviewProject(
    buildResult: BuildOutputResult,
    directorResult: AIDirectorResult,
    projectPath: string
  ): Promise<ReviewResult> {
    return await this.pipeline.executeReviewLoop(buildResult, directorResult, projectPath);
  }
}
