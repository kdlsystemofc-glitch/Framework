export class BasePipelineError extends Error {
  public readonly isRetryable: boolean;

  constructor(message: string, isRetryable = false) {
    super(message);
    this.name = this.constructor.name;
    this.isRetryable = isRetryable;
  }
}

export class ConfigurationError extends BasePipelineError {
  constructor(msg: string) { super(msg, false); }
}
export class ValidationError extends BasePipelineError {
  constructor(msg: string) { super(msg, false); }
}
export class StageError extends BasePipelineError {
  constructor(msg: string, retryable = true) { super(msg, retryable); }
}
export class ProviderError extends BasePipelineError {
  constructor(msg: string, retryable = true) { super(msg, retryable); }
}
export class AIError extends BasePipelineError {
  constructor(msg: string, retryable = true) { super(msg, retryable); }
}
export class BuildError extends BasePipelineError {
  constructor(msg: string, retryable = false) { super(msg, retryable); }
}
export class ReviewError extends BasePipelineError {
  constructor(msg: string, retryable = false) { super(msg, retryable); }
}
export class TimeoutError extends BasePipelineError {
  constructor(msg: string, retryable = true) { super(msg, retryable); }
}
export class FilesystemError extends BasePipelineError {
  constructor(msg: string, retryable = false) { super(msg, retryable); }
}
export class NetworkError extends BasePipelineError {
  constructor(msg: string, retryable = true) { super(msg, retryable); }
}
export class FatalPipelineError extends BasePipelineError {
  constructor(msg: string) { super(msg, false); }
}
export class RetryablePipelineError extends BasePipelineError {
  constructor(msg: string) { super(msg, true); }
}
