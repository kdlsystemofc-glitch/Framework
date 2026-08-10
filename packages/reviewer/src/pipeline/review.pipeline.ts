import { IAuditor } from '../audit/auditor.interface.js';
import { HTMLAuditor } from '../audit/html.auditor.js';
import { CSSAuditor } from '../audit/css.auditor.js';
import { JSAuditor } from '../audit/js.auditor.js';
import { MotionAuditor } from '../audit/motion.auditor.js';
import { AccessibilityAuditor } from '../audit/accessibility.auditor.js';
import { SEOAuditor } from '../audit/seo.auditor.js';
import { PerformanceAuditor } from '../audit/performance.auditor.js';
import { DesignAuditor } from '../audit/design.auditor.js';
import { StorytellingAuditor } from '../audit/storytelling.auditor.js';
import { BuildOutputResult } from '@kdl/builder';
import { AIDirectorResult } from '@kdl/ai-director';
import { ReviewResult, AuditorResult, AuditIssue } from '../types/reviewer.types.js';
import { AutoCorrector } from '../correctors/auto.corrector.js';
import { GateValidator } from '../utils/gate.validator.js';
import { FinalAuditReporter } from '../reports/final-audit.reporter.js';

export class ReviewPipeline {
  private auditors: IAuditor[];

  constructor(customAuditors?: IAuditor[]) {
    this.auditors = customAuditors || [
      new HTMLAuditor(),
      new CSSAuditor(),
      new JSAuditor(),
      new MotionAuditor(),
      new AccessibilityAuditor(),
      new SEOAuditor(),
      new PerformanceAuditor(),
      new DesignAuditor(),
      new StorytellingAuditor(),
    ];
  }

  public async executeReviewLoop(
    buildResult: BuildOutputResult,
    directorResult: AIDirectorResult,
    projectPath: string,
    maxIterations = 3
  ): Promise<ReviewResult> {
    let iteration = 0;
    let totalFixes = 0;
    let auditorResults: AuditorResult[] = [];

    while (iteration < maxIterations) {
      iteration++;
      auditorResults = [];
      const allIssues: AuditIssue[] = [];

      for (const auditor of this.auditors) {
        const res = await auditor.audit(buildResult, projectPath);
        auditorResults.push(res);
        allIssues.push(...res.issues);
      }

      const fixes = AutoCorrector.applyAutoFixes(allIssues, buildResult);
      totalFixes += fixes;

      if (fixes === 0 || iteration >= maxIterations) {
        break;
      }
    }

    const qualityGates = GateValidator.validateQualityGates(auditorResults, directorResult);
    const passedAllGates = qualityGates.every((g) => g.passed);

    const sumScores = auditorResults.reduce((acc, curr) => acc + curr.score, 0);
    const overallScore = Math.round(sumScores / Math.max(1, auditorResults.length));

    const totalIssuesFound = auditorResults.reduce((acc, curr) => acc + curr.issues.length, 0);

    const partialResult: ReviewResult = {
      projectName: buildResult.projectName,
      projectPath,
      iterationCount: iteration,
      overallScore,
      auditorResults,
      qualityGates,
      passedAllGates,
      totalIssuesFound,
      totalAutoFixesApplied: totalFixes,
      finalReportPath: '',
    };

    const finalReportPath = FinalAuditReporter.generateReport(projectPath, partialResult);
    partialResult.finalReportPath = finalReportPath;

    return partialResult;
  }
}
