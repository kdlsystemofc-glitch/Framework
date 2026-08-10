# `@kdl/orchestrator` — KDL Pipeline Orchestrator

The **Pipeline Orchestrator (`@kdl/orchestrator`)** is the core orchestration engine of the **KDL Landing Framework**. It registers declarative pipelines, resolves dependency graphs for parallel stage execution, maintains state transitions via a 9-state State Machine, persists atomic JSON checkpoints to `.project/execution/`, handles exponential backoff retries, and coordinates the self-healing Review & Auto-Fix loop.

---

## Features

- **Declarative Pipeline Definition**: Easily register stages with dependencies, retry policies, timeouts, and failure policies.
- **Topological Parallel Scheduler**: Automatically batch and execute non-dependent stages concurrently.
- **9-State State Machine**: Strict lifecycle state transitions (`CREATED`, `INITIALIZING`, `RUNNING`, `WAITING`, `RETRYING`, `PAUSED`, `FAILED`, `COMPLETED`, `CANCELLED`, `NEEDS_REVIEW`).
- **File-Backed JSON Checkpoints**: Crash recovery and pause/resume via `.project/execution/checkpoints/`.
- **Event Bus**: Emits 17 lifecycle events for real-time progress logging and monitoring.
- **Execution Reports**: Generates `reports/execution-report.json` and `reports/EXECUTION_REPORT.md`.

---

## Usage

```typescript
import { OrchestratorEngine } from '@kdl/orchestrator';

const orchestrator = new OrchestratorEngine();
const context = await orchestrator.executePipeline(
  'TW Modas ABC',
  './Clientes/TW Modas ABC',
  'restaurants',
  'landing-page'
);

console.log(context.review?.overallScore);
```
