import { SharedExecutionContext } from '../types/orchestrator.types.js';
import { IndustrySector } from '@kdl/inspiration';

export class ExecutionContextHolder {
  public static createInitialContext(
    executionId: string,
    projectName: string,
    projectPath: string,
    sector: IndustrySector
  ): SharedExecutionContext {
    return {
      executionId,
      projectName,
      projectPath,
      sector,
      project: {
        projectName,
        projectPath,
        createdAt: new Date().toISOString(),
      },
      client: {
        niche: sector,
        brandName: projectName,
      },
      asset: {
        hasLogo: false,
        imagePaths: [],
      },
      research: {
        seoKeywords: [],
        competitorWhiteSpace: '',
      },
      creative: {},
      design: {},
      copy: {},
      buildContext: {
        target: 'html',
      },
      reviewContext: {},
      customData: {},
    };
  }
}
