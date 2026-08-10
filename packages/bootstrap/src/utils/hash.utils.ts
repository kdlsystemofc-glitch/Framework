import crypto from 'crypto';
import fs from 'fs';

export class HashUtils {
  public static calculateFileSHA256(filePath: string): string {
    try {
      if (!fs.existsSync(filePath)) return '';
      const fileBuffer = fs.readFileSync(filePath);
      const hashSum = crypto.createHash('sha256');
      hashSum.update(fileBuffer);
      return hashSum.digest('hex');
    } catch {
      return '';
    }
  }

  public static calculateStringSHA256(text: string): string {
    const hashSum = crypto.createHash('sha256');
    hashSum.update(text);
    return hashSum.digest('hex');
  }
}
