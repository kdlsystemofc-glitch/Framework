import fs from 'fs';
import path from 'path';
import { KDLFrameworkManifest, KDLPhaseDefinition } from '../types/framework.types.js';
import { KDLError } from '../types/error.types.js';
import { MethodologyRegistry } from '@kdl/orchestrator';

export class FrameworkLoader {
  private rootPath: string;

  constructor(customRootPath?: string) {
    this.rootPath = customRootPath || path.resolve(process.cwd());
  }

  public findFrameworkRoot(): string {
    let currentDir = this.rootPath;

    while (currentDir) {
      const manifestoPath = path.join(currentDir, 'MANIFESTO.md');
      const readmePath = path.join(currentDir, 'README.md');
      const promptsDir = path.join(currentDir, 'prompts');

      if (fs.existsSync(manifestoPath) && fs.existsSync(readmePath) && fs.existsSync(promptsDir)) {
        return currentDir;
      }

      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) break;
      currentDir = parentDir;
    }

    throw new KDLError(
      'Unable to locate KDL Framework root directory containing MANIFESTO.md and prompts/',
      'FRAMEWORK_LOAD_ERROR',
      'ERR_FRAMEWORK_ROOT_NOT_FOUND',
      { searchedFrom: this.rootPath },
    );
  }

  public loadManifest(): KDLFrameworkManifest {
    const fwRoot = this.findFrameworkRoot();

    const officialPhases = MethodologyRegistry.getOfficialPhases();
    const phases: KDLPhaseDefinition[] = officialPhases.map((p) => ({
      id: p.id,
      name: p.name,
      agentPromptPath: path.join(fwRoot, 'prompts', p.agentPromptFile),
      templatePath: p.templateFile ? path.join(fwRoot, 'templates', p.templateFile) : undefined,
      checklistPath: p.checklistFile ? path.join(fwRoot, 'checklists', p.checklistFile) : undefined,
      outputArtifact: p.outputArtifacts[0] || `${p.id}.md`,
    }));

    return {
      name: 'KDL Landing Framework',
      version: '1.0.0',
      frameworkRootPath: fwRoot,
      manifestoPath: path.join(fwRoot, 'MANIFESTO.md'),
      phases,
      coreModules: [
        'framework-orchestrator.md',
        'context-builder.md',
        'project-memory.md',
        'skill-manager.md',
        'asset-manager.md',
        'design-intelligence.md',
      ],
      engineModules: [
        'framework-engine.md',
        'automation-engine.md',
        'framework-auditor.md',
      ],
    };
  }
}
