import { ProjectIndex, ValidationResult } from '../types/bootstrap.types.js';
export declare class MarkdownGenerator {
    static generateAnalysis(index: ProjectIndex, validation: ValidationResult): string;
    static generateStructure(index: ProjectIndex, createdDirs: string[]): string;
    static generateProfile(index: ProjectIndex): string;
    static generatePlan(validation: ValidationResult): string;
    static writeAllMarkdownDocs(projectPath: string, index: ProjectIndex, validation: ValidationResult, createdDirs: string[]): Record<string, string>;
}
//# sourceMappingURL=markdown.generator.d.ts.map