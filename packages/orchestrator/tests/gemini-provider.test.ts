import assert from 'node:assert';
import { GeminiProvider } from '../src/providers/gemini.provider.js';

export async function runGeminiProviderTests() {
  console.log('Running GeminiProvider model sanitization & REST URL unit tests...');

  const provider = new GeminiProvider();

  // 1. Test Model Name Sanitization (prevents /models/models/404)
  assert.strictEqual(provider.sanitizeModelName('gemini-2.5-pro'), 'gemini-2.5-pro');
  assert.strictEqual(provider.sanitizeModelName('models/gemini-2.5-pro'), 'gemini-2.5-pro');
  assert.strictEqual(provider.sanitizeModelName('/models/gemini-2.5-pro'), 'gemini-2.5-pro');
  assert.strictEqual(provider.sanitizeModelName('"gemini-2.5-pro"'), 'gemini-2.5-pro');

  // 2. Test Mock HTTP fetch Endpoint Construction
  await provider.initialize({ apiKey: 'test-dummy-key' });

  const originalFetch = global.fetch;
  let capturedUrl = '';
  let capturedOptions: any = null;

  global.fetch = (async (url: string | URL, options?: RequestInit) => {
    capturedUrl = url.toString();
    capturedOptions = options;
    return new Response(
      JSON.stringify({
        candidates: [{ content: { parts: [{ text: '{"status":"ok"}' }] } }],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }) as typeof fetch;

  const res = await provider.generate({
    prompt: 'Test prompt',
    systemInstruction: 'Test system instruction',
    responseFormat: 'json',
  });

  global.fetch = originalFetch;

  // Validate exact URL prefix and endpoint construction
  const urlWithoutKey = capturedUrl.split('?')[0];
  assert.strictEqual(urlWithoutKey, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent');
  assert.ok(capturedUrl.includes('key=test-dummy-key'));
  assert.strictEqual(capturedOptions.method, 'POST');
  assert.strictEqual(capturedOptions.headers['Content-Type'], 'application/json');

  const body = JSON.parse(capturedOptions.body);
  assert.strictEqual(body.generationConfig.responseMimeType, 'application/json');
  assert.strictEqual(res.jsonPayload?.status, 'ok');

  console.log('✔ gemini-provider.test.ts passed (Gemini REST URL & Sanitization Verified)');
}
