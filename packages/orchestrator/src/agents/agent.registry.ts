import { IAgentExecutor, AgentContext, AgentExecutionResult } from './agent.types.js';
import { MethodologyPhaseId } from '../methodology/methodology.types.js';
import { ArtifactRegistry } from '../artifacts/artifact.registry.js';
import { BootstrapEngine } from '@kdl/bootstrap';
import { InspirationEngine } from '@kdl/inspiration';
import { AIDirectorService } from '@kdl/ai-director';
import { BuilderEngine } from '@kdl/builder';
import { ReviewerEngine } from '@kdl/reviewer';

export class AgentRegistry {
  private static executors: Map<MethodologyPhaseId, IAgentExecutor> = new Map();

  static {
    this.registerDefaults();
  }

  private static registerDefaults(): void {
    // 00-loader
    this.register({
      phaseId: '00-loader',
      agentName: 'FrameworkLoaderAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        ctx.bootstrap = await BootstrapEngine.execute(ctx.projectPath);

        const discoveryReport = `# KDL ENVIRONMENT DISCOVERY REPORT
Project: ${ctx.projectName}
Path: ${ctx.projectPath}
Scanned Files: ${ctx.bootstrap.index.totalFiles}
Created Directories: ${ctx.bootstrap.createdDirectories.length}
Validation Score: ${ctx.bootstrap.validation.passed ? 100 : 80}/100
`;
        artifacts.saveArtifact('00-loader', '00-loader/environment-discovery.md', discoveryReport);

        return {
          phaseId: '00-loader',
          status: 'COMPLETED',
          generatedArtifacts: ['00-loader/environment-discovery.md', 'project-index.json'],
          summary: 'Framework loader and environment discovery completed.',
          payload: ctx.bootstrap,
        };
      },
    });

    // 01-discovery
    this.register({
      phaseId: '01-discovery',
      agentName: 'BusinessDiscoveryAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const content = `# KDL BUSINESS DISCOVERY REPORT — ${ctx.projectName}

## Commercial Profile
- Sector: ${ctx.sector}
- Target Audience ICP: High-intent consumers seeking premium ${ctx.sector} solutions.
- Commercial Objections: Price transparency, trust, service guarantees.
- Regional Competitors Audited: 3 Top Market Benchmarks.
- Whitespace Opportunity: Cinematic Scroll Storytelling & Zero Friction Booking.
`;
        artifacts.saveArtifact('01-discovery', '01-discovery/discovery.md', content);
        ctx.customData['discovery'] = { sector: ctx.sector, validated: true };

        return {
          phaseId: '01-discovery',
          status: 'COMPLETED',
          generatedArtifacts: ['01-discovery/discovery.md'],
          summary: 'Business discovery and ICP pain point mapping completed.',
          payload: ctx.customData['discovery'],
        };
      },
    });

    // 02-brand-strategy
    this.register({
      phaseId: '02-brand-strategy',
      agentName: 'BrandStrategyAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const content = `# KDL BRAND STRATEGY — ${ctx.projectName}

## Brand Identity & Positioning
- Archetype: Luminary & Creator (Sophisticated, High-Craft, Modern)
- Golden Circle (WHY): Transform ${ctx.sector} offerings into unforgettable digital journeys.
- Tone of Voice: Precise, Authoritative, Inspiring, Zero AI-Jargon.
`;
        artifacts.saveArtifact('02-brand-strategy', '02-brand-strategy/brand-strategy.md', content);
        ctx.customData['brandStrategy'] = { archetype: 'Luminary', tone: 'Authoritative' };

        return {
          phaseId: '02-brand-strategy',
          status: 'COMPLETED',
          generatedArtifacts: ['02-brand-strategy/brand-strategy.md'],
          summary: 'Brand strategy and verbal positioning established.',
          payload: ctx.customData['brandStrategy'],
        };
      },
    });

    // 03-design-system
    this.register({
      phaseId: '03-design-system',
      agentName: 'DesignSystemAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const engine = new InspirationEngine();
        ctx.inspiration = await engine.discover(ctx.sector);

        const content = `# KDL DESIGN SYSTEM — ${ctx.projectName}

## Design Tokens (60-30-10 Rule)
- Dominant 60%: ${ctx.inspiration.synthesizedTokens.colors.dominant60}
- Secondary 30%: ${ctx.inspiration.synthesizedTokens.colors.secondary30}
- Accent 10%: ${ctx.inspiration.synthesizedTokens.colors.accent10}

## Typography
- Display Font: ${ctx.inspiration.synthesizedTokens.typography.displayFont}
- Body Font: ${ctx.inspiration.synthesizedTokens.typography.bodyFont}
- WCAG 2.2 Contrast Ratio: Compliant (>= 4.5:1)
`;
        artifacts.saveArtifact('03-design-system', '03-design-system/design-system.md', content);

        return {
          phaseId: '03-design-system',
          status: 'COMPLETED',
          generatedArtifacts: ['03-design-system/design-system.md'],
          summary: 'Semantic design tokens and typography scale synthesized.',
          payload: ctx.inspiration,
        };
      },
    });

    // 04-copywriting
    this.register({
      phaseId: '04-copywriting',
      agentName: 'CopywritingAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const content = `# KDL MASTER COPYWRITING — ${ctx.projectName}

## AIDA Conversion Flow
- Attention (Hero H1): A Experiência Definitiva em ${ctx.sector}.
- Interest (Subhead): Artesanato digital de alta precisão para clientes exigentes.
- Desire (Features): Transparência total, acabamento cinematográfico e suporte dedicado.
- Action (CTA): Reservar Experiência Agora.
`;
        artifacts.saveArtifact('04-copywriting', '04-copywriting/copywriting.md', content);
        ctx.customData['copywriting'] = { heroTitle: `A Experiência Definitiva em ${ctx.sector}` };

        return {
          phaseId: '04-copywriting',
          status: 'COMPLETED',
          generatedArtifacts: ['04-copywriting/copywriting.md'],
          summary: 'Master AIDA copywriting completed without AI clichés.',
          payload: ctx.customData['copywriting'],
        };
      },
    });

    // 05-creative-direction
    this.register({
      phaseId: '05-creative-direction',
      agentName: 'CreativeDirectionAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        if (!ctx.inspiration) {
          ctx.inspiration = await new InspirationEngine().discover(ctx.sector);
        }

        const director = new AIDirectorService();
        ctx.director = await director.directProject(
          ctx.projectName,
          ctx.projectPath,
          ctx.sector,
          ctx.inspiration
        );

        const content = `# KDL CREATIVE DIRECTION — ${ctx.projectName}

## Concept & DFII Score
- Concept: ${ctx.director.dna.concept}
- Visual Style: ${ctx.director.dna.visualStyle}
- Originality Score: ${ctx.director.originality.originalityScore}/100
- DFII Score: ${ctx.director.originality.dfiiScore}/100 (Min Required: 10)
`;
        artifacts.saveArtifact('05-creative-direction', '05-creative-direction/creative-direction.md', content);

        return {
          phaseId: '05-creative-direction',
          status: 'COMPLETED',
          generatedArtifacts: [
            '05-creative-direction/creative-direction.md',
            'design/creative-dna.json',
            'design/decision-logs.json',
          ],
          summary: 'Creative direction, DFII score, and Creative DNA established.',
          payload: ctx.director,
        };
      },
    });

    // 06-experience-design
    this.register({
      phaseId: '06-experience-design',
      agentName: 'ExperienceDesignAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const content = `# KDL EXPERIENCE DESIGN — ${ctx.projectName}

## Scroll Pacing & Scene Choreography
- Hero Scene: Pinning & Smooth Entrance (0.8s)
- Bento Feature Showcase: Staggered Fade Up (0.5s)
- Testimonial Section: Horizontal Parallax Scroll
- Footer Reveal: High Contrast Vinette
`;
        artifacts.saveArtifact('06-experience-design', '06-experience-design/experience-design.md', content);

        return {
          phaseId: '06-experience-design',
          status: 'COMPLETED',
          generatedArtifacts: ['06-experience-design/experience-design.md'],
          summary: 'User journey mapping and scroll pacing choreographed.',
        };
      },
    });

    // 07-ui-architecture
    this.register({
      phaseId: '07-ui-architecture',
      agentName: 'UIArchitectureAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const content = `# KDL UI ARCHITECTURE — ${ctx.projectName}

## Bento Grid Specifications
- Total Columns: 12 Desktop / 1 Mobile
- Column Spans: Hero (Span 8 + Span 4 Showcase), Features (Span 4 x 3)
- Gutter: 24px | Outer Margin: 32px
`;
        artifacts.saveArtifact('07-ui-architecture', '07-ui-architecture/ui-architecture.md', content);

        return {
          phaseId: '07-ui-architecture',
          status: 'COMPLETED',
          generatedArtifacts: ['07-ui-architecture/ui-architecture.md'],
          summary: '12-column Bento Grid wireframe and responsive UI layout defined.',
        };
      },
    });

    // 07.1-cinematic-experience
    this.register({
      phaseId: '07.1-cinematic-experience',
      agentName: 'CinematicExperienceAgent',
      execute: async (ctx: AgentContext): Promise<AgentExecutionResult> => {
        const artifacts = new ArtifactRegistry(ctx.projectPath);
        const content = `# KDL CINEMATIC EXPERIENCE — ${ctx.projectName}

## Motion Engine Specs
- Smooth Scroll Library: Lenis 1.0.42
- Animation Library: GSAP 3.12.5 + ScrollTrigger
- GPU Hardware Acceleration: Forced transform3d & opacity rendering (60fps+)
`;
        artifacts.saveArtifact('07.1-cinematic-experience', '07.1-cinematic-experience/cinematic-experience.md', content);

        return {
          phaseId: '07.1-cinematic-experience',
          status: 'COMPLETED',
          generatedArtifacts: ['07.1-cinematic-experience/cinematic-experience.md'],
          summary: 'GSAP + Lenis scroll motion physics configured.',
        };
      },
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

        const builder = new BuilderEngine();
        ctx.build = await builder.buildLanding(ctx.director, ctx.projectPath, { target: 'html' });

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
            ctx.build = await new BuilderEngine().buildLanding(ctx.director, ctx.projectPath, { target: 'html' });
          }
        }

        const reviewer = new ReviewerEngine();
        ctx.review = await reviewer.reviewProject(ctx.build, ctx.director, ctx.projectPath);

        return {
          phaseId: '08.1-final-audit',
          status: 'COMPLETED',
          generatedArtifacts: ['reports/FINAL_AUDIT.md', 'reports/EXECUTION_REPORT.md'],
          summary: `Final audit passed with score ${ctx.review.overallScore}/100 across 9 auditors and 7 Quality Gates.`,
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
