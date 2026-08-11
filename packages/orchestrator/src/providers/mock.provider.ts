import { AIProvider, AIRequest, AIResponse, ProviderHealth } from './ai-provider.interface.js';

export class MockAIProvider implements AIProvider {
  public readonly id = 'mock';
  public readonly name = 'Mock AI Provider (TEST ONLY)';
  private isEnabledForTests = false;

  public async initialize(config?: Record<string, string>): Promise<void> {
    this.isEnabledForTests = config?.allowMock === 'true' || process.env.NODE_ENV === 'test';
  }

  public async health(): Promise<ProviderHealth> {
    return {
      status: this.isEnabledForTests ? 'HEALTHY' : 'UNAVAILABLE',
      providerId: this.id,
      message: this.isEnabledForTests ? 'Mock provider active for testing.' : 'Mock provider disabled in production.',
    };
  }

  public async generate(request: AIRequest): Promise<AIResponse> {
    if (!this.isEnabledForTests && process.env.NODE_ENV !== 'test') {
      throw new Error('NO_AI_PROVIDER_CONFIGURED: MockAIProvider is strictly forbidden in production runs.');
    }

    const startTime = Date.now();
    let jsonPayload: Record<string, unknown> = {};

    if (request.prompt.includes('01-discovery')) {
      jsonPayload = {
        businessSummary: 'Lanchonete tradicional focada em lanches fartos e artesanais desde 2015.',
        targetAudience: ['Moradores de São Bernardo do Campo', 'Amantes de lanches fartos', 'Clientes de Delivery'],
        commercialObjections: ['Taxa de entrega', 'Tempo de espera em horários de pico'],
        differentiators: ['Lanches artesanais bem servidos', 'Atendimento desde 2015', 'Capricho no envio'],
      };
    } else if (request.prompt.includes('02-brand-strategy')) {
      jsonPayload = {
        archetype: 'Acolhedor & Tradicional',
        toneOfVoice: 'Direto, amigável, popular e convidativo',
        goldenCircleWhy: 'Oferecer a melhor experiência em lanches com quantidade e sabor inesquecíveis.',
      };
    } else {
      jsonPayload = {
        generated: true,
        phase: 'cognitive-test-phase',
      };
    }

    const content = JSON.stringify(jsonPayload, null, 2);

    return {
      content,
      jsonPayload,
      providerId: this.id,
      model: 'mock-test-model',
      durationMs: Date.now() - startTime,
    };
  }
}
