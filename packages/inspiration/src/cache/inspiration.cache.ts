import fs from 'fs';
import path from 'path';
import { InspirationReference } from '../types/inspiration.types.js';

export class InspirationCache {
  private cacheMap = new Map<string, InspirationReference>();
  private cacheFilePath: string;

  constructor(customCachePath?: string) {
    this.cacheFilePath = customCachePath || path.join(process.cwd(), '.kdl-inspiration-cache.json');
    this.loadCache();
  }

  private loadCache(): void {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const raw = fs.readFileSync(this.cacheFilePath, 'utf-8');
        const parsed = JSON.parse(raw) as InspirationReference[];
        for (const item of parsed) {
          this.cacheMap.set(item.id, item);
        }
      }
    } catch {
      // Ignore cache load errors
    }
  }

  public saveCache(): void {
    try {
      const items = Array.from(this.cacheMap.values());
      fs.writeFileSync(this.cacheFilePath, JSON.stringify(items, null, 2), 'utf-8');
    } catch {
      // Ignore cache save errors
    }
  }

  public get(id: string): InspirationReference | undefined {
    return this.cacheMap.get(id);
  }

  public set(ref: InspirationReference): void {
    this.cacheMap.set(ref.id, ref);
    this.saveCache();
  }

  public has(id: string): boolean {
    return this.cacheMap.has(id);
  }
}
