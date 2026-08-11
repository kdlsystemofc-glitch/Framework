import { AIDirectorResult } from '@kdl/ai-director';
import { SEOPackage } from '../types/builder.types.js';

export class SEOPipeline {
  public static generateSEOPackage(directorResult: AIDirectorResult): SEOPackage {
    const title = `${directorResult.projectName}`;
    const metaDescription = `${directorResult.dna.concept || directorResult.projectName}. ${directorResult.dna.dominantEmotion || ''}`.trim();
    const openGraphTags = `
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
`;
    const jsonLdSchema = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: directorResult.projectName,
        description: metaDescription,
      },
      null,
      2
    );

    const slug = directorResult.projectName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${slug}.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://${slug}.com/sitemap.xml
`;

    return {
      title,
      metaDescription,
      openGraphTags,
      jsonLdSchema,
      sitemapXml,
      robotsTxt,
    };
  }
}
