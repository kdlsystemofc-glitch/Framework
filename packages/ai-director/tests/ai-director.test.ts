import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { AIDirectorService } from '../src/director/ai-director.service.js';
import { AutoLearningMemory } from '../src/memory/auto-learning.memory.js';
import { InspirationDiscoveryResult } from '@kdl/inspiration';

export async function runAIDirectorTests() {
  console.log('Running ai-director integration tests...');

  const tmpPath = path.join(process.cwd(), 'temp', 'director-test');
  const tmpMemoryFile = path.join(process.cwd(), 'temp', '.test-director-memory.json');

  if (fs.existsSync(tmpMemoryFile)) {
    fs.unlinkSync(tmpMemoryFile);
  }

  const memory = new AutoLearningMemory(tmpMemoryFile);
  const director = new AIDirectorService(memory);

  const mockInspiration = {
    sector: 'restaurants',
    totalFetched: 10,
    topReferences: [{ title: 'Benchmark' }],
    synthesizedTokens: {
      colors: { dominant60: '#000', secondary30: '#111', accent10: '#fff', textPrimary: '#fff', textSecondary: '#ccc', contrastRatio: 12 },
      typography: { displayFont: 'Syne', bodyFont: 'Plus Jakarta Sans', scaleRatio: 1.33, minSizeRem: 1, maxSizeRem: 4.5, lineHeightDisplay: 1.05, lineHeightBody: 1.6 },
      layout: { columns: 12, gutterPx: 24, marginPx: 48, bentoAsymmetryRatio: 0.65, verticalRhythmRem: 8.0 },
      motion: { easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', durationFastMs: 250, durationNormalMs: 600, durationSlowMs: 1200, parallaxSpeedRatio: 0.35, scrollScrubEnabled: true },
      visualStyle: 'Cinematic',
      heroLayoutType: 'Bento Grid',
      ctaStyle: 'Pill CTA',
    },
    bestPractices: {
      sector: 'restaurants',
      recommendedStyles: ['Dark Mode Cinematic'],
      forbiddenPractices: ['Generic Purple Gradients'],
      recurringPatterns: ['Bento Grid'],
      topColors: ['#000'],
      topFontPairs: [{ display: 'Syne', body: 'Plus Jakarta Sans' }],
    },
  } as unknown as InspirationDiscoveryResult;

  const result = await director.directProject('Gourmet Test', tmpPath, 'restaurants', mockInspiration);

  assert.strictEqual(result.projectName, 'Gourmet Test');
  assert.strictEqual(result.reasoningStages.length, 8);
  assert.strictEqual(fs.existsSync(result.dnaFilePath), true);
  assert.strictEqual(fs.existsSync(result.decisionLogsFilePath), true);

  if (fs.existsSync(result.dnaFilePath)) fs.unlinkSync(result.dnaFilePath);
  if (fs.existsSync(result.decisionLogsFilePath)) fs.unlinkSync(result.decisionLogsFilePath);
  if (fs.existsSync(tmpMemoryFile)) fs.unlinkSync(tmpMemoryFile);

  console.log('✔ ai-director.test.ts passed');
}
