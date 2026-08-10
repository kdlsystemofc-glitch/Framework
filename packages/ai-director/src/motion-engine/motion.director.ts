import { MotionTokens } from '@kdl/inspiration';

export class MotionDirector {
  public static recommendGSAPConfig(tokens: MotionTokens) {
    return {
      scrollTrigger: {
        scrub: tokens.scrollScrubEnabled ? 1 : false,
        ease: tokens.easingFunction,
      },
      duration: tokens.durationNormalMs / 1000,
      parallaxFactor: tokens.parallaxSpeedRatio,
    };
  }
}
