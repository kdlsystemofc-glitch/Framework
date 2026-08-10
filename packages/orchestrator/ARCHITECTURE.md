# `@kdl/orchestrator` Architecture Specification

## Architecture Overview

```text
                                  OrchestratorEngine
                                          │
                   ┌──────────────────────┼──────────────────────┐
                   ▼                      ▼                      ▼
           PipelineRegistry          EventBus            PipelineExecutor
                   │                      │                      │
                   ▼                      ▼                      ▼
         LandingPagePipeline         Subscribers            StateMachine
                   │                                             │
                   ▼                                             ▼
          StageScheduler                                CheckpointManager
        (Parallel Batches)                               (.project/execution/)
                   │                                             │
                   └──────────────────────┬──────────────────────┘
                                          ▼
                                     RetryHandler
```

---

## State Machine Transitions

- `CREATED` ➔ `INITIALIZING`
- `INITIALIZING` ➔ `RUNNING` | `FAILED` | `CANCELLED`
- `RUNNING` ➔ `WAITING` | `RETRYING` | `PAUSED` | `FAILED` | `COMPLETED` | `CANCELLED` | `NEEDS_REVIEW`
- `RETRYING` ➔ `RUNNING` | `FAILED`
- `PAUSED` ➔ `RUNNING` | `CANCELLED`
- `FAILED` ➔ `INITIALIZING` | `RUNNING`
