import { AIDirectorResult } from '@kdl/ai-director';
import { ClientProjectContext } from '@kdl/bootstrap';

export type BuilderTarget = 'html' | 'react' | 'next' | 'astro';

export interface BuildOptions {
  target: BuilderTarget;
  minify?: boolean;
  generateSEO?: boolean;
}

export type SectionType =
  | 'Hero'
  | 'BrandStory'
  | 'ProductShowcase'
  | 'Benefits'
  | 'SocialProof'
  | 'Gallery'
  | 'Location'
  | 'Contact'
  | 'CTA'
  | 'FAQ'
  | 'Footer';

export interface SectionDefinition {
  id: string;
  type: SectionType;
  layoutVariant?: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  items?: any[];
  primaryCta?: { label: string; url: string };
  secondaryCta?: { label: string; url: string };
  assignedAssets?: ProcessedAsset[];
}

export interface PageBlueprint {
  sections: SectionDefinition[];
  visualTheme: string;
  headerNavigation: {
    brandName: string;
    logoAsset?: ProcessedAsset;
    links: Array<{ label: string; anchor: string }>;
    cta?: { label: string; url: string };
  };
}

export type AssetRole =
  | 'logo'
  | 'hero'
  | 'product'
  | 'gallery'
  | 'testimonial'
  | 'location'
  | 'brand'
  | 'decorative';

export interface ProcessedAsset {
  id: string;
  originalPath: string;
  relativePath: string;
  filename: string;
  extension: string;
  mimeType: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  sizeBytes: number;
  hash: string;
  role: AssetRole;
  altCandidate: string;
  isHeroPreload?: boolean;
}

export interface AssetManifest {
  logo?: ProcessedAsset;
  heroImage?: ProcessedAsset;
  productImages: ProcessedAsset[];
  galleryImages: ProcessedAsset[];
  otherAssets: ProcessedAsset[];
  allAssets: ProcessedAsset[];
}

export interface LandingBuildInput {
  project: { projectName: string; projectPath: string };
  clientContext?: ClientProjectContext;
  discovery?: any;
  brandStrategy?: any;
  designSystem?: any;
  copywriting?: any;
  creativeDirection?: any;
  experienceDesign?: any;
  uiArchitecture?: any;
  cinematicExperience?: any;
  directorResult?: AIDirectorResult;
}

export interface GeneratedAsset {
  filename: string;
  originalFormat: string;
  optimizedFormat: string;
  responsiveSrcset: string;
  sizeBytes: number;
  relativePath?: string;
  absolutePath?: string;
}

export interface SEOPackage {
  title: string;
  metaDescription: string;
  openGraphTags: string;
  jsonLdSchema: string;
  sitemapXml: string;
  robotsTxt: string;
}

export interface BuildOutputResult {
  projectName: string;
  target: BuilderTarget;
  outputPath: string;
  htmlFilePath?: string;
  cssFilePath?: string;
  jsFilePath?: string;
  assetsGenerated: GeneratedAsset[];
  seo: SEOPackage;
  buildReportPath: string;
  manifest?: AssetManifest;
  blueprint?: PageBlueprint;
}
