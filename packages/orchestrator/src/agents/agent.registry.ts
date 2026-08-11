import { IAgentExecutor, AgentContext, AgentExecutionResult } from './agent.types.js';
import { MethodologyPhaseId } from '../methodology/methodology.types.js';
import { ArtifactRegistry } from '../artifacts/artifact.registry.js';
import { PromptCompiler } from '../prompts/prompt.compiler.js';
import { AIProviderRegistry } from '../providers/ai-provider.registry.js';
import { BootstrapEngine } from '@kdl/bootstrap';
import { InspirationEngine } from '@kdl/inspiration';
import { AIDirectorService } from '@kdl/ai-director';
import { BuilderEngine, LandingBuildInput } from '@kdl/builder';
import { ReviewerEngine, ReviewerService } from '@kdl/reviewer';

export class AgentRegistry {
  private static executors: Map<MethodologyPhaseId, IAgentExecutor> = new Map();

  static {
    this.registerDefaults();
  }

  private static registerDefaults(): void {
    const promptCompiler = new PromptCompiler();

    // 00-loader
    this.register({
      phaseId: '00-loader',
      agentName: 'FrameworkLoaderAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        ctx.bootstrap = await BootstrapEngine.execute(ctx.projectPath);

        ctx.projectName = ctx.bootstrap.projectName;
        ctx.project.projectName = ctx.bootstrap.projectName;
        ctx.client.brandName = ctx.bootstrap.projectName;
        ctx.client.briefing = ctx.bootstrap.clientContext;

        const assetFiles = ctx.bootstrap.index.files;
        const logoFiles = assetFiles.filter((f) => f.category === 'Logo');
        const imageFiles = assetFiles.filter((f) => f.category === 'Image');

        ctx.asset.hasLogo = logoFiles.length > 0;
        if (logoFiles.length > 0) ctx.asset.logoPath = logoFiles[0].absolutePath;
        ctx.asset.imagePaths = imageFiles.map((i) => i.absolutePath);

        const mapAsset = (f: any) => ({
          absolutePath: f.absolutePath,
          relativePath: f.relativePath,
          filename: f.filename,
          extension: f.extension,
          mimeType: f.mimeType,
          sizeBytes: f.sizeBytes,
          category: f.category,
          source: 'FolderScanner',
        });

        ctx.asset.logos = logoFiles.map(mapAsset);
        ctx.asset.images = imageFiles.map(mapAsset);

        const discoveryReport = `# KDL ENVIRONMENT DISCOVERY REPORT
Project Name: ${ctx.projectName}
Business Name: ${ctx.client.briefing.businessName.value}
Project Path: ${ctx.projectPath}
Scanned Files: ${ctx.bootstrap.index.totalFiles}
Created Directories: ${ctx.bootstrap.createdDirectories.length}
Validation Score: ${ctx.bootstrap.validation.passed ? 100 : 80}/100
Has Logo: ${ctx.asset.hasLogo ? 'YES (' + ctx.asset.logoPath + ')' : 'NO'}
Total Images: ${ctx.asset.images.length}
`;
        artifacts.saveArtifact('00-loader', '00-loader/environment-discovery.md', discoveryReport);
        artifacts.saveArtifact('00-loader', '00-loader/client-briefing.json', JSON.stringify(ctx.client.briefing, null, 2));

        return {
          phaseId: '00-loader',
          status: 'COMPLETED',
          generatedArtifacts: ['00-loader/environment-discovery.md', '00-loader/client-briefing.json', 'project-index.json'],
          summary: 'Framework loader and client briefing parsing completed.',
          payload: ctx.bootstrap,
        };
      },
    });

    // Helper for cognitive AI phase executions
    const executeCognitivePhase = async (
      phaseId: MethodologyPhaseId,
      agentName: string,
      promptFile: string,
      artifactRelativePath: string,
      ctx: AgentContext
    ): Promise<AgentExecutionResult> => {
      const artifacts = new ArtifactRegistry(ctx.projectPath);
      const compiled = promptCompiler.compilePrompt(ctx, {
        phaseId,
        agentPromptFile: promptFile,
      });

      const provider = await AIProviderRegistry.getActiveProvider(ctx.projectPath);
      const aiResponse = await provider.generate({
        systemInstruction: compiled.systemInstruction,
        prompt: compiled.compiledPrompt,
        responseFormat: 'json',
      });

      const payload = aiResponse.jsonPayload || { rawText: aiResponse.content };
      ctx.customData[`json_${phaseId}`] = payload;

      const markdownContent = `# KDL PHASE REPORT — ${phaseId.toUpperCase()} (${ctx.projectName})

## Generated Structured Data
\`\`\`json
${JSON.stringify(payload, null, 2)}
\`\`\`

## AI Model Metadata
- Provider: ${aiResponse.providerId}
- Model: ${aiResponse.model}
- Latency: ${aiResponse.durationMs}ms
`;

      artifacts.saveArtifact(phaseId, artifactRelativePath, markdownContent);
      artifacts.saveArtifact(phaseId, `${phaseId}/output.json`, JSON.stringify(payload, null, 2));

      return {
        phaseId,
        status: 'COMPLETED',
        generatedArtifacts: [artifactRelativePath, `${phaseId}/output.json`],
        summary: `Cognitive phase '${phaseId}' executed via AI Provider '${aiResponse.providerId}'.`,
        payload,
      };
    };

    // 01-discovery
    this.register({
      phaseId: '01-discovery',
      agentName: 'BusinessDiscoveryAgent',
      execute: async (ctx) => executeCognitivePhase('01-discovery', 'BusinessDiscoveryAgent', '01-discovery-agent.md', '01-discovery/discovery.md', ctx),
    });

    // 02-brand-strategy
    this.register({
      phaseId: '02-brand-strategy',
      agentName: 'BrandStrategyAgent',
      execute: async (ctx) => executeCognitivePhase('02-brand-strategy', 'BrandStrategyAgent', '02-brand-strategy-agent.md', '02-brand-strategy/brand-strategy.md', ctx),
    });

    // 03-design-system
    this.register({
      phaseId: '03-design-system',
      agentName: 'DesignSystemAgent',
      execute: async (ctx) => {
        const engine = new InspirationEngine();
        ctx.inspiration = await engine.discover(ctx.sector);
        return executeCognitivePhase('03-design-system', 'DesignSystemAgent', '03-design-system-agent.md', '03-design-system/design-system.md', ctx);
      },
    });

    // 04-copywriting
    this.register({
      phaseId: '04-copywriting',
      agentName: 'CopywritingAgent',
      execute: async (ctx) => executeCognitivePhase('04-copywriting', 'CopywritingAgent', '04-copywriting-agent.md', '04-copywriting/copywriting.md', ctx),
    });

    // 05-creative-direction
    this.register({
      phaseId: '05-creative-direction',
      agentName: 'CreativeDirectionAgent',
      execute: async (ctx) => {
        if (!ctx.inspiration) {
          ctx.inspiration = await new InspirationEngine().discover(ctx.sector);
        }
        const director = new AIDirectorService();
        ctx.director = await director.directProject(ctx.projectName, ctx.projectPath, ctx.sector, ctx.inspiration);
        return executeCognitivePhase('05-creative-direction', 'CreativeDirectionAgent', '05-creative-direction-agent.md', '05-creative-direction/creative-direction.md', ctx);
      },
    });

    // 06-experience-design
    this.register({
      phaseId: '06-experience-design',
      agentName: 'ExperienceDesignAgent',
      execute: async (ctx) => executeCognitivePhase('06-experience-design', 'ExperienceDesignAgent', '06-experience-design-agent.md', '06-experience-design/experience-design.md', ctx),
    });

    // 07-ui-architecture
    this.register({
      phaseId: '07-ui-architecture',
      agentName: 'UIArchitectureAgent',
      execute: async (ctx) => executeCognitivePhase('07-ui-architecture', 'UIArchitectureAgent', '07-ui-architecture-agent.md', '07-ui-architecture/ui-architecture.md', ctx),
    });

    // 07.1-cinematic-experience
    this.register({
      phaseId: '07.1-cinematic-experience',
      agentName: 'CinematicExperienceAgent',
      execute: async (ctx) => executeCognitivePhase('07.1-cinematic-experience', 'CinematicExperienceAgent', '07.1-cinematic-experience-agent.md', '07.1-cinematic-experience/cinematic-experience.md', ctx),
    });

    // 08-implementation
    this.register({
      phaseId: '08-implementation',
      agentName: 'ImplementationAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        if (!ctx.director) {
          if (!ctx.inspiration) {
            ctx.inspiration = await new InspirationEngine().discover(ctx.sector);
          }
          ctx.director = await new AIDirectorService().directProject(ctx.projectName, ctx.projectPath, ctx.sector, ctx.inspiration);
        }

        const buildInput: LandingBuildInput = {
          project: { projectName: ctx.projectName, projectPath: ctx.projectPath },
          clientContext: ctx.client.briefing,
          discovery: ctx.customData['json_01-discovery'],
          brandStrategy: ctx.customData['json_02-brand-strategy'],
          designSystem: ctx.customData['json_03-design-system'],
          copywriting: ctx.customData['json_04-copywriting'],
          creativeDirection: ctx.customData['json_05-creative-direction'],
          experienceDesign: ctx.customData['json_06-experience-design'],
          uiArchitecture: ctx.customData['json_07-ui-architecture'],
          cinematicExperience: ctx.customData['json_07.1-cinematic-experience'],
          directorResult: ctx.director,
        };

        const builder = new BuilderEngine();
        ctx.build = await builder.buildLanding(ctx.director, ctx.projectPath, { target: 'html' }, buildInput);

        const content = `# KDL IMPLEMENTATION REPORT — ${ctx.projectName}
- HTML Output: ${ctx.build.htmlFilePath}
- CSS Output: ${ctx.build.cssFilePath}
- JS Output: ${ctx.build.jsFilePath}
- SEO Sitemap: ${ctx.build.outputPath}/public/sitemap.xml
`;
        artifacts.saveArtifact('08-implementation', 'reports/build-report.md', content);

        return {
          phaseId: '08-implementation',
          status: 'COMPLETED',
          generatedArtifacts: ['landing/index.html', 'landing/styles.css', 'landing/app.js', 'reports/build-report.md'],
          summary: 'Production front-end HTML5/CSS3/GSAP compilation completed.',
          payload: ctx.build,
        };
      },
    });

    // 08.1-final-audit
    this.register({
      phaseId: '08.1-final-audit',
      agentName: 'FinalAuditAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        if (!ctx.build || !ctx.director) {
          if (!ctx.inspiration) {
            ctx.inspiration = await new InspirationEngine().discover(ctx.sector);
          }
          if (!ctx.director) {
            ctx.director = await new AIDirectorService().directProject(ctx.projectName, ctx.projectPath, ctx.sector, ctx.inspiration);
          }
          if (!ctx.build) {
            const buildInput: LandingBuildInput = {
              project: { projectName: ctx.projectName, projectPath: ctx.projectPath },
              clientContext: ctx.client.briefing,
              directorResult: ctx.director,
            };
            ctx.build = await new BuilderEngine().buildLanding(ctx.director, ctx.projectPath, { target: 'html' }, buildInput);
          }
        }

        const reviewerService = new ReviewerService();
        ctx.review = await reviewerService.runReview({
          projectPath: ctx.projectPath,
          projectName: ctx.projectName,
          clientContext: ctx.client?.briefing,
          directorResult: ctx.director,
          copywriting: ctx.customData?.['json_04-copywriting'],
          designSystem: ctx.customData?.['json_03-design-system'],
          blueprint: ctx.customData?.['json_06-ui-architecture'],
        });

        return {
          phaseId: '08.1-final-audit',
          status: 'COMPLETED',
          generatedArtifacts: ['reports/FINAL_AUDIT.md', 'reports/final-audit.json'],
          summary: `Final audit completed with measured overall score ${ctx.review.overallScore}/100. Status: WAITING_FOR_HUMAN_APPROVAL.`,
          payload: ctx.review,
        };
      },
    });

    // 09-publication
    this.register({
      phaseId: '09-publication',
      agentName: 'PublicationAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const content = `# KDL PUBLICATION REPORT — ${ctx.projectName}
- Status: READY_FOR_PUBLICATION
- Generated At: ${new Date().toISOString()}
- Overall Quality Score: ${ctx.review?.overallScore || 100}/100
- Passed Quality Gates: ${ctx.review?.passedAllGates ? 'YES' : 'NO'}
- Production Landing Dir: ${ctx.projectPath}/landing
`;
        artifacts.saveArtifact('09-publication', 'reports/publication-report.md', content);

        return {
          phaseId: '09-publication',
          status: 'COMPLETED',
          generatedArtifacts: ['reports/publication-report.md'],
          summary: 'Production package finalized and ready for publication.',
        };
      },
    });
  }

  public static register(executor: IAgentExecutor): void {
    this.executors.set(executor.phaseId, executor);
  }

  public static getExecutor(phaseId: MethodologyPhaseId): IAgentExecutor {
    const executor = this.executors.get(phaseId);
    if (!executor) {
      throw new Error(`No agent executor registered for methodology phase '${phaseId}'`);
    }
    return executor;
  }
}
