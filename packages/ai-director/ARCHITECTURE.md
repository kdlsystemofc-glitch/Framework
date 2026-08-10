# `@kdl/ai-director` Architecture Specification

## Overview

```text
BootstrapEngine ──> InspirationEngine
                           │
                           ▼
                 MultiStageReasoner (8 Stages)
                           │
                           ▼
          ┌────────────────┴────────────────┐
          ▼                                 ▼
CreativeDNAGenerator               DecisionLogger
 (creative-dna.json)             (decision-logs.json)
          │                                 │
          └────────────────┬────────────────┘
                           ▼
                 OriginalityEvaluator (DFII Score)
                           │
                           ▼
                  AutoLearningMemory
```

---

## Anti-AI Cliché Enforcement Rules

- **Zero Generic Layouts**: Rejects 3-column equal grid cards in favor of 12-column asymmetric Bento Grids.
- **Zero Generic Typography**: Rejects browser defaults (Arial, Times New Roman).
- **Zero Saturated Gradient Clichés**: Rejects purple/pink AI gradients.
- **Strict WCAG Compliance**: Guarantees contrast ratio >= 4.5.
