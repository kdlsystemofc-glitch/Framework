import fs from 'fs';
import path from 'path';
import { ReviewResult } from '../types/reviewer.types.js';

export class FinalAuditReporter {
  public static generateReport(projectPath: string, reviewResult: ReviewResult): string {
    const reportsDir = path.join(projectPath, 'reports');
    const { mdPath } = this.generateReports(reviewResult, reportsDir);
    return mdPath;
  }

  public static generateReports(reviewResult: ReviewResult, outputReportDir: string): { mdPath: string; jsonPath: string } {
    fs.mkdirSync(outputReportDir, { recursive: true });

    const mdPath = path.join(outputReportDir, 'FINAL_AUDIT.md');
    const jsonPath = path.join(outputReportDir, 'final-audit.json');

    const qualityGates = reviewResult.qualityGates || [];
    const screenshots = reviewResult.screenshots || {};
    const provenance = reviewResult.provenance || { frameworkVersion: '1.0.0', auditTimestamp: new Date().toISOString(), nodeVersion: process.version };

    const mdContent = `# KDL Framework — Final Quality Audit Report

**Project:** ${reviewResult.projectName}  
**Status:** WAITING_FOR_HUMAN_APPROVAL  
**Overall Score:** ${reviewResult.overallScore}/100  
**Audit Timestamp:** ${provenance.auditTimestamp}  

---

## 1. Executive Summary

- **Quality Gates Status:** ${reviewResult.passedAllGates ? 'PASS' : 'FAIL / NOT MEASURED'}
- **Measured Gates:** ${reviewResult.measuredGatesCount || 0} / ${qualityGates.length}
- **Passed Gates:** ${reviewResult.passedGatesCount || 0} / ${qualityGates.length}
- **Failed Gates:** ${reviewResult.failedGatesCount || 0} / ${qualityGates.length}
- **Not Measured Gates:** ${reviewResult.notMeasuredGatesCount || 0} / ${qualityGates.length}
- **Total Issues Found:** ${reviewResult.totalIssuesFound}
- **AutoFix Cycles Applied:** ${reviewResult.iterationCount} (${reviewResult.totalAutoFixesApplied} fixes applied)

---

## 2. Quality Gates Breakdown

| Gate Name | Status | Measurement Type | Score / Threshold | Result |
| :--- | :--- | :--- | :--- | :--- |
${qualityGates
  .map(
    (g) =>
      `| ${g.name} | **${g.status || (g.passed ? 'PASS' : 'FAIL')}** | ${g.measurementType || 'RULE_BASED'} | ${g.score !== undefined ? g.score : 'N/A'} / ${g.minRequiredScore} | ${g.passed ? '✅ PASS' : '❌ FAIL'} |`
  )
  .join('\n')}

---

## 3. Screenshots Evidence

- **Mobile Viewport (390x844):** ${screenshots.mobile ? `![Mobile](${screenshots.mobile})` : 'N/A'}
- **Tablet Viewport (768x1024):** ${screenshots.tablet ? `![Tablet](${screenshots.tablet})` : 'N/A'}
- **Desktop Viewport (1440x900):** ${screenshots.desktop ? `![Desktop](${screenshots.desktop})` : 'N/A'}

---

## 4. Build Provenance

- **Framework Version:** ${provenance.frameworkVersion}
- **Node.js Version:** ${provenance.nodeVersion}
- **Browser QA Engine:** ${provenance.browserVersion || 'Playwright Chromium'}
`;

    fs.writeFileSync(mdPath, mdContent, 'utf-8');
    fs.writeFileSync(jsonPath, JSON.stringify(reviewResult, null, 2), 'utf-8');

    return { mdPath, jsonPath };
  }
}
