import path from 'path';
import { FolderScanner } from './scanner/folder.scanner.js';
import { ProjectValidator } from './validators/project.validator.js';
import { StructureManager } from './filesystem/structure.manager.js';
import { IndexGenerator } from './generators/index.generator.js';
import { MarkdownGenerator } from './generators/markdown.generator.js';
import { BootstrapReporter } from './reports/bootstrap.reporter.js';
export * from './types/bootstrap.types.js';
export * from './scanner/folder.scanner.js';
export * from './analyzer/asset.classifier.js';
export * from './analyzer/quality.analyzer.js';
export * from './validators/project.validator.js';
export * from './filesystem/structure.manager.js';
export * from './generators/index.generator.js';
export * from './generators/markdown.generator.js';
export * from './reports/bootstrap.reporter.js';
export class BootstrapEngine {
    static async execute(targetClientFolder) {
        const projectPath = path.resolve(targetClientFolder);
        const projectName = path.basename(projectPath);
        // 1. Ensure 12 standard directories
        const createdDirectories = StructureManager.ensureStandardDirectories(projectPath);
        // 2. Scan folder & compute SHA-256 metadata
        const scanner = new FolderScanner(projectPath);
        const { files, directories } = scanner.scan();
        // 3. Validate project quality & mandatory assets
        const validation = ProjectValidator.validate(files);
        // 4. Generate index & status
        const index = IndexGenerator.generateIndex(projectPath, files, directories);
        const statusLedger = IndexGenerator.generateStatusLedger(projectName, validation);
        IndexGenerator.writeIndexAndStatus(projectPath, index, statusLedger);
        // 5. Generate Markdown analysis documents
        MarkdownGenerator.writeAllMarkdownDocs(projectPath, index, validation, createdDirectories);
        // 6. Generate bootstrap report
        const reportPath = BootstrapReporter.writeReport(projectPath, index, validation, createdDirectories);
        return {
            projectName,
            projectPath,
            createdDirectories,
            index,
            validation,
            statusLedger,
            reportPath,
        };
    }
}
//# sourceMappingURL=index.js.map