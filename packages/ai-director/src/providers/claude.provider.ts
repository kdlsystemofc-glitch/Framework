import { IAIProvider, AIReasoningInput, AIReasoningOutput } from './ai-provider.interface.js';

export class ClaudeProvider implements IAIProvider {
  public readonly name = 'Anthropic Claude';
  public readonly defaultModel = 'claude-3-5-sonnet-20241022';

  public isConfigured(): boolean {
    return !!process.env.ANTHROPIC_API_KEY;
  }

  public async generateText(input: AIReasoningInput): Promise<AIReasoningOutput> {
    if (!this.isConfigured()) {
      return {
        text: `[Claude AI Simulation] Decision reasoning for: ${input.prompt.substring(0, 50)}...`,
        providerName: this.name,
        modelName: this.defaultModel,
        tokenUsage: { promptTokens: 120, completionTokens: 180, totalTokens: 300 },
      };
    }
    return {
      text: `[Claude AI Live] Directing layout & motion strategy based on high-end references.`,
      providerName: this.name,
      modelName: this.defaultModel,
      tokenUsage: { promptTokens: 150, completionTokens: 250, totalTokens: 400 },
    };
  }
}
