import assert from 'node:assert';
import { ColorExtractor } from '../src/extractors/color.extractor.js';
import { TypographyExtractor } from '../src/extractors/typography.extractor.js';

export async function runExtractorsTests() {
  console.log('Running extractors tests...');

  const palette = ColorExtractor.extractPaletteFromReferences([
    {
      dominant60: '#000',
      secondary30: '#111',
      accent10: '#f00',
      textPrimary: '#fff',
      textSecondary: '#ccc',
      contrastRatio: 10,
    },
    {
      dominant60: '#0f172a',
      secondary30: '#1e293b',
      accent10: '#38bdf8',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      contrastRatio: 15,
    },
  ]);
  assert.strictEqual(palette.contrastRatio, 15);

  const typography = TypographyExtractor.extractTypographyFromReferences([
    {
      displayFont: 'Syne',
      bodyFont: 'Plus Jakarta Sans',
      scaleRatio: 1.33,
      minSizeRem: 1.0,
      maxSizeRem: 4.5,
      lineHeightDisplay: 1.05,
      lineHeightBody: 1.6,
    },
  ]);
  assert.strictEqual(typography.displayFont, 'Syne');

  console.log('✔ extractors.test.ts passed');
}
