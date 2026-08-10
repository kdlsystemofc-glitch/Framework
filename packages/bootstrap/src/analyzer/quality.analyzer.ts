import { FileMetadata } from '../types/bootstrap.types.js';

export class QualityAnalyzer {
  public static findDuplicates(files: FileMetadata[]): Array<{ sha256: string; files: string[] }> {
    const hashMap = new Map<string, string[]>();

    for (const file of files) {
      if (!file.sha256 || file.isZeroByte) continue;
      const list = hashMap.get(file.sha256) || [];
      list.push(file.relativePath);
      hashMap.set(file.sha256, list);
    }

    const duplicates: Array<{ sha256: string; files: string[] }> = [];
    for (const [sha256, list] of hashMap.entries()) {
      if (list.length > 1) {
        duplicates.push({ sha256, files: list });
      }
    }

    return duplicates;
  }

  public static findCorruptOrZeroByteFiles(files: FileMetadata[]): FileMetadata[] {
    return files.filter((f) => f.isZeroByte);
  }
}
