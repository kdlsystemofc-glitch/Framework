# KDL Framework — AI Provider Abstraction

The KDL Framework features a pluggable AI Provider architecture (`IAIProvider`) with built-in fallbacks.

## Supported Providers
1. **ClaudeProvider** (`process.env.ANTHROPIC_API_KEY`)
2. **GeminiProvider** (`process.env.GEMINI_API_KEY`)
3. **OpenAIProvider** (`process.env.OPENAI_API_KEY`)
4. **LocalProvider** (Ollama / Llama 3)
