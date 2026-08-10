# `@kdl/inspiration` Architecture Specification

## Overview

The `@kdl/inspiration` package acts as the automated visual intelligence gatherer for the **AI Director**.

```text
Providers (10 Award Sources)
       │
       ▼
InspirationCache (Persistent JSON Cache)
       │
       ▼
DesignQualityAnalyzer (15 Metrics & DFII Score)
       │
       ▼
InspirationRanker (Top 5 Ranking Engine)
       │
       ▼
Design Token Extractors (Color, Typography, Layout, Motion)
       │
       ▼
SegmentKnowledge (10 Industry Sectors Knowledge Base)
       │
       ▼
InspirationDiscoveryResult ──> Delivered to AI Director
```

---

## Anti-Plagiarism Guarantees

In strict adherence to the **KDL Engineering Manifesto**:
- **Zero Layout Reproduction**: Only mathematical grid proportions and asymmetry ratios are extracted.
- **Zero Code Copying**: Only abstract HSL color tokens and CSS font pairings are extracted.
- **Zero Text Copying**: Text content is never stored or duplicated.
