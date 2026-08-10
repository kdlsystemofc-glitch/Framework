import { Command } from 'commander';

export interface KDLCLICommand {
  name: string;
  description: string;
  register(program: Command): void;
}
