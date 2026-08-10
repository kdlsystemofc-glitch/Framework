import { IAuditor } from './auditor.interface.js';
import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';
import { LighthouseSimulator } from '../lighthouse/lighthouse.simulator.js';

export class PerformanceAuditor implements IAuditor {
  public readonly name = 'Performance Auditor';

  public async audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult> {
    const perfScore = LighthouseSimulator.simulateLighthouse(buildResult).performance;
    return {
      auditorName: this.name,
      score: perfScore,
      issues: [],
      autoFixesApplied: 0,
    };
  }
}
