import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class LandBookProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'LandBook';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `landbook-${sector}-01`,
        url: `https://land-book.com/websites/${sector}-showcase`,
        title: `Land-book Curated ${sector.toUpperCase()} Landing`,
        source: 'LandBook',
        sector,
        tags: [sector, 'landing-page', 'editorial-brutalism'],
        extractedTokens: {
          colors: {
            dominant60: 'hsl(0, 0%, 97%)',
            secondary30: 'hsl(0, 0%, 90%)',
            accent10: 'hsl(14, 100%, 57%)',
            textPrimary: '#111111',
            textSecondary: '#555555',
            contrastRatio: 16.0,
          },
          typography: {
            displayFont: 'Cabinet Grotesk',
            bodyFont: 'Satoshi',
            scaleRatio: 1.25,
            minSizeRem: 1.0,
            maxSizeRem: 4.0,
            lineHeightDisplay: 1.1,
            lineHeightBody: 1.5,
          },
          layout: {
            columns: 12,
            gutterPx: 20,
            marginPx: 32,
            bentoAsymmetryRatio: 0.6,
            verticalRhythmRem: 6.0,
          },
          motion: {
            easingFunction: 'ease-out',
            durationFastMs: 200,
            durationNormalMs: 400,
            durationSlowMs: 800,
            parallaxSpeedRatio: 0.2,
            scrollScrubEnabled: false,
          },
          visualStyle: 'Editorial Minimalist',
          heroLayoutType: 'Split Asymmetric Grid',
          ctaStyle: 'Solid High-Contrast Button',
        },
        scores: {
          visualQuality: 92,
          originality: 90,
          conversion: 95,
          motion: 88,
          storytelling: 92,
          branding: 91,
          ux: 94,
          performance: 96,
          accessibility: 95,
          architecture: 93,
          seo: 92,
          innovation: 89,
          visualImpact: 91,
          cinematicScore: 89,
          dfiiScore: 91.8,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
