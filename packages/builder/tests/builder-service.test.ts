import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { BuilderEngine } from '../src/services/builder.service.js';
import { AIDirectorResult } from '@kdl/ai-director';

export async function runBuilderServiceTests() {
  console.log('Running builder service integration tests...');

  const tmpPath = path.join(process.cwd(), 'temp', 'builder-service-test');
  const engine = new BuilderEngine();

  const mockDirectorResult = {
    projectName: 'Engine Build Test',
    dna: {
      concept: 'Concept Mastery',
      visualStyle: 'Cinematic Gold Standard',
      dominantEmotion: 'Exclusivity',
    },
    designTokens: {
      colors: { dominant60: '#000', secondary30: '#111', accent10: '#f00', textPrimary: '#fff', textSecondary: '#ccc', contrastRatio: 12 },
      typography: { displayFont: 'Syne', bodyFont: 'Plus Jakarta Sans', scaleRatio: 1.33, minSizeRem: 1, maxSizeRem: 4.5, lineHeightDisplay: 1.05, lineHeightBody: 1.6 },
      layout: { columns: 12, gutterPx: 24, marginPx: 48, bentoAsymmetryRatio: 0.65, verticalRhythmRem: 8.0 },
      motion: { easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', durationFastMs: 250, durationNormalMs: 600, durationSlowMs: 1200, parallaxSpeedRatio: 0.35, scrollScrubEnabled: true },
    },
  } as unknown as AIDirectorResult;

  const result = await engine.buildLanding(mockDirectorResult, tmpPath, { target: 'html' });

  assert.strictEqual(result.target, 'html');
  assert.strictEqual(fs.existsSync(result.htmlFilePath!), true);

  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true });
  }

  console.log('✔ builder-service.test.ts passed');
}
