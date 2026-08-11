export interface AIRequest {
  systemInstruction?: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'text' | 'json';
  jsonSchema?: Record<string, unknown>;
}

export interface AIResponse {
  content: string;
  jsonPayload?: Record<string, unknown>;
  providerId: string;
  model: string;
  tokensUsed?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  durationMs: number;
}

export interface ProviderHealth {
  status: 'HEALTHY' | 'DEGRADED' | 'NOT_CONFIGURED' | 'UNAVAILABLE';
  providerId: string;
  message: string;
}

export interface AIProvider {
  id: string;
  name: string;
  initialize(config?: Record<string, string>): Promise<void>;
  generate(request: AIRequest): Promise<AIResponse>;
  health(): Promise<ProviderHealth>;
}
