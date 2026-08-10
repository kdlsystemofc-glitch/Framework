import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class DribbbleProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'Dribbble';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `dribbble-${sector}-01`,
        url: `https://dribbble.com/shots/popular/web-design?q=${sector}`,
        title: `Dribbble Trending Shot — ${sector.toUpperCase()}`,
        source: 'Dribbble',
        sector,
        tags: [sector, 'micro-interactions', 'ui-kit'],
        extractedTokens: {
          colors: {
            dominant60: '#ffffff',
            secondary30: '#f8fafc',
            accent10: '#6366f1',
            textPrimary: '#0f172a',
            textSecondary: '#64748b',
            contrastRatio: 14.8,
          },
          typography: {
            displayFont: 'Uncut Sans',
            bodyFont: 'Inter',
            scaleRatio: 1.25,
            minSizeRem: 1.0,
            maxSizeRem: 3.8,
            lineHeightDisplay: 1.1,
            lineHeightBody: 1.55,
          },
          layout: {
            columns: 12,
            gutterPx: 20,
            marginPx: 32,
            bentoAsymmetryRatio: 0.6,
            verticalRhythmRem: 5.5,
          },
          motion: {
            easingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            durationFastMs: 200,
            durationNormalMs: 400,
            durationSlowMs: 800,
            parallaxSpeedRatio: 0.2,
            scrollScrubEnabled: false,
          },
          visualStyle: 'Modern Vibrant UI Cards',
          heroLayoutType: 'Interactive Bento Hero Grid',
          ctaStyle: 'Spring Bounce Button CTA',
        },
        scores: {
          visualQuality: 93,
          originality: 91,
          conversion: 91,
          motion: 94,
          storytelling: 88,
          branding: 92,
          ux: 93,
          performance: 94,
          accessibility: 91,
          architecture: 92,
          seo: 90,
          innovation: 91,
          visualImpact: 93,
          cinematicScore: 90,
          dfiiScore: 91.8,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
