export type HookFn = (context: Record<string, unknown>) => Promise<void> | void;

export class HookRunner {
  private hooks = new Map<string, HookFn[]>();

  public registerHook(name: string, fn: HookFn): void {
    const list = this.hooks.get(name) || [];
    list.push(fn);
    this.hooks.set(name, list);
  }

  public async runHooks(name: string, context: Record<string, unknown>): Promise<void> {
    const list = this.hooks.get(name) || [];
    for (const fn of list) {
      await fn(context);
    }
  }
}
