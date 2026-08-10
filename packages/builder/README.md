# `@kdl/builder` — Universal Builder Engine

The **Universal Builder Engine (`@kdl/builder`)** is the code execution motor of the **KDL Landing Framework**. It receives creative decisions emitted by the **AI Director Engine** (`creative-dna.json`, `decision-logs.json`, design tokens) and strictly compiles them into production-ready landing pages across pluggable target builders (HTML5, React, Next.js, Astro).

---

## Subsystems

1. **Pluggable Builders (`src/builders/`)**:
   - `HTMLBuilder`: Production HTML5 + Vanilla CSS3 + Native JS + GSAP/Lenis.
   - `ReactBuilder`: React Component structure.
   - `NextBuilder`: Next.js App Router.
   - `AstroBuilder`: Astro SSG zero-JS island components.
2. **Assets Pipeline (`src/assets/`)**:
   - Image optimization, WebP/AVIF generation, responsive `srcset`, lazy loading, and preloads.
3. **Motion Pipeline (`src/motion/`)**:
   - GSAP 3.12, Lenis Smooth Scroll 1.0, ScrollTrigger, parallax, and micro-interactions.
4. **SEO Pipeline (`src/seo/`)**:
   - Meta tags, OpenGraph tags, JSON-LD Schema.org, `sitemap.xml`, and `robots.txt`.
5. **Component Library (`src/components/`)**:
   - Reusable component manager covering 10 categories (`hero`, `cta`, `pricing`, `gallery`, `faq`, `contact`, `footer`, `navigation`, `testimonials`, `stats`).

---

## Usage

```typescript
import { BuilderEngine } from '@kdl/builder';

const engine = new BuilderEngine();
const result = await engine.buildLanding(directorResult, './client-folder', { target: 'html' });

console.log(result.htmlFilePath);
console.log(result.buildReportPath);
```
