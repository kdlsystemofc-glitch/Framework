import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';
import fs from 'fs';

export class CSSAuditor implements IAuditor {
  public readonly name = 'CSS Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues = [];
    let score = 100;

    if (buildResult.cssFilePath && fs.existsSync(buildResult.cssFilePath)) {
      const content = fs.readFileSync(buildResult.cssFilePath, 'utf-8');
      if (!content.includes(':root')) {
        score -= 15;
        issues.push({
          id: 'css-no-root-tokens',
          auditorName: this.name,
          severity: 'warning' as const,
          message: 'CSS stylesheet missing :root Design Tokens declaration block.',
          suggestion: 'Declare HSL CSS custom variables in :root.',
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
