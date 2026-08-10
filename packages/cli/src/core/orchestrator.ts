import { FrameworkLoader } from './framework-loader.js';
import { StateMachine } from './state-machine.js';
import { KDLFrameworkManifest } from '../types/framework.types.js';
import { logger } from '../utils/logger.js';
import { Formatter } from '../utils/formatter.js';

export class Orchestrator {
  private loader: FrameworkLoader;
  private manifest: KDLFrameworkManifest;
  private stateMachine?: StateMachine;

  constructor(customFrameworkPath?: string) {
    this.loader = new FrameworkLoader(customFrameworkPath);
    this.manifest = this.loader.loadManifest();
  }

  public getManifest(): KDLFrameworkManifest {
    return this.manifest;
  }

  public initSession(projectName: string, niche: string): StateMachine {
    this.stateMachine = new StateMachine(projectName, niche);
    logger.info(`Initialized KDL Session for '${projectName}' (Niche: ${niche})`);
    return this.stateMachine;
  }

  public printPipelineSummary(): void {
    logger.info(Formatter.header('KDL Methodology Pipeline (12 Sequential Phases)'));
    for (const phase of this.manifest.phases) {
      logger.info(Formatter.phaseStatus(phase.id, phase.name, 'PENDING'));
    }
  }
}
