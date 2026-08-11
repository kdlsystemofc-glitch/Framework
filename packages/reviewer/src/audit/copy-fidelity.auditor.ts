import fs from 'fs';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';

export class CopyFidelityAuditor {
  public static audit(htmlPath: string, copywriting?: any): AuditorResult {
    const issues: AuditIssue[] = [];
    const evidence: string[] = [];

    if (!fs.existsSync(htmlPath)) {
      return {
        auditorName: 'CopyFidelityAuditor',
        score: 0,
        issues: [{ id: 'cpf-1', auditorName: 'CopyFidelityAuditor', severity: 'critical', message: 'HTML file missing', suggestion: 'Generate landing/index.html', autoFixable: false }],
        autoFixesApplied: 0,
        measurementType: 'RULE_BASED',
      };
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');

    if (copywriting?.hero?.headline) {
      if (html.includes(copywriting.hero.headline)) {
        evidence.push(`Hero headline "${copywriting.hero.headline}" verified in DOM.`);
      } else {
        issues.push({
          id: 'cpf-missing-hero-headline',
          auditorName: 'CopyFidelityAuditor',
          severity: 'warning',
          message: 'Structured hero headline not found in rendered HTML',
          suggestion: 'Render hero headline from Copywriting artifact',
          autoFixable: false,
        });
      }
    }

    const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'critical').length * 40 - issues.filter((i) => i.severity === 'warning').length * 15);

    return {
      auditorName: 'CopyFidelityAuditor',
      score,
      issues,
      autoFixesApplied: 0,
      measurementType: 'RULE_BASED',
      evidence,
    };
  }
}
