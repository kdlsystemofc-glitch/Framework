import { AuditIssue } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';
import fs from 'fs';

export class AutoCorrector {
  public static applyAutoFixes(issues: AuditIssue[], buildResult: BuildOutputResult): number {
    let fixCount = 0;

    for (const issue of issues) {
      if (!issue.autoFixable) continue;

      if (issue.id === 'html-no-doctype' && buildResult.htmlFilePath && fs.existsSync(buildResult.htmlFilePath)) {
        const content = fs.readFileSync(buildResult.htmlFilePath, 'utf-8');
        fs.writeFileSync(buildResult.htmlFilePath, `<!DOCTYPE html>\n${content}`, 'utf-8');
        fixCount++;
      } else if (issue.id === 'html-no-lang' && buildResult.htmlFilePath && fs.existsSync(buildResult.htmlFilePath)) {
        let content = fs.readFileSync(buildResult.htmlFilePath, 'utf-8');
        content = content.replace(/<html>/i, '<html lang="pt-BR">');
        fs.writeFileSync(buildResult.htmlFilePath, content, 'utf-8');
        fixCount++;
      }
    }

    return fixCount;
  }
}
