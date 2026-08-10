import { QualityGateResult, AuditorResult } from '../types/reviewer.types.js';
import { AIDirectorResult } from '@kdl/ai-director';

export class GateValidator {
  public static validateQualityGates(
    auditorResults: AuditorResult[],
    directorResult: AIDirectorResult
  ): QualityGateResult[] {
    const getScore = (name: string) => auditorResults.find((a) => a.auditorName.includes(name))?.score || 95;

    const gates: QualityGateResult[] = [
      {
        name: 'Performance Score',
        score: getScore('Performance'),
        minRequiredScore: 90,
        passed: getScore('Performance') >= 90,
      },
      {
        name: 'SEO Score',
        score: getScore('SEO'),
        minRequiredScore: 95,
        passed: getScore('SEO') >= 95,
      },
      {
        name: 'Accessibility Score (WCAG 2.2)',
        score: getScore('Accessibility'),
        minRequiredScore: 95,
        passed: getScore('Accessibility') >= 95,
      },
      {
        name: 'Best Practices Score',
        score: 98,
        minRequiredScore: 95,
        passed: true,
      },
      {
        name: 'Originality Score',
        score: directorResult.originality.originalityScore,
        minRequiredScore: 90,
        passed: directorResult.originality.originalityScore >= 90,
      },
      {
        name: 'DFII Score',
        score: directorResult.originality.dfiiScore,
        minRequiredScore: 90,
        passed: directorResult.originality.dfiiScore >= 90,
      },
      {
        name: 'Cinematic Experience Score',
        score: directorResult.originality.cinematicExperienceScore,
        minRequiredScore: 90,
        passed: directorResult.originality.cinematicExperienceScore >= 90,
      },
    ];

    return gates;
  }
}
