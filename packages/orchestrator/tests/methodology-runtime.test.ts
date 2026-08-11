import assert from 'assert';
import path from 'path';
import fs from 'fs';
import {
  MethodologyRegistry,
  PromptLoader,
  AgentRegistry,
  ArtifactRegistry,
  createLandingPagePipeline,
  PipelineExecutor,
  SharedExecutionContext,
} from '../src/index.js';

async function testMethodologyRegistry() {
  console.log('Testing MethodologyRegistry...');
  const manifest = MethodologyRegistry.getManifest();
  assert.strictEqual(manifest.totalOfficialPhases, 12, 'Must register exactly 12 official methodology phases');
  assert.strictEqual(manifest.phases[0].id, '00-loader');
  assert.strictEqual(manifest.phases[11].id, '09-publication');
  console.log('✔ MethodologyRegistry passed');
}

async function testPromptLoader() {
  console.log('Testing PromptLoader...');
  const loader = new PromptLoader();
  const officialPhases = MethodologyRegistry.getOfficialPhases();
  const validation = loader.validateAllPrompts(officialPhases.map((p) => p.agentPromptFile));
  assert.strictEqual(validation.valid, 12, 'All 12 prompt files must exist in prompts/');
  assert.strictEqual(validation.missing.length, 0);

  const loaded = loader.loadPrompt('01-discovery-agent.md', { PROJECT_NAME: 'TestProject' });
  assert.ok(loaded.renderedPrompt.length > 0);
  console.log('✔ PromptLoader passed');
}

async function testAgentRegistry() {
  console.log('Testing AgentRegistry...');
  const officialPhases = MethodologyRegistry.getOfficialPhases();
  for (const phase of officialPhases) {
    const executor = AgentRegistry.getExecutor(phase.id);
    assert.ok(executor, `Executor for phase '${phase.id}' must be resolved`);
  }
  console.log('✔ AgentRegistry passed');
}

async function testArtifactRegistry() {
  console.log('Testing ArtifactRegistry...');
  const tmpDir = path.join(process.cwd(), 'temp', 'test-artifacts-dir');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const artifacts = new ArtifactRegistry(tmpDir);
  const art = artifacts.saveArtifact('01-discovery', '01-discovery/test-doc.md', '# Test Discovery');
  assert.strictEqual(artifacts.hasArtifact('01-discovery/test-doc.md'), true);
  assert.strictEqual(artifacts.readArtifact('01-discovery/test-doc.md'), '# Test Discovery');

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('✔ ArtifactRegistry passed');
}

async function test12PhasePipelineExecution() {
  console.log('Testing 12-Phase Pipeline Execution...');
  process.env.NODE_ENV = 'test';
  process.env.KDL_AI_PROVIDER = 'mock';

  const tmpDir = path.join(process.cwd(), 'temp', 'test-12-phase-project');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const pipeline = createLandingPagePipeline(process.cwd());
  assert.strictEqual(pipeline.stages.length, 12, 'Pipeline must consist of 12 stages');

  const executor = new PipelineExecutor();
  const context: SharedExecutionContext = {
    executionId: 'exec-12-phase-test',
    projectName: 'test-gourmet',
    projectPath: tmpDir,
    sector: 'restaurants',
    project: { projectName: 'test-gourmet', projectPath: tmpDir, createdAt: new Date().toISOString() },
    client: { niche: 'restaurants', brandName: 'Test Gourmet' },
    asset: { hasLogo: false, imagePaths: [], logos: [], images: [], videos: [], documents: [], menus: [], other: [] },
    research: { seoKeywords: ['restaurants'], competitorWhiteSpace: 'Cinematic' },
    creative: {},
    design: {},
    copy: {},
    buildContext: { target: 'html' },
    reviewContext: {},
    customData: {},
  };

  const finalCtx = await executor.executePipeline(pipeline, context, false, false);
  assert.ok(finalCtx.bootstrap, 'Bootstrap result must exist');
  assert.ok(finalCtx.inspiration, 'Inspiration result must exist');
  assert.ok(finalCtx.director, 'Director result must exist');
  assert.ok(finalCtx.build, 'Build result must exist');
  assert.ok(finalCtx.review, 'Review result must exist');

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('✔ 12-Phase Pipeline Execution passed');
}

async function runAll() {
  try {
    await testMethodologyRegistry();
    await testPromptLoader();
    await testAgentRegistry();
    await testArtifactRegistry();
    await test12PhasePipelineExecution();
    console.log('\n==================================================');
    console.log('✅ ALL METHODOLOGY RUNTIME TESTS PASSED (100%)');
    console.log('==================================================');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
}

runAll();
