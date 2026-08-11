import { SharedExecutionContext } from '../types/orchestrator.types.js';
import { PipelineRegistry } from '../registry/pipeline.registry.js';
import { createLandingPagePipeline } from '../pipeline/landing.pipeline.js';
import { ExecutionContextHolder } from '../context/execution-context.js';
import { PipelineExecutor } from '../execution/pipeline.executor.js';
import { ExecutionReporter } from '../reports/execution.reporter.js';
import { CognitiveArtifactLoader } from '../artifacts/cognitive-artifact.loader.js';
import { IndustrySector } from '@kdl/inspiration';
import crypto from 'crypto';

export class OrchestratorEngine {
  private registry = PipelineRegistry.getInstance();
  private executor = new PipelineExecutor();

  constructor() {
    const landingMaster = createLandingPagePipeline();
    // Register under landing-page-master and alias landing-page for backward compatibility
    this.registry.registerPipeline(landingMaster);
    this.registry.registerPipeline({
      ...landingMaster,
      id: 'landing-page',
    });
  }

  public async executePipeline(
    projectName: string,
    projectPath: string,
    sector: IndustrySector = 'restaurants',
    pipelineId = 'landing-page-master',
    resumeMode = false,
    isInteractive = false,
    fromArtifacts = false
  ): Promise<SharedExecutionContext> {
    const pipeline = this.registry.getPipeline(pipelineId);
    const executionId = `exec-${crypto.randomBytes(4).toString('hex')}`;
    const context = ExecutionContextHolder.createInitialContext(executionId, projectName, projectPath, sector);

    context.fromArtifacts = fromArtifacts;

    if (fromArtifacts) {
      const artifactMap = CognitiveArtifactLoader.loadAndValidateAll(projectPath);
      context.phaseSources = context.phaseSources || {};

      for (const [phaseId, payload] of Object.entries(artifactMap)) {
        context.customData[`json_${phaseId}`] = payload;
        context.phaseSources[phaseId] = 'EXTERNAL_ARTIFACT';
      }
    }

    const updatedContext = await this.executor.executePipeline(pipeline, context, resumeMode, isInteractive);
    ExecutionReporter.generateExecutionReport(updatedContext);

    return updatedContext;
  }
}
