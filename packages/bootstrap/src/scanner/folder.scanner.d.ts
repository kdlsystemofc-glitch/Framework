import { FileMetadata, DirectoryMetadata } from '../types/bootstrap.types.js';
export declare class FolderScanner {
    private rootPath;
    constructor(rootPath: string);
    scan(): {
        files: FileMetadata[];
        directories: DirectoryMetadata[];
    };
}
//# sourceMappingURL=folder.scanner.d.ts.map