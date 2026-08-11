import { AIProvider, AIRequest, AIResponse, ProviderHealth } from './ai-provider.interface.js';

export class ClaudeProvider implements AIProvider {
  public readonly id = 'claude';
  public readonly name = 'Anthropic Claude API Provider';
  private apiKey?: string;

  public async initialize(config?: Record<string, string>): Promise<void> {
    this.apiKey = config?.apiKey || process.env.KDL_AI_API_KEY || process.env.ANTHROPIC_API_KEY;
  }

  public async health(): Promise<ProviderHealth> {
    if (!this.apiKey) {
      return {
        status: 'NOT_CONFIGURED',
        providerId: this.id,
        message: 'KDL_AI_API_KEY or ANTHROPIC_API_KEY not configured.',
      };
    }
    return {
      status: 'HEALTHY',
      providerId: this.id,
      message: 'Claude provider ready.',
    };
  }

  public async generate(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    if (!this.apiKey) {
      throw new Error('NO_AI_PROVIDER_CONFIGURED: Claude API Key missing.');
    }

    // Official HTTP fetch fallback for Claude Messages API
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: request.maxTokens || 4096,
          system: request.systemInstruction,
          messages: [{ role: 'user', content: request.prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API HTTP error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as any;
      const text = data.content?.[0]?.text || '';
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
        model: 'claude-3-5-sonnet-20241022',
        durationMs: Date.now() - startTime,
      };
    } catch (err: any) {
      throw new Error(`ClaudeProvider generation failed: ${err.message}`);
    }
  }
}
