#!/usr/bin/env node
import { runCLI } from '../dist/index.js';

runCLI(process.argv).catch((err) => {
  console.error('[KDL CLI FATAL ERROR]', err.message || err);
  process.exit(1);
});
