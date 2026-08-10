import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';
import fs from 'fs';

export class HTMLAuditor implements IAuditor {
  public readonly name = 'HTML Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const issues = [];
    let score = 100;

    if (buildResult.htmlFilePath && fs.existsSync(buildResult.htmlFilePath)) {
      const content = fs.readFileSync(buildResult.htmlFilePath, 'utf-8');
      if (!content.includes('<!DOCTYPE html>')) {
        score -= 20;
        issues.push({
          id: 'html-no-doctype',
          auditorName: this.name,
          severity: 'warning' as const,
          message: 'Missing standard <!DOCTYPE html> declaration.',
          suggestion: 'Prepend <!DOCTYPE html> to top of HTML.',
          autoFixable: true,
        });
      }
      if (!content.includes('lang="')) {
        score -= 10;
        issues.push({
          id: 'html-no-lang',
          auditorName: this.name,
          severity: 'warning' as const,
          message: 'Missing lang attribute on <html> element.',
          suggestion: 'Add lang="pt-BR" to html element.',
          autoFixable: true,
        });
      }
    }

    return {
      auditorName: this.name,
      score: Math.max(0, score),
      issues,
      autoFixesApplied: 0,
    };
  }
}
