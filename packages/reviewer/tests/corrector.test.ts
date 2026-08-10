import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { AutoCorrector } from '../src/correctors/auto.corrector.js';
import { BuildOutputResult } from '@kdl/builder';
import { AuditIssue } from '../src/types/reviewer.types.js';

export async function runCorrectorTests() {
  console.log('Running auto corrector tests...');

  const tmpFile = path.join(process.cwd(), 'temp', 'test-fixer.html');
  fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
  fs.writeFileSync(tmpFile, '<html><body>Test</body></html>', 'utf-8');

  const issues: AuditIssue[] = [
    {
      id: 'html-no-doctype',
      auditorName: 'HTML Auditor',
      severity: 'warning',
      message: 'No doctype',
      suggestion: 'Add doctype',
      autoFixable: true,
    },
  ];

  const mockBuildResult = { htmlFilePath: tmpFile } as BuildOutputResult;
  const fixCount = AutoCorrector.applyAutoFixes(issues, mockBuildResult);

  assert.strictEqual(fixCount, 1);
  const content = fs.readFileSync(tmpFile, 'utf-8');
  assert.strictEqual(content.includes('<!DOCTYPE html>'), true);

  if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);

  console.log('✔ corrector.test.ts passed');
}
