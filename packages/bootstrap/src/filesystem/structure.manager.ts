import fs from 'fs';
import path from 'path';

export class StructureManager {
  public static readonly STANDARD_DIRECTORIES = [
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

  public static ensureStandardDirectories(projectPath: string): string[] {
    const created: string[] = [];

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
