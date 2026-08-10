import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { HTMLAuditor } from '../src/audit/html.auditor.js';
import { AccessibilityAuditor } from '../src/audit/accessibility.auditor.js';
import { BuildOutputResult } from '@kdl/builder';

export async function runAuditorsTests() {
  console.log('Running modular auditors tests...');

  const tmpFile = path.join(process.cwd(), 'temp', 'test-auditor.html');
  fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
  fs.writeFileSync(tmpFile, '<html><body><img src="test.jpg"></body></html>', 'utf-8');

  const mockBuildResult = {
    projectName: 'Test Build',
    htmlFilePath: tmpFile,
  } as BuildOutputResult;

  const htmlAuditor = new HTMLAuditor();
  const resHTML = await htmlAuditor.audit(mockBuildResult, process.cwd());
  assert.strictEqual(resHTML.issues.length > 0, true);

  const a11yAuditor = new AccessibilityAuditor();
  const resA11y = await a11yAuditor.audit(mockBuildResult, process.cwd());
  assert.strictEqual(resA11y.issues.length > 0, true);

  if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);

  console.log('✔ auditors.test.ts passed');
}
