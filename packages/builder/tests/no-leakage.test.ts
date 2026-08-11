import assert from 'assert';
import path from 'path';
import fs from 'fs';
import { HTMLBuilder } from '../src/builders/html.builder.js';
import { AIDirectorResult } from '@kdl/ai-director';

export async function runNoLeakageTests() {
  console.log('Running Builder No-Leakage Non-Regression Tests...');

  const tmpDir = path.resolve(process.cwd(), 'temp', 'builder-no-leakage-test');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const dummyDirector: AIDirectorResult = {
    projectName: 'Pizzaria Napoli Test',
    dna: {
      visualStyle: 'Warm Italian Traditional',
      concept: 'Sabor Autêntico Italiano',
      dominantEmotion: 'Acolhimento e Tradição',
      cinematicAtmosphere: 'Luzes quentes e textura de madeira',
      compositionRule: 'Golden Ratio',
      motionStyle: 'Smooth Natural',
    },
    designTokens: {
      colors: {
        dominant60: '#1a0f0d',
        secondary30: '#2a1a17',
        accent10: '#e11d48',
        textPrimary: '#fef2f2',
        textSecondary: '#fca5a5',
      },
      typography: {
        displayFont: 'Playfair Display',
        bodyFont: 'Inter',
        scaleRatio: 1.25,
        lineHeightDisplay: 1.2,
      },
      layout: {
        columns: 12,
        gutterPx: 24,
        marginPx: 32,
      },
      motion: {
        durationSeconds: 0.8,
        easingFunction: 'power2.out',
        staggerSeconds: 0.1,
      },
    },
    qualityScore: 98,
  };

  const builder = new HTMLBuilder();
  const buildResult = await builder.build(dummyDirector, tmpDir, { target: 'html' });

  const htmlContent = fs.readFileSync(buildResult.htmlFilePath!, 'utf-8');
  const cssContent = fs.readFileSync(buildResult.cssFilePath!, 'utf-8');

  // 1. Assert No KDL Brand Leakage
  assert.strictEqual(htmlContent.includes('KDL Gold Standard'), false, 'Must not contain KDL Gold Standard');
  assert.strictEqual(htmlContent.includes('KDL Framework'), false, 'Must not contain KDL Framework');
  assert.strictEqual(htmlContent.includes('Powered by KDL'), false, 'Must not contain Powered by KDL');
  assert.strictEqual(htmlContent.includes('Stage Showcase'), false, 'Must not contain Stage Showcase');

  // 2. Assert No Filesystem Path Leakage in HTML/CSS
  assert.strictEqual(htmlContent.includes('C:\\'), false, 'HTML must not leak Windows C:\\ path');
  assert.strictEqual(htmlContent.includes('file://'), false, 'HTML must not leak file:// URI');
  assert.strictEqual(cssContent.includes('C:\\'), false, 'CSS must not leak Windows C:\\ path');

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('✔ Builder No-Leakage Non-Regression passed');
}
