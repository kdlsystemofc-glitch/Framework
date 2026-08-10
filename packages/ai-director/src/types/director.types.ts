import { CreativeDNA, DecisionLogsLedger } from './dna.types.js';
import { ExtractedDesignTokens, IndustrySector } from '@kdl/inspiration';

export interface ReasoningStageResult {
  stage: number;
  name: string;
  insights: string[];
  passed: boolean;
}

export interface OriginalityEvaluation {
  originalityScore: number; // 0-100
  creativityScore: number;
  visualImpactScore: number;
  brandingScore: number;
  conversionScore: number;
  motionScore: number;
  uxScore: number;
  uiScore: number;
  storytellingScore: number;
  cinematicExperienceScore: number;
  dfiiScore: number;
  passedConstraints: boolean;
  violatedConstraints: string[];
}

export interface AIDirectorResult {
  projectName: string;
  sector: IndustrySector;
  reasoningStages: ReasoningStageResult[];
  dna: CreativeDNA;
  decisionLogs: DecisionLogsLedger;
  designTokens: ExtractedDesignTokens;
  originality: OriginalityEvaluation;
  dnaFilePath: string;
  decisionLogsFilePath: string;
}
