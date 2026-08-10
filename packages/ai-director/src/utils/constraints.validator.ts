import { ExtractedDesignTokens } from '@kdl/inspiration';

export class CreativeConstraintsValidator {
  public static validate(tokens: ExtractedDesignTokens): { valid: boolean; violations: string[] } {
    const violations: string[] = [];

    // Rule 1: No generic fonts like Arial / Times
    if (['Arial', 'Times New Roman', 'Comic Sans'].includes(tokens.typography.displayFont)) {
      violations.push('Generic typography detected (Arial/Times/Comic Sans forbidden)');
    }

    // Rule 2: Anti-Cliché Purple Gradient Background
    if (tokens.colors.dominant60.toLowerCase().includes('purple') && tokens.colors.accent10.toLowerCase().includes('pink')) {
      violations.push('AI Cliché Purple/Pink Gradient forbidden');
    }

    // Rule 3: Must have contrast >= 4.5
    if (tokens.colors.contrastRatio < 4.5) {
      violations.push('Low accessibility contrast ratio (< 4.5)');
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
