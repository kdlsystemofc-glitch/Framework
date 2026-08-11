import path from 'path';
import fs from 'fs';
import { ReviewResult, AuditorResult, AuditIssue } from '../types/reviewer.types.js';
import { LocalPreviewServer } from '../server/preview.server.js';
import { PlaywrightRunner, PlaywrightQAResult } from '../browser/playwright.runner.js';
import { LighthouseRunner, MeasuredLighthouseScores } from '../lighthouse/lighthouse.runner.js';
import { ContentFidelityAuditor } from '../audit/content-fidelity.auditor.js';
import { AssetFidelityAuditor } from '../audit/asset-fidelity.auditor.js';
import { BrandFidelityAuditor } from '../audit/brand-fidelity.auditor.js';
import { CopyFidelityAuditor } from '../audit/copy-fidelity.auditor.js';
import { UIStructureAuditor } from '../audit/ui-structure.auditor.js';
import { InteractionAuditor } from '../audit/interaction.auditor.js';
import { GateValidator } from '../utils/gate.validator.js';
import { AutoCorrector } from '../correctors/auto.corrector.js';
import { FinalAuditReporter } from '../reports/final-audit.reporter.js';

export interface ReviewerOptions {
  projectPath: string;
  projectName?: string;
  clientContext?: any;
  manifest?: any;
  copywriting?: any;
  designSystem?: any;
  blueprint?: any;
  directorResult?: any;
  maxAutoFixCycles?: number;
}

export class ReviewerService {
  public async reviewProject(buildResult: any, directorResult: any, projectPath: string): Promise<ReviewResult> {
    return this.runReview({
      projectPath,
      projectName: buildResult?.projectName || path.basename(projectPath),
      directorResult,
    });
  }

  public async runReview(options: ReviewerOptions): Promise<ReviewResult> {
    const projectPath = options.projectPath;
    const landingDir = path.join(projectPath, 'landing');
    const reportsDir = path.join(projectPath, 'reports');
    const projectName = options.projectName || path.basename(projectPath);
    const maxCycles = options.maxAutoFixCycles || 3;

    let iterationCount = 0;
    let totalAutoFixesApplied = 0;

    // 1. AutoFix Loop
    for (let cycle = 1; cycle <= maxCycles; cycle++) {
      iterationCount = cycle;
      const htmlPath = path.join(landingDir, 'index.html');
      const cssPath = path.join(landingDir, 'styles.css');

      const tempContentAuditor = ContentFidelityAuditor.audit(htmlPath, options.clientContext);
      const tempAssetAuditor = AssetFidelityAuditor.audit(htmlPath, options.manifest);
      const tempInteractionAuditor = InteractionAuditor.audit(htmlPath);

      const currentIssues = [
        ...tempContentAuditor.issues,
        ...tempAssetAuditor.issues,
        ...tempInteractionAuditor.issues,
      ];

      const fixes = AutoCorrector.applyAutoFixes(landingDir, currentIssues);
      if (fixes > 0) {
        totalAutoFixesApplied += fixes;
      } else {
        break; // No auto-fixable issues remaining
      }
    }

    // 2. Start Local Preview Server
    const server = new LocalPreviewServer(landingDir);
    let targetUrl = '';
    try {
      targetUrl = await server.start();
    } catch (err) {
      // Server error handling
    }

    // 3. Playwright Browser QA & Responsive Screenshots
    let playwrightResults: PlaywrightQAResult | undefined;
    if (targetUrl) {
      playwrightResults = await PlaywrightRunner.runQA(targetUrl, reportsDir);
    }

    // 4. Real Lighthouse Execution
    let lighthouseResults: MeasuredLighthouseScores | undefined;
    if (targetUrl) {
      lighthouseResults = await LighthouseRunner.runLighthouse(targetUrl, reportsDir);
    }

    // Stop preview server cleanly
    await server.stop();

    // 5. Run All Fidelity Auditors
    const htmlPath = path.join(landingDir, 'index.html');
    const cssPath = path.join(landingDir, 'styles.css');

    const contentAuditor = ContentFidelityAuditor.audit(htmlPath, options.clientContext);
    const assetAuditor = AssetFidelityAuditor.audit(htmlPath, options.manifest);
    const brandAuditor = BrandFidelityAuditor.audit(cssPath, options.designSystem);
    const copyAuditor = CopyFidelityAuditor.audit(htmlPath, options.copywriting);
    const uiStructureAuditor = UIStructureAuditor.audit(htmlPath, options.blueprint);
    const interactionAuditor = InteractionAuditor.audit(htmlPath);

    const auditorResults: AuditorResult[] = [
      contentAuditor,
      assetAuditor,
      brandAuditor,
      copyAuditor,
      uiStructureAuditor,
      interactionAuditor,
    ];

    // 6. Validate Quality Gates with Fail-Closed Policy
    const qualityGates = GateValidator.validateQualityGates(
      auditorResults,
      options.directorResult,
      playwrightResults,
      lighthouseResults
    );

    const measuredGates = qualityGates.filter((g) => g.status !== 'NOT_MEASURED');
    const passedGates = qualityGates.filter((g) => g.status === 'PASS');
    const failedGates = qualityGates.filter((g) => g.status === 'FAIL');
    const notMeasuredGates = qualityGates.filter((g) => g.status === 'NOT_MEASURED');

    const passedAllGates = qualityGates.every((g) => g.status === 'PASS' && g.passed);

    // Calculate Overall Quality Score strictly from measured non-failing gates
    let overallScore = 0;
    if (measuredGates.length > 0) {
      const validScores = measuredGates.filter((g) => g.score !== undefined).map((g) => g.score!);
      if (validScores.length > 0) {
        overallScore = Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length);
      }
    }

    const totalIssuesFound = auditorResults.reduce((acc, a) => acc + a.issues.length, 0);

    const reviewResult: ReviewResult = {
      projectName,
      projectPath,
      iterationCount,
      overallScore,
      measuredGatesCount: measuredGates.length,
      passedGatesCount: passedGates.length,
      failedGatesCount: failedGates.length,
      notMeasuredGatesCount: notMeasuredGates.length,
      auditorResults,
      qualityGates,
      passedAllGates,
      totalIssuesFound,
      totalAutoFixesApplied,
      screenshots: playwrightResults?.screenshots || {},
      provenance: {
        frameworkVersion: '1.0.0',
        auditTimestamp: new Date().toISOString(),
        nodeVersion: process.version,
        browserVersion: playwrightResults?.available ? 'Playwright Chromium' : 'UNAVAILABLE',
      },
      finalReportPath: path.join(reportsDir, 'FINAL_AUDIT.md'),
    };

    // 7. Write Reports
    FinalAuditReporter.generateReports(reviewResult, reportsDir);

    return reviewResult;
  }
}

export { ReviewerService as ReviewerEngine };
