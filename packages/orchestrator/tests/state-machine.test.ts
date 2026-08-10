import assert from 'node:assert';
import { StateMachine } from '../src/state/state-machine.js';

export async function runStateMachineTests() {
  console.log('Running state machine tests...');

  const sm = new StateMachine();
  assert.strictEqual(sm.getState(), 'CREATED');

  sm.transitionTo('INITIALIZING');
  assert.strictEqual(sm.getState(), 'INITIALIZING');

  sm.transitionTo('RUNNING');
  assert.strictEqual(sm.getState(), 'RUNNING');

  sm.transitionTo('COMPLETED');
  assert.strictEqual(sm.getState(), 'COMPLETED');

  assert.throws(() => sm.transitionTo('RUNNING'));

  console.log('✔ state-machine.test.ts passed');
}
