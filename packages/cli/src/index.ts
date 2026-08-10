import { Command } from 'commander';
import { CreateCommand } from './commands/create.command.js';
import { InitCommand } from './commands/init.command.js';
import { DoctorCommand } from './commands/doctor.command.js';
import { VersionCommand } from './commands/version.command.js';
import { ErrorHandlerService } from './services/error-handler.service.js';
import { Formatter } from './utils/formatter.js';

export * from './types/config.types.js';
export * from './types/framework.types.js';
export * from './types/error.types.js';
export * from './utils/logger.js';
export * from './utils/formatter.js';
export * from './utils/system.js';
export * from './services/config.service.js';
export * from './services/plugin.service.js';
export * from './core/framework-loader.js';
export * from './core/orchestrator.js';
export * from './core/state-machine.js';
export * from './engine/execution-engine.js';
export * from './engine/event-dispatcher.js';
export * from './engine/hook-runner.js';

export async function runCLI(argv: string[] = process.argv, exitOverride = false): Promise<void> {
  try {
    const program = new Command();
    if (exitOverride) {
      program.exitOverride();
    }

    program
      .name('kdl')
      .description('KDL Landing Framework — Official Software Operating System CLI')
      .version('1.0.0', '-v, --version', 'Display KDL CLI version');

    const commands = [
      new CreateCommand(),
      new InitCommand(),
      new DoctorCommand(),
      new VersionCommand(),
    ];

    for (const cmd of commands) {
      cmd.register(program);
    }

    if (argv.length <= 2) {
      console.log(Formatter.banner('Official Software Operating System', '1.0.0'));
      program.outputHelp();
      return;
    }

    await program.parseAsync(argv);
  } catch (err: unknown) {
    if (exitOverride && (err as any)?.code === 'commander.helpDisplayed') {
      return;
    }
    ErrorHandlerService.handle(err);
    if (!exitOverride) {
      process.exitCode = 1;
    }
  }
}
