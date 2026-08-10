import { QualityMetrics, InspirationReference } from '../types/inspiration.types.js';

export class DesignQualityAnalyzer {
  public static calculateDFIIScore(metrics: Partial<QualityMetrics>): number {
    const weights: Record<keyof QualityMetrics, number> = {
      visualQuality: 0.1,
      originality: 0.1,
      conversion: 0.1,
      motion: 0.08,
      storytelling: 0.08,
      branding: 0.08,
      ux: 0.08,
      performance: 0.08,
      accessibility: 0.05,
      architecture: 0.05,
      seo: 0.05,
      innovation: 0.05,
      visualImpact: 0.05,
      cinematicScore: 0.05,
      dfiiScore: 0,
    };

    let totalScore = 0;
    for (const key of Object.keys(weights) as Array<keyof QualityMetrics>) {
      if (key === 'dfiiScore') continue;
      const val = metrics[key] ?? 85;
      totalScore += val * weights[key];
    }

    return Number(totalScore.toFixed(1));
  }

  public static auditReference(ref: InspirationReference): InspirationReference {
    const calculatedDFII = this.calculateDFIIScore(ref.scores);
    return {
      ...ref,
      scores: {
        ...ref.scores,
        dfiiScore: calculatedDFII,
      },
    };
  }
}
