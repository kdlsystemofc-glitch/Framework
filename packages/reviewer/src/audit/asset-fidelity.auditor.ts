import fs from 'fs';
import path from 'path';
import { AuditorResult, AuditIssue } from '../types/reviewer.types.js';

export class AssetFidelityAuditor {
  public static audit(htmlPath: string, manifest?: any): AuditorResult {
    const issues: AuditIssue[] = [];
    const evidence: string[] = [];

    if (!fs.existsSync(htmlPath)) {
      return {
        auditorName: 'AssetFidelityAuditor',
        score: 0,
        issues: [{ id: 'af-1', auditorName: 'AssetFidelityAuditor', severity: 'critical', message: 'HTML file missing', suggestion: 'Generate landing/index.html', autoFixable: false }],
        autoFixesApplied: 0,
        measurementType: 'RULE_BASED',
      };
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');
    const imgMatches = html.match(/<img[^>]+>/g) || [];

    evidence.push(`Found ${imgMatches.length} <img> elements in HTML.`);

    // 1. Check Missing Alt Attributes
    for (const imgTag of imgMatches) {
      if (!imgTag.includes('alt=') || /alt=["']\s*["']/.test(imgTag)) {
        issues.push({
          id: 'af-missing-alt',
          auditorName: 'AssetFidelityAuditor',
          severity: 'warning',
          message: `Image tag missing descriptive alt attribute: ${imgTag.substring(0, 60)}...`,
          suggestion: 'Add descriptive alt attribute for accessibility and SEO',
          autoFixable: true,
        });
      }
    }

    // 2. Check Logo Usage if Logo Asset Exists
    if (manifest?.logo) {
      if (html.includes(manifest.logo.relativePath) || html.includes(manifest.logo.filename)) {
        evidence.push(`Logo asset "${manifest.logo.filename}" verified in DOM.`);
      } else {
        issues.push({
          id: 'af-unused-logo',
          auditorName: 'AssetFidelityAuditor',
          severity: 'warning',
          message: `Available logo asset "${manifest.logo.filename}" is not referenced in HTML`,
          suggestion: 'Render logo asset in Header/Navigation',
          autoFixable: false,
        });
      }
    }

    const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'critical').length * 40 - issues.filter((i) => i.severity === 'warning').length * 15);

    return {
      auditorName: 'AssetFidelityAuditor',
      score,
      issues,
      autoFixesApplied: 0,
      measurementType: 'RULE_BASED',
      evidence,
    };
  }
}
