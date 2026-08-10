import { IndustrySector } from '@kdl/inspiration';

export interface CreativeDNA {
  projectName: string;
  sector: IndustrySector;
  concept: string;
  visualStyle: string;
  dominantEmotion: string;
  archetypes: string[];
  keywords: string[];
  referencesUsed: string[];
  principlesAdopted: string[];
  decisionsTaken: Array<{
    category: string;
    decision: string;
    justification: string;
  }>;
  createdAt: string;
}

export interface DecisionLogEntry {
  timestamp: string;
  topic: string;
  decision: string;
  technicalJustification: string;
  alternativesRejected: string[];
}

export interface DecisionLogsLedger {
  projectName: string;
  entries: DecisionLogEntry[];
}
