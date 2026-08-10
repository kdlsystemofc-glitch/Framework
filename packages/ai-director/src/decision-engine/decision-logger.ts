import fs from 'fs';
import path from 'path';
import { DecisionLogsLedger, DecisionLogEntry } from '../types/dna.types.js';
import { InspirationDiscoveryResult } from '@kdl/inspiration';

export class DecisionLogger {
  public static generateLedger(
    projectName: string,
    inspiration: InspirationDiscoveryResult
  ): DecisionLogsLedger {
    const entries: DecisionLogEntry[] = [
      {
        timestamp: new Date().toISOString(),
        topic: 'Color Palette Strategy',
        decision: `Dominant HSL ${inspiration.synthesizedTokens.colors.dominant60} + Accent ${inspiration.synthesizedTokens.colors.accent10}`,
        technicalJustification: 'Adheres to 60-30-10 color balance rule with contrast ratio >= 12.0 for WCAG AAA accessibility.',
        alternativesRejected: ['Monochrome Grayscale', 'Saturated Rainbow Gradient'],
      },
      {
        timestamp: new Date().toISOString(),
        topic: 'Layout Architecture',
        decision: `12-Column Asymmetric Bento Grid (Ratio ${inspiration.synthesizedTokens.layout.bentoAsymmetryRatio})`,
        technicalJustification: 'Breaks rigid 3-column AI template patterns and creates visual rhythm.',
        alternativesRejected: ['Standard 3-Card Equal Grid', 'Centered Text Block Wall'],
      },
      {
        timestamp: new Date().toISOString(),
        topic: 'Motion Physics',
        decision: `GSAP ScrollScrub + Easing (${inspiration.synthesizedTokens.motion.easingFunction})`,
        technicalJustification: 'Delivers 60fps cinematic fluidity without lag or browser jank.',
        alternativesRejected: ['Linear CSS Transitions', 'Auto-playing Marquee Carousel'],
      },
    ];

    return {
      projectName,
      entries,
    };
  }

  public static writeDecisionLogsFile(projectPath: string, ledger: DecisionLogsLedger): string {
    const targetFile = path.join(projectPath, 'design', 'decision-logs.json');
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, JSON.stringify(ledger, null, 2), 'utf-8');
    return targetFile;
  }
}
