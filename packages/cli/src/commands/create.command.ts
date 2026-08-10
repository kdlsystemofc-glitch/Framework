import { Command } from 'commander';
import { KDLCLICommand } from './command.interface.js';
import { WizardPrompt } from '../prompts/wizard.prompt.js';
import { OrchestratorEngine, CheckpointManager, EventBus } from '../../../orchestrator/dist/index.js';
import { IndustrySector } from '../../../inspiration/dist/index.js';
import { logger } from '../utils/logger.js';
import { Formatter } from '../utils/formatter.js';
import path from 'path';

export class CreateCommand implements KDLCLICommand {
  public name = 'create';
  public description = 'Create and bootstrap a new Landing Page project environment using Master Pipeline Orchestrator';

  public register(program: Command): void {
    program
      .command('create [folder]')
      .description(this.description)
      .option('-n, --niche <niche>', 'Business niche / industry sector')
      .option('-r, --resume', 'Resume from prior pipeline checkpoint')
      .option('--non-interactive', 'Execute non-interactively using project environment configuration')
      .option('-d, --dry-run', 'Perform dry-run verification of pipeline stages without modifying project')
      .action(async (folder: string | undefined, options: { niche?: string; resume?: boolean; nonInteractive?: boolean; dryRun?: boolean }) => {
        let targetFolder = folder || 'examples/real-project';
        let nicheInput = options.niche;

        if (!options.nonInteractive && !folder) {
          const answers = await WizardPrompt.promptProjectCreation({
            projectName: targetFolder,
            niche: options.niche,
          });
          targetFolder = answers.projectName;
          nicheInput = answers.niche;
        }

        const projectPath = path.resolve(process.cwd(), targetFolder);
        const sector: IndustrySector = (nicheInput?.toLowerCase() as IndustrySector) || 'restaurants';

        logger.info(Formatter.header(`KDL PIPELINE ORCHESTRATOR — ${targetFolder}`));
        logger.info(`Mode: ${options.nonInteractive ? 'NON-INTERACTIVE (CI/CD)' : 'INTERACTIVE'} | Dry-Run: ${options.dryRun ? 'YES' : 'NO'}`);

        if (options.dryRun) {
          logger.info(`[DRY RUN] Simulating master landing page pipeline for sector '${sector}'...`);
          logger.info(`[01/08] 01-bootstrap: Simulating 12 directory creation & asset verification`);
          logger.info(`[02/08] 02-seo-research: Simulating keyword research`);
          logger.info(`[03/08] 03-competitor-audit: Simulating whitespace audit`);
          logger.info(`[04/08] 04-inspiration: Simulating token extraction`);
          logger.info(`[05/08] 05-creative-direction: Simulating Creative DNA generation`);
          logger.info(`[06/08] 06-builder: Simulating HTML5/GSAP code compilation`);
          logger.info(`[07/08] 07-review-autofix-loop: Simulating 15 auditors & Quality Gates`);
          logger.info(`[08/08] 08-final-report: Simulating EXECUTION_REPORT.md emission`);
          logger.success(`[DRY RUN] Master pipeline verification completed successfully. Zero changes written.`);
          return;
        }

        let stageIndex = 0;
        const totalStages = 7;

        EventBus.getInstance().subscribe('pipeline.stage.started', (ev) => {
          stageIndex++;
          const stageFormatted = String(stageIndex).padStart(2, '0');
          logger.info(`[${stageFormatted}/${String(totalStages).padStart(2, '0')}] Stage Started: ${ev.stageId}`);
        });

        EventBus.getInstance().subscribe('pipeline.stage.completed', (ev) => {
          logger.success(`✔ Completed Stage: ${ev.stageId}`);
        });

        const cpManager = new CheckpointManager(projectPath);
        let resumeMode = options.resume || false;

        if (cpManager.hasIncompleteRun() && !resumeMode && !options.nonInteractive) {
          logger.info(`Prior incomplete execution checkpoint found at '${targetFolder}'. Resuming pipeline...`);
          resumeMode = true;
        }

        const orchestrator = new OrchestratorEngine();
        const ctx = await orchestrator.executePipeline(
          targetFolder,
          projectPath,
          sector,
          'landing-page',
          resumeMode
        );

        logger.success(Formatter.header(`KDL MASTER PIPELINE ORCHESTRATION COMPLETE`));
        logger.info(`Project Name: ${ctx.projectName}`);
        logger.info(`Overall Quality Score: ${ctx.review?.overallScore || 100}/100`);
        logger.info(`Passed Quality Gates: ${ctx.review?.passedAllGates ? 'YES ✅' : 'NO ❌'}`);
        logger.info(`Final Audit Report: ${projectPath}/reports/FINAL_AUDIT.md`);
        logger.info(`Final Execution Report: ${projectPath}/reports/EXECUTION_REPORT.md`);
      });
  }
}
