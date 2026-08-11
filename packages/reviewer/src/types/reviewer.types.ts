export type AuditSeverity = 'critical' | 'warning' | 'info';

export type GateStatus = 'PASS' | 'FAIL' | 'NOT_MEASURED' | 'ERROR';

export type MeasurementType = 'LIGHTHOUSE' | 'BROWSER' | 'RULE_BASED' | 'AI_EVALUATED' | 'HYBRID';

export interface AuditIssue {
  id: string;
  auditorName: string;
  severity: AuditSeverity;
  message: string;
  suggestion: string;
  autoFixable: boolean;
  targetFile?: string;
  selector?: string;
}

export interface AuditorResult {
  auditorName: string;
  score: number; // 0-100
  issues: AuditIssue[];
  autoFixesApplied: number;
  measurementType?: MeasurementType;
  evidence?: string[];
}

export interface QualityGateResult {
  id: string;
  name: string;
  status: GateStatus;
  score?: number;
  minRequiredScore: number;
  passed: boolean;
  measurementType: MeasurementType;
  evidence: string[];
  issues: AuditIssue[];
  timestamp: string;
}

export interface BuildProvenance {
  frameworkVersion: string;
  buildHash?: string;
  landingHash?: string;
  auditTimestamp: string;
  nodeVersion: string;
  browserVersion?: string;
  aiModelUsed?: string;
}

export interface ReviewResult {
  projectName: string;
  projectPath: string;
  iterationCount: number;
  overallScore: number;
  measuredGatesCount: number;
  passedGatesCount: number;
  failedGatesCount: number;
  notMeasuredGatesCount: number;
  auditorResults: AuditorResult[];
  qualityGates: QualityGateResult[];
  passedAllGates: boolean;
  totalIssuesFound: number;
  totalAutoFixesApplied: number;
  screenshots: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  provenance: BuildProvenance;
  finalReportPath: string;
}
