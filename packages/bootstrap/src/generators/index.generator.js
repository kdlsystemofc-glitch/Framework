import fs from 'fs';
import path from 'path';
import { QualityAnalyzer } from '../analyzer/quality.analyzer.js';
export class IndexGenerator {
    static generateIndex(projectPath, files, directories) {
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
    static generateStatusLedger(projectName, validation) {
        const missingRequiredFiles = [];
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
    static writeIndexAndStatus(projectPath, index, status) {
        const indexFilePath = path.join(projectPath, 'project-index.json');
        const statusFilePath = path.join(projectPath, 'PROJECT_STATUS.json');
        fs.writeFileSync(indexFilePath, JSON.stringify(index, null, 2), 'utf-8');
        fs.writeFileSync(statusFilePath, JSON.stringify(status, null, 2), 'utf-8');
        return { indexFilePath, statusFilePath };
    }
}
//# sourceMappingURL=index.generator.js.map