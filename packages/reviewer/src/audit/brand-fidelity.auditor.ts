import fs from 'fs';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';

export class BrandFidelityAuditor {
  public static audit(cssPath: string, designSystem?: any): AuditorResult {
    const issues: AuditIssue[] = [];
    const evidence: string[] = [];

    if (!fs.existsSync(cssPath)) {
      return {
        auditorName: 'BrandFidelityAuditor',
        score: 0,
        issues: [{ id: 'bf-1', auditorName: 'BrandFidelityAuditor', severity: 'critical', message: 'CSS file missing', suggestion: 'Generate landing/styles.css', autoFixable: false }],
        autoFixesApplied: 0,
        measurementType: 'RULE_BASED',
      };
    }

    const css = fs.readFileSync(cssPath, 'utf-8');

    if (css.includes('--color-dominant-60:') && css.includes('--color-accent-10:')) {
      evidence.push('Dynamic CSS custom properties verified in styles.css');
    } else {
      issues.push({
        id: 'bf-missing-css-vars',
        auditorName: 'BrandFidelityAuditor',
        severity: 'warning',
        message: 'CSS custom properties (--color-dominant-60, --color-accent-10) missing from stylesheet',
        suggestion: 'Generate :root design tokens using CSSGenerator',
        autoFixable: true,
      });
    }

    const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'critical').length * 40 - issues.filter((i) => i.severity === 'warning').length * 15);

    return {
      auditorName: 'BrandFidelityAuditor',
      score,
      issues,
      autoFixesApplied: 0,
      measurementType: 'RULE_BASED',
      evidence,
    };
  }
}
