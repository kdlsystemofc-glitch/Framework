import assert from 'node:assert';
import { EventBus, PipelineEvent } from '../src/events/event-bus.js';

export async function runEventsTests() {
  console.log('Running event bus tests...');

  const bus = EventBus.getInstance();
  const received: PipelineEvent[] = [];

  const unsubscribe = bus.subscribe('pipeline.started', (ev) => {
    received.push(ev);
  });

  bus.emit({
    type: 'pipeline.started',
    executionId: 'exec-999',
    timestamp: new Date().toISOString(),
  });

  assert.strictEqual(received.length, 1);
  assert.strictEqual(received[0].executionId, 'exec-999');

  unsubscribe();
  bus.emit({
    type: 'pipeline.started',
    executionId: 'exec-1000',
    timestamp: new Date().toISOString(),
  });

  assert.strictEqual(received.length, 1);

  console.log('✔ events.test.ts passed');
}
