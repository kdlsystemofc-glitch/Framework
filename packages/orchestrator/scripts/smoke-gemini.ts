import { GeminiProvider } from '../src/providers/gemini.provider.js';

export async function runGeminiSmokeTest() {
  console.log('============================================================');
  console.log('   KDL FRAMEWORK — GOOGLE GEMINI INTERACTIONS API SMOKE TEST');
  console.log('============================================================\n');

  const apiKey = process.env.KDL_AI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log('[KDL NOTICE] No API key detected in process.env (KDL_AI_API_KEY or GEMINI_API_KEY).');
    console.log('[KDL NOTICE] To execute real API call, set $env:KDL_AI_API_KEY="YOUR_KEY" in PowerShell.');
    console.log('[KDL NOTICE] Smoke test skipped (offline mode).\n');
    return;
  }

  const provider = new GeminiProvider();
  await provider.initialize({ apiKey });

  console.log(`[KDL INFO] Provider: ${provider.name}`);
  console.log(`[KDL INFO] Primary Model: ${provider.getPrimaryModel()}`);
  console.log(`[KDL INFO] Fallback Chain: ${provider.getFallbackChain().join(' -> ')}`);
  console.log(`[KDL INFO] API Endpoint: https://generativelanguage.googleapis.com/v1beta/interactions`);
  console.log(`[KDL INFO] Sending controlled prompt: "Responda apenas com KDL GEMINI OK"...\n`);

  try {
    const response = await provider.generate({
      prompt: 'Responda apenas com KDL GEMINI OK',
      temperature: 0.0,
    });

    console.log('------------------------------------------------------------');
    console.log(`[KDL SUCCESS] Real Gemini Response Received!`);
    console.log(`  Model Used: ${response.model}`);
    console.log(`  Duration: ${response.durationMs}ms`);
    console.log(`  Raw Content: "${response.content.trim()}"`);
    console.log('------------------------------------------------------------\n');

    if (response.content.includes('KDL GEMINI OK')) {
      console.log('✅ KDL GEMINI REAL SMOKE TEST PASSED (STATUS: REAL / READY)\n');
    } else {
      console.log('⚠ Smoke test completed, but response content differed from expected exact string.\n');
    }
  } catch (err: any) {
    console.error(`❌ Real Gemini Smoke Test Failed: ${err.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1]?.endsWith('smoke-gemini.js') || process.argv[1]?.endsWith('smoke-gemini.ts')) {
  runGeminiSmokeTest();
}
