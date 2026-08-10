import fs from 'fs';
import path from 'path';
import { IBuilder } from './builder.interface.js';
import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult, BuildOptions } from '../types/builder.types.js';
import { SEOPipeline } from '../seo/seo.pipeline.js';
import { MotionPipeline } from '../motion/motion.pipeline.js';
import { AssetsPipeline } from '../assets/assets.pipeline.js';

export class HTMLBuilder implements IBuilder {
  public readonly targetName = 'html';

  public async build(
    directorResult: AIDirectorResult,
    projectPath: string,
    options?: BuildOptions
  ): Promise<BuildOutputResult> {
    const landingDir = path.join(projectPath, 'landing');
    const srcDir = path.join(landingDir, 'src');
    const publicDir = path.join(landingDir, 'public');

    fs.mkdirSync(srcDir, { recursive: true });
    fs.mkdirSync(publicDir, { recursive: true });

    // 1. Run SEO Pipeline
    const seo = SEOPipeline.generateSEOPackage(directorResult);

    // 2. Run Motion Pipeline
    const motionScript = MotionPipeline.generateGSAPLenisScript(directorResult.designTokens.motion);

    // 3. Run Assets Pipeline
    const assetsGenerated = AssetsPipeline.processAssets(projectPath);

    // 4. Generate CSS Tokens & Stylesheet
    const cssContent = `/* KDL FRAMEWORK — AUTOMATED DESIGN TOKENS */
:root {
  --color-dominant-60: ${directorResult.designTokens.colors.dominant60};
  --color-secondary-30: ${directorResult.designTokens.colors.secondary30};
  --color-accent-10: ${directorResult.designTokens.colors.accent10};
  --color-text-primary: ${directorResult.designTokens.colors.textPrimary};
  --color-text-secondary: ${directorResult.designTokens.colors.textSecondary};

  --font-display: '${directorResult.designTokens.typography.displayFont}', sans-serif;
  --font-body: '${directorResult.designTokens.typography.bodyFont}', sans-serif;
  --typography-scale: ${directorResult.designTokens.typography.scaleRatio};

  --grid-columns: ${directorResult.designTokens.layout.columns};
  --grid-gutter: ${directorResult.designTokens.layout.gutterPx}px;
  --grid-margin: ${directorResult.designTokens.layout.marginPx}px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: var(--color-dominant-60);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  overflow-x: hidden;
}

h1, h2, h3, .display-heading {
  font-family: var(--font-display);
  line-height: ${directorResult.designTokens.typography.lineHeightDisplay};
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter);
  padding: 0 var(--grid-margin);
}

.btn-primary {
  background-color: var(--color-accent-10);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 9999px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover {
  transform: scale(1.05);
}
`;

    // 5. Generate Production HTML5 Page
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seo.title}</title>
  <meta name="description" content="${seo.metaDescription}">
  ${seo.openGraphTags}
  <link rel="stylesheet" href="./styles.css">
  <script type="application/ld+json">
  ${seo.jsonLdSchema}
  </script>
</head>
<body>
  <header class="header bento-grid" style="padding-top: 2rem; padding-bottom: 2rem;">
    <div style="grid-column: span 12; display: flex; justify-content: space-between; align-items: center;">
      <h2 style="font-size: 1.5rem; letter-spacing: -0.02em;">${directorResult.projectName}</h2>
      <button class="btn-primary">Reservar Agora</button>
    </div>
  </header>

  <main>
    <section class="hero bento-grid" style="min-height: 80vh; align-items: center; padding-top: 4rem;">
      <div style="grid-column: span 8;">
        <span style="color: var(--color-accent-10); text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; font-size: 0.875rem;">${directorResult.dna.visualStyle}</span>
        <h1 style="font-size: clamp(2.5rem, 6vw, 5rem); margin-top: 1rem; margin-bottom: 1.5rem;">${directorResult.dna.concept}</h1>
        <p style="font-size: 1.25rem; color: var(--color-text-secondary); max-width: 36ch; line-height: 1.6;">${directorResult.dna.dominantEmotion} — Projetado autonomamente pelo KDL Framework.</p>
        <div style="margin-top: 2.5rem;">
          <button class="btn-primary">Descubra a Experiência</button>
        </div>
      </div>
      <div style="grid-column: span 4; background-color: var(--color-secondary-30); height: 400px; border-radius: 24px; display: flex; align-items: center; justify-content: center;">
        <span style="color: var(--color-text-secondary);">Stage Showcase</span>
      </div>
    </section>
  </main>

  <footer style="text-align: center; padding: 4rem 1rem; border-top: 1px solid var(--color-secondary-30); color: var(--color-text-secondary);">
    <p>© ${new Date().getFullYear()} ${directorResult.projectName}. Powered by KDL Landing Framework.</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
  <script>
  ${motionScript}
  </script>
</body>
</html>
`;

    // Write files to landing/
    const htmlFilePath = path.join(landingDir, 'index.html');
    const cssFilePath = path.join(landingDir, 'styles.css');
    const jsFilePath = path.join(landingDir, 'app.js');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    const robotsPath = path.join(publicDir, 'robots.txt');

    fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
    fs.writeFileSync(cssFilePath, cssContent, 'utf-8');
    fs.writeFileSync(jsFilePath, motionScript, 'utf-8');
    fs.writeFileSync(sitemapPath, seo.sitemapXml, 'utf-8');
    fs.writeFileSync(robotsPath, seo.robotsTxt, 'utf-8');

    const buildReportPath = path.join(projectPath, 'reports', 'build-report.md');
    fs.mkdirSync(path.dirname(buildReportPath), { recursive: true });
    fs.writeFileSync(buildReportPath, `# KDL BUILD REPORT — ${directorResult.projectName}\nTarget: HTML5\nStatus: SUCCESS\nGenerated HTML: ${htmlFilePath}\nGenerated CSS: ${cssFilePath}\n`, 'utf-8');

    return {
      projectName: directorResult.projectName,
      target: 'html',
      outputPath: landingDir,
      htmlFilePath,
      cssFilePath,
      jsFilePath,
      assetsGenerated,
      seo,
      buildReportPath,
    };
  }
}
