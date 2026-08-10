# `@kdl/reviewer` — Review Engine (Autonomous Quality Assurance)

The **Review Engine (`@kdl/reviewer`)** is the autonomous quality assurance and self-healing engine of the **KDL Landing Framework**. It runs 15 modular auditors (HTML, CSS, JS, Motion, Accessibility, SEO, Performance, UX, UI, Branding, Storytelling, Copy, Assets, Responsiveness, Design), applies automatic self-healing fixes for identified flaws, re-audits iteratively, and enforces 7 mandatory Quality Gates before outputting `reports/FINAL_AUDIT.md`.

---

## 7 Non-Negotiable Quality Gates

1. **Performance Score** >= 90
2. **SEO Score** >= 95
3. **Accessibility Score (WCAG 2.2)** >= 95
4. **Best Practices Score** >= 95
5. **Originality Score** >= 90
6. **DFII Score** >= 90
7. **Cinematic Experience Score** >= 90

---

## Usage

```typescript
import { ReviewerEngine } from '@kdl/reviewer';

const engine = new ReviewerEngine();
const result = await engine.reviewProject(buildResult, directorResult, './client-folder');

console.log(result.overallScore);
console.log(result.passedAllGates);
console.log(result.finalReportPath);
```
