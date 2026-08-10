import fs from 'fs';
import path from 'path';

export class OutputManager {
  public static ensureOutputDirectories(projectPath: string): { landing: string; build: string; reports: string } {
    const landing = path.join(projectPath, 'landing');
    const build = path.join(projectPath, 'build');
    const reports = path.join(projectPath, 'reports');

    fs.mkdirSync(landing, { recursive: true });
    fs.mkdirSync(build, { recursive: true });
    fs.mkdirSync(reports, { recursive: true });

    return { landing, build, reports };
  }
}
