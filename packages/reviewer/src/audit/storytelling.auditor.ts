import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export class StorytellingAuditor implements IAuditor {
  public readonly name = 'Storytelling Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    return {
      auditorName: this.name,
      score: 95,
      issues: [],
      autoFixesApplied: 0,
    };
  }
}
