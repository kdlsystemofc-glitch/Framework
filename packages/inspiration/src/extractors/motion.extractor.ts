import { MotionTokens } from '../types/tokens.types.js';

export class MotionExtractor {
  public static extractMotionFromReferences(tokens: MotionTokens[]): MotionTokens {
    if (!tokens || tokens.length === 0) {
      return {
        easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        durationFastMs: 250,
        durationNormalMs: 600,
        durationSlowMs: 1200,
        parallaxSpeedRatio: 0.35,
        scrollScrubEnabled: true,
      };
    }
    return tokens.find((m) => m.scrollScrubEnabled) || tokens[0];
  }
}
