import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class AwwwardsProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'Awwwards';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `awwward-${sector}-01`,
        url: `https://www.awwwards.com/sites/${sector}-site-of-the-day`,
        title: `Awwwards SOTD ${sector.toUpperCase()} Masterpiece`,
        source: 'Awwwards',
        sector,
        tags: [sector, 'site-of-the-day', 'cinematic'],
        extractedTokens: {
          colors: {
            dominant60: 'hsl(220, 15%, 8%)',
            secondary30: 'hsl(220, 10%, 15%)',
            accent10: 'hsl(45, 90%, 55%)',
            textPrimary: '#ffffff',
            textSecondary: '#a0a5b5',
            contrastRatio: 12.5,
          },
          typography: {
            displayFont: 'Syne',
            bodyFont: 'Plus Jakarta Sans',
            scaleRatio: 1.33,
            minSizeRem: 1.0,
            maxSizeRem: 4.5,
            lineHeightDisplay: 1.05,
            lineHeightBody: 1.6,
          },
          layout: {
            columns: 12,
            gutterPx: 24,
            marginPx: 48,
            bentoAsymmetryRatio: 0.65,
            verticalRhythmRem: 8.0,
          },
          motion: {
            easingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFastMs: 250,
            durationNormalMs: 600,
            durationSlowMs: 1200,
            parallaxSpeedRatio: 0.35,
            scrollScrubEnabled: true,
          },
          visualStyle: 'Cinematic Luxury Minimal',
          heroLayoutType: 'Fullscreen Typography & Video Background',
          ctaStyle: 'Magnetic Floating Pill CTA',
        },
        scores: {
          visualQuality: 98,
          originality: 95,
          conversion: 90,
          motion: 96,
          storytelling: 94,
          branding: 95,
          ux: 92,
          performance: 91,
          accessibility: 88,
          architecture: 95,
          seo: 90,
          innovation: 96,
          visualImpact: 98,
          cinematicScore: 97,
          dfiiScore: 94.6,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
