export type AuditSeverity = 'critical' | 'warning' | 'info';

export interface AuditIssue {
  id: string;
  auditorName: string;
  severity: AuditSeverity;
  message: string;
  suggestion: string;
  autoFixable: boolean;
}

export interface AuditorResult {
  auditorName: string;
  score: number; // 0-100
  issues: AuditIssue[];
  autoFixesApplied: number;
}

export interface QualityGateResult {
  name: string;
  score: number;
  minRequiredScore: number;
  passed: boolean;
}

export interface ReviewResult {
  projectName: string;
  projectPath: string;
  iterationCount: number;
  overallScore: number;
  auditorResults: AuditorResult[];
  qualityGates: QualityGateResult[];
  passedAllGates: boolean;
  totalIssuesFound: number;
  totalAutoFixesApplied: number;
  finalReportPath: string;
}
