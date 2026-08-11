import fs from 'fs';
import path from 'path';
import { IBuilder } from './builder.interface.js';
import { AIDirectorResult } from '@kdl/ai-director';
import { BuildOutputResult, BuildOptions, LandingBuildInput } from '../types/builder.types.js';
import { SEOPipeline } from '../seo/seo.pipeline.js';
import { MotionPipeline } from '../motion/motion.pipeline.js';
import { AssetsPipeline } from '../assets/assets.pipeline.js';
import { PageBlueprintBuilder } from '../blueprints/blueprint.builder.js';
import { CSSGenerator } from '../styles/css.generator.js';
import { SectionRenderer } from '../sections/section.renderer.js';

export class HTMLBuilder implements IBuilder {
  public readonly targetName = 'html';

  public async build(
    directorResult: AIDirectorResult,
    projectPath: string,
    options?: BuildOptions,
    buildInput?: LandingBuildInput
  ): Promise<BuildOutputResult> {
    const landingDir = path.join(projectPath, 'landing');
    const publicDir = path.join(landingDir, 'public');

    fs.mkdirSync(landingDir, { recursive: true });
    fs.mkdirSync(publicDir, { recursive: true });

    // 1. Run SEO Pipeline
    const seo = SEOPipeline.generateSEOPackage(directorResult);

    // 2. Run Motion Pipeline
    const motionScript = MotionPipeline.generateGSAPLenisScript(directorResult.designTokens.motion);

    // 3. Run Real Assets Pipeline
    const { generated: assetsGenerated, manifest } = AssetsPipeline.processAssets(projectPath);

    // 4. Construct Dynamic Page Blueprint
    const input: LandingBuildInput = buildInput || {
      project: { projectName: directorResult.projectName, projectPath },
      directorResult,
    };
    const blueprint = PageBlueprintBuilder.buildBlueprint(input, manifest);

    // 5. Generate Dynamic CSS Tokens & Stylesheet
    const cssContent = CSSGenerator.generateCSS(input.designSystem, directorResult);

    // 6. Render Dynamic Sections to HTML5
    const headerHtml = SectionRenderer.renderHeader(blueprint.headerNavigation);
    const sectionsHtml = blueprint.sections
      .map((section) => SectionRenderer.renderSection(section))
      .join('\n\n');

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
  ${headerHtml}

  <main>
    ${sectionsHtml}
  </main>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
  <script src="./app.js"></script>
</body>
</html>
`;

    // 7. Write Files to landing/
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

    // 8. Write Detailed Build Report
    const buildReportPath = path.join(projectPath, 'reports', 'build-report.md');
    fs.mkdirSync(path.dirname(buildReportPath), { recursive: true });

    const reportContent = `# KDL BUILD REPORT — ${directorResult.projectName}
- Target: HTML5 / CSS3 / GSAP
- Status: SUCCESS
- Generated HTML: ${htmlFilePath}
- Generated CSS: ${cssFilePath}
- Generated JS: ${jsFilePath}

## Page Blueprint Sections (${blueprint.sections.length})
${blueprint.sections.map((s, i) => `${i + 1}. [${s.type}] id="${s.id}" - "${s.headline || ''}"`).join('\n')}

## Asset Pipeline Summary
- Total Scanned Assets: ${manifest.allAssets.length}
- Logo Used: ${manifest.logo ? manifest.logo.filename : 'NONE (Using Brand Typography)'}
- Hero Image Used: ${manifest.heroImage ? manifest.heroImage.filename : 'NONE'}
- Product Images Used: ${manifest.productImages.length}
- Output Asset Folder: ${path.join(landingDir, 'assets')}
`;
    fs.writeFileSync(buildReportPath, reportContent, 'utf-8');

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
      manifest,
      blueprint,
    };
  }
}
