import assert from 'assert';
import path from 'path';
import fs from 'fs';
import { HTMLBuilder } from '../src/builders/html.builder.js';
import { AIDirectorResult } from '@kdl/ai-director';
import { LandingBuildInput } from '../src/types/builder.types.js';

export async function runMultiClientVariationTests() {
  console.log('Running Builder Multi-Client Variation Tests...');

  const tmpDir1 = path.resolve(process.cwd(), 'temp', 'builder-client-restaurant');
  const tmpDir2 = path.resolve(process.cwd(), 'temp', 'builder-client-clinic');

  if (fs.existsSync(tmpDir1)) fs.rmSync(tmpDir1, { recursive: true, force: true });
  if (fs.existsSync(tmpDir2)) fs.rmSync(tmpDir2, { recursive: true, force: true });
  fs.mkdirSync(tmpDir1, { recursive: true });
  fs.mkdirSync(tmpDir2, { recursive: true });

  const directorRestaurant: AIDirectorResult = {
    projectName: 'Cantina Napoli',
    dna: { visualStyle: 'Warm Italian', concept: 'Massas e Vinhos', dominantEmotion: 'Acolhimento', compositionRule: 'Grid', motionStyle: 'Smooth' },
    designTokens: {
      colors: { dominant60: '#1a0f0d', secondary30: '#2a1a17', accent10: '#e11d48', textPrimary: '#ffffff', textSecondary: '#cccccc' },
      typography: { displayFont: 'Playfair Display', bodyFont: 'Inter', scaleRatio: 1.25, lineHeightDisplay: 1.2 },
      layout: { columns: 12, gutterPx: 24, marginPx: 32 },
      motion: { durationSeconds: 0.8, easingFunction: 'power2.out', staggerSeconds: 0.1 },
    },
    qualityScore: 98,
  };

  const inputRestaurant: LandingBuildInput = {
    project: { projectName: 'Cantina Napoli', projectPath: tmpDir1 },
    copywriting: {
      hero: { headline: 'As Melhores Massas Artesanais de São Paulo', subheadline: 'Receitas de família desde 2015' },
    },
  };

  const directorClinic: AIDirectorResult = {
    projectName: 'Sorriso Premium Odontologia',
    dna: { visualStyle: 'Clinical Clean Minimal', concept: 'Odontologia de Alta Precisão', dominantEmotion: 'Confiança e Calma', compositionRule: 'Grid', motionStyle: 'Minimal' },
    designTokens: {
      colors: { dominant60: '#f0f9ff', secondary30: '#e0f2fe', accent10: '#0284c7', textPrimary: '#0f172a', textSecondary: '#334155' },
      typography: { displayFont: 'Outfit', bodyFont: 'Inter', scaleRatio: 1.2, lineHeightDisplay: 1.2 },
      layout: { columns: 12, gutterPx: 24, marginPx: 32 },
      motion: { durationSeconds: 0.5, easingFunction: 'power1.out', staggerSeconds: 0.05 },
    },
    qualityScore: 98,
  };

  const inputClinic: LandingBuildInput = {
    project: { projectName: 'Sorriso Premium Odontologia', projectPath: tmpDir2 },
    copywriting: {
      hero: { headline: 'Seu Novo Sorriso Começa Com Cuidado e Precisão', subheadline: 'Especialistas em implantes e lentes de contato' },
    },
  };

  const builder = new HTMLBuilder();
  const res1 = await builder.build(directorRestaurant, tmpDir1, { target: 'html' }, inputRestaurant);
  const res2 = await builder.build(directorClinic, tmpDir2, { target: 'html' }, inputClinic);

  const html1 = fs.readFileSync(res1.htmlFilePath!, 'utf-8');
  const html2 = fs.readFileSync(res2.htmlFilePath!, 'utf-8');
  const css1 = fs.readFileSync(res1.cssFilePath!, 'utf-8');
  const css2 = fs.readFileSync(res2.cssFilePath!, 'utf-8');

  // Assert Headlines differ
  assert.ok(html1.includes('Massas Artesanais'), 'Restaurant page must contain restaurant headline');
  assert.ok(html2.includes('Novo Sorriso'), 'Clinic page must contain clinic headline');

  // Assert CSS Colors differ
  assert.ok(css1.includes('#1a0f0d'), 'Restaurant CSS must contain dark warm palette');
  assert.ok(css2.includes('#f0f9ff'), 'Clinic CSS must contain clean blue/white palette');

  fs.rmSync(tmpDir1, { recursive: true, force: true });
  fs.rmSync(tmpDir2, { recursive: true, force: true });
  console.log('✔ Builder Multi-Client Variation passed');
}
