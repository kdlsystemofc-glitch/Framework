import assert from 'node:assert';
import { SEOPipeline } from '../src/seo/seo.pipeline.js';
import { AIDirectorResult } from '@kdl/ai-director';

export async function runSEOPipelineTests() {
  console.log('Running SEO pipeline tests...');

  const mockResult = {
    projectName: 'Gourmet SEO Test',
    dna: { concept: 'Mastery Concept' },
  } as unknown as AIDirectorResult;

  const pkg = SEOPipeline.generateSEOPackage(mockResult);
  assert.strictEqual(pkg.title.includes('Gourmet SEO Test'), true);
  assert.strictEqual(pkg.sitemapXml.includes('xml'), true);
  assert.strictEqual(pkg.robotsTxt.includes('User-agent'), true);

  console.log('✔ seo-pipeline.test.ts passed');
}
