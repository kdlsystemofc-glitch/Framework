# KDL Framework — Pipelines Specification

Pipelines are declared as structured TypeScript configurations containing an ID, title, description, and an array of `StageDefinition` objects.

```typescript
const pipeline: PipelineDefinition = {
  id: 'landing-page',
  name: 'Landing Page Master Pipeline',
  description: 'Autonomous end-to-end production pipeline',
  stages: [ /* stage definitions */ ]
};
```
