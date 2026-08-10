import { Orchestrator } from '../core/orchestrator.js';
import { EventDispatcher } from './event-dispatcher.js';
import { HookRunner } from './hook-runner.js';
import { logger } from '../utils/logger.js';

export interface ExecutionOptions {
  projectName: string;
  niche: string;
  dryRun?: boolean;
}

export class ExecutionEngine {
  private orchestrator: Orchestrator;
  public readonly eventDispatcher: EventDispatcher;
  public readonly hookRunner: HookRunner;

  constructor(orchestrator: Orchestrator) {
    this.orchestrator = orchestrator;
    this.eventDispatcher = new EventDispatcher();
    this.hookRunner = new HookRunner();
  }

  public async prepareProjectSession(opts: ExecutionOptions): Promise<void> {
    await this.eventDispatcher.emit('beforePrepare', opts);
    await this.hookRunner.runHooks('onPrepare', opts as unknown as Record<string, unknown>);

    const state = this.orchestrator.initSession(opts.projectName, opts.niche);

    logger.success(`Prepared session for '${opts.projectName}'`);
    if (opts.dryRun) {
      logger.info('[DRY RUN] Simulating pipeline execution phase list:');
      this.orchestrator.printPipelineSummary();
    }

    await this.eventDispatcher.emit('afterPrepare', state);
  }
}
