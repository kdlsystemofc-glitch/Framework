import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

export async function runScoreAntiFraudTests() {
  console.log('Running Score Anti-Fraud tests...');

  const reviewerSrcDir = path.resolve(process.cwd(), 'src');

  function scanDir(dir: string): string[] {
    const files: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...scanDir(fullPath));
      } else if (entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const tsFiles = scanDir(reviewerSrcDir);

  const forbiddenPatterns = [
    /performance:\s*98/,
    /accessibility:\s*98/,
    /seo:\s*100/,
    /getScore\('[^']+'\)\s*\|\|\s*95/,
    /score:\s*98\b/,
  ];

  for (const filePath of tsFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const pattern of forbiddenPatterns) {
      assert.strictEqual(
        pattern.test(content),
        false,
        `Score Anti-Fraud Violation in ${path.basename(filePath)}: match for ${pattern}`
      );
    }
  }

  console.log('✔ score-anti-fraud.test.ts passed (Zero Synthetic Default Scores in Production)');
}
