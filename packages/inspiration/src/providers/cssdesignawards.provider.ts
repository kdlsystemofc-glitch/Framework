import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class CSSDesignAwardsProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'CSSDesignAwards';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `cssda-${sector}-01`,
        url: `https://www.cssdesignawards.com/wods/${sector}`,
        title: `CSS Design Awards WOD — ${sector.toUpperCase()}`,
        source: 'CSSDesignAwards',
        sector,
        tags: [sector, 'wod', 'css-craftsmanship'],
        extractedTokens: {
          colors: {
            dominant60: 'hsl(215, 28%, 10%)',
            secondary30: 'hsl(215, 20%, 18%)',
            accent10: 'hsl(175, 80%, 50%)',
            textPrimary: '#ffffff',
            textSecondary: '#94a3b8',
            contrastRatio: 14.1,
          },
          typography: {
            displayFont: 'Space Grotesk',
            bodyFont: 'Inter',
            scaleRatio: 1.33,
            minSizeRem: 1.0,
            maxSizeRem: 4.5,
            lineHeightDisplay: 1.05,
            lineHeightBody: 1.55,
          },
          layout: {
            columns: 12,
            gutterPx: 24,
            marginPx: 48,
            bentoAsymmetryRatio: 0.68,
            verticalRhythmRem: 7.5,
          },
          motion: {
            easingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
            durationFastMs: 250,
            durationNormalMs: 600,
            durationSlowMs: 1200,
            parallaxSpeedRatio: 0.35,
            scrollScrubEnabled: true,
          },
          visualStyle: 'High-Performance CSS Craftsmanship',
          heroLayoutType: 'Interactive Canvas Hero',
          ctaStyle: 'Cyberpunk Glowing Button',
        },
        scores: {
          visualQuality: 97,
          originality: 96,
          conversion: 91,
          motion: 97,
          storytelling: 95,
          branding: 95,
          ux: 93,
          performance: 96,
          accessibility: 92,
          architecture: 96,
          seo: 92,
          innovation: 97,
          visualImpact: 97,
          cinematicScore: 96,
          dfiiScore: 94.8,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
