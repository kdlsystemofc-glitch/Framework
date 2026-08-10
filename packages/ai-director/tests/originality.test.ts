import assert from 'node:assert';
import { OriginalityEvaluator } from '../src/review-engine/originality.evaluator.js';
import { ExtractedDesignTokens } from '@kdl/inspiration';

export async function runOriginalityTests() {
  console.log('Running originality evaluator tests...');

  const validTokens = {
    colors: { dominant60: '#000', secondary30: '#111', accent10: '#f00', textPrimary: '#fff', textSecondary: '#ccc', contrastRatio: 12 },
    typography: { displayFont: 'Syne', bodyFont: 'Plus Jakarta Sans', scaleRatio: 1.33, minSizeRem: 1, maxSizeRem: 4.5, lineHeightDisplay: 1.05, lineHeightBody: 1.6 },
    layout: { columns: 12, gutterPx: 24, marginPx: 48, bentoAsymmetryRatio: 0.65, verticalRhythmRem: 8.0 },
    motion: { easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', durationFastMs: 250, durationNormalMs: 600, durationSlowMs: 1200, parallaxSpeedRatio: 0.35, scrollScrubEnabled: true },
    visualStyle: 'Cinematic',
    heroLayoutType: 'Bento Grid',
    ctaStyle: 'Pill CTA',
  } as ExtractedDesignTokens;

  const evalResult = OriginalityEvaluator.evaluate(validTokens);
  assert.strictEqual(evalResult.passedConstraints, true);
  assert.strictEqual(evalResult.dfiiScore > 90, true);

  console.log('✔ originality.test.ts passed');
}
