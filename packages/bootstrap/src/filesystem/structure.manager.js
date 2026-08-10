import fs from 'fs';
import path from 'path';
export class StructureManager {
    static STANDARD_DIRECTORIES = [
        'assets',
        'briefing',
        'references',
        'design',
        'copy',
        'motion',
        'landing',
        'audit',
        'output',
        'deploy',
        'reports',
        'temp',
    ];
    static ensureStandardDirectories(projectPath) {
        const created = [];
        for (const dirName of this.STANDARD_DIRECTORIES) {
            const targetDir = path.join(projectPath, dirName);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
                created.push(dirName);
            }
        }
        return created;
    }
}
//# sourceMappingURL=structure.manager.js.map