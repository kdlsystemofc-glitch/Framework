import { AuditorResult } from '../types/reviewer.types.js';
import { BuildOutputResult } from '@kdl/builder';

export interface IAuditor {
  readonly name: string;
  audit(buildResult: BuildOutputResult, projectPath: string): Promise<AuditorResult>;
}
