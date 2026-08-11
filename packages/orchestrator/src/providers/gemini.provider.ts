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

  public async generate(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    if (!this.apiKey) {
      throw new Error('NO_AI_PROVIDER_CONFIGURED: Gemini API Key missing.');
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${request.systemInstruction ? request.systemInstruction + '\n\n' : ''}${request.prompt}` }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API HTTP error: ${response.status} ${response.statusText}`);
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
        model: 'gemini-1.5-pro',
        durationMs: Date.now() - startTime,
      };
    } catch (err: any) {
      throw new Error(`GeminiProvider generation failed: ${err.message}`);
    }
  }
}
