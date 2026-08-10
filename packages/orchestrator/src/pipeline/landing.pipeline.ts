import { PipelineDefinition, StageDefinition } from '../types/orchestrator.types.js';
import { MethodologyRegistry } from '../methodology/methodology.registry.js';
import { AgentRegistry } from '../agents/agent.registry.js';
import { PromptLoader } from '../prompts/prompt.loader.js';

export function createLandingPagePipeline(frameworkRoot?: string): PipelineDefinition {
  const officialPhases = MethodologyRegistry.getOfficialPhases();
  const promptLoader = new PromptLoader(frameworkRoot);

  const stages: StageDefinition[] = officialPhases.map((phase) => {
    return {
      id: phase.id,
      name: phase.name,
      description: phase.description,
      dependencies: phase.dependencies,
      retryPolicy: phase.retryPolicy,
      failurePolicy: phase.failurePolicy,
      approvalRequired: phase.approvalRequired,
      executor: async (ctx) => {
        const executor = AgentRegistry.getExecutor(phase.id);

        let promptContent = '';
        try {
          const loadedPrompt = promptLoader.loadPrompt(phase.agentPromptFile, {
            PROJECT_NAME: ctx.projectName,
            SECTOR: ctx.sector,
            PROJECT_PATH: ctx.projectPath,
          });
          promptContent = loadedPrompt.renderedPrompt;
        } catch {
          // If prompt file is missing in test environment, fallback gracefully
        }

        const agentCtx = Object.assign(ctx, {
          phaseId: phase.id,
          promptContent,
        });

        const result = await executor.execute(agentCtx);
        ctx.customData[`phase_${phase.id}`] = result;

        return result;
      },
    };
  });

  return {
    id: 'landing-page-master',
    name: 'KDL Methodology Master Pipeline',
    description: 'Autonomous 12-phase execution pipeline for KDL Landing Pages',
    stages,
  };
}
