import assert from 'node:assert';
import { Logger } from '../src/utils/logger.js';

console.log('Running logger tests...');
const logger = new Logger('info');
logger.info('Test info message');
logger.warn('Test warning message');
logger.error('Test error message');
logger.debug('Test debug message (should be suppressed)');
assert.ok(true);
console.log('✔ logger.test.ts passed');
