import { IAIProvider, AIReasoningInput, AIReasoningOutput } from './ai-provider.interface.js';

export class OpenAIProvider implements IAIProvider {
  public readonly name = 'OpenAI GPT-4o';
  public readonly defaultModel = 'gpt-4o';

  public isConfigured(): boolean {
    return !!process.env.OPENAI_API_KEY;
  }

  public async generateText(input: AIReasoningInput): Promise<AIReasoningOutput> {
    return {
      text: `[OpenAI GPT-4o] Strategic branding direction.`,
      providerName: this.name,
      modelName: this.defaultModel,
      tokenUsage: { promptTokens: 110, completionTokens: 190, totalTokens: 300 },
    };
  }
}
