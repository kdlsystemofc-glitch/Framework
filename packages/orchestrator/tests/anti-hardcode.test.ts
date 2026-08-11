import assert from 'assert';
import path from 'path';
import fs from 'fs';
import { BriefingParser } from '@kdl/bootstrap';
import {
  AIProviderRegistry,
  PromptCompiler,
  OrchestratorEngine,
  MockAIProvider,
} from '../src/index.js';

async function testBriefingParser() {
  console.log('Testing BriefingParser on test fixture...');
  const fixturePath = path.resolve(process.cwd(), '../../tests/fixtures/restaurant-client');
  const result = BriefingParser.parse(fixturePath, 'restaurant-client');

  assert.strictEqual(result.isValid, true, 'Briefing parse should be valid');
  assert.strictEqual(result.clientContext.businessName.value, 'Cantina Bella Italia Test');
  assert.strictEqual(result.clientContext.slogan.value, 'Sabor Tradicional em Cada Prato!');
  assert.strictEqual(result.clientContext.sector.value, 'restaurante italiano');
  console.log('✔ BriefingParser passed');
}

async function testProviderSafety() {
  console.log('Testing AIProviderRegistry production safety...');
  const oldEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  delete process.env.KDL_AI_PROVIDER;
  delete process.env.KDL_AI_API_KEY;

  let threwError = false;
  try {
    await AIProviderRegistry.getActiveProvider();
  } catch (err: any) {
    threwError = err.message.includes('NO_AI_PROVIDER_CONFIGURED');
  }

  process.env.NODE_ENV = oldEnv;
  assert.strictEqual(threwError, true, 'Must halt when no real provider is configured in production');
  console.log('✔ AIProviderRegistry production safety passed');
}

async function testAntiHardcodeRegression() {
  console.log('Testing Anti-Hardcode Non-Regression on cognitive pipeline...');
  const tmpDir = path.resolve(process.cwd(), '../../temp/anti-hardcode-test');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  // Copy fixture briefing into tmpDir
  const briefingDir = path.join(tmpDir, 'briefing');
  fs.mkdirSync(briefingDir, { recursive: true });
  fs.writeFileSync(
    path.join(briefingDir, 'briefing.md'),
    `# Briefing — Cantina Bella Italia Test\n## Nome comercial\nCantina Bella Italia Test\n## Segmento\nRestaurante\n`,
    'utf-8'
  );

  process.env.NODE_ENV = 'test';
  process.env.KDL_AI_PROVIDER = 'mock';
  const provider = new MockAIProvider();
  await provider.initialize({ allowMock: 'true' });
  AIProviderRegistry.register(provider);

  const engine = new OrchestratorEngine();
  const ctx = await engine.executePipeline('Cantina Bella Italia Test', tmpDir, 'restaurants', 'landing-page-master', false);

  assert.strictEqual(ctx.projectName, 'Cantina Bella Italia Test', 'Project name must not contain Windows path');

  const discoveryFile = path.join(tmpDir, '01-discovery', 'discovery.md');
  if (fs.existsSync(discoveryFile)) {
    const text = fs.readFileSync(discoveryFile, 'utf-8');
    assert.strictEqual(text.includes('High-intent consumers seeking premium'), false, 'Must not contain hardcoded ICP string');
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('✔ Anti-Hardcode Non-Regression passed');
}

async function runAll() {
  try {
    await testBriefingParser();
    await testProviderSafety();
    await testAntiHardcodeRegression();
    console.log('\n==================================================');
    console.log('✅ ALL SPRINT A ANTI-HARDCODE TESTS PASSED (100%)');
    console.log('==================================================');
  } catch (err) {
    console.error('❌ Anti-Hardcode test failed:', err);
    process.exit(1);
  }
}

runAll();
