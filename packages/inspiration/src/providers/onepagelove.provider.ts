import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class OnePageLoveProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'OnePageLove';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `onepagelove-${sector}-01`,
        url: `https://onepagelove.com/gallery/${sector}`,
        title: `One Page Love ${sector.toUpperCase()} Winner`,
        source: 'OnePageLove',
        sector,
        tags: [sector, 'one-pager', 'clean-layout'],
        extractedTokens: {
          colors: {
            dominant60: '#0f172a',
            secondary30: '#1e293b',
            accent10: '#38bdf8',
            textPrimary: '#f8fafc',
            textSecondary: '#94a3b8',
            contrastRatio: 14.5,
          },
          typography: {
            displayFont: 'Outfit',
            bodyFont: 'Plus Jakarta Sans',
            scaleRatio: 1.25,
            minSizeRem: 1.0,
            maxSizeRem: 4.0,
            lineHeightDisplay: 1.1,
            lineHeightBody: 1.6,
          },
          layout: {
            columns: 12,
            gutterPx: 24,
            marginPx: 32,
            bentoAsymmetryRatio: 0.55,
            verticalRhythmRem: 6.0,
          },
          motion: {
            easingFunction: 'ease-in-out',
            durationFastMs: 200,
            durationNormalMs: 400,
            durationSlowMs: 800,
            parallaxSpeedRatio: 0.25,
            scrollScrubEnabled: false,
          },
          visualStyle: 'Sleek Dark Mode One-Pager',
          heroLayoutType: 'Typography & Floating Visual Cards',
          ctaStyle: 'Neon Accent Border Button',
        },
        scores: {
          visualQuality: 91,
          originality: 89,
          conversion: 93,
          motion: 90,
          storytelling: 91,
          branding: 91,
          ux: 93,
          performance: 95,
          accessibility: 93,
          architecture: 92,
          seo: 92,
          innovation: 88,
          visualImpact: 90,
          cinematicScore: 89,
          dfiiScore: 91.4,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
