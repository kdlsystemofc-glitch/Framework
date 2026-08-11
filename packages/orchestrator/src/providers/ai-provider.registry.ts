import { AIProvider, ProviderHealth } from './ai-provider.interface.js';
import { ClaudeProvider } from './claude.provider.js';
import { GeminiProvider } from './gemini.provider.js';
import { OpenAIProvider } from './openai.provider.js';
import { MockAIProvider } from './mock.provider.js';
import fs from 'fs';
import path from 'path';

export class AIProviderRegistry {
  private static providers: Map<string, AIProvider> = new Map();
  private static activeProviderId: string | null = null;

  static {
    this.registerDefaultProviders();
  }

  private static registerDefaultProviders(): void {
    this.register(new ClaudeProvider());
    this.register(new GeminiProvider());
    this.register(new OpenAIProvider());
    this.register(new MockAIProvider());
  }

  public static register(provider: AIProvider): void {
    this.providers.set(provider.id, provider);
  }

  public static async getActiveProvider(projectPath?: string): Promise<AIProvider> {
    let providerId = process.env.KDL_AI_PROVIDER || process.env.AI_PROVIDER;
    let apiKey = process.env.KDL_AI_API_KEY || process.env.AI_API_KEY;

    if (projectPath) {
      const kdlrcPath = path.join(projectPath, '.kdlrc.json');
      if (fs.existsSync(kdlrcPath)) {
        try {
          const cfg = JSON.parse(fs.readFileSync(kdlrcPath, 'utf-8'));
          if (cfg.aiProvider) providerId = cfg.aiProvider;
          if (cfg.apiKey) apiKey = cfg.apiKey;
        } catch {
          // Fallback
        }
      }
    }

    if (!providerId) {
      if (process.env.ANTHROPIC_API_KEY) providerId = 'claude';
      else if (process.env.GEMINI_API_KEY) providerId = 'gemini';
      else if (process.env.OPENAI_API_KEY) providerId = 'openai';
      else if (process.env.NODE_ENV === 'test') providerId = 'mock';
    }

    if (!providerId || (providerId === 'mock' && process.env.NODE_ENV !== 'test')) {
      throw new Error(
        'NO_AI_PROVIDER_CONFIGURED: No real AI Provider configured. Please set KDL_AI_PROVIDER and KDL_AI_API_KEY environment variables or configure .kdlrc.json.'
      );
    }

    const provider = this.providers.get(providerId);
    if (!provider) {
      throw new Error(`NO_AI_PROVIDER_CONFIGURED: Unknown AI Provider '${providerId}'.`);
    }

    await provider.initialize(apiKey ? { apiKey } : undefined);
    const health = await provider.health();

    if (health.status !== 'HEALTHY') {
      throw new Error(`NO_AI_PROVIDER_CONFIGURED: AI Provider '${providerId}' is not healthy: ${health.message}`);
    }

    return provider;
  }

  public static async getEcosystemHealth(projectPath?: string): Promise<ProviderHealth> {
    try {
      const provider = await this.getActiveProvider(projectPath);
      return await provider.health();
    } catch (err: any) {
      return {
        status: 'NOT_CONFIGURED',
        providerId: 'none',
        message: err.message,
      };
    }
  }
}
