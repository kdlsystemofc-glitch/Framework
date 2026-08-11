import { BootstrapResult, ClientProjectContext, FileMetadata } from '@kdl/bootstrap';
import { InspirationDiscoveryResult, IndustrySector } from '@kdl/inspiration';
import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult } from '@kdl/builder';
import { ReviewResult } from '@kdl/reviewer';

export type PipelineState =
  | 'CREATED'
  | 'INITIALIZING'
  | 'RUNNING'
  | 'WAITING'
  | 'WAITING_FOR_APPROVAL'
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
  briefing?: ClientProjectContext;
}

export interface DetailedAssetItem {
  absolutePath: string;
  relativePath: string;
  filename: string;
  extension: string;
  mimeType: string;
  sizeBytes: number;
  category: string;
  source: string;
}

export interface AssetContext {
  hasLogo: boolean;
  logoPath?: string;
  imagePaths: string[];
  logos: DetailedAssetItem[];
  images: DetailedAssetItem[];
  videos: DetailedAssetItem[];
  documents: DetailedAssetItem[];
  menus: DetailedAssetItem[];
  other: DetailedAssetItem[];
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
  fromArtifacts?: boolean;
  phaseSources?: Record<string, 'AI_PROVIDER' | 'EXTERNAL_ARTIFACT' | 'LOCAL_ENGINE'>;
  customData: Record<string, unknown>;
}

export interface StageDefinition {
  id: string;
  name: string;
  description: string;
  dependencies: string[];
  retryPolicy: StageRetryPolicy;
  failurePolicy: FailurePolicy;
  approvalRequired?: boolean;
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
  status: 'PENDING' | 'RUNNING' | 'WAITING_FOR_APPROVAL' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
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
