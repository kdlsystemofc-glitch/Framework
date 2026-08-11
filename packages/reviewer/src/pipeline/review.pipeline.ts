import { BuildOutputResult } from '@kdl/builder';
import { AIDirectorResult } from '@kdl/ai-director';
import { ReviewResult } from '../types/reviewer.types.js';
import { ReviewerService } from '../services/reviewer.service.js';

export class ReviewPipeline {
  public async executeReviewLoop(
    buildResult: BuildOutputResult,
    directorResult: AIDirectorResult,
    projectPath: string,
    maxIterations = 3
  ): Promise<ReviewResult> {
    const service = new ReviewerService();
    return service.runReview({
      projectPath,
      projectName: buildResult.projectName,
      directorResult,
      maxAutoFixCycles: maxIterations,
    });
  }
}
