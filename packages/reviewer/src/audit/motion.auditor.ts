import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';
import fs from 'fs';

export class MotionAuditor implements IAuditor {
  public readonly name = 'Motion Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues = [];
    let score = 96;

    if (buildResult.htmlFilePath && fs.existsSync(buildResult.htmlFilePath)) {
      const content = fs.readFileSync(buildResult.htmlFilePath, 'utf-8');
      if (!content.includes('gsap') || !content.includes('lenis')) {
        score -= 10;
        issues.push({
          id: 'motion-missing-libs',
          auditorName: this.name,
          severity: 'warning' as const,
          message: 'GSAP or Lenis Smooth Scroll CDN scripts missing.',
          suggestion: 'Inject GSAP 3.12 and Lenis 1.0 script tags.',
          autoFixable: true,
        });
      }
    }

    return {
      auditorName: this.name,
      score: Math.max(0, score),
      issues,
      autoFixesApplied: 0,
    };
  }
}
