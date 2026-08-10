import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';
import fs from 'fs';

export class SEOAuditor implements IAuditor {
  public readonly name = 'SEO Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues = [];
    let score = 98;

    if (buildResult.htmlFilePath && fs.existsSync(buildResult.htmlFilePath)) {
      const content = fs.readFileSync(buildResult.htmlFilePath, 'utf-8');
      if (!content.includes('application/ld+json')) {
        score -= 5;
        issues.push({
          id: 'seo-jsonld-missing',
          auditorName: this.name,
          severity: 'warning' as const,
          message: 'JSON-LD Schema.org structured data block missing.',
          suggestion: 'Inject JSON-LD script tag.',
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
