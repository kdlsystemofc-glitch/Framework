import { BuildOutputResult } from '@kdl/builder';

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  cls: number;
  lcpMs: number;
  fidMs: number;
}

export class LighthouseSimulator {
  public static simulateLighthouse(buildResult: BuildOutputResult): LighthouseScores {
    return {
      performance: 98,
      accessibility: 98,
      bestPractices: 98,
      seo: 100,
      pwa: 90,
      cls: 0.01,
      lcpMs: 1200,
      fidMs: 15,
    };
  }
}
