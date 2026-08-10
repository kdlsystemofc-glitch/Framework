
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
  duration: 0.6,
  ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
});

gsap.from('.btn-primary', {
  scale: 0.9,
  opacity: 0,
  duration: 0.25,
  delay: 0.3,
  ease: 'back.out(1.7)',
});
