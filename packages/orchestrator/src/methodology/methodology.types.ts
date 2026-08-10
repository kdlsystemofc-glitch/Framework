export type MethodologyPhaseId =
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

export type PhaseStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'WAITING_FOR_APPROVAL'
  | 'COMPLETED'
  | 'FAILED'
  | 'SKIPPED';

export interface MethodologyPhaseDefinition {
  id: MethodologyPhaseId;
  numericCode: string;
  name: string;
  shortName: string;
  description: string;
  objective: string;
  agentPromptFile: string;
  templateFile?: string;
  checklistFile?: string;
  inputs: string[];
  outputs: string[];
  outputArtifacts: string[];
  dependencies: MethodologyPhaseId[];
  approvalRequired: boolean;
  retryPolicy: {
    maxAttempts: number;
    backoffMs: number;
    timeoutMs: number;
  };
  failurePolicy: 'halt' | 'continue';
}

export interface PhaseExecutionArtifact {
  phaseId: MethodologyPhaseId;
  relativePath: string;
  absolutePath: string;
  generatedAt: string;
  checksum?: string;
}

export interface MethodologyManifest {
  name: string;
  version: string;
  totalOfficialPhases: number;
  phases: MethodologyPhaseDefinition[];
}
