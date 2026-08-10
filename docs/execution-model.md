# KDL Framework — Execution Model

The execution model guarantees:
1. **Parallel Execution**: Stages with no pending dependencies execute concurrently in `Promise.all` batches.
2. **Crash Recovery**: Checkpoints written to `.project/execution/checkpoints/` allow resuming interrupted runs.
3. **Quality Gate Verification**: Automated review and auto-fix loop runs up to 5 iterations.
