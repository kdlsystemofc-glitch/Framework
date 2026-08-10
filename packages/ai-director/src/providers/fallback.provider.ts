import { IAIProvider, AIReasoningInput, AIReasoningOutput } from './ai-provider.interface.js';
import { ClaudeProvider } from './claude.provider.js';
import { GeminiProvider } from './gemini.provider.js';
import { OpenAIProvider } from './openai.provider.js';
import { LocalProvider } from './local.provider.js';

export class AIProviderFallbackEngine {
  private providers: IAIProvider[];

  constructor(customProviders?: IAIProvider[]) {
    this.providers = customProviders || [
      new ClaudeProvider(),
      new GeminiProvider(),
      new OpenAIProvider(),
      new LocalProvider(),
    ];
  }

  public async generateTextWithFallback(input: AIReasoningInput): Promise<AIReasoningOutput> {
    for (const provider of this.providers) {
      if (provider.isConfigured()) {
        try {
          return await provider.generateText(input);
        } catch {
          // Attempt next provider in chain
        }
      }
    }

    // Default to LocalProvider if all configured providers fail
    return await new LocalProvider().generateText(input);
  }
}
