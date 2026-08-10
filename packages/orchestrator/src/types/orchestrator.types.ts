import { BootstrapResult } from '@kdl/bootstrap';
import { InspirationDiscoveryResult, IndustrySector } from '@kdl/inspiration';
import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult } from '@kdl/builder';
import { ReviewResult } from '@kdl/reviewer';

export type PipelineState =
  | 'CREATED'
  | 'INITIALIZING'
  | 'RUNNING'
  | 'WAITING'
  | 'RETRYING'
  | 'PAUSED'
  | 'FAILED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NEEDS_REVIEW';

export type FailurePolicy = 'halt' | 'continue' | 'retry';

export interface StageRetryPolicy {
  maxAttempts: number;
  backoffMs: number;
  timeoutMs: number;
}

export interface ProjectContext {
  projectName: string;
  projectPath: string;
  createdAt: string;
}

export interface ClientContext {
  niche: IndustrySector;
  brandName: string;
}

export interface AssetContext {
  hasLogo: boolean;
  logoPath?: string;
  imagePaths: string[];
}

export interface ResearchContext {
  seoKeywords: string[];
  competitorWhiteSpace: string;
}

export interface CreativeContext {
  archetype?: string;
  toneOfVoice?: string;
}

export interface DesignContext {
  colorPalette?: Record<string, string>;
  typographyTokens?: Record<string, string>;
}

export interface CopyContext {
  headline?: string;
  subheadline?: string;
}

export interface BuildContext {
  target: 'html' | 'react' | 'next' | 'astro';
  buildResult?: BuildOutputResult;
}

export interface ReviewContext {
  reviewResult?: ReviewResult;
}

export interface SharedExecutionContext {
  executionId: string;
  projectName: string;
  projectPath: string;
  sector: IndustrySector;
  project: ProjectContext;
  client: ClientContext;
  asset: AssetContext;
  research: ResearchContext;
  creative: CreativeContext;
  design: DesignContext;
  copy: CopyContext;
  buildContext: BuildContext;
  reviewContext: ReviewContext;
  bootstrap?: BootstrapResult;
  inspiration?: InspirationDiscoveryResult;
  director?: AIDirectorResult;
  build?: BuildOutputResult;
  review?: ReviewResult;
  customData: Record<string, unknown>;
}

export interface StageDefinition {
  id: string;
  name: string;
  description: string;
  dependencies: string[];
  retryPolicy: StageRetryPolicy;
  failurePolicy: FailurePolicy;
  executor: (context: SharedExecutionContext) => Promise<unknown>;
}

export interface PipelineDefinition {
  id: string;
  name: string;
  description: string;
  stages: StageDefinition[];
}

export interface StageCheckpoint {
  stageId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  attempts: number;
  durationMs: number;
  error?: string;
  completedAt?: string;
}

export interface PipelineCheckpoint {
  executionId: string;
  pipelineId: string;
  projectName: string;
  state: PipelineState;
  currentStageId?: string;
  stageCheckpoints: Record<string, StageCheckpoint>;
  updatedAt: string;
}
