import { AIDirectorResult } from '@kdl/ai-director';
import { SEOPackage } from '../types/builder.types.js';

export class SEOPipeline {
  public static generateSEOPackage(directorResult: AIDirectorResult): SEOPackage {
    const title = `${directorResult.projectName} — Experience`;
    const metaDescription = `${directorResult.dna.concept}. High-end landing page created by KDL Framework.`;
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

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${directorResult.projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://${directorResult.projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/sitemap.xml
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
