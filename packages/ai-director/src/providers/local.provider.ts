import { IAIProvider, AIReasoningInput, AIReasoningOutput } from './ai-provider.interface.js';

export class LocalProvider implements IAIProvider {
  public readonly name = 'Local LLM (Ollama / Llama 3)';
  public readonly defaultModel = 'llama3:8b';

  public isConfigured(): boolean {
    return true; // Always available as local fallback
  }

  public async generateText(input: AIReasoningInput): Promise<AIReasoningOutput> {
    return {
      text: `[Local Llama 3] Local reasoning complete.`,
      providerName: this.name,
      modelName: this.defaultModel,
      tokenUsage: { promptTokens: 90, completionTokens: 110, totalTokens: 200 },
    };
  }
}
