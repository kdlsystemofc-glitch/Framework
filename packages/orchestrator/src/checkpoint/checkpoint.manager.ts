import fs from 'fs';
import path from 'path';
import { PipelineCheckpoint, SharedExecutionContext, StageCheckpoint } from '../types/orchestrator.types.js';

export class CheckpointManager {
  private projectPath: string;
  private checkpointDir: string;
  private stateFilePath: string;
  private projectStateFilePath: string;
  private executionStateFilePath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
    this.checkpointDir = path.join(projectPath, '.project', 'execution', 'checkpoints');
    this.stateFilePath = path.join(projectPath, '.project', 'execution', 'state.json');
    this.projectStateFilePath = path.join(projectPath, '.project', 'state', 'project.json');
    this.executionStateFilePath = path.join(projectPath, '.project', 'state', 'execution.json');
    this.ensureDirs();
  }

  private ensureDirs(): void {
    if (!fs.existsSync(this.checkpointDir)) {
      fs.mkdirSync(this.checkpointDir, { recursive: true });
    }
    const stateDir = path.join(this.projectPath, '.project', 'state');
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }
  }

  public savePipelineCheckpoint(checkpoint: PipelineCheckpoint): void {
    try {
      this.ensureDirs();
      fs.writeFileSync(this.stateFilePath, JSON.stringify(checkpoint, null, 2), 'utf-8');
      fs.writeFileSync(this.executionStateFilePath, JSON.stringify(checkpoint, null, 2), 'utf-8');
    } catch {
      // Handle or ignore write error
    }
  }

  public saveProjectState(context: SharedExecutionContext): void {
    try {
      this.ensureDirs();
      const stateObj = {
        project: context.project,
        client: context.client,
        asset: context.asset,
        research: context.research,
        creative: context.creative,
        design: context.design,
        copy: context.copy,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(this.projectStateFilePath, JSON.stringify(stateObj, null, 2), 'utf-8');
    } catch {
      // Ignore write error
    }
  }

  public saveStageCheckpoint(stageId: string, checkpoint: StageCheckpoint): void {
    try {
      this.ensureDirs();
      const stageFilePath = path.join(this.checkpointDir, `${stageId}.json`);
      fs.writeFileSync(stageFilePath, JSON.stringify(checkpoint, null, 2), 'utf-8');
    } catch {
      // Ignore stage checkpoint error
    }
  }

  public loadPipelineCheckpoint(): PipelineCheckpoint | null {
    try {
      if (fs.existsSync(this.stateFilePath)) {
        const raw = fs.readFileSync(this.stateFilePath, 'utf-8');
        return JSON.parse(raw) as PipelineCheckpoint;
      }
    } catch {
      return null;
    }
    return null;
  }

  public loadStageCheckpoint(stageId: string): StageCheckpoint | null {
    try {
      const stageFilePath = path.join(this.checkpointDir, `${stageId}.json`);
      if (fs.existsSync(stageFilePath)) {
        const raw = fs.readFileSync(stageFilePath, 'utf-8');
        return JSON.parse(raw) as StageCheckpoint;
      }
    } catch {
      return null;
    }
    return null;
  }

  public hasIncompleteRun(): boolean {
    const cp = this.loadPipelineCheckpoint();
    if (!cp) return false;
    return cp.state === 'RUNNING' || cp.state === 'PAUSED' || cp.state === 'FAILED' || cp.state === 'RETRYING';
  }

  public clearCheckpoints(): void {
    try {
      if (fs.existsSync(this.projectPath)) {
        fs.rmSync(path.join(this.projectPath, '.project', 'execution'), { recursive: true, force: true });
        fs.rmSync(path.join(this.projectPath, '.project', 'state'), { recursive: true, force: true });
      }
    } catch {
      // Ignore clear error
    }
  }
}
