import assert from 'node:assert';
import { GateValidator } from '../src/utils/gate.validator.js';
import { AuditorResult } from '../src/types/reviewer.types.js';
import { AIDirectorResult } from '@kdl/ai-director';

export async function runGatesTests() {
  console.log('Running quality gates tests...');

  const mockAuditorResults: AuditorResult[] = [
    { auditorName: 'Performance Auditor', score: 98, issues: [], autoFixesApplied: 0 },
    { auditorName: 'SEO Auditor', score: 98, issues: [], autoFixesApplied: 0 },
    { auditorName: 'Accessibility Auditor', score: 98, issues: [], autoFixesApplied: 0 },
  ];

  const mockDirectorResult = {
    originality: {
      originalityScore: 96.5,
      dfiiScore: 95.5,
      cinematicExperienceScore: 96.0,
    },
  } as AIDirectorResult;

  const mockLighthouse = {
    available: true,
    performance: 98,
    accessibility: 98,
    bestPractices: 98,
    seo: 98,
  };

  const mockPlaywright = {
    available: true,
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
    hasHorizontalOverflow: {},
    screenshots: {},
    domMetrics: { totalElements: 10, hasH1: true, imagesCount: 2, missingAltCount: 0, linksCount: 5, brokenLinksCount: 0 },
  };

  const gates = GateValidator.validateQualityGates(mockAuditorResults, mockDirectorResult, mockPlaywright, mockLighthouse);
  assert.strictEqual(gates.length, 7);
  assert.strictEqual(gates.every((g) => g.passed), true);

  console.log('✔ gates.test.ts passed');
}
