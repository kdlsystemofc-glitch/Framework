import assert from 'node:assert';
import { MultiStageReasoner } from '../src/reasoning/multi-stage.reasoner.js';
import { InspirationDiscoveryResult } from '@kdl/inspiration';

export async function runReasonerTests() {
  console.log('Running reasoner tests...');

  const mockInspiration = {
    sector: 'restaurants',
    totalFetched: 10,
    topReferences: [],
    synthesizedTokens: {
      colors: { dominant60: '#000', secondary30: '#111', accent10: '#fff', textPrimary: '#fff', textSecondary: '#ccc', contrastRatio: 12 },
      typography: { displayFont: 'Syne', bodyFont: 'Plus Jakarta Sans', scaleRatio: 1.33, minSizeRem: 1, maxSizeRem: 4.5, lineHeightDisplay: 1.05, lineHeightBody: 1.6 },
      layout: { columns: 12, gutterPx: 24, marginPx: 48, bentoAsymmetryRatio: 0.65, verticalRhythmRem: 8.0 },
      motion: { easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', durationFastMs: 250, durationNormalMs: 600, durationSlowMs: 1200, parallaxSpeedRatio: 0.35, scrollScrubEnabled: true },
      visualStyle: 'Cinematic Luxury',
      heroLayoutType: 'Bento Grid',
      ctaStyle: 'Magnetic Pill',
    },
    bestPractices: {
      sector: 'restaurants',
      recommendedStyles: ['Dark Mode Cinematic'],
      forbiddenPractices: ['Generic Purple Gradients'],
      recurringPatterns: ['Bento Grid'],
      topColors: ['#000'],
      topFontPairs: [{ display: 'Syne', body: 'Plus Jakarta Sans' }],
    },
  } as InspirationDiscoveryResult;

  const stages = await MultiStageReasoner.executeReasoning('Test Project', 'restaurants', mockInspiration);
  assert.strictEqual(stages.length, 8);
  assert.strictEqual(stages[0].passed, true);
  assert.strictEqual(stages[7].name, 'Formulate Creative Direction');

  console.log('✔ reasoner.test.ts passed');
}
