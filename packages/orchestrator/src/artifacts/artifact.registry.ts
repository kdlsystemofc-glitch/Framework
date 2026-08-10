import fs from 'fs';
import path from 'path';
import { MethodologyPhaseId, PhaseExecutionArtifact } from '../methodology/methodology.types.js';

export class ArtifactRegistry {
  private projectPath: string;
  private artifactsDir: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
    this.artifactsDir = path.join(projectPath, '.project', 'artifacts');
    this.ensureDirs();
  }

  private ensureDirs(): void {
    if (!fs.existsSync(this.artifactsDir)) {
      fs.mkdirSync(this.artifactsDir, { recursive: true });
    }
  }

  public saveArtifact(
    phaseId: MethodologyPhaseId,
    relativePath: string,
    content: string
  ): PhaseExecutionArtifact {
    const absolutePath = path.resolve(this.projectPath, relativePath);
    const parentDir = path.dirname(absolutePath);

    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    fs.writeFileSync(absolutePath, content, 'utf-8');

    // Also mirror to .project/artifacts/
    const mirrorPath = path.join(this.artifactsDir, phaseId, path.basename(relativePath));
    const mirrorDir = path.dirname(mirrorPath);
    if (!fs.existsSync(mirrorDir)) {
      fs.mkdirSync(mirrorDir, { recursive: true });
    }
    fs.writeFileSync(mirrorPath, content, 'utf-8');

    return {
      phaseId,
      relativePath,
      absolutePath,
      generatedAt: new Date().toISOString(),
    };
  }

  public getArtifactPath(relativePath: string): string {
    return path.resolve(this.projectPath, relativePath);
  }

  public hasArtifact(relativePath: string): boolean {
    return fs.existsSync(this.getArtifactPath(relativePath));
  }

  public readArtifact(relativePath: string): string | null {
    const p = this.getArtifactPath(relativePath);
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf-8');
    }
    return null;
  }
}
