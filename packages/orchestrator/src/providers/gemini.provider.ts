import { AIProvider, AIRequest, AIResponse, ProviderHealth } from './ai-provider.interface.js';

export class GeminiProvider implements AIProvider {
  public readonly id = 'gemini';
  public readonly name = 'Google Gemini API Provider';
  private apiKey?: string;

  public async initialize(config?: Record<string, string>): Promise<void> {
    this.apiKey = config?.apiKey || process.env.KDL_AI_API_KEY || process.env.GEMINI_API_KEY;
  }

  public async health(): Promise<ProviderHealth> {
    if (!this.apiKey) {
      return {
        status: 'NOT_CONFIGURED',
        providerId: this.id,
        message: 'KDL_AI_API_KEY or GEMINI_API_KEY not configured.',
      };
    }
    return {
      status: 'HEALTHY',
      providerId: this.id,
      message: 'Gemini provider ready.',
    };
  }

  public sanitizeModelName(inputModel?: string): string {
    let rawModel = inputModel || process.env.KDL_GEMINI_MODEL || process.env.GEMINI_MODEL || 'gemini-2.5-pro';
    rawModel = rawModel.replace(/["']/g, '').trim();
    if (rawModel.startsWith('models/')) {
      rawModel = rawModel.substring('models/'.length);
    } else if (rawModel.startsWith('/models/')) {
      rawModel = rawModel.substring('/models/'.length);
    }
    return rawModel;
  }

  public async generate(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    if (!this.apiKey) {
      throw new Error('NO_AI_PROVIDER_CONFIGURED: Gemini API Key missing.');
    }

    const model = this.sanitizeModelName();
    const safeEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const fullUrl = `${safeEndpoint}?key=${this.apiKey}`;

    try {
      const payload: Record<string, any> = {
        contents: [
          {
            parts: [
              {
                text: `${request.systemInstruction ? request.systemInstruction + '\n\n' : ''}${request.prompt}`,
              },
            ],
          },
        ],
      };

      if (request.responseFormat === 'json') {
        payload.generationConfig = {
          responseMimeType: 'application/json',
        };
      }

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
        } catch {
          errorText = response.statusText;
        }

        const sanitizedError = errorText.substring(0, 500);

        console.error(`[KDL ERROR] Gemini API HTTP error ${response.status}:`);
        console.error(`  Provider: ${this.id}`);
        console.error(`  Model: ${model}`);
        console.error(`  Endpoint: ${safeEndpoint}`);
        console.error(`  HTTP Status: ${response.status} ${response.statusText}`);
        console.error(`  Error Body: ${sanitizedError}`);

        throw new Error(`Gemini API HTTP error ${response.status} ${response.statusText}: ${sanitizedError}`);
      }

      const data = (await response.json()) as any;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      let jsonPayload: Record<string, unknown> | undefined;

      if (request.responseFormat === 'json') {
        try {
          const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
          jsonPayload = JSON.parse(cleaned);
        } catch {
          // Fallback if parsing fails
        }
      }

      return {
        content: text,
        jsonPayload,
        providerId: this.id,
        model,
        durationMs: Date.now() - startTime,
      };
    } catch (err: any) {
      throw new Error(`GeminiProvider generation failed: ${err.message}`);
    }
  }
}
