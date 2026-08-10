import { KDLPhaseId, KDLContextState } from '../types/framework.types.js';

export class StateMachine {
  private state: KDLContextState;

  constructor(projectName: string, niche: string) {
    this.state = {
      projectName,
      niche,
      currentPhase: '00-loader',
      completedPhases: [],
      artifacts: {},
      startedAt: new Date().toISOString(),
    };
  }

  public getState(): KDLContextState {
    return { ...this.state };
  }

  public setCurrentPhase(phase: KDLPhaseId): void {
    this.state.currentPhase = phase;
  }

  public markPhaseCompleted(phase: KDLPhaseId, artifactPath?: string): void {
    if (!this.state.completedPhases.includes(phase)) {
      this.state.completedPhases.push(phase);
    }
    if (artifactPath) {
      this.state.artifacts[phase] = artifactPath;
    }
  }

  public isCompleted(phase: KDLPhaseId): boolean {
    return this.state.completedPhases.includes(phase);
  }
}
