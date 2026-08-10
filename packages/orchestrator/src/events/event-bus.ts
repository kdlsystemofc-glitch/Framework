export type PipelineEventType =
  | 'pipeline.created'
  | 'pipeline.started'
  | 'pipeline.stage.started'
  | 'pipeline.stage.completed'
  | 'pipeline.stage.failed'
  | 'pipeline.stage.retrying'
  | 'pipeline.stage.skipped'
  | 'pipeline.paused'
  | 'pipeline.resumed'
  | 'pipeline.completed'
  | 'pipeline.failed'
  | 'pipeline.cancelled'
  | 'review.started'
  | 'review.completed'
  | 'autofix.started'
  | 'autofix.completed';

export interface PipelineEvent {
  type: PipelineEventType;
  executionId: string;
  timestamp: string;
  stageId?: string;
  payload?: unknown;
}

export type EventListener = (event: PipelineEvent) => void;

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<PipelineEventType | '*', Set<EventListener>> = new Map();

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public subscribe(type: PipelineEventType | '*', listener: EventListener): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener);

    return () => {
      this.listeners.get(type)?.delete(listener);
    };
  }

  public emit(event: PipelineEvent): void {
    const specific = this.listeners.get(event.type);
    if (specific) {
      for (const listener of specific) {
        try { listener(event); } catch { /* Ignore subscriber errors */ }
      }
    }

    const wildcard = this.listeners.get('*');
    if (wildcard) {
      for (const listener of wildcard) {
        try { listener(event); } catch { /* Ignore subscriber errors */ }
      }
    }
  }
}
