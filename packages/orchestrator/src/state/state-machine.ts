import { PipelineState } from '../types/orchestrator.types.js';

export class StateMachine {
  private currentState: PipelineState = 'CREATED';

  private static allowedTransitions: Record<PipelineState, PipelineState[]> = {
    CREATED: ['INITIALIZING', 'CANCELLED'],
    INITIALIZING: ['RUNNING', 'FAILED', 'CANCELLED'],
    RUNNING: ['WAITING', 'WAITING_FOR_APPROVAL', 'RETRYING', 'PAUSED', 'FAILED', 'COMPLETED', 'CANCELLED', 'NEEDS_REVIEW'],
    WAITING: ['RUNNING', 'PAUSED', 'FAILED', 'CANCELLED'],
    WAITING_FOR_APPROVAL: ['RUNNING', 'PAUSED', 'FAILED', 'CANCELLED', 'COMPLETED'],
    RETRYING: ['RUNNING', 'FAILED', 'CANCELLED'],
    PAUSED: ['RUNNING', 'CANCELLED'],
    FAILED: ['INITIALIZING', 'RUNNING', 'CANCELLED'],
    COMPLETED: [],
    CANCELLED: [],
    NEEDS_REVIEW: ['RUNNING', 'COMPLETED', 'FAILED'],
  };

  constructor(initialState?: PipelineState) {
    if (initialState) {
      this.currentState = initialState;
    }
  }

  public getState(): PipelineState {
    return this.currentState;
  }

  public transitionTo(newState: PipelineState): void {
    const valid = StateMachine.allowedTransitions[this.currentState].includes(newState);
    if (!valid) {
      throw new Error(`Invalid state transition from ${this.currentState} to ${newState}`);
    }
    this.currentState = newState;
  }

  public canTransitionTo(newState: PipelineState): boolean {
    return StateMachine.allowedTransitions[this.currentState].includes(newState);
  }
}
