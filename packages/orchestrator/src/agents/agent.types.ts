import { MethodologyPhaseId } from '../methodology/methodology.types.js';
import { SharedExecutionContext } from '../types/orchestrator.types.js';

export interface AgentContext extends SharedExecutionContext {
  phaseId: MethodologyPhaseId;
  promptContent?: string;
}

export interface AgentExecutionResult {
  phaseId: MethodologyPhaseId;
  status: 'COMPLETED' | 'FAILED' | 'WAITING_FOR_APPROVAL';
  generatedArtifacts: string[];
  summary: string;
  payload?: any;
}

export interface IAgentExecutor {
  readonly phaseId: MethodologyPhaseId;
  readonly agentName: string;
  execute(ctx: AgentContext): Promise<AgentExecutionResult>;
}
