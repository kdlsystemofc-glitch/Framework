# `@kdl/reviewer` Architecture Specification

## Overview

```text
BuildOutputResult (from @kdl/builder)
                     │
                     ▼
         ReviewPipeline Loop (Max 3 iterations)
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
 15 Modular Auditors        AutoCorrector
(HTML, CSS, JS, Motion,    (Self-Healing Fixer)
 A11y, SEO, Perf, Design)         │
        │                         │
        └────────────┬────────────┘
                     ▼
              GateValidator (7 Quality Gates)
                     │
                     ▼
            FinalAuditReporter (reports/FINAL_AUDIT.md)
```

---

## Modular Auditors Overview

- **HTMLAuditor**: Doctype, semantic tags, lang attribute.
- **CSSAuditor**: `:root` design tokens, zero inline overrides.
- **MotionAuditor**: GSAP 3.12, Lenis Smooth Scroll 1.0 script presence.
- **AccessibilityAuditor**: WCAG 2.2 contrast ratio, alt text attributes.
- **SEOAuditor**: OpenGraph tags, JSON-LD Schema.org validity.
- **PerformanceAuditor**: Core Web Vitals (LCP < 2.5s, CLS < 0.1, FID < 100ms).
- **DesignAuditor**: Bento Grid asymmetry, non-generic typography.
- **StorytellingAuditor**: Clear hero headline and CTA placement.
