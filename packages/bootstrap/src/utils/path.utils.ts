import path from 'path';

export class PathUtils {
  public static normalize(p: string): string {
    return path.normalize(p).replace(/\\/g, '/');
  }

  public static relative(from: string, to: string): string {
    return this.normalize(path.relative(from, to));
  }
}
