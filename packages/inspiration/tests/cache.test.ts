import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { InspirationCache } from '../src/cache/inspiration.cache.js';
import { InspirationReference } from '../src/types/inspiration.types.js';

export async function runCacheTests() {
  console.log('Running cache tests...');

  const tmpCacheFile = path.join(process.cwd(), 'temp', '.test-cache.json');
  if (fs.existsSync(tmpCacheFile)) {
    fs.unlinkSync(tmpCacheFile);
  }

  const cache = new InspirationCache(tmpCacheFile);

  const mockRef: InspirationReference = {
    id: 'test-ref-01',
    url: 'https://example.com',
    title: 'Test Reference',
    source: 'Awwwards',
    sector: 'technology',
    tags: ['test'],
    extractedTokens: {
      colors: {
        dominant60: '#000',
        secondary30: '#111',
        accent10: '#fff',
        textPrimary: '#fff',
        textSecondary: '#ccc',
        contrastRatio: 12,
      },
      typography: {
        displayFont: 'Syne',
        bodyFont: 'Inter',
        scaleRatio: 1.25,
        minSizeRem: 1.0,
        maxSizeRem: 4.0,
        lineHeightDisplay: 1.1,
        lineHeightBody: 1.5,
      },
      layout: {
        columns: 12,
        gutterPx: 24,
        marginPx: 32,
        bentoAsymmetryRatio: 0.6,
        verticalRhythmRem: 6.0,
      },
      motion: {
        easingFunction: 'ease-out',
        durationFastMs: 200,
        durationNormalMs: 400,
        durationSlowMs: 800,
        parallaxSpeedRatio: 0.2,
        scrollScrubEnabled: false,
      },
      visualStyle: 'Test Style',
      heroLayoutType: 'Hero',
      ctaStyle: 'CTA',
    },
    scores: {
      visualQuality: 90,
      originality: 90,
      conversion: 90,
      motion: 90,
      storytelling: 90,
      branding: 90,
      ux: 90,
      performance: 90,
      accessibility: 90,
      architecture: 90,
      seo: 90,
      innovation: 90,
      visualImpact: 90,
      cinematicScore: 90,
      dfiiScore: 90,
    },
    analyzedAt: new Date().toISOString(),
  };

  cache.set(mockRef);
  assert.strictEqual(cache.has('test-ref-01'), true);
  assert.strictEqual(cache.get('test-ref-01')?.title, 'Test Reference');

  if (fs.existsSync(tmpCacheFile)) {
    fs.unlinkSync(tmpCacheFile);
  }

  console.log('✔ cache.test.ts passed');
}
