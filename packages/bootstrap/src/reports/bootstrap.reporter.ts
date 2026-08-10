import fs from 'fs';
import path from 'path';
import { ProjectIndex, ValidationResult } from '../types/bootstrap.types.js';

export class BootstrapReporter {
  public static generateReport(
    index: ProjectIndex,
    validation: ValidationResult,
    createdDirs: string[],
  ): string {
    const lines = [
      `# BOOTSTRAP REPORT — ${index.projectName}`,
      ``,
      `> **KDL Landing Framework — Project Bootstrap Engine v1.0.0**`,
      `> **Date:** ${new Date().toISOString()}`,
      ``,
      `## 1. Summary`,
      `- **Project Path:** \`${index.projectPath}\``,
      `- **Validation Score:** ${validation.score}/100`,
      `- **Bootstrap Status:** ${validation.passed ? 'SUCCESS' : 'WARNINGS_DETECTED'}`,
      `- **Files Scanned & Indexed:** ${index.totalFiles}`,
      `- **Standard Directories Initialized:** ${createdDirs.length} (${createdDirs.join(', ')})`,
      ``,
      `## 2. Issues & Critical Fixes`,
    ];

    if (validation.issues.length === 0) {
      lines.push(`- ✅ All mandatory client assets and structure requirements are satisfied.`);
    } else {
      for (const issue of validation.issues) {
        lines.push(`- **[${issue.severity}]** \`${issue.code}\`: ${issue.message}`);
        lines.push(`  - *Recommendation:* ${issue.recommendation}`);
      }
    }

    lines.push(
      ``,
      `## 3. Next Steps`,
      `- Execute **KDL Phase 01 (Discovery)** via \`kdl create\` or AI Orchestrator.`,
    );

    return lines.join('\n');
  }

  public static writeReport(
    projectPath: string,
    index: ProjectIndex,
    validation: ValidationResult,
    createdDirs: string[],
  ): string {
    const reportContent = this.generateReport(index, validation, createdDirs);
    const reportsDir = path.join(projectPath, 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    const reportFilePath = path.join(reportsDir, 'bootstrap-report.md');
    fs.writeFileSync(reportFilePath, reportContent, 'utf-8');
    return reportFilePath;
  }
}
