import { FileMetadata } from '../types/bootstrap.types.js';
export declare class QualityAnalyzer {
    static findDuplicates(files: FileMetadata[]): Array<{
        sha256: string;
        files: string[];
    }>;
    static findCorruptOrZeroByteFiles(files: FileMetadata[]): FileMetadata[];
}
//# sourceMappingURL=quality.analyzer.d.ts.map