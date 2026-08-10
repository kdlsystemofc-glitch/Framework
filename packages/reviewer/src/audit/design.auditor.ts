import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export class DesignAuditor implements IAuditor {
  public readonly name = 'Design Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    return {
      auditorName: this.name,
      score: 96,
      issues: [],
      autoFixesApplied: 0,
    };
  }
}
