import fs from 'fs';
import path from 'path';
import { KDLFrameworkManifest, KDLPhaseDefinition } from '../types/framework.types.js';
import { KDLError } from '../types/error.types.js';

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

    const phases: KDLPhaseDefinition[] = [
      {
        id: '00-loader',
        name: 'Framework Loader & Environment Discovery',
        agentPromptPath: path.join(fwRoot, 'prompts', '00-framework-loader.md'),
        templatePath: path.join(fwRoot, 'templates', 'discovery-template.md'),
        outputArtifact: 'environment-discovery.md',
      },
      {
        id: '01-discovery',
        name: 'Business & Project Discovery',
        agentPromptPath: path.join(fwRoot, 'prompts', '01-discovery-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'discovery-template.md'),
        outputArtifact: 'discovery.md',
      },
      {
        id: '02-brand-strategy',
        name: 'Brand Strategy & Voice Positioning',
        agentPromptPath: path.join(fwRoot, 'prompts', '02-brand-strategy-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'brand-strategy-template.md'),
        outputArtifact: 'brand-strategy.md',
      },
      {
        id: '03-design-system',
        name: 'Semantic Design Tokens & System',
        agentPromptPath: path.join(fwRoot, 'prompts', '03-design-system-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'design-system-template.md'),
        outputArtifact: 'design-system.md',
      },
      {
        id: '04-copywriting',
        name: 'Master Copywriting (AIDA & Anti-AI)',
        agentPromptPath: path.join(fwRoot, 'prompts', '04-copywriting-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'copywriting-template.md'),
        outputArtifact: 'copywriting.md',
      },
      {
        id: '05-creative-direction',
        name: 'Visual Creative Direction (DFII >= 10)',
        agentPromptPath: path.join(fwRoot, 'prompts', '05-creative-direction-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'creative-direction-template.md'),
        outputArtifact: 'creative-direction.md',
      },
      {
        id: '06-experience-design',
        name: 'Experience Design & User Journey Mapping',
        agentPromptPath: path.join(fwRoot, 'prompts', '06-experience-design-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'experience-design-template.md'),
        outputArtifact: 'experience-design.md',
      },
      {
        id: '07-ui-architecture',
        name: 'UI Architecture & Bento Grid System',
        agentPromptPath: path.join(fwRoot, 'prompts', '07-ui-architecture-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'ui-architecture-template.md'),
        checklistPath: path.join(fwRoot, 'checklists', 'design-gate.md'),
        outputArtifact: 'ui-architecture.md',
      },
      {
        id: '07.1-cinematic-experience',
        name: 'Cinematic Scroll Motion & GSAP Physics',
        agentPromptPath: path.join(fwRoot, 'prompts', '07.1-cinematic-experience-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'experience-design-template.md'),
        outputArtifact: 'cinematic-experience.md',
      },
      {
        id: '08-implementation',
        name: 'Production Front-End Implementation',
        agentPromptPath: path.join(fwRoot, 'prompts', '08-implementation-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'ui-architecture-template.md'),
        checklistPath: path.join(fwRoot, 'checklists', 'development-gate.md'),
        outputArtifact: 'src/index.html',
      },
      {
        id: '08.1-final-audit',
        name: 'Final Audit & Quality Gates',
        agentPromptPath: path.join(fwRoot, 'prompts', '08.1-final-audit-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'audit-template.md'),
        checklistPath: path.join(fwRoot, 'checklists', 'quality-gate.md'),
        outputArtifact: 'audit-report.md',
      },
      {
        id: '09-publication',
        name: 'Production Deployment & Publication',
        agentPromptPath: path.join(fwRoot, 'prompts', '09-publication-agent.md'),
        templatePath: path.join(fwRoot, 'templates', 'publication-template.md'),
        checklistPath: path.join(fwRoot, 'checklists', 'publication-gate.md'),
        outputArtifact: 'publication-report.md',
      },
    ];

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
