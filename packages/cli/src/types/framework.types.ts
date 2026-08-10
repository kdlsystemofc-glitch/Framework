export type KDLPhaseId =
  | '00-loader'
  | '01-discovery'
  | '02-brand-strategy'
  | '03-design-system'
  | '04-copywriting'
  | '05-creative-direction'
  | '06-experience-design'
  | '07-ui-architecture'
  | '07.1-cinematic-experience'
  | '08-implementation'
  | '08.1-final-audit'
  | '09-publication';

export interface KDLPhaseDefinition {
  id: KDLPhaseId;
  name: string;
  agentPromptPath: string;
  templatePath: string;
  checklistPath?: string;
  outputArtifact: string;
}

export interface KDLFrameworkManifest {
  name: string;
  version: string;
  frameworkRootPath: string;
  manifestoPath: string;
  phases: KDLPhaseDefinition[];
  coreModules: string[];
  engineModules: string[];
}

export interface KDLContextState {
  projectName: string;
  niche: string;
  currentPhase: KDLPhaseId;
  completedPhases: KDLPhaseId[];
  artifacts: Record<string, string>;
  startedAt: string;
}
