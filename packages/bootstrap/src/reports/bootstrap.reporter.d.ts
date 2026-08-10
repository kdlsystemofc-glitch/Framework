import { ProjectIndex, ValidationResult } from '../types/bootstrap.types.js';
export declare class BootstrapReporter {
    static generateReport(index: ProjectIndex, validation: ValidationResult, createdDirs: string[]): string;
    static writeReport(projectPath: string, index: ProjectIndex, validation: ValidationResult, createdDirs: string[]): string;
}
//# sourceMappingURL=bootstrap.reporter.d.ts.map