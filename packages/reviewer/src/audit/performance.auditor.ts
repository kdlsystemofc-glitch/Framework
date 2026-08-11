import fs from 'fs';
import path from 'path';
import { IAuditor } from './auditor.interface.js';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export class PerformanceAuditor implements IAuditor {
  public readonly name = 'Performance Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues: AuditIssue[] = [];
    const htmlPath = buildResult.htmlFilePath || path.join(projectPath, 'landing', 'index.html');

    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      const scriptMatches = html.match(/<script[^>]+src=["']([^"']+)["']/g) || [];
      if (scriptMatches.length > 10) {
        issues.push({
          id: 'perf-excessive-scripts',
          auditorName: this.name,
          severity: 'warning',
          message: `Excessive external scripts detected (${scriptMatches.length})`,
          suggestion: 'Bundle external JavaScript assets to improve page load performance',
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
