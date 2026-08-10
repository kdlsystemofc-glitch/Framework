import fs from 'fs';
import path from 'path';

export interface LoadedPrompt {
  filename: string;
  absolutePath: string;
  rawContent: string;
  renderedPrompt: string;
  injectedVariables: Record<string, string>;
}

export class PromptLoader {
  private frameworkRoot: string;

  constructor(frameworkRoot?: string) {
    this.frameworkRoot = frameworkRoot || this.findFrameworkRoot(process.cwd());
  }

  private findFrameworkRoot(startDir: string): string {
    let current = path.resolve(startDir);
    while (current) {
      if (fs.existsSync(path.join(current, 'MANIFESTO.md')) && fs.existsSync(path.join(current, 'prompts'))) {
        return current;
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
    return process.cwd();
  }

  public loadPrompt(promptFilename: string, variables: Record<string, string> = {}): LoadedPrompt {
    const absolutePath = path.join(this.frameworkRoot, 'prompts', promptFilename);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Prompt file '${promptFilename}' not found at path '${absolutePath}'`);
    }

    const rawContent = fs.readFileSync(absolutePath, 'utf-8');

    let rendered = rawContent;
    for (const [key, val] of Object.entries(variables)) {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(placeholder, val);
    }

    return {
      filename: promptFilename,
      absolutePath,
      rawContent,
      renderedPrompt: rendered,
      injectedVariables: variables,
    };
  }

  public validateAllPrompts(promptFilenames: string[]): { valid: number; total: number; missing: string[] } {
    const missing: string[] = [];
    for (const file of promptFilenames) {
      const p = path.join(this.frameworkRoot, 'prompts', file);
      if (!fs.existsSync(p)) {
        missing.push(file);
      }
    }

    return {
      valid: promptFilenames.length - missing.length,
      total: promptFilenames.length,
      missing,
    };
  }
}
