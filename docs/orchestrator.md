# KDL Framework — Pipeline Orchestrator Guide

The **KDL Pipeline Orchestrator (`@kdl/orchestrator`)** acts as the central software operating system engine for managing landing page generation workflows.

## Primary Responsibilities
1. **Pipeline Registration**: Load declarative pipeline definitions.
2. **Dependency & Batch Scheduling**: Group independent stages for concurrent execution.
3. **Resilient Retries**: Handle recoverable errors with exponential backoff.
4. **Persistent State**: Save state and stage checkpoints to `.project/execution/`.
5. **Execution Reporting**: Output `reports/EXECUTION_REPORT.md` upon completion.
