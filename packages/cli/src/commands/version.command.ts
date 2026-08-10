import { Command } from 'commander';
import { KDLCLICommand } from './command.interface.js';
import { Formatter } from '../utils/formatter.js';

export class VersionCommand implements KDLCLICommand {
  public name = 'version';
  public description = 'Display current KDL CLI and Framework version';

  public register(program: Command): void {
    program
      .command('version')
      .description(this.description)
      .action(() => {
        console.log(Formatter.banner('Official Software Operating System', '1.0.0'));
      });
  }
}
