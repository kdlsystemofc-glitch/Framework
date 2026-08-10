import { ProjectIndex, ProjectStatusLedger, ValidationResult } from './types/bootstrap.types.js';
export * from './types/bootstrap.types.js';
export * from './scanner/folder.scanner.js';
export * from './analyzer/asset.classifier.js';
export * from './analyzer/quality.analyzer.js';
export * from './validators/project.validator.js';
export * from './filesystem/structure.manager.js';
export * from './generators/index.generator.js';
export * from './generators/markdown.generator.js';
export * from './reports/bootstrap.reporter.js';
export interface BootstrapResult {
    projectName: string;
    projectPath: string;
    createdDirectories: string[];
    index: ProjectIndex;
    validation: ValidationResult;
    statusLedger: ProjectStatusLedger;
    reportPath: string;
}
export declare class BootstrapEngine {
    static execute(targetClientFolder: string): Promise<BootstrapResult>;
}
//# sourceMappingURL=index.d.ts.map