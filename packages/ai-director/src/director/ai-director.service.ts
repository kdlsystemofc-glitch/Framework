import { IndustrySector, InspirationDiscoveryResult } from '@kdl/inspiration';
import { AIDirectorResult } from '../types/director.types.js';
import { MultiStageReasoner } from '../reasoning/multi-stage.reasoner.js';
import { CreativeDNAGenerator } from '../creative-engine/creative-dna.generator.js';
import { DecisionLogger } from '../decision-engine/decision-logger.js';
import { OriginalityEvaluator } from '../review-engine/originality.evaluator.js';
import { AutoLearningMemory } from '../memory/auto-learning.memory.js';

export class AIDirectorService {
  private memory: AutoLearningMemory;

  constructor(customMemory?: AutoLearningMemory) {
    this.memory = customMemory || new AutoLearningMemory();
  }

  public async directProject(
    projectName: string,
    projectPath: string,
    sector: IndustrySector,
    inspiration: InspirationDiscoveryResult
  ): Promise<AIDirectorResult> {
    // 1. Run 8-step reasoning workflow
    const reasoningStages = await MultiStageReasoner.executeReasoning(projectName, sector, inspiration);

    // 2. Generate Creative DNA
    const dna = CreativeDNAGenerator.generateDNA(projectName, inspiration);
    const dnaFilePath = CreativeDNAGenerator.writeDNAFile(projectPath, dna);

    // 3. Log Technical Decisions
    const decisionLogs = DecisionLogger.generateLedger(projectName, inspiration);
    const decisionLogsFilePath = DecisionLogger.writeDecisionLogsFile(projectPath, decisionLogs);

    // 4. Evaluate Originality & DFII Score
    const originality = OriginalityEvaluator.evaluate(inspiration.synthesizedTokens);

    const result: AIDirectorResult = {
      projectName,
      sector,
      reasoningStages,
      dna,
      decisionLogs,
      designTokens: inspiration.synthesizedTokens,
      originality,
      dnaFilePath,
      decisionLogsFilePath,
    };

    // 5. Feed continuous auto-learning memory
    this.memory.recordProjectExecution(result);

    return result;
  }
}
