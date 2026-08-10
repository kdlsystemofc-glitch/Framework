import { AIDirectorResult } from '@kdl/ai-director';

export type BuilderTarget = 'html' | 'react' | 'next' | 'astro';

export interface BuildOptions {
  target: BuilderTarget;
  minify?: boolean;
  generateSEO?: boolean;
}

export interface GeneratedAsset {
  filename: string;
  originalFormat: string;
  optimizedFormat: string;
  responsiveSrcset: string;
  sizeBytes: number;
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
}
