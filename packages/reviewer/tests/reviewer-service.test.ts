import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { ReviewerEngine } from '../src/services/reviewer.service.js';
import { BuildOutputResult } from '@kdl/builder';
import { AIDirectorResult } from '@kdl/ai-director';

export async function runReviewerServiceTests() {
  console.log('Running reviewer service integration tests...');

  const tmpPath = path.join(process.cwd(), 'temp', 'reviewer-service-test');
  const tmpHTML = path.join(tmpPath, 'landing', 'index.html');
  const tmpCSS = path.join(tmpPath, 'landing', 'styles.css');

  fs.mkdirSync(path.dirname(tmpHTML), { recursive: true });
  fs.writeFileSync(
    tmpHTML,
    '<!DOCTYPE html><html lang="pt-BR"><head><title>Test Title</title></head><body><header>Integration Audit Test</header><main><h1>Test Title</h1><img src="test.png" alt="Test image"><a href="#contact">Contact</a></main><footer>Footer</footer></body></html>',
    'utf-8'
  );
  fs.writeFileSync(tmpCSS, ':root { --color-dominant-60: #000; --color-accent-10: #fff; }', 'utf-8');

  const mockBuildResult = {
    projectName: 'Integration Audit Test',
    htmlFilePath: tmpHTML,
    cssFilePath: tmpCSS,
  } as BuildOutputResult;

  const mockDirectorResult = {
    originality: {
      originalityScore: 96.5,
      dfiiScore: 95.5,
      cinematicExperienceScore: 96.0,
    },
  } as AIDirectorResult;

  const engine = new ReviewerEngine();
  const result = await engine.reviewProject(mockBuildResult, mockDirectorResult, tmpPath);

  assert.strictEqual(result.projectName, 'Integration Audit Test');
  assert.strictEqual(fs.existsSync(result.finalReportPath), true);

  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true });
  }

  console.log('✔ reviewer-service.test.ts passed');
}
