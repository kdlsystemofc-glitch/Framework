import { BuildOutputResult } from '@kdl/builder';

export class LighthouseSimulator {
  public static simulateLighthouse(buildResult: BuildOutputResult): never {
    throw new Error(
      'FORBIDDEN_SYNTHETIC_SCORE: LighthouseSimulator is strictly forbidden in production. Use LighthouseRunner or PlaywrightRunner for real measured audits.'
    );
  }
}
