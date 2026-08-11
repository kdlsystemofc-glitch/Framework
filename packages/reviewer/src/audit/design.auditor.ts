import fs from 'fs';
import path from 'path';
import { IAuditor } from './auditor.interface.js';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export class DesignAuditor implements IAuditor {
  public readonly name = 'Design Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues: AuditIssue[] = [];
    const cssPath = buildResult.cssFilePath || path.join(projectPath, 'landing', 'styles.css');

    if (fs.existsSync(cssPath)) {
      const css = fs.readFileSync(cssPath, 'utf-8');
      if (!css.includes(':root')) {
        issues.push({
          id: 'design-no-tokens',
          auditorName: this.name,
          severity: 'warning',
          message: 'CSS stylesheet does not declare :root design tokens',
          suggestion: 'Inject Design System variables into :root',
          autoFixable: true,
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
