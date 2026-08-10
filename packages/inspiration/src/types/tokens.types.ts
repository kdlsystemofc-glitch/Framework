export interface ColorPalette {
  dominant60: string;  // Background / Base (60%)
  secondary30: string; // Surface / Structure (30%)
  accent10: string;    // Brand CTA / Focus (10%)
  textPrimary: string;
  textSecondary: string;
  contrastRatio: number;
}

export interface TypographyTokens {
  displayFont: string;  // High-expressiveness display font
  bodyFont: string;     // High-readability body font
  scaleRatio: number;   // Modular scale (e.g. 1.25 or 1.33)
  minSizeRem: number;
  maxSizeRem: number;
  lineHeightDisplay: number;
  lineHeightBody: number;
}

export interface LayoutGridTokens {
  columns: number;
  gutterPx: number;
  marginPx: number;
  bentoAsymmetryRatio: number;
  verticalRhythmRem: number;
}

export interface MotionTokens {
  easingFunction: string;
  durationFastMs: number;
  durationNormalMs: number;
  durationSlowMs: number;
  parallaxSpeedRatio: number;
  scrollScrubEnabled: boolean;
}

export interface ExtractedDesignTokens {
  colors: ColorPalette;
  typography: TypographyTokens;
  layout: LayoutGridTokens;
  motion: MotionTokens;
  visualStyle: string;
  heroLayoutType: string;
  ctaStyle: string;
}
