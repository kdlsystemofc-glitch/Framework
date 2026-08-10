import fs from 'fs';
import path from 'path';
import { AIDirectorResult } from '../types/director.types.js';

export class AutoLearningMemory {
  private memoryFilePath: string;

  constructor(customPath?: string) {
    this.memoryFilePath = customPath || path.join(process.cwd(), '.kdl-ai-director-memory.json');
  }

  public recordProjectExecution(result: AIDirectorResult): void {
    try {
      let existing: any[] = [];
      if (fs.existsSync(this.memoryFilePath)) {
        const raw = fs.readFileSync(this.memoryFilePath, 'utf-8');
        existing = JSON.parse(raw);
      }

      existing.push({
        projectName: result.projectName,
        sector: result.sector,
        dfiiScore: result.originality.dfiiScore,
        visualStyle: result.designTokens.visualStyle,
        displayFont: result.designTokens.typography.displayFont,
        recordedAt: new Date().toISOString(),
      });

      fs.writeFileSync(this.memoryFilePath, JSON.stringify(existing, null, 2), 'utf-8');
    } catch {
      // Ignore memory record errors
    }
  }
}
