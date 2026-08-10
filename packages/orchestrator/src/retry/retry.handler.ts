import { StageRetryPolicy } from '../types/orchestrator.types.js';
import { BasePipelineError } from '../errors/pipeline.errors.js';

export class RetryHandler {
  public static async executeWithRetry<T>(
    fn: () => Promise<T>,
    policy: StageRetryPolicy,
    onAttemptFailed?: (attempt: number, err: Error) => void
  ): Promise<T> {
    let attempt = 0;
    let lastError: Error = new Error('Unknown error');

    while (attempt < policy.maxAttempts) {
      attempt++;
      try {
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error(`Stage execution timed out after ${policy.timeoutMs}ms`)), policy.timeoutMs);
        });

        return await Promise.race([fn(), timeoutPromise]);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        if (lastError instanceof BasePipelineError && !lastError.isRetryable) {
          throw lastError; // Non-retryable fatal error
        }

        if (attempt >= policy.maxAttempts) {
          break;
        }

        if (onAttemptFailed) {
          onAttemptFailed(attempt, lastError);
        }

        const waitTime = policy.backoffMs * Math.pow(2, attempt - 1);
        await new Promise((res) => setTimeout(res, waitTime));
      }
    }

    throw lastError;
  }
}
