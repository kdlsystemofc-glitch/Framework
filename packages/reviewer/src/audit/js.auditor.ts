import fs from 'fs';
import path from 'path';
import { IAuditor } from './auditor.interface.js';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export class JSAuditor implements IAuditor {
  public readonly name = 'JavaScript Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues: AuditIssue[] = [];
    const jsPath = path.join(projectPath, 'landing', 'app.js');

    if (fs.existsSync(jsPath)) {
      const js = fs.readFileSync(jsPath, 'utf-8');
      if (js.includes('console.log')) {
        issues.push({
          id: 'js-console-log',
          auditorName: this.name,
          severity: 'info',
          message: 'Console statements detected in client script',
          suggestion: 'Remove debug console.log calls before production',
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
