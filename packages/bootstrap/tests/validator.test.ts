import assert from 'node:assert';
import { ProjectValidator } from '../src/validators/project.validator.js';
import { FileMetadata } from '../src/types/bootstrap.types.js';

console.log('Running validator tests...');
const mockFiles: FileMetadata[] = [
  {
    relativePath: 'briefing/briefing.pdf',
    absolutePath: '/mock/briefing/briefing.pdf',
    filename: 'briefing.pdf',
    extension: 'pdf',
    sizeBytes: 2048,
    sha256: 'mock123',
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    category: 'Briefing',
    mimeType: 'application/pdf',
    isZeroByte: false,
  },
  {
    relativePath: 'assets/logo.svg',
    absolutePath: '/mock/assets/logo.svg',
    filename: 'logo.svg',
    extension: 'svg',
    sizeBytes: 4096,
    sha256: 'mock456',
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    category: 'Logo',
    mimeType: 'image/svg+xml',
    isZeroByte: false,
  },
];

const res = ProjectValidator.validate(mockFiles);
assert.strictEqual(res.passed, true);
assert.strictEqual(res.criticalCount, 0);

console.log('✔ validator.test.ts passed');
