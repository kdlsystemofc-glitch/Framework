import { Command } from 'commander';
import { KDLCLICommand } from './command.interface.js';
import { WizardPrompt } from '../prompts/wizard.prompt.js';
import { OrchestratorEngine, CheckpointManager, EventBus, PipelineEvent, MethodologyRegistry } from '@kdl/orchestrator';
import { IndustrySector } from '@kdl/inspiration';
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
      .option('--from-artifacts', 'Execute pipeline using pre-existing cognitive artifacts from .project/artifacts/ (No AI Provider required)')
      .action(async (folder: string | undefined, options: { niche?: string; resume?: boolean; nonInteractive?: boolean; dryRun?: boolean; fromArtifacts?: boolean }) => {
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

        const officialPhases = MethodologyRegistry.getOfficialPhases();

        logger.info(Formatter.header(`KDL PIPELINE ORCHESTRATOR — ${targetFolder}`));
        logger.info(`Mode: ${options.fromArtifacts ? 'ARTIFACT-DRIVEN (--from-artifacts)' : (options.nonInteractive ? 'NON-INTERACTIVE (CI/CD)' : 'INTERACTIVE')} | Dry-Run: ${options.dryRun ? 'YES' : 'NO'}`);

        if (options.dryRun) {
          logger.info(`[DRY RUN] Simulating master 12-phase landing page pipeline for sector '${sector}'...`);
          officialPhases.forEach((phase, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const total = String(officialPhases.length).padStart(2, '0');
            logger.info(`[${num}/${total}] ${phase.id}: Simulating ${phase.shortName} (${phase.description})`);
          });
          logger.success(`[DRY RUN] Master pipeline verification completed successfully. Zero changes written.`);
          return;
        }

        let stageIndex = 0;
        const totalStages = officialPhases.length;

        EventBus.getInstance().subscribe('pipeline.stage.started', (ev: PipelineEvent) => {
          stageIndex++;
          const stageFormatted = String(stageIndex).padStart(2, '0');
          logger.info(`[${stageFormatted}/${String(totalStages).padStart(2, '0')}] Stage Started: ${ev.stageId || 'unknown'}`);
        });

        EventBus.getInstance().subscribe('pipeline.stage.completed', (ev: PipelineEvent) => {
          const payload = ev.payload as any;
          if (payload?.status === 'WAITING_FOR_APPROVAL') {
            logger.warn(`⏸ Stage ${ev.stageId} PAUSED: Waiting for Human Approval (approvalRequired = true)`);
          } else {
            logger.success(`✔ Completed Stage: ${ev.stageId || 'unknown'}`);
          }
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
          'landing-page-master',
          resumeMode,
          !options.nonInteractive,
          options.fromArtifacts || false
        );

        logger.success(Formatter.header(`KDL MASTER PIPELINE ORCHESTRATION COMPLETE`));
        logger.info(`Project Name: ${ctx.projectName}`);
        logger.info(`Execution Mode: ${ctx.fromArtifacts ? 'ARTIFACT_DRIVEN' : 'AI_POWERED'}`);
        logger.info(`Overall Quality Score: ${ctx.review?.overallScore || 100}/100`);
        logger.info(`Passed Quality Gates: ${ctx.review?.passedAllGates ? 'YES ✅' : 'NO ❌'}`);
        logger.info(`Final Audit Report: ${projectPath}/reports/FINAL_AUDIT.md`);
        logger.info(`Final Execution Report: ${projectPath}/reports/EXECUTION_REPORT.md`);
        logger.info(`Publication Package: ${projectPath}/reports/publication-report.md`);
      });
  }
}
