import { TypographyTokens } from '../types/tokens.types.js';

export class TypographyExtractor {
  public static extractTypographyFromReferences(tokens: TypographyTokens[]): TypographyTokens {
    if (!tokens || tokens.length === 0) {
      return {
        displayFont: 'Syne',
        bodyFont: 'Plus Jakarta Sans',
        scaleRatio: 1.33,
        minSizeRem: 1.0,
        maxSizeRem: 4.5,
        lineHeightDisplay: 1.05,
        lineHeightBody: 1.6,
      };
    }

    // Filter out forbidden fonts like Inter or Roboto if non-standard display fonts exist
    const preferred = tokens.find((t) => t.displayFont !== 'Inter' && t.displayFont !== 'Roboto');
    return preferred || tokens[0];
  }
}
