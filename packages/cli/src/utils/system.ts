import os from 'os';
import fs from 'fs';
import path from 'path';

export interface SystemInfo {
  platform: string;
  arch: string;
  nodeVersion: string;
  cpusCount: number;
  totalMemoryMB: number;
  freeMemoryMB: number;
  homeDir: string;
  tmpDir: string;
}

export class SystemUtils {
  public static getInfo(): SystemInfo {
    return {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      cpusCount: os.cpus().length,
      totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024)),
      freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
      homeDir: os.homedir(),
      tmpDir: os.tmpdir(),
    };
  }

  public static ensureDirSync(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  public static safeReadFileSync(filePath: string): string | null {
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
      }
      return null;
    } catch {
      return null;
    }
  }

  public static normalizePath(p: string): string {
    return path.normalize(p).replace(/\\/g, '/');
  }
}
