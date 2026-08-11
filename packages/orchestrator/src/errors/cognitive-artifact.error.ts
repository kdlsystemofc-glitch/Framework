export type CognitiveArtifactErrorCode =
  | 'COGNITIVE_ARTIFACTS_NOT_FOUND'
  | 'COGNITIVE_ARTIFACT_MISSING'
  | 'COGNITIVE_ARTIFACT_INVALID_JSON'
  | 'COGNITIVE_ARTIFACT_SCHEMA_INVALID'
  | 'COGNITIVE_ARTIFACT_VERSION_INCOMPATIBLE';

export class CognitiveArtifactError extends Error {
  public readonly code: CognitiveArtifactErrorCode;
  public readonly phaseId?: string;

  constructor(code: CognitiveArtifactErrorCode, message: string, phaseId?: string) {
    super(`[${code}] ${message}`);
    this.name = 'CognitiveArtifactError';
    this.code = code;
    this.phaseId = phaseId;
  }
}
