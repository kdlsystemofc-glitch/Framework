import { InspirationReference } from '../types/inspiration.types.js';

export class InspirationRanker {
  public static rank(references: InspirationReference[], topN = 5): InspirationReference[] {
    const sorted = [...references].sort((a, b) => b.scores.dfiiScore - a.scores.dfiiScore);
    return sorted.slice(0, topN);
  }
}
