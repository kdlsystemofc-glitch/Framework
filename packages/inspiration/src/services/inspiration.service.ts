import { IInspirationProvider } from '../providers/provider.interface.js';
import { AwwwardsProvider } from '../providers/awwwards.provider.js';
import { LandBookProvider } from '../providers/landbook.provider.js';
import { GodlyProvider } from '../providers/godly.provider.js';
import { LapaNinjaProvider } from '../providers/lapaninja.provider.js';
import { OnePageLoveProvider } from '../providers/onepagelove.provider.js';
import { BehanceProvider } from '../providers/behance.provider.js';
import { DribbbleProvider } from '../providers/dribbble.provider.js';
import { PinterestProvider } from '../providers/pinterest.provider.js';
import { CSSDesignAwardsProvider } from '../providers/cssdesignawards.provider.js';
import { SiteInspireProvider } from '../providers/siteinspire.provider.js';
import { LocalProvider } from '../providers/local.provider.js';
import { InspirationReference, IndustrySector, SegmentBestPractices } from '../types/inspiration.types.js';
import { ExtractedDesignTokens } from '../types/tokens.types.js';
import { InspirationCache } from '../cache/inspiration.cache.js';
import { InspirationRanker } from '../ranking/inspiration.ranker.js';
import { SegmentKnowledge } from '../knowledge/segment.knowledge.js';
import { DesignQualityAnalyzer } from '../analyzers/design-quality.analyzer.js';
import { ColorExtractor } from '../extractors/color.extractor.js';
import { TypographyExtractor } from '../extractors/typography.extractor.js';
import { LayoutExtractor } from '../extractors/layout.extractor.js';
import { MotionExtractor } from '../extractors/motion.extractor.js';

export interface InspirationDiscoveryResult {
  sector: IndustrySector;
  totalFetched: number;
  topReferences: InspirationReference[];
  synthesizedTokens: ExtractedDesignTokens;
  bestPractices: SegmentBestPractices;
}

export class InspirationEngine {
  private providers: IInspirationProvider[];
  private cache: InspirationCache;

  constructor(customProviders?: IInspirationProvider[], customCache?: InspirationCache) {
    this.cache = customCache || new InspirationCache();
    this.providers = customProviders || [
      new AwwwardsProvider(),
      new LandBookProvider(),
      new GodlyProvider(),
      new LapaNinjaProvider(),
      new OnePageLoveProvider(),
      new BehanceProvider(),
      new DribbbleProvider(),
      new PinterestProvider(),
      new CSSDesignAwardsProvider(),
      new SiteInspireProvider(),
      new LocalProvider(),
    ];
  }

  public async discover(sector: IndustrySector): Promise<InspirationDiscoveryResult> {
    const rawReferences: InspirationReference[] = [];

    for (const provider of this.providers) {
      try {
        const refs = await provider.fetchReferences(sector);
        for (const ref of refs) {
          if (!this.cache.has(ref.id)) {
            const audited = DesignQualityAnalyzer.auditReference(ref);
            this.cache.set(audited);
            rawReferences.push(audited);
          } else {
            const cached = this.cache.get(ref.id)!;
            rawReferences.push(cached);
          }
        }
      } catch {
        // Continue if provider fails
      }
    }

    const topReferences = InspirationRanker.rank(rawReferences, 5);

    // Synthesize tokens from top references
    const synthesizedTokens: ExtractedDesignTokens = {
      colors: ColorExtractor.extractPaletteFromReferences(topReferences.map((r) => r.extractedTokens.colors)),
      typography: TypographyExtractor.extractTypographyFromReferences(topReferences.map((r) => r.extractedTokens.typography)),
      layout: LayoutExtractor.extractLayoutFromReferences(topReferences.map((r) => r.extractedTokens.layout)),
      motion: MotionExtractor.extractMotionFromReferences(topReferences.map((r) => r.extractedTokens.motion)),
      visualStyle: topReferences[0]?.extractedTokens.visualStyle || 'Cinematic Luxury',
      heroLayoutType: topReferences[0]?.extractedTokens.heroLayoutType || 'Bento Grid Stage',
      ctaStyle: topReferences[0]?.extractedTokens.ctaStyle || 'Magnetic Floating Pill CTA',
    };

    const bestPractices = SegmentKnowledge.getBestPractices(sector);

    return {
      sector,
      totalFetched: rawReferences.length,
      topReferences,
      synthesizedTokens,
      bestPractices,
    };
  }
}
