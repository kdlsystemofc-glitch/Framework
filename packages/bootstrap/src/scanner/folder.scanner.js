import fs from 'fs';
import path from 'path';
import { HashUtils } from '../utils/hash.utils.js';
import { PathUtils } from '../utils/path.utils.js';
import { AssetClassifier } from '../analyzer/asset.classifier.js';
export class FolderScanner {
    rootPath;
    constructor(rootPath) {
        this.rootPath = PathUtils.normalize(rootPath);
    }
    scan() {
        const files = [];
        const directories = [];
        const traverse = (currentDir) => {
            const entries = fs.readdirSync(currentDir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = PathUtils.normalize(path.join(currentDir, entry.name));
                const relativePath = PathUtils.relative(this.rootPath, fullPath);
                if (entry.isDirectory()) {
                    const subEntries = fs.readdirSync(fullPath);
                    directories.push({
                        relativePath,
                        absolutePath: fullPath,
                        name: entry.name,
                        childrenCount: subEntries.length,
                    });
                    traverse(fullPath);
                }
                else if (entry.isFile()) {
                    const stats = fs.statSync(fullPath);
                    const { category, mimeType } = AssetClassifier.classify(entry.name, relativePath);
                    const sha256 = HashUtils.calculateFileSHA256(fullPath);
                    files.push({
                        relativePath,
                        absolutePath: fullPath,
                        filename: entry.name,
                        extension: entry.name.split('.').pop()?.toLowerCase() || '',
                        sizeBytes: stats.size,
                        sha256,
                        createdAt: stats.birthtime.toISOString(),
                        modifiedAt: stats.mtime.toISOString(),
                        category,
                        mimeType,
                        isZeroByte: stats.size === 0,
                    });
                }
            }
        };
        if (fs.existsSync(this.rootPath)) {
            traverse(this.rootPath);
        }
        return { files, directories };
    }
}
//# sourceMappingURL=folder.scanner.js.map