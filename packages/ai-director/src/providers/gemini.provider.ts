import { IAIProvider, AIReasoningInput, AIReasoningOutput } from './ai-provider.interface.js';

export class GeminiProvider implements IAIProvider {
  public readonly name = 'Google Gemini';
  public readonly defaultModel = 'gemini-1.5-pro';

  public isConfigured(): boolean {
    return !!process.env.GEMINI_API_KEY;
  }

  public async generateText(input: AIReasoningInput): Promise<AIReasoningOutput> {
    return {
      text: `[Gemini AI] Reasoning output for prompt: ${input.prompt.substring(0, 40)}...`,
      providerName: this.name,
      modelName: this.defaultModel,
      tokenUsage: { promptTokens: 100, completionTokens: 200, totalTokens: 300 },
    };
  }
}
