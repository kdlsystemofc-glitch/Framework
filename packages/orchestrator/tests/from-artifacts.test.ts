import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { CognitiveArtifactLoader } from '../src/artifacts/cognitive-artifact.loader.js';
import { CognitiveArtifactError } from '../src/errors/cognitive-artifact.error.js';
import { OrchestratorEngine } from '../src/core/orchestrator.service.ts';
import { AIProviderRegistry } from '../src/providers/ai-provider.registry.js';

function createDummyProjectWithArtifacts(testDir: string, customArtifacts?: Record<string, any>) {
  fs.mkdirSync(path.join(testDir, 'briefing'), { recursive: true });
  fs.mkdirSync(path.join(testDir, 'assets', 'images'), { recursive: true });
  fs.mkdirSync(path.join(testDir, '.project', 'artifacts'), { recursive: true });

  fs.writeFileSync(path.join(testDir, 'briefing', 'briefing.md'), '# Dummy Briefing\nName: Test Brand\nNiche: Restaurants\n', 'utf-8');

  const artifactPhases = [
    { dir: '01-discovery', file: 'discovery.json', defaultContent: { businessMechanics: 'Restaurant delivery', icp: 'Foodies' } },
    { dir: '02-brand-strategy', file: 'brand-strategy.json', defaultContent: { positioning: 'Premium Gourmet Burgers', goldenCircle: 'Why us' } },
    { dir: '03-design-system', file: 'design-system.json', defaultContent: { colorTokens: { primary: '#FF5733', secondary: '#C70039' } } },
    { dir: '04-copywriting', file: 'copywriting.json', defaultContent: { hero: { headline: 'The Ultimate Gourmet Burger', subheadline: 'Handcrafted Perfection' } } },
    { dir: '05-creative-direction', file: 'creative-direction.json', defaultContent: { visualStyle: 'Cinematic Dark Mode', dfiiScore: 12 } },
    { dir: '06-experience-design', file: 'experience-design.json', defaultContent: { scrollChoreography: 'Lenis Smooth Scroll' } },
    { dir: '07-ui-architecture', file: 'ui-architecture.json', defaultContent: { bentoGrid: '3-column layout', heroLayout: 'split' } },
    { dir: '07.1-cinematic-experience', file: 'cinematic-experience.json', defaultContent: { lenis: { duration: 1.2 } } },
  ];

  for (const p of artifactPhases) {
    const phaseDir = path.join(testDir, '.project', 'artifacts', p.dir);
    fs.mkdirSync(phaseDir, { recursive: true });
    const content = customArtifacts?.[p.dir] !== undefined ? customArtifacts[p.dir] : p.defaultContent;
    const fileContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    fs.writeFileSync(path.join(phaseDir, p.file), fileContent, 'utf-8');
  }
}

export async function runFromArtifactsTests() {
  console.log('🚀 Running Artifact-Driven Execution Mode (--from-artifacts) Test Suite...\n');

  const baseTmpDir = path.join(process.cwd(), 'tmp', 'test-artifacts-mode');
  fs.mkdirSync(baseTmpDir, { recursive: true });

  // Test A: All artifacts valid -> CognitiveArtifactLoader succeeds
  const projA = path.join(baseTmpDir, 'proj-a');
  createDummyProjectWithArtifacts(projA);
  const loadedA = CognitiveArtifactLoader.loadAndValidateAll(projA);
  assert.ok(loadedA['01-discovery']);
  assert.ok(loadedA['04-copywriting']);
  console.log('✔ Test A: All 8 cognitive artifacts loaded and validated successfully');

  // Test B: Discovery missing -> Fails before Builder with COGNITIVE_ARTIFACT_MISSING
  const projB = path.join(baseTmpDir, 'proj-b');
  createDummyProjectWithArtifacts(projB);
  fs.rmSync(path.join(projB, '.project', 'artifacts', '01-discovery', 'discovery.json'));
  try {
    CognitiveArtifactLoader.loadAndValidateAll(projB);
    assert.fail('Expected COGNITIVE_ARTIFACT_MISSING');
  } catch (err: any) {
    assert.strictEqual(err.code, 'COGNITIVE_ARTIFACT_MISSING');
    assert.strictEqual(err.phaseId, '01-discovery');
    console.log('✔ Test B: Missing 01-discovery failed immediately with COGNITIVE_ARTIFACT_MISSING');
  }

  // Test C: design-system JSON invalid -> Fails with COGNITIVE_ARTIFACT_INVALID_JSON
  const projC = path.join(baseTmpDir, 'proj-c');
  createDummyProjectWithArtifacts(projC, { '03-design-system': 'INVALID_NOT_JSON{{{' });
  try {
    CognitiveArtifactLoader.loadAndValidateAll(projC);
    assert.fail('Expected COGNITIVE_ARTIFACT_INVALID_JSON');
  } catch (err: any) {
    assert.strictEqual(err.code, 'COGNITIVE_ARTIFACT_INVALID_JSON');
    assert.strictEqual(err.phaseId, '03-design-system');
    console.log('✔ Test C: Invalid JSON in 03-design-system failed with COGNITIVE_ARTIFACT_INVALID_JSON');
  }

  // Test D: Schema incompatible -> Fails with COGNITIVE_ARTIFACT_SCHEMA_INVALID
  const projD = path.join(baseTmpDir, 'proj-d');
  createDummyProjectWithArtifacts(projD, { '04-copywriting': {} });
  try {
    CognitiveArtifactLoader.loadAndValidateAll(projD);
    assert.fail('Expected COGNITIVE_ARTIFACT_SCHEMA_INVALID');
  } catch (err: any) {
    assert.strictEqual(err.code, 'COGNITIVE_ARTIFACT_SCHEMA_INVALID');
    assert.strictEqual(err.phaseId, '04-copywriting');
    console.log('✔ Test D: Incompatible schema in 04-copywriting failed with COGNITIVE_ARTIFACT_SCHEMA_INVALID');
  }

  // Test E: Zero KDL_AI_API_KEY + --from-artifacts -> Pipeline executes normally
  const oldKey = process.env.KDL_AI_API_KEY;
  const oldGeminiKey = process.env.GEMINI_API_KEY;
  const oldProvider = process.env.KDL_AI_PROVIDER;
  delete process.env.KDL_AI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  delete process.env.KDL_AI_PROVIDER;

  const projE = path.join(baseTmpDir, 'proj-e');
  createDummyProjectWithArtifacts(projE);

  const engineE = new OrchestratorEngine();
  const ctxE = await engineE.executePipeline('proj-e', projE, 'restaurants', 'landing-page-master', false, false, true);

  assert.strictEqual(ctxE.fromArtifacts, true);
  assert.ok(ctxE.build?.htmlFilePath);
  assert.ok(fs.existsSync(ctxE.build.htmlFilePath));
  console.log('✔ Test E: --from-artifacts executed pipeline cleanly with ZERO AI API keys configured');

  // Test F: Spy on AIProviderRegistry -> Confirm ZERO AI Provider calls during --from-artifacts
  let aiCallsCount = 0;
  const originalGetActive = AIProviderRegistry.getActiveProvider;
  AIProviderRegistry.getActiveProvider = (async () => {
    aiCallsCount++;
    throw new Error('AI Provider should NOT be called in --from-artifacts mode!');
  }) as typeof AIProviderRegistry.getActiveProvider;

  const projF = path.join(baseTmpDir, 'proj-f');
  createDummyProjectWithArtifacts(projF);
  const engineF = new OrchestratorEngine();
  await engineF.executePipeline('proj-f', projF, 'restaurants', 'landing-page-master', false, false, true);

  AIProviderRegistry.getActiveProvider = originalGetActive;
  assert.strictEqual(aiCallsCount, 0);
  console.log('✔ Test F: Confirmed ZERO calls to AIProviderRegistry during --from-artifacts execution');

  // Test G: Two different artifact sets -> Generates two visually/structurally different landings
  const projG1 = path.join(baseTmpDir, 'proj-g1');
  const projG2 = path.join(baseTmpDir, 'proj-g2');

  createDummyProjectWithArtifacts(projG1, {
    '04-copywriting': { hero: { headline: 'Burgers Spectacular Alpha' } },
    '03-design-system': { colorTokens: { primary: '#FF1111' } },
  });
  createDummyProjectWithArtifacts(projG2, {
    '04-copywriting': { hero: { headline: 'Sushi Master Premium Beta' } },
    '03-design-system': { colorTokens: { primary: '#11FF11' } },
  });

  const engineG = new OrchestratorEngine();
  const ctxG1 = await engineG.executePipeline('proj-g1', projG1, 'restaurants', 'landing-page-master', false, false, true);
  const ctxG2 = await engineG.executePipeline('proj-g2', projG2, 'restaurants', 'landing-page-master', false, false, true);

  const htmlG1 = fs.readFileSync(ctxG1.build!.htmlFilePath!, 'utf-8');
  const htmlG2 = fs.readFileSync(ctxG2.build!.htmlFilePath!, 'utf-8');

  assert.notStrictEqual(htmlG1, htmlG2);
  assert.ok(htmlG1.includes('Burgers Spectacular Alpha'));
  assert.ok(htmlG2.includes('Sushi Master Premium Beta'));
  console.log('✔ Test G: Two different cognitive artifact sets generated two distinct landings');

  // Test H: Artifact containing raw Windows path -> Sanitized, zero path leak in HTML
  const projH = path.join(baseTmpDir, 'proj-h');
  createDummyProjectWithArtifacts(projH, {
    '04-copywriting': { hero: { headline: 'Clean Path Test', logoPath: 'C:\\Users\\kauan\\SecretPath\\logo.png' } },
  });
  const engineH = new OrchestratorEngine();
  const ctxH = await engineH.executePipeline('proj-h', projH, 'restaurants', 'landing-page-master', false, false, true);
  const htmlH = fs.readFileSync(ctxH.build!.htmlFilePath!, 'utf-8');
  assert.ok(!htmlH.includes('C:\\Users\\kauan\\SecretPath'));
  console.log('✔ Test H: Raw Windows paths sanitized and zero leak in final HTML');

  // Restore env
  if (oldKey) process.env.KDL_AI_API_KEY = oldKey;
  if (oldGeminiKey) process.env.GEMINI_API_KEY = oldGeminiKey;
  if (oldProvider) process.env.KDL_AI_PROVIDER = oldProvider;

  console.log('==================================================');
  console.log('✅ ALL ARTIFACT-DRIVEN TEST SUITES PASSED (8/8 100%)');
  console.log('==================================================\n');
}
