export type AssetCategory = 'Logo' | 'Briefing' | 'Image' | 'Vector' | 'Video' | 'Document' | 'Catalog' | 'BrandAsset' | 'Unknown';
export interface FileMetadata {
    relativePath: string;
    absolutePath: string;
    filename: string;
    extension: string;
    sizeBytes: number;
    sha256: string;
    createdAt: string;
    modifiedAt: string;
    category: AssetCategory;
    mimeType: string;
    isZeroByte: boolean;
}
export interface DirectoryMetadata {
    relativePath: string;
    absolutePath: string;
    name: string;
    childrenCount: number;
}
export interface ValidationIssue {
    code: string;
    severity: 'CRITICAL' | 'WARNING' | 'INFO';
    category: string;
    message: string;
    targetFile?: string;
    recommendation: string;
}
export interface ValidationResult {
    passed: boolean;
    score: number;
    criticalCount: number;
    warningCount: number;
    infoCount: number;
    issues: ValidationIssue[];
}
export interface ProjectIndex {
    version: string;
    generatedAt: string;
    projectPath: string;
    projectName: string;
    totalFiles: number;
    totalDirectories: number;
    totalSizeBytes: number;
    files: FileMetadata[];
    directories: DirectoryMetadata[];
    duplicateFiles: Array<{
        sha256: string;
        files: string[];
    }>;
}
export interface ProjectStatusLedger {
    projectName: string;
    bootstrapCompleted: boolean;
    bootstrapCompletedAt: string;
    currentStage: 'BOOTSTRAP_COMPLETE' | 'DISCOVERY_PENDING';
    validationPassed: boolean;
    validationScore: number;
    missingRequiredFiles: string[];
    recommendedActions: string[];
}
//# sourceMappingURL=bootstrap.types.d.ts.map