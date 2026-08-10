import { ColorPalette } from '../types/tokens.types.js';

export class ColorExtractor {
  public static extractPaletteFromReferences(palettes: ColorPalette[]): ColorPalette {
    if (!palettes || palettes.length === 0) {
      return {
        dominant60: 'hsl(220, 15%, 8%)',
        secondary30: 'hsl(220, 10%, 15%)',
        accent10: 'hsl(45, 90%, 55%)',
        textPrimary: '#ffffff',
        textSecondary: '#a0a5b5',
        contrastRatio: 12.5,
      };
    }

    // Pick top contrast palette
    const sorted = [...palettes].sort((a, b) => b.contrastRatio - a.contrastRatio);
    return sorted[0];
  }
}
