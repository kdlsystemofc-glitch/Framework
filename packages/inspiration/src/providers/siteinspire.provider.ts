import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class SiteInspireProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'SiteInspire';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `siteinspire-${sector}-01`,
        url: `https://www.siteinspire.com/websites?subject=${sector}`,
        title: `SiteInspire Selected — ${sector.toUpperCase()}`,
        source: 'SiteInspire',
        sector,
        tags: [sector, 'curated-grid', 'typography-driven'],
        extractedTokens: {
          colors: {
            dominant60: '#f7f7f7',
            secondary30: '#e5e5e5',
            accent10: '#111111',
            textPrimary: '#111111',
            textSecondary: '#666666',
            contrastRatio: 17.5,
          },
          typography: {
            displayFont: 'PP Neue Montreal',
            bodyFont: 'Switzer',
            scaleRatio: 1.25,
            minSizeRem: 1.0,
            maxSizeRem: 4.2,
            lineHeightDisplay: 1.08,
            lineHeightBody: 1.5,
          },
          layout: {
            columns: 12,
            gutterPx: 24,
            marginPx: 40,
            bentoAsymmetryRatio: 0.6,
            verticalRhythmRem: 6.5,
          },
          motion: {
            easingFunction: 'ease-out',
            durationFastMs: 200,
            durationNormalMs: 400,
            durationSlowMs: 800,
            parallaxSpeedRatio: 0.2,
            scrollScrubEnabled: false,
          },
          visualStyle: 'Pure Typographic Elegance',
          heroLayoutType: 'Large Title & Clean Negative Space',
          ctaStyle: 'Monochrome Solid Button',
        },
        scores: {
          visualQuality: 95,
          originality: 93,
          conversion: 92,
          motion: 87,
          storytelling: 94,
          branding: 95,
          ux: 94,
          performance: 98,
          accessibility: 97,
          architecture: 96,
          seo: 94,
          innovation: 91,
          visualImpact: 93,
          cinematicScore: 90,
          dfiiScore: 93.2,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
