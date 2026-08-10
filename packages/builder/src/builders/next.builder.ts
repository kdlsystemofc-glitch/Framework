import { IBuilder } from './builder.interface.js';
import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult, BuildOptions } from '../types/builder.types.js';
import { HTMLBuilder } from './html.builder.js';

export class NextBuilder implements IBuilder {
  public readonly targetName = 'next';

  public async build(
    directorResult: AIDirectorResult,
    projectPath: string,
    options?: BuildOptions
  ): Promise<BuildOutputResult> {
    const htmlBuilder = new HTMLBuilder();
    const result = await htmlBuilder.build(directorResult, projectPath, options);
    return { ...result, target: 'next' };
  }
}
