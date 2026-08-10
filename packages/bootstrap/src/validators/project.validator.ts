import { FileMetadata, ValidationIssue, ValidationResult } from '../types/bootstrap.types.js';
import { QualityAnalyzer } from '../analyzer/quality.analyzer.js';

export class ProjectValidator {
  public static validate(files: FileMetadata[]): ValidationResult {
    const issues: ValidationIssue[] = [];

    const hasBriefing = files.some((f) => f.category === 'Briefing');
    const hasLogo = files.some((f) => f.category === 'Logo' || f.category === 'Vector');
    const hasImages = files.some((f) => f.category === 'Image');

    if (!hasBriefing) {
      issues.push({
        code: 'MISSING_BRIEFING',
        severity: 'CRITICAL',
        category: 'Briefing',
        message: 'No client briefing or initial documentation file detected.',
        recommendation: 'Place a briefing.md, briefing.txt, or briefing.pdf inside the briefing/ folder.',
      });
    }

    if (!hasLogo) {
      issues.push({
        code: 'MISSING_LOGO',
        severity: 'CRITICAL',
        category: 'Branding',
        message: 'No vector or raster brand logo file detected (SVG, PNG, AI, EPS).',
        recommendation: 'Add a high-resolution logo (preferably SVG) to assets/ or design/.',
      });
    }

    if (!hasImages) {
      issues.push({
        code: 'MISSING_IMAGES',
        severity: 'WARNING',
        category: 'Assets',
        message: 'No real brand photography or visual assets detected.',
        recommendation: 'Provide high-quality brand images inside assets/ for authentic storytelling.',
      });
    }

    // Zero byte check
    const corruptFiles = QualityAnalyzer.findCorruptOrZeroByteFiles(files);
    for (const corrupt of corruptFiles) {
      issues.push({
        code: 'CORRUPT_ZERO_BYTE_FILE',
        severity: 'CRITICAL',
        category: 'Quality',
        message: `File '${corrupt.relativePath}' has 0 bytes (corrupted or empty).`,
        targetFile: corrupt.relativePath,
        recommendation: 'Remove or re-upload the corrupted zero-byte file.',
      });
    }

    // Duplicates check
    const duplicates = QualityAnalyzer.findDuplicates(files);
    for (const dup of duplicates) {
      issues.push({
        code: 'DUPLICATE_FILES',
        severity: 'WARNING',
        category: 'Quality',
        message: `Duplicate files detected with identical SHA-256 hash: ${dup.files.join(', ')}`,
        recommendation: 'Remove redundant file copies to optimize storage.',
      });
    }

    const criticalCount = issues.filter((i) => i.severity === 'CRITICAL').length;
    const warningCount = issues.filter((i) => i.severity === 'WARNING').length;
    const infoCount = issues.filter((i) => i.severity === 'INFO').length;

    let score = 100 - criticalCount * 25 - warningCount * 10;
    if (score < 0) score = 0;

    return {
      passed: criticalCount === 0,
      score,
      criticalCount,
      warningCount,
      infoCount,
      issues,
    };
  }
}
