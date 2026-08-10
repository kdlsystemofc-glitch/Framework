import { MotionTokens } from '@kdl/inspiration';

export class MotionPipeline {
  public static generateGSAPLenisScript(tokens: MotionTokens): string {
    return `
// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero h1', {
  y: 60,
  opacity: 0,
  duration: ${tokens.durationNormalMs / 1000},
  ease: '${tokens.easingFunction}',
});

gsap.from('.btn-primary', {
  scale: 0.9,
  opacity: 0,
  duration: ${tokens.durationFastMs / 1000},
  delay: 0.3,
  ease: 'back.out(1.7)',
});
`;
  }
}
