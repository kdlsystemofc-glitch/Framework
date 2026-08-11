import fs from 'fs';
import path from 'path';
import { IAuditor } from './auditor.interface.js';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export class StorytellingAuditor implements IAuditor {
  public readonly name = 'Storytelling Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues: AuditIssue[] = [];
    const htmlPath = buildResult.htmlFilePath || path.join(projectPath, 'landing', 'index.html');

    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      const sectionCount = (html.match(/<section/g) || []).length;
      if (sectionCount < 2) {
        issues.push({
          id: 'storytelling-shallow-narrative',
          auditorName: this.name,
          severity: 'warning',
          message: `Landing page contains only ${sectionCount} section(s), indicating a shallow narrative arc`,
          suggestion: 'Expand storytelling sections (Hero, BrandStory, Benefits, CTA)',
          autoFixable: false,
        });
      }
    }

    const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'critical').length * 40 - issues.filter((i) => i.severity === 'warning').length * 15);

    return {
      auditorName: this.name,
      score,
      issues,
      autoFixesApplied: 0,
      measurementType: 'RULE_BASED',
    };
  }
}
