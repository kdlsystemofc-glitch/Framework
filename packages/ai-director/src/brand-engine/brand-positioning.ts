import { IndustrySector } from '@kdl/inspiration';

export class BrandPositioningDirector {
  public static determineArchetypes(sector: IndustrySector): string[] {
    const map: Record<IndustrySector, string[]> = {
      restaurants: ['The Creator', 'The Caregiver', 'The Lover'],
      fashion: ['The Lover', 'The Creator', 'The Rebel'],
      dentists: ['The Caregiver', 'The Sage', 'The Innocent'],
      lawyers: ['The Sovereign', 'The Sage', 'The Hero'],
      'real-estate': ['The Sovereign', 'The Creator', 'The Ruler'],
      beauty: ['The Lover', 'The Magician', 'The Innocent'],
      gym: ['The Hero', 'The Rebel', 'The Explorer'],
      technology: ['The Magician', 'The Sage', 'The Creator'],
      industry: ['The Ruler', 'The Hero', 'The Everyman'],
      education: ['The Sage', 'The Mentor', 'The Explorer'],
      general: ['The Creator', 'The Sovereign', 'The Magician'],
    };
    return map[sector] || map.general;
  }
}
