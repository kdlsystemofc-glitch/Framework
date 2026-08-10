import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class LapaNinjaProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'LapaNinja';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `lapaninja-${sector}-01`,
        url: `https://www.lapa.ninja/category/${sector}`,
        title: `Lapa Ninja ${sector.toUpperCase()} Feature`,
        source: 'LapaNinja',
        sector,
        tags: [sector, 'high-converting', 'saas-minimal'],
        extractedTokens: {
          colors: {
            dominant60: '#ffffff',
            secondary30: '#f4f5f8',
            accent10: '#0052cc',
            textPrimary: '#091e42',
            textSecondary: '#5e6c84',
            contrastRatio: 15.2,
          },
          typography: {
            displayFont: 'General Sans',
            bodyFont: 'Switzer',
            scaleRatio: 1.25,
            minSizeRem: 1.0,
            maxSizeRem: 3.8,
            lineHeightDisplay: 1.15,
            lineHeightBody: 1.55,
          },
          layout: {
            columns: 12,
            gutterPx: 24,
            marginPx: 36,
            bentoAsymmetryRatio: 0.5,
            verticalRhythmRem: 5.5,
          },
          motion: {
            easingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            durationFastMs: 150,
            durationNormalMs: 350,
            durationSlowMs: 600,
            parallaxSpeedRatio: 0.15,
            scrollScrubEnabled: false,
          },
          visualStyle: 'Modern SaaS Minimal',
          heroLayoutType: 'Centered Badge & Product Mockup',
          ctaStyle: 'Primary Solid Pill Button',
        },
        scores: {
          visualQuality: 90,
          originality: 88,
          conversion: 96,
          motion: 85,
          storytelling: 90,
          branding: 90,
          ux: 95,
          performance: 97,
          accessibility: 96,
          architecture: 94,
          seo: 95,
          innovation: 87,
          visualImpact: 89,
          cinematicScore: 86,
          dfiiScore: 91.2,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
