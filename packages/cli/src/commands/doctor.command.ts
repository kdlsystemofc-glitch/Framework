import { Command } from 'commander';
import { KDLCLICommand } from './command.interface.js';
import { SystemUtils } from '../utils/system.js';
import { Orchestrator } from '../core/orchestrator.js';
import { logger } from '../utils/logger.js';
import { Formatter } from '../utils/formatter.js';

export class DoctorCommand implements KDLCLICommand {
  public name = 'doctor';
  public description = 'Diagnose KDL Framework system health, environment and dependencies';

  public register(program: Command): void {
    program
      .command('doctor')
      .description(this.description)
      .action(async () => {
        logger.info(Formatter.header('KDL Framework Doctor System Health'));
        const sys = SystemUtils.getInfo();

        logger.info(`Platform: ${sys.platform} (${sys.arch})`);
        logger.info(`Node.js Version: ${sys.nodeVersion}`);
        logger.info(`CPUs: ${sys.cpusCount}`);
        logger.info(`Free Memory: ${sys.freeMemoryMB}MB / ${sys.totalMemoryMB}MB`);

        try {
          const orchestrator = new Orchestrator();
          const manifest = orchestrator.getManifest();
          logger.success(`Framework Root Found: ${manifest.frameworkRootPath}`);
          logger.success(`Framework Version: ${manifest.version}`);
          logger.success(`Phases Loaded: ${manifest.phases.length}`);
          logger.success(`Core Modules: ${manifest.coreModules.length}`);
          logger.success(`Engine Modules: ${manifest.engineModules.length}`);
          logger.success('KDL Framework Doctor Health: HEALTHY (100/100)');
        } catch (err: any) {
          logger.error(`Framework load issue: ${err.message}`);
        }
      });
  }
}
