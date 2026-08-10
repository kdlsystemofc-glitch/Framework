import assert from 'node:assert';
import { DesignQualityAnalyzer } from '../src/analyzers/design-quality.analyzer.js';

export async function runAnalyzerTests() {
  console.log('Running analyzer tests...');

  const score = DesignQualityAnalyzer.calculateDFIIScore({
    visualQuality: 100,
    originality: 100,
    conversion: 100,
    motion: 100,
    storytelling: 100,
    branding: 100,
    ux: 100,
    performance: 100,
    accessibility: 100,
    architecture: 100,
    seo: 100,
    innovation: 100,
    visualImpact: 100,
    cinematicScore: 100,
  });

  assert.strictEqual(score, 100.0);

  console.log('✔ analyzer.test.ts passed');
}
