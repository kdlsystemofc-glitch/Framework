# `@kdl/inspiration` — Inspiration Engine & Design Intelligence

The **Inspiration Engine & Design Intelligence (`@kdl/inspiration`)** is the second core engine of the **KDL Landing Framework**. It automatically discovers, extracts, classifies, ranks, and synthesizes high-end visual design principles, color tokens, typography pairings, layout grids, and motion tokens across 10 curated design award providers without ever plagiarizing layouts, code, or text.

---

## 10 Integrated Inspiration Providers

1. **Awwwards Provider**: High-end award-winning digital experiences.
2. **Land-book Provider**: Curated landing page showcases.
3. **Godly Provider**: WebGL, dark mode, and 3D motion references.
4. **Lapa Ninja Provider**: High-converting SaaS and minimal landing pages.
5. **One Page Love Provider**: Single page websites with sleek typography.
6. **Behance Provider**: Brand identity and editorial artistry.
7. **Dribbble Provider**: Micro-interactions, UI kits, and bounce physics.
8. **Pinterest Provider**: Moodboard aesthetics and warm color harmonies.
9. **CSS Design Awards Provider**: High-performance CSS craftsmanship.
10. **SiteInspire Provider**: Pure typographic elegance and negative space.
11. **Local Provider**: Local sector references adhering to KDL Gold Standard.

---

## 15 Quality Metrics & DFII Score

Each reference is evaluated across 15 weighted dimensions:
- Visual Quality, Originality, Conversion, Motion, Storytelling, Branding, UX, Performance, Accessibility, Architecture, SEO, Innovation, Visual Impact, Cinematic Score, and **DFII Score** (Design Feasibility & Impact Index).

---

## Usage

```typescript
import { InspirationEngine } from '@kdl/inspiration';

const engine = new InspirationEngine();
const result = await engine.discover('restaurants');

console.log(result.synthesizedTokens);
console.log(result.topReferences);
```
