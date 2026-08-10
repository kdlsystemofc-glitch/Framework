export interface AIReasoningInput {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIReasoningOutput {
  text: string;
  providerName: string;
  modelName: string;
  tokenUsage?: { promptTokens: number; completionTokens: number; totalTokens: number };
}

export interface IAIProvider {
  readonly name: string;
  readonly defaultModel: string;
  isConfigured(): boolean;
  generateText(input: AIReasoningInput): Promise<AIReasoningOutput>;
}
