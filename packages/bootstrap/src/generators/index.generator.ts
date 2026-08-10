import fs from 'fs';
import path from 'path';
import { ProjectIndex, ProjectStatusLedger, FileMetadata, DirectoryMetadata, ValidationResult } from '../types/bootstrap.types.js';
import { QualityAnalyzer } from '../analyzer/quality.analyzer.js';

export class IndexGenerator {
  public static generateIndex(
    projectPath: string,
    files: FileMetadata[],
    directories: DirectoryMetadata[],
  ): ProjectIndex {
    const totalSizeBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);
    const duplicates = QualityAnalyzer.findDuplicates(files);

    return {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      projectPath,
      projectName: path.basename(projectPath),
      totalFiles: files.length,
      totalDirectories: directories.length,
      totalSizeBytes,
      files,
      directories,
      duplicateFiles: duplicates,
    };
  }

  public static generateStatusLedger(
    projectName: string,
    validation: ValidationResult,
  ): ProjectStatusLedger {
    const missingRequiredFiles: string[] = [];
    for (const issue of validation.issues) {
      if (issue.severity === 'CRITICAL') {
        missingRequiredFiles.push(issue.message);
      }
    }

    const recommendedActions = validation.issues.map((i) => `[${i.severity}] ${i.recommendation}`);

    return {
      projectName,
      bootstrapCompleted: true,
      bootstrapCompletedAt: new Date().toISOString(),
      currentStage: 'BOOTSTRAP_COMPLETE',
      validationPassed: validation.passed,
      validationScore: validation.score,
      missingRequiredFiles,
      recommendedActions,
    };
  }

  public static writeIndexAndStatus(
    projectPath: string,
    index: ProjectIndex,
    status: ProjectStatusLedger,
  ): { indexFilePath: string; statusFilePath: string } {
    const indexFilePath = path.join(projectPath, 'project-index.json');
    const statusFilePath = path.join(projectPath, 'PROJECT_STATUS.json');

    fs.writeFileSync(indexFilePath, JSON.stringify(index, null, 2), 'utf-8');
    fs.writeFileSync(statusFilePath, JSON.stringify(status, null, 2), 'utf-8');

    return { indexFilePath, statusFilePath };
  }
}
