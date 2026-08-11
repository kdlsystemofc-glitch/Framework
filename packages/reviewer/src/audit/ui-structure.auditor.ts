import fs from 'fs';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';

export class UIStructureAuditor {
  public static audit(htmlPath: string, blueprint?: any): AuditorResult {
    const issues: AuditIssue[] = [];
    const evidence: string[] = [];

    if (!fs.existsSync(htmlPath)) {
      return {
        auditorName: 'UIStructureAuditor',
        score: 0,
        issues: [{ id: 'uis-1', auditorName: 'UIStructureAuditor', severity: 'critical', message: 'HTML file missing', suggestion: 'Generate landing/index.html', autoFixable: false }],
        autoFixesApplied: 0,
        measurementType: 'RULE_BASED',
      };
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');

    const hasHeader = html.includes('<header');
    const hasMain = html.includes('<main');
    const hasFooter = html.includes('<footer');
    const hasH1 = html.includes('<h1');

    if (!hasHeader) issues.push({ id: 'uis-no-header', auditorName: 'UIStructureAuditor', severity: 'warning', message: 'Missing <header> landmark', suggestion: 'Wrap top navigation in <header>', autoFixable: true });
    if (!hasMain) issues.push({ id: 'uis-no-main', auditorName: 'UIStructureAuditor', severity: 'warning', message: 'Missing <main> landmark', suggestion: 'Wrap main page sections in <main>', autoFixable: true });
    if (!hasFooter) issues.push({ id: 'uis-no-footer', auditorName: 'UIStructureAuditor', severity: 'warning', message: 'Missing <footer> landmark', suggestion: 'Wrap footer links in <footer>', autoFixable: true });
    if (!hasH1) issues.push({ id: 'uis-no-h1', auditorName: 'UIStructureAuditor', severity: 'critical', message: 'Missing <h1> primary heading', suggestion: 'Add a single primary <h1> in hero section', autoFixable: true });

    if (hasH1) evidence.push('Primary <h1> heading verified in DOM.');

    const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'critical').length * 40 - issues.filter((i) => i.severity === 'warning').length * 15);

    return {
      auditorName: 'UIStructureAuditor',
      score,
      issues,
      autoFixesApplied: 0,
      measurementType: 'RULE_BASED',
      evidence,
    };
  }
}
