import { AIProvider, AIRequest, AIResponse, ProviderHealth } from './ai-provider.interface.js';

export type GeminiErrorCode =
  | 'MODEL_NOT_AVAILABLE'
  | 'RATE_LIMIT'
  | 'AUTHENTICATION'
  | 'INVALID_REQUEST'
  | 'PROVIDER_UNAVAILABLE'
  | 'STRUCTURED_OUTPUT_INVALID';

export class GeminiError extends Error {
  public readonly code: GeminiErrorCode;
  public readonly status?: number;
  public readonly model?: string;

  constructor(code: GeminiErrorCode, message: string, status?: number, model?: string) {
    super(`[${code}] ${message}`);
    this.name = 'GeminiError';
    this.code = code;
    this.status = status;
    this.model = model;
  }
}

export class GeminiProvider implements AIProvider {
  public readonly id = 'gemini';
  public readonly name = 'Google Gemini API Provider (Interactions API)';
  private apiKey?: string;

  public async initialize(config?: Record<string, string>): Promise<void> {
    this.apiKey = config?.apiKey || process.env.KDL_AI_API_KEY || process.env.GEMINI_API_KEY;
  }

  public getPrimaryModel(): string {
    return this.sanitizeModelName(process.env.KDL_GEMINI_MODEL || process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview');
  }

  public getFallbackChain(): string[] {
    const primary = this.getPrimaryModel();
    const fallbacks = ['gemini-3.6-flash', 'gemini-3.5-flash'];
    const chain: string[] = [primary];
    for (const f of fallbacks) {
      if (!chain.includes(f)) {
        chain.push(f);
      }
    }
    return chain;
  }

  public sanitizeModelName(inputModel?: string): string {
    let rawModel = inputModel || 'gemini-3.1-pro-preview';
    rawModel = rawModel.replace(/["']/g, '').trim();
    if (rawModel.startsWith('models/')) {
      rawModel = rawModel.substring('models/'.length);
    } else if (rawModel.startsWith('/models/')) {
      rawModel = rawModel.substring('/models/'.length);
    }
    return rawModel;
  }

  public async health(): Promise<ProviderHealth> {
    if (!this.apiKey) {
      return {
        status: 'NOT_CONFIGURED',
        providerId: this.id,
        message: 'KDL_AI_API_KEY or GEMINI_API_KEY not configured.',
      };
    }
    const primaryModel = this.getPrimaryModel();
    return {
      status: 'HEALTHY',
      providerId: this.id,
      message: `Interactions API | Primary: ${primaryModel}`,
    };
  }

  public async generate(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    if (!this.apiKey) {
      throw new GeminiError('AUTHENTICATION', 'NO_AI_PROVIDER_CONFIGURED: Gemini API Key missing.');
    }

    const fallbackChain = this.getFallbackChain();
    let lastError: Error | undefined;

    for (let i = 0; i < fallbackChain.length; i++) {
      const currentModel = fallbackChain[i];
      const isFallback = i > 0;

      if (isFallback && lastError) {
        console.warn(`[KDL WARN] Fallback triggered in GeminiProvider:`);
        console.warn(`  Requested Model: ${fallbackChain[0]}`);
        console.warn(`  Attempting Model: ${currentModel}`);
        console.warn(`  Fallback Reason: ${lastError.message}`);
      }

      try {
        const response = await this.tryInteractionsRequest(currentModel, request);
        return {
          ...response,
          durationMs: Date.now() - startTime,
        };
      } catch (err: any) {
        lastError = err;

        // Do not retry on Authentication or Invalid Request
        if (err instanceof GeminiError && (err.code === 'AUTHENTICATION' || err.code === 'INVALID_REQUEST')) {
          throw err;
        }
      }
    }

    throw new GeminiError(
      'PROVIDER_UNAVAILABLE',
      `All models in Gemini fallback chain failed (${fallbackChain.join(' -> ')}). Last error: ${lastError?.message}`
    );
  }

  private async tryInteractionsRequest(model: string, request: AIRequest): Promise<Omit<AIResponse, 'durationMs'>> {
    const safeEndpoint = 'https://generativelanguage.googleapis.com/v1beta/interactions';
    const fullUrl = `${safeEndpoint}?key=${this.apiKey}`;

    const promptText = `${request.systemInstruction ? request.systemInstruction + '\n\n' : ''}${request.prompt}`;

    const payload: Record<string, any> = {
      model,
      input: promptText,
      store: false,
    };

    if (request.responseFormat === 'json') {
      payload.generationConfig = {
        responseMimeType: 'application/json',
      };
      if (request.jsonSchema) {
        payload.generationConfig.responseSchema = request.jsonSchema;
      }
    }

    let response: Response;
    try {
      response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey || '',
        },
        body: JSON.stringify(payload),
      });
    } catch (netErr: any) {
      throw new GeminiError('PROVIDER_UNAVAILABLE', `Network error calling Gemini Interactions API: ${netErr.message}`, undefined, model);
    }

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch {
        errorBody = response.statusText;
      }

      const sanitizedError = errorBody.substring(0, 500);

      console.error(`[KDL ERROR] Gemini Interactions API HTTP error ${response.status}:`);
      console.error(`  Provider: ${this.id}`);
      console.error(`  Model: ${model}`);
      console.error(`  API Type: Interactions API`);
      console.error(`  Endpoint: ${safeEndpoint}`);
      console.error(`  HTTP Status: ${response.status} ${response.statusText}`);
      console.error(`  Sanitized Error Body: ${sanitizedError}`);

      let code: GeminiErrorCode = 'PROVIDER_UNAVAILABLE';
      if (response.status === 401 || response.status === 403) code = 'AUTHENTICATION';
      else if (response.status === 404 || errorBody.includes('no longer available') || errorBody.includes('NOT_FOUND')) code = 'MODEL_NOT_AVAILABLE';
      else if (response.status === 429) code = 'RATE_LIMIT';
      else if (response.status === 400) code = 'INVALID_REQUEST';

      throw new GeminiError(code, `HTTP ${response.status} ${response.statusText}: ${sanitizedError}`, response.status, model);
    }

    const data = (await response.json()) as any;
    const text =
      data.output_text ||
      (Array.isArray(data.outputs) && data.outputs[0]?.text) ||
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      '';

    let jsonPayload: Record<string, unknown> | undefined;

    if (request.responseFormat === 'json') {
      try {
        const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        jsonPayload = JSON.parse(cleaned);
      } catch (parseErr: any) {
        throw new GeminiError('STRUCTURED_OUTPUT_INVALID', `Failed to parse structured JSON output: ${parseErr.message}`, response.status, model);
      }
    }

    return {
      content: text,
      jsonPayload,
      providerId: this.id,
      model,
    };
  }
}
