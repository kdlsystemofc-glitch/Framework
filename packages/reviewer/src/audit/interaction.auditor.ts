import fs from 'fs';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';

export class InteractionAuditor {
  public static audit(htmlPath: string): AuditorResult {
    const issues: AuditIssue[] = [];
    const evidence: string[] = [];

    if (!fs.existsSync(htmlPath)) {
      return {
        auditorName: 'InteractionAuditor',
        score: 0,
        issues: [{ id: 'ia-1', auditorName: 'InteractionAuditor', severity: 'critical', message: 'HTML file missing', suggestion: 'Generate landing/index.html', autoFixable: false }],
        autoFixesApplied: 0,
        measurementType: 'RULE_BASED',
      };
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');
    const hrefMatches = html.match(/href=["']([^"']+)["']/g) || [];

    evidence.push(`Found ${hrefMatches.length} links in HTML.`);

    for (const hrefStr of hrefMatches) {
      const value = hrefStr.replace(/^href=["']/, '').replace(/["']$/, '');
      if (value === '#' || value === 'javascript:void(0)') {
        issues.push({
          id: 'ia-empty-href',
          auditorName: 'InteractionAuditor',
          severity: 'warning',
          message: 'Interactive link with dummy href="#" found',
          suggestion: 'Replace dummy anchor with valid target section ID or contact URI',
          autoFixable: true,
        });
      }
    }

    const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'critical').length * 40 - issues.filter((i) => i.severity === 'warning').length * 15);

    return {
      auditorName: 'InteractionAuditor',
      score,
      issues,
      autoFixesApplied: 0,
      measurementType: 'RULE_BASED',
      evidence,
    };
  }
}
