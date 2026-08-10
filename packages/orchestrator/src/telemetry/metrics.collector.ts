import { EventBus, PipelineEvent } from '../events/event-bus.js';

export interface StageMetrics {
  stageId: string;
  durationMs: number;
  attempts: number;
  status: string;
}

export class MetricsCollector {
  private stageMetricsMap = new Map<string, StageMetrics>();
  private startTime = Date.now();
  private unsubscribe: () => void;

  constructor() {
    this.unsubscribe = EventBus.getInstance().subscribe('*', (event) => this.handleEvent(event));
  }

  private handleEvent(event: PipelineEvent): void {
    if (event.type === 'pipeline.stage.completed' && event.stageId) {
      const payload = event.payload as { durationMs: number };
      this.stageMetricsMap.set(event.stageId, {
        stageId: event.stageId,
        durationMs: payload?.durationMs || 0,
        attempts: 1,
        status: 'COMPLETED',
      });
    }
  }

  public getSummary() {
    const totalDurationMs = Date.now() - this.startTime;
    return {
      totalDurationMs,
      stages: Array.from(this.stageMetricsMap.values()),
    };
  }

  public dispose(): void {
    this.unsubscribe();
  }
}
