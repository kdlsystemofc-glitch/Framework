import { ExtractedDesignTokens } from './tokens.types.js';

export type ProviderSource =
  | 'Awwwards'
  | 'LandBook'
  | 'Godly'
  | 'LapaNinja'
  | 'OnePageLove'
  | 'Behance'
  | 'Dribbble'
  | 'Pinterest'
  | 'CSSDesignAwards'
  | 'SiteInspire'
  | 'Local';

export type IndustrySector =
  | 'fashion'
  | 'restaurants'
  | 'dentists'
  | 'lawyers'
  | 'real-estate'
  | 'beauty'
  | 'gym'
  | 'technology'
  | 'industry'
  | 'education'
  | 'general';

export interface QualityMetrics {
  visualQuality: number;
  originality: number;
  conversion: number;
  motion: number;
  storytelling: number;
  branding: number;
  ux: number;
  performance: number;
  accessibility: number;
  architecture: number;
  seo: number;
  innovation: number;
  visualImpact: number;
  cinematicScore: number;
  dfiiScore: number;
}

export interface InspirationReference {
  id: string;
  url: string;
  title: string;
  source: ProviderSource;
  sector: IndustrySector;
  tags: string[];
  extractedTokens: ExtractedDesignTokens;
  scores: QualityMetrics;
  analyzedAt: string;
}

export interface SegmentBestPractices {
  sector: IndustrySector;
  recommendedStyles: string[];
  forbiddenPractices: string[];
  recurringPatterns: string[];
  topColors: string[];
  topFontPairs: Array<{ display: string; body: string }>;
}
