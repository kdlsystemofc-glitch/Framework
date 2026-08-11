import { AIProvider, AIRequest, AIResponse, ProviderHealth } from './ai-provider.interface.js';

export class OpenAIProvider implements AIProvider {
  public readonly id = 'openai';
  public readonly name = 'OpenAI API Provider';
  private apiKey?: string;

  public async initialize(config?: Record<string, string>): Promise<void> {
    this.apiKey = config?.apiKey || process.env.KDL_AI_API_KEY || process.env.OPENAI_API_KEY;
  }

  public async health(): Promise<ProviderHealth> {
    if (!this.apiKey) {
      return {
        status: 'NOT_CONFIGURED',
        providerId: this.id,
        message: 'KDL_AI_API_KEY or OPENAI_API_KEY not configured.',
      };
    }
    return {
      status: 'HEALTHY',
      providerId: this.id,
      message: 'OpenAI provider ready.',
    };
  }

  public async generate(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    if (!this.apiKey) {
      throw new Error('NO_AI_PROVIDER_CONFIGURED: OpenAI API Key missing.');
    }

    try {
      const messages: any[] = [];
      if (request.systemInstruction) {
        messages.push({ role: 'system', content: request.systemInstruction });
      }
      messages.push({ role: 'user', content: request.prompt });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages,
          response_format: request.responseFormat === 'json' ? { type: 'json_object' } : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API HTTP error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as any;
      const text = data.choices?.[0]?.message?.content || '';
      let jsonPayload: Record<string, unknown> | undefined;

      if (request.responseFormat === 'json') {
        try {
          jsonPayload = JSON.parse(text);
        } catch {
          // Fallback
        }
      }

      return {
        content: text,
        jsonPayload,
        providerId: this.id,
        model: 'gpt-4o',
        durationMs: Date.now() - startTime,
      };
    } catch (err: any) {
      throw new Error(`OpenAIProvider generation failed: ${err.message}`);
    }
  }
}
