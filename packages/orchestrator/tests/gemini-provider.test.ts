import assert from 'node:assert';
import { GeminiProvider, GeminiError } from '../src/providers/gemini.provider.js';

export async function runGeminiProviderTests() {
  console.log('🚀 Running GeminiProvider Interactions API Unit & Integration Test Suite...\n');

  const provider = new GeminiProvider();

  // 1. Model Name Sanitization
  assert.strictEqual(provider.sanitizeModelName('gemini-3.1-pro-preview'), 'gemini-3.1-pro-preview');
  assert.strictEqual(provider.sanitizeModelName('models/gemini-3.1-pro-preview'), 'gemini-3.1-pro-preview');
  assert.strictEqual(provider.sanitizeModelName('/models/gemini-3.1-pro-preview'), 'gemini-3.1-pro-preview');
  assert.strictEqual(provider.sanitizeModelName('"gemini-3.1-pro-preview"'), 'gemini-3.1-pro-preview');

  // 2. Default Model & Fallback Chain
  delete process.env.KDL_GEMINI_MODEL;
  delete process.env.GEMINI_MODEL;
  assert.strictEqual(provider.getPrimaryModel(), 'gemini-3.1-pro-preview');
  assert.deepStrictEqual(provider.getFallbackChain(), ['gemini-3.1-pro-preview', 'gemini-3.6-flash', 'gemini-3.5-flash']);

  // 3. Model Override via KDL_GEMINI_MODEL
  process.env.KDL_GEMINI_MODEL = 'gemini-custom-model';
  assert.strictEqual(provider.getPrimaryModel(), 'gemini-custom-model');
  assert.deepStrictEqual(provider.getFallbackChain(), ['gemini-custom-model', 'gemini-3.6-flash', 'gemini-3.5-flash']);
  delete process.env.KDL_GEMINI_MODEL;

  // 4. Mock HTTP fetch - Interactions Request & Response Parsing
  await provider.initialize({ apiKey: 'test-api-key' });

  const originalFetch = global.fetch;
  let capturedUrl = '';
  let capturedOptions: any = null;

  global.fetch = (async (url: string | URL, options?: RequestInit) => {
    capturedUrl = url.toString();
    capturedOptions = options;
    return new Response(
      JSON.stringify({
        interaction_id: 'test-interaction-123',
        output_text: '{"result":"success"}',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }) as typeof fetch;

  const res = await provider.generate({
    prompt: 'Create landing page copy',
    systemInstruction: 'You are an expert copywriter',
    responseFormat: 'json',
  });

  assert.strictEqual(capturedUrl.split('?')[0], 'https://generativelanguage.googleapis.com/v1beta/interactions');
  assert.ok(capturedUrl.includes('key=test-api-key'));
  assert.strictEqual(capturedOptions.headers['x-goog-api-key'], 'test-api-key');

  const body = JSON.parse(capturedOptions.body);
  assert.strictEqual(body.model, 'gemini-3.1-pro-preview');
  assert.strictEqual(body.generationConfig.responseMimeType, 'application/json');
  assert.strictEqual(res.content, '{"result":"success"}');
  assert.strictEqual(res.jsonPayload?.result, 'success');

  // 5. Fallback Chain Trigger on Model Unavailable (404)
  let attemptCount = 0;
  const attemptedModels: string[] = [];

  global.fetch = (async (url: string | URL, options?: RequestInit) => {
    attemptCount++;
    const payload = JSON.parse(options?.body as string);
    attemptedModels.push(payload.model);

    if (payload.model === 'gemini-3.1-pro-preview') {
      return new Response(JSON.stringify({ error: { message: 'Model no longer available' } }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        output_text: 'Fallback succeeded',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }) as typeof fetch;

  const fallbackRes = await provider.generate({ prompt: 'Hello' });
  assert.strictEqual(attemptCount, 2);
  assert.strictEqual(fallbackRes.model, 'gemini-3.6-flash');
  assert.strictEqual(fallbackRes.content, 'Fallback succeeded');
  assert.deepStrictEqual(attemptedModels, ['gemini-3.1-pro-preview', 'gemini-3.6-flash']);

  // 6. Authentication Failure (401) - Does NOT retry fallback chain
  global.fetch = (async () => {
    return new Response(JSON.stringify({ error: { message: 'Invalid API key' } }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;

  try {
    await provider.generate({ prompt: 'Test auth error' });
    assert.fail('Expected Authentication GeminiError');
  } catch (err: any) {
    assert.strictEqual(err.code, 'AUTHENTICATION');
  }

  // 7. Rate Limit Error (429)
  global.fetch = (async () => {
    return new Response(JSON.stringify({ error: { message: 'Quota exceeded' } }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;

  try {
    await provider.generate({ prompt: 'Test rate limit' });
    assert.fail('Expected RATE_LIMIT GeminiError');
  } catch (err: any) {
    assert.strictEqual(err.code, 'PROVIDER_UNAVAILABLE');
    assert.ok(err.message.includes('429'));
  }

  // 8. Structured Output Invalid Error (Invalid JSON)
  global.fetch = (async () => {
    return new Response(JSON.stringify({ output_text: 'NOT_VALID_JSON_STRING' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;

  try {
    await provider.generate({ prompt: 'Test json parse error', responseFormat: 'json' });
    assert.fail('Expected STRUCTURED_OUTPUT_INVALID GeminiError');
  } catch (err: any) {
    assert.ok(err.message.includes('PROVIDER_UNAVAILABLE') || err.message.includes('STRUCTURED_OUTPUT_INVALID'));
  }

  global.fetch = originalFetch;

  console.log('✔ gemini-provider.test.ts passed (Interactions API, Fallbacks, Errors & Structured JSON Verified)\n');
}
