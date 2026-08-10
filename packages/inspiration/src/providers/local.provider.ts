import { IInspirationProvider } from './provider.interface.js';
import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export class LocalProvider implements IInspirationProvider {
  public readonly name: ProviderSource = 'Local';

  public async fetchReferences(sector: IndustrySector): Promise<InspirationReference[]> {
    return [
      {
        id: `local-${sector}-01`,
        url: `file:///c:/Framework/references/${sector}-local-reference`,
        title: `KDL Local Reference — ${sector.toUpperCase()}`,
        source: 'Local',
        sector,
        tags: [sector, 'kdl-manifesto-approved', 'local-reference'],
        extractedTokens: {
          colors: {
            dominant60: 'hsl(220, 20%, 8%)',
            secondary30: 'hsl(220, 15%, 16%)',
            accent10: 'hsl(38, 92%, 50%)',
            textPrimary: '#ffffff',
            textSecondary: '#94a3b8',
            contrastRatio: 13.8,
          },
          typography: {
            displayFont: 'Syne',
            bodyFont: 'Plus Jakarta Sans',
            scaleRatio: 1.33,
            minSizeRem: 1.0,
            maxSizeRem: 4.8,
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
          visualStyle: 'Cinematic KDL Gold Standard',
          heroLayoutType: 'Bento Grid Hero Stage & GSAP Scroll Scrub',
          ctaStyle: 'Magnetic Floating CTA',
        },
        scores: {
          visualQuality: 99,
          originality: 98,
          conversion: 96,
          motion: 98,
          storytelling: 98,
          branding: 98,
          ux: 96,
          performance: 97,
          accessibility: 95,
          architecture: 98,
          seo: 96,
          innovation: 98,
          visualImpact: 99,
          cinematicScore: 99,
          dfiiScore: 97.4,
        },
        analyzedAt: new Date().toISOString(),
      },
    ];
  }
}
