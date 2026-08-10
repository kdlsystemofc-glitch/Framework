import { BootstrapResult } from '@kdl/bootstrap';
import { InspirationDiscoveryResult, IndustrySector } from '@kdl/inspiration';
import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult, BuilderTarget } from '@kdl/builder';
import { ReviewResult } from '@kdl/reviewer';

export interface BootstrapInput {
  targetClientFolder: string;
}
export type BootstrapOutput = BootstrapResult;

export interface InspirationInput {
  sector: IndustrySector;
}
export type InspirationOutput = InspirationDiscoveryResult;

export interface DirectorInput {
  projectName: string;
  projectPath: string;
  sector: IndustrySector;
  inspiration: InspirationDiscoveryResult;
}
export type DirectorOutput = AIDirectorResult;

export interface BuilderInput {
  directorResult: AIDirectorResult;
  projectPath: string;
  options: { target: BuilderTarget };
}
export type BuilderOutput = BuildOutputResult;

export interface ReviewInput {
  buildResult: BuildOutputResult;
  directorResult: AIDirectorResult;
  projectPath: string;
}
export type ReviewOutput = ReviewResult;

export interface OrchestratorInput {
  projectName: string;
  projectPath: string;
  sector: IndustrySector;
  pipelineId?: string;
  resumeMode?: boolean;
}
export interface OrchestratorOutput {
  executionId: string;
  projectName: string;
  projectPath: string;
  sector: IndustrySector;
  passedAllGates: boolean;
  overallScore: number;
  reportPath: string;
}
