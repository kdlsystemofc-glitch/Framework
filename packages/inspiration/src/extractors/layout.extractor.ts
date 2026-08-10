import { LayoutGridTokens } from '../types/tokens.types.js';

export class LayoutExtractor {
  public static extractLayoutFromReferences(tokens: LayoutGridTokens[]): LayoutGridTokens {
    if (!tokens || tokens.length === 0) {
      return {
        columns: 12,
        gutterPx: 24,
        marginPx: 48,
        bentoAsymmetryRatio: 0.65,
        verticalRhythmRem: 8.0,
      };
    }
    // Return layout with maximum bento asymmetry
    return [...tokens].sort((a, b) => b.bentoAsymmetryRatio - a.bentoAsymmetryRatio)[0];
  }
}
