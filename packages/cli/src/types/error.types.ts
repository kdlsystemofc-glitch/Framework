export type KDLErrorCategory =
  | 'COMMAND_PARSING_ERROR'
  | 'FRAMEWORK_LOAD_ERROR'
  | 'CONFIGURATION_ERROR'
  | 'PLUGIN_ERROR'
  | 'ORCHESTRATION_ERROR'
  | 'SYSTEM_IO_ERROR';

export class KDLError extends Error {
  public readonly code: string;
  public readonly category: KDLErrorCategory;
  public readonly timestamp: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    category: KDLErrorCategory = 'SYSTEM_IO_ERROR',
    code = 'ERR_KDL_GENERIC',
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'KDLError';
    this.category = category;
    this.code = code;
    this.timestamp = new Date().toISOString();
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
