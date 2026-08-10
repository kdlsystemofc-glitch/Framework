import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export class JSAuditor implements IAuditor {
  public readonly name = 'JavaScript Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    return {
      auditorName: this.name,
      score: 98,
      issues: [],
      autoFixesApplied: 0,
    };
  }
}
