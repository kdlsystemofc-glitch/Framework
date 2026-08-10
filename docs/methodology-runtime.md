# KDL Methodology Runtime Architecture

> **Official Operating System & Runtime Engine for the KDL Landing Methodology**

---

## 1. Overview

The **Methodology Runtime** is the core execution engine of the KDL Landing Framework. It establishes the **Methodology Registry (`MethodologyRegistry`)** as the single, immutable source of truth for the **12 official methodology phases**, seamlessly connecting prompts, agents, templates, checklists, artifacts, quality gates, and checkpoints.

---

## 2. Architecture & Components

```
+-----------------------------------------------------------------------------------+
|                              MethodologyRegistry                                  |
|                 (Single Source of Truth for 12 Official Phases)                    |
+-----------------------------------------------------------------------------------+
        |                         |                         |                    |
        v                         v                         v                    v
+---------------+       +------------------+       +---------------+   +-------------------+
| PromptRuntime |       |   AgentRuntime   |       |ArtifactSystem |   | CheckpointSystem  |
| (PromptLoader)|       |  (AgentRegistry) |       | (ArtifactReg) |   | (PhaseCheckpoints)|
+---------------+       +------------------+       +---------------+   +-------------------+
        |                         |                         |                    |
        +-------------------------+-------------------------+--------------------+
                                  |
                                  v
                   +------------------------------+
                   |     PipelineExecutor (12P)   |
                   +------------------------------+
                                  |
                                  v
                   +------------------------------+
                   |  ReviewerEngine (7 Gates)    |
                   +------------------------------+
```

---

## 3. The 12 Official Methodology Phases

1. `00-loader` — Framework Loader & Environment Discovery
2. `01-discovery` — Business & Project Discovery
3. `02-brand-strategy` — Brand Strategy & Voice Positioning
4. `03-design-system` — Semantic Design Tokens & System
5. `04-copywriting` — Master Copywriting (AIDA & Anti-AI)
6. `05-creative-direction` — Visual Creative Direction (DFII >= 10)
7. `06-experience-design` — Experience Design & User Journey Mapping
8. `07-ui-architecture` — UI Architecture & Bento Grid System
9. `07.1-cinematic-experience` — Cinematic Scroll Motion & GSAP Physics
10. `08-implementation` — Production Front-End Implementation
11. `08.1-final-audit` — Final Audit & Quality Gates
12. `09-publication` — Production Deployment & Publication

---

## 4. Phase Context & Artifact System

Each phase receives context from preceding phases and emits verifiable Markdown/JSON artifacts in the project root:
- `00-loader/environment-discovery.md`
- `01-discovery/discovery.md`
- `02-brand-strategy/brand-strategy.md`
- `03-design-system/design-system.md`
- `04-copywriting/copywriting.md`
- `05-creative-direction/creative-direction.md`, `design/creative-dna.json`
- `06-experience-design/experience-design.md`
- `07-ui-architecture/ui-architecture.md`
- `07.1-cinematic-experience/cinematic-experience.md`
- `landing/index.html`, `landing/styles.css`, `landing/app.js`
- `reports/FINAL_AUDIT.md`, `reports/EXECUTION_REPORT.md`
- `reports/publication-report.md`

---

## 5. Human Approval & Checkpoint Recovery

- **Phase Checkpoints**: Saved per phase in `.project/execution/checkpoints/` (`00-loader.json`, etc.).
- **Resume Support**: `kdl create --resume` skips `COMPLETED` phases without re-executing.
- **Human Approval**: Support `approvalRequired` per phase with `WAITING_FOR_APPROVAL` status and `--non-interactive` automatic handling.
