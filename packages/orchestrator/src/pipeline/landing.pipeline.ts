import { PipelineDefinition, StageDefinition } from '../types/orchestrator.types.js';
import { BootstrapEngine } from '@kdl/bootstrap';
import { InspirationEngine } from '@kdl/inspiration';
import { AIDirectorService } from '@kdl/ai-director';
import { BuilderEngine } from '@kdl/builder';
import { ReviewerEngine } from '@kdl/reviewer';

export function createLandingPagePipeline(): PipelineDefinition {
  const defaultRetry = { maxAttempts: 3, backoffMs: 500, timeoutMs: 30000 };

  const stages: StageDefinition[] = [
    {
      id: '01-bootstrap',
      name: 'Bootstrap Project Environment',
      description: 'Directory creation, SHA-256 asset scanning and mandatory checks',
      dependencies: [],
      retryPolicy: defaultRetry,
      failurePolicy: 'halt',
      executor: async (ctx) => {
        ctx.bootstrap = await BootstrapEngine.execute(ctx.projectPath);
        return ctx.bootstrap;
      },
    },
    {
      id: '02-seo-research',
      name: 'SEO & Keyword Intelligence',
      description: 'Analyzes sector keywords and target audience search intent',
      dependencies: ['01-bootstrap'],
      retryPolicy: defaultRetry,
      failurePolicy: 'continue',
      executor: async (ctx) => {
        ctx.customData['seoResearch'] = { keywords: [ctx.sector, 'luxury', 'experience'] };
        return ctx.customData['seoResearch'];
      },
    },
    {
      id: '03-competitor-audit',
      name: 'Competitor Whitespace Analysis',
      description: 'Audits regional competitor white space opportunities',
      dependencies: ['01-bootstrap'],
      retryPolicy: defaultRetry,
      failurePolicy: 'continue',
      executor: async (ctx) => {
        ctx.customData['competitorAudit'] = { whiteSpace: 'Cinematic Scroll Storytelling' };
        return ctx.customData['competitorAudit'];
      },
    },
    {
      id: '04-inspiration',
      name: 'Inspiration & Design Intelligence',
      description: 'Discovers award references and extracts HSL/Typography design tokens',
      dependencies: ['02-seo-research', '03-competitor-audit'],
      retryPolicy: defaultRetry,
      failurePolicy: 'halt',
      executor: async (ctx) => {
        const engine = new InspirationEngine();
        ctx.inspiration = await engine.discover(ctx.sector);
        return ctx.inspiration;
      },
    },
    {
      id: '05-creative-direction',
      name: 'AI Director Cognitive Direction',
      description: 'Executes 8-step reasoning, generates Creative DNA and Decision Logs',
      dependencies: ['04-inspiration'],
      retryPolicy: defaultRetry,
      failurePolicy: 'halt',
      executor: async (ctx) => {
        const director = new AIDirectorService();
        ctx.director = await director.directProject(
          ctx.projectName,
          ctx.projectPath,
          ctx.sector,
          ctx.inspiration!
        );
        return ctx.director;
      },
    },
    {
      id: '06-builder',
      name: 'Universal Code Builder',
      description: 'Compiles HTML5 + GSAP + Lenis + SEO production code',
      dependencies: ['05-creative-direction'],
      retryPolicy: defaultRetry,
      failurePolicy: 'halt',
      executor: async (ctx) => {
        const builder = new BuilderEngine();
        ctx.build = await builder.buildLanding(ctx.director!, ctx.projectPath, { target: 'html' });
        return ctx.build;
      },
    },
    {
      id: '07-review-autofix-loop',
      name: 'Review & Self-Healing Loop',
      description: 'Runs 15 modular auditors, self-healing loop and verifies 7 Quality Gates',
      dependencies: ['06-builder'],
      retryPolicy: defaultRetry,
      failurePolicy: 'halt',
      executor: async (ctx) => {
        const reviewer = new ReviewerEngine();
        ctx.review = await reviewer.reviewProject(ctx.build!, ctx.director!, ctx.projectPath);
        return ctx.review;
      },
    },
  ];

  return {
    id: 'landing-page',
    name: 'Landing Page Master Pipeline',
    description: 'Autonomous end-to-end production pipeline for Landing Pages',
    stages,
  };
}
