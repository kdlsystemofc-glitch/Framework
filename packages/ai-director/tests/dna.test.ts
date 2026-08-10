import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { CreativeDNAGenerator } from '../src/creative-engine/creative-dna.generator.js';
import { InspirationDiscoveryResult } from '@kdl/inspiration';

export async function runDNATests() {
  console.log('Running DNA generator tests...');

  const mockInspiration = {
    sector: 'restaurants',
    topReferences: [{ title: 'Ref 1' }],
    synthesizedTokens: {
      visualStyle: 'Cinematic Gold Standard',
      typography: { displayFont: 'Syne', bodyFont: 'Plus Jakarta Sans' },
      heroLayoutType: 'Bento Grid',
    },
  } as unknown as InspirationDiscoveryResult;

  const dna = CreativeDNAGenerator.generateDNA('Test Gourmet', mockInspiration);
  assert.strictEqual(dna.projectName, 'Test Gourmet');
  assert.strictEqual(dna.visualStyle, 'Cinematic Gold Standard');

  const tmpPath = path.join(process.cwd(), 'temp', 'dna-test');
  const writtenFile = CreativeDNAGenerator.writeDNAFile(tmpPath, dna);
  assert.strictEqual(fs.existsSync(writtenFile), true);

  if (fs.existsSync(writtenFile)) {
    fs.unlinkSync(writtenFile);
  }

  console.log('✔ dna.test.ts passed');
}
