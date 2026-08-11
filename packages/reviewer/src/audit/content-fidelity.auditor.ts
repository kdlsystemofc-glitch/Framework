import fs from 'fs';
import path from 'path';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';

export class ContentFidelityAuditor {
  public static audit(htmlPath: string, clientContext?: any): AuditorResult {
    const issues: AuditIssue[] = [];
    const evidence: string[] = [];

    if (!fs.existsSync(htmlPath)) {
      return {
        auditorName: 'ContentFidelityAuditor',
        score: 0,
        issues: [{ id: 'cf-1', auditorName: 'ContentFidelityAuditor', severity: 'critical', message: 'HTML file missing', suggestion: 'Generate landing/index.html', autoFixable: false }],
        autoFixesApplied: 0,
        measurementType: 'RULE_BASED',
      };
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');

    // 1. Check KDL Brand Leakage
    const forbiddenKDLStrings = ['KDL Gold Standard', 'KDL Framework', 'Powered by KDL', 'Stage Showcase'];
    for (const str of forbiddenKDLStrings) {
      if (html.includes(str)) {
        issues.push({
          id: `cf-leak-${str.replace(/\s+/g, '-').toLowerCase()}`,
          auditorName: 'ContentFidelityAuditor',
          severity: 'critical',
          message: `KDL brand leakage detected: "${str}"`,
          suggestion: 'Remove KDL internal framework branding from client page',
          autoFixable: true,
        });
      }
    }

    // 2. Check Filesystem Path Leakage
    if (html.includes('C:\\') || html.includes('D:\\') || html.includes('file://')) {
      issues.push({
        id: 'cf-fs-path',
        auditorName: 'ContentFidelityAuditor',
        severity: 'critical',
        message: 'Local filesystem path detected in HTML source',
        suggestion: 'Use relative paths for all assets and links',
        autoFixable: true,
      });
    }

    // 3. Verify Client Brand Presence
    if (clientContext) {
      const businessName = clientContext.businessName?.value || clientContext.projectName;
      if (businessName && !html.includes(businessName)) {
        issues.push({
          id: 'cf-missing-brand',
          auditorName: 'ContentFidelityAuditor',
          severity: 'critical',
          message: `Client business name "${businessName}" not found in landing page HTML`,
          suggestion: 'Ensure client business name is rendered in header or hero',
          autoFixable: false,
        });
      } else if (businessName) {
        evidence.push(`Client business name "${businessName}" verified in DOM.`);
      }
    }

    const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'critical').length * 40 - issues.filter((i) => i.severity === 'warning').length * 15);

    return {
      auditorName: 'ContentFidelityAuditor',
      score,
      issues,
      autoFixesApplied: 0,
      measurementType: 'RULE_BASED',
      evidence,
    };
  }
}
