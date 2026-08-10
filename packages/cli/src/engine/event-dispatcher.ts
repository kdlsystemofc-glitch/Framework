export type KDLEventHandler = (payload: unknown) => void | Promise<void>;

export class EventDispatcher {
  private listeners = new Map<string, KDLEventHandler[]>();

  public on(eventName: string, handler: KDLEventHandler): void {
    const list = this.listeners.get(eventName) || [];
    list.push(handler);
    this.listeners.set(eventName, list);
  }

  public async emit(eventName: string, payload?: unknown): Promise<void> {
    const list = this.listeners.get(eventName) || [];
    for (const handler of list) {
      await handler(payload);
    }
  }
}
