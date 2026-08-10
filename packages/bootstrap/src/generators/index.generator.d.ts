import { ProjectIndex, ProjectStatusLedger, FileMetadata, DirectoryMetadata, ValidationResult } from '../types/bootstrap.types.js';
export declare class IndexGenerator {
    static generateIndex(projectPath: string, files: FileMetadata[], directories: DirectoryMetadata[]): ProjectIndex;
    static generateStatusLedger(projectName: string, validation: ValidationResult): ProjectStatusLedger;
    static writeIndexAndStatus(projectPath: string, index: ProjectIndex, status: ProjectStatusLedger): {
        indexFilePath: string;
        statusFilePath: string;
    };
}
//# sourceMappingURL=index.generator.d.ts.map