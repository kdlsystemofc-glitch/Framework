# `@kdl/builder` Architecture Specification

## Overview

```text
AIDirector (creative-dna.json & Design Tokens)
                       │
                       ▼
                 BuildPipeline
                       │
         ┌─────────────┼─────────────┬─────────────┐
         ▼             ▼             ▼             ▼
    HTMLBuilder  ReactBuilder  NextBuilder   AstroBuilder
         │
         ├──> SEOPipeline (Meta, OpenGraph, JSON-LD, Sitemap, Robots)
         ├──> MotionPipeline (GSAP + Lenis + ScrollTrigger)
         ├──> AssetsPipeline (Responsive WebP/AVIF images)
         └──> ComponentLibrary (Hero, CTA, Pricing, FAQ, Navigation)
                       │
                       ▼
       OutputManager (landing/, src/, public/, build/)
```

---

## Strict Execution Discipline

In strict adherence to KDL Manifesto:
- The Builder Engine **never** makes creative choices.
- It translates design tokens directly into CSS custom properties (`:root`) and HTML5 semantic structure.
