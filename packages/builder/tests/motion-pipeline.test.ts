import assert from 'node:assert';
import { MotionPipeline } from '../src/motion/motion.pipeline.js';
import { MotionTokens } from '@kdl/inspiration';

export async function runMotionPipelineTests() {
  console.log('Running motion pipeline tests...');

  const tokens: MotionTokens = {
    easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    durationFastMs: 250,
    durationNormalMs: 600,
    durationSlowMs: 1200,
    parallaxSpeedRatio: 0.35,
    scrollScrubEnabled: true,
  };

  const script = MotionPipeline.generateGSAPLenisScript(tokens);
  assert.strictEqual(script.includes('Lenis'), true);
  assert.strictEqual(script.includes('gsap.registerPlugin'), true);

  console.log('✔ motion-pipeline.test.ts passed');
}
