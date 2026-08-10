import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult, BuildOptions } from '../types/builder.types.js';

export interface IBuilder {
  readonly targetName: string;
  build(directorResult: AIDirectorResult, projectPath: string, options?: BuildOptions): Promise<BuildOutputResult>;
}
