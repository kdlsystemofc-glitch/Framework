import { Command } from 'commander';
import { KDLCLICommand } from './command.interface.js';
import { ConfigService } from '../services/config.service.js';
import { logger } from '../utils/logger.js';

export class InitCommand implements KDLCLICommand {
  public name = 'init';
  public description = 'Initialize workspace configuration for KDL Landing Framework';

  public register(program: Command): void {
    program
      .command('init')
      .description(this.description)
      .action(async () => {
        logger.info('Initializing KDL workspace configuration...');
        const configService = new ConfigService();
        configService.saveConfig();
        logger.success('KDL Workspace configuration file (.kdlrc.json) created/updated successfully.');
      });
  }
}
