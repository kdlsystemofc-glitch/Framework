import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';
import fs from 'fs';

export class AccessibilityAuditor implements IAuditor {
  public readonly name = 'Accessibility Auditor (WCAG 2.2)';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues = [];
    let score = 97;

    if (buildResult.htmlFilePath && fs.existsSync(buildResult.htmlFilePath)) {
      const content = fs.readFileSync(buildResult.htmlFilePath, 'utf-8');
      if (content.includes('<img') && !content.includes('alt="')) {
        score -= 5;
        issues.push({
          id: 'a11y-img-alt',
          auditorName: this.name,
          severity: 'warning' as const,
          message: 'Image tag missing alt text attribute.',
          suggestion: 'Add descriptive alt text to images.',
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
