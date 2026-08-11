import path from 'path';
import { SharedExecutionContext } from '../types/orchestrator.types.js';
import { IndustrySector } from '@kdl/inspiration';

export class ExecutionContextHolder {
  public static createInitialContext(
    executionId: string,
    rawProjectName: string,
    projectPath: string,
    sector: IndustrySector
  ): SharedExecutionContext {
    const sanitizedProjectName = path.basename(projectPath) || rawProjectName;

    return {
      executionId,
      projectName: sanitizedProjectName,
      projectPath,
      sector,
      project: {
        projectName: sanitizedProjectName,
        projectPath,
        createdAt: new Date().toISOString(),
      },
      client: {
        niche: sector,
        brandName: sanitizedProjectName,
      },
      asset: {
        hasLogo: false,
        imagePaths: [],
        logos: [],
        images: [],
        videos: [],
        documents: [],
        menus: [],
        other: [],
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
