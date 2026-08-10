import fs from 'fs';
import path from 'path';
import { CreativeDNA } from '../types/dna.types.js';
import { InspirationDiscoveryResult } from '@kdl/inspiration';

export class CreativeDNAGenerator {
  public static generateDNA(
    projectName: string,
    inspiration: InspirationDiscoveryResult
  ): CreativeDNA {
    const dna: CreativeDNA = {
      projectName,
      sector: inspiration.sector,
      concept: `Uncompromising ${inspiration.synthesizedTokens.visualStyle} Experience`,
      visualStyle: inspiration.synthesizedTokens.visualStyle,
      dominantEmotion: 'Exclusivity & High-Trust Mastery',
      archetypes: ['The Ruler', 'The Creator', 'The Magician'],
      keywords: ['cinematic', 'bento-grid', 'asymmetric', 'high-performance', 'frictionless'],
      referencesUsed: inspiration.topReferences.map((r) => r.title),
      principlesAdopted: [
        '60-30-10 HSL Color Balance',
        'Modular Fluid Typography Scale',
        'Anti-AI Generic Cliché Enforcement',
        'Bento Grid Asymmetrical Layout',
        'GSAP Inertial Scroll Physics',
      ],
      decisionsTaken: [
        {
          category: 'Visual Style',
          decision: inspiration.synthesizedTokens.visualStyle,
          justification: 'Selected based on top DFII award benchmarks to maximize perception of exclusivity.',
        },
        {
          category: 'Typography Pairing',
          decision: `${inspiration.synthesizedTokens.typography.displayFont} + ${inspiration.synthesizedTokens.typography.bodyFont}`,
          justification: 'Provides ultra-sharp editorial contrast and high mobile readability.',
        },
        {
          category: 'Hero Stage',
          decision: inspiration.synthesizedTokens.heroLayoutType,
          justification: 'Captures user attention in first 2 seconds without boilerplate AI cards.',
        },
      ],
      createdAt: new Date().toISOString(),
    };

    return dna;
  }

  public static writeDNAFile(projectPath: string, dna: CreativeDNA): string {
    const targetFile = path.join(projectPath, 'design', 'creative-dna.json');
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, JSON.stringify(dna, null, 2), 'utf-8');
    return targetFile;
  }
}
