import { QualityGateResult, AuditorResult, GateStatus, MeasurementType, AuditIssue } from '../types/reviewer.types.js';
import { AIDirectorResult } from '@kdl/ai-director';
import { PlaywrightQAResult } from '../browser/playwright.runner.js';
import { MeasuredLighthouseScores } from '../lighthouse/lighthouse.runner.js';

export class GateValidator {
  public static validateQualityGates(
    auditorResults: AuditorResult[],
    directorResult: AIDirectorResult | undefined,
    playwrightResults?: PlaywrightQAResult,
    lighthouseResults?: MeasuredLighthouseScores
  ): QualityGateResult[] {
    const timestamp = new Date().toISOString();
    const gates: QualityGateResult[] = [];

    // 1. Performance Gate (Lighthouse / Browser Hybrid)
    if (lighthouseResults?.available && lighthouseResults.performance !== undefined) {
      const score = lighthouseResults.performance;
      const passed = score >= 90;
      gates.push({
        id: 'gate-performance',
        name: 'Performance Gate',
        status: passed ? 'PASS' : 'FAIL',
        score,
        minRequiredScore: 90,
        passed,
        measurementType: 'LIGHTHOUSE',
        evidence: [`Lighthouse Performance score: ${score}/100`, lighthouseResults.fcpMs ? `FCP: ${Math.round(lighthouseResults.fcpMs)}ms` : ''].filter(Boolean),
        issues: [],
        timestamp,
      });
    } else {
      gates.push({
        id: 'gate-performance',
        name: 'Performance Gate',
        status: 'NOT_MEASURED',
        minRequiredScore: 90,
        passed: false, // Fail-Closed
        measurementType: 'LIGHTHOUSE',
        evidence: ['Lighthouse performance execution was not available or completed with errors.'],
        issues: [{ id: 'gate-perf-nm', auditorName: 'GateValidator', severity: 'warning', message: 'Performance gate could not be measured', suggestion: 'Install chrome/lighthouse dependencies', autoFixable: false }],
        timestamp,
      });
    }

    // 2. Accessibility Gate (Lighthouse + Structural Audit)
    const structA11yAuditor = auditorResults.find((a) => a.auditorName.includes('Accessibility') || a.auditorName.includes('UIStructure'));
    const lhA11y = lighthouseResults?.available ? lighthouseResults.accessibility : undefined;
    const a11yScore = lhA11y !== undefined ? lhA11y : structA11yAuditor?.score;

    if (a11yScore !== undefined) {
      const passed = a11yScore >= 95;
      gates.push({
        id: 'gate-accessibility',
        name: 'Accessibility Gate (WCAG 2.2)',
        status: passed ? 'PASS' : 'FAIL',
        score: a11yScore,
        minRequiredScore: 95,
        passed,
        measurementType: lhA11y !== undefined ? 'HYBRID' : 'RULE_BASED',
        evidence: [`Accessibility score: ${a11yScore}/100`],
        issues: structA11yAuditor?.issues || [],
        timestamp,
      });
    } else {
      gates.push({
        id: 'gate-accessibility',
        name: 'Accessibility Gate (WCAG 2.2)',
        status: 'NOT_MEASURED',
        minRequiredScore: 95,
        passed: false,
        measurementType: 'RULE_BASED',
        evidence: ['Accessibility measurement data unavailable.'],
        issues: [],
        timestamp,
      });
    }

    // 3. SEO Gate
    const seoAuditor = auditorResults.find((a) => a.auditorName.includes('SEO') || a.auditorName.includes('ContentFidelity'));
    const lhSeo = lighthouseResults?.available ? lighthouseResults.seo : undefined;
    const seoScore = lhSeo !== undefined ? lhSeo : seoAuditor?.score;

    if (seoScore !== undefined) {
      const passed = seoScore >= 95;
      gates.push({
        id: 'gate-seo',
        name: 'SEO Gate',
        status: passed ? 'PASS' : 'FAIL',
        score: seoScore,
        minRequiredScore: 95,
        passed,
        measurementType: lhSeo !== undefined ? 'HYBRID' : 'RULE_BASED',
        evidence: [`SEO score: ${seoScore}/100`],
        issues: seoAuditor?.issues || [],
        timestamp,
      });
    } else {
      gates.push({
        id: 'gate-seo',
        name: 'SEO Gate',
        status: 'NOT_MEASURED',
        minRequiredScore: 95,
        passed: false,
        measurementType: 'RULE_BASED',
        evidence: ['SEO measurement data unavailable.'],
        issues: [],
        timestamp,
      });
    }

    // 4. Best Practices Gate
    const lhBp = lighthouseResults?.available ? lighthouseResults.bestPractices : undefined;
    const hasConsoleErrors = (playwrightResults?.consoleErrors.length || 0) > 0;
    const bpScore = lhBp !== undefined ? (hasConsoleErrors ? Math.min(lhBp, 80) : lhBp) : hasConsoleErrors ? 70 : 100;

    if (playwrightResults?.available || lhBp !== undefined) {
      const passed = bpScore >= 95 && !hasConsoleErrors;
      gates.push({
        id: 'gate-best-practices',
        name: 'Best Practices Gate',
        status: passed ? 'PASS' : 'FAIL',
        score: bpScore,
        minRequiredScore: 95,
        passed,
        measurementType: playwrightResults?.available ? 'BROWSER' : 'LIGHTHOUSE',
        evidence: [`Best practices score: ${bpScore}/100`, `Console errors detected: ${playwrightResults?.consoleErrors.length || 0}`],
        issues: (playwrightResults?.consoleErrors || []).map((err, idx) => ({
          id: `bp-err-${idx}`,
          auditorName: 'PlaywrightRunner',
          severity: 'critical',
          message: `Browser console error: ${err}`,
          suggestion: 'Fix JavaScript runtime errors in landing page',
          autoFixable: false,
        })),
        timestamp,
      });
    } else {
      gates.push({
        id: 'gate-best-practices',
        name: 'Best Practices Gate',
        status: 'NOT_MEASURED',
        minRequiredScore: 95,
        passed: false,
        measurementType: 'BROWSER',
        evidence: ['Best practices measurement data unavailable.'],
        issues: [],
        timestamp,
      });
    }

    // 5. Originality Gate
    const origScore = directorResult?.originality?.originalityScore;
    if (origScore !== undefined) {
      const passed = origScore >= 90;
      gates.push({
        id: 'gate-originality',
        name: 'Originality Gate',
        status: passed ? 'PASS' : 'FAIL',
        score: origScore,
        minRequiredScore: 90,
        passed,
        measurementType: 'AI_EVALUATED',
        evidence: [`Originality score evaluated by AI Director: ${origScore}/100`],
        issues: [],
        timestamp,
      });
    } else {
      gates.push({
        id: 'gate-originality',
        name: 'Originality Gate',
        status: 'NOT_MEASURED',
        minRequiredScore: 90,
        passed: false,
        measurementType: 'AI_EVALUATED',
        evidence: ['Originality evaluation missing from AI Director output.'],
        issues: [],
        timestamp,
      });
    }

    // 6. DFII Gate
    const dfiiScore = directorResult?.originality?.dfiiScore;
    if (dfiiScore !== undefined) {
      const passed = dfiiScore >= 90;
      gates.push({
        id: 'gate-dfii',
        name: 'DFII Gate',
        status: passed ? 'PASS' : 'FAIL',
        score: dfiiScore,
        minRequiredScore: 90,
        passed,
        measurementType: 'AI_EVALUATED',
        evidence: [`DFII score evaluated by AI Director: ${dfiiScore}/100`],
        issues: [],
        timestamp,
      });
    } else {
      gates.push({
        id: 'gate-dfii',
        name: 'DFII Gate',
        status: 'NOT_MEASURED',
        minRequiredScore: 90,
        passed: false,
        measurementType: 'AI_EVALUATED',
        evidence: ['DFII evaluation missing from AI Director output.'],
        issues: [],
        timestamp,
      });
    }

    // 7. Cinematic Experience Gate
    const cinematicScore = directorResult?.originality?.cinematicExperienceScore;
    if (cinematicScore !== undefined) {
      const passed = cinematicScore >= 90;
      gates.push({
        id: 'gate-cinematic',
        name: 'Cinematic Experience Gate',
        status: passed ? 'PASS' : 'FAIL',
        score: cinematicScore,
        minRequiredScore: 90,
        passed,
        measurementType: 'HYBRID',
        evidence: [`Cinematic Experience score: ${cinematicScore}/100`],
        issues: [],
        timestamp,
      });
    } else {
      gates.push({
        id: 'gate-cinematic',
        name: 'Cinematic Experience Gate',
        status: 'NOT_MEASURED',
        minRequiredScore: 90,
        passed: false,
        measurementType: 'HYBRID',
        evidence: ['Cinematic Experience measurement unavailable.'],
        issues: [],
        timestamp,
      });
    }

    return gates;
  }
}
