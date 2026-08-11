import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { GeneratedAsset, ProcessedAsset, AssetManifest } from '../types/builder.types.js';
import { AssetRoleResolver } from './asset-role.resolver.js';

export class AssetsPipeline {
  public static processAssets(projectPath: string, destinationDir?: string): { generated: GeneratedAsset[]; manifest: AssetManifest } {
    const targetAssetsDir = destinationDir || path.join(projectPath, 'landing', 'assets');
    fs.mkdirSync(targetAssetsDir, { recursive: true });

    const sourceAssetFolders = [
      path.join(projectPath, 'Assets'),
      path.join(projectPath, 'assets'),
    ];

    const scannedFiles: Array<{ absolutePath: string; relativePath: string }> = [];

    for (const sourceFolder of sourceAssetFolders) {
      if (fs.existsSync(sourceFolder)) {
        this.walkDirectory(sourceFolder, sourceFolder, scannedFiles);
      }
    }

    const processedAssets: ProcessedAsset[] = [];
    const generated: GeneratedAsset[] = [];

    for (const file of scannedFiles) {
      const ext = path.extname(file.absolutePath).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)) {
        continue;
      }

      const filename = path.basename(file.absolutePath);
      const hash = this.computeSHA256(file.absolutePath);
      const targetFilename = `${path.basename(filename, ext)}-${hash.substring(0, 8)}${ext}`;
      const targetAbsolutePath = path.join(targetAssetsDir, targetFilename);

      fs.copyFileSync(file.absolutePath, targetAbsolutePath);

      const relPathInLanding = `./assets/${targetFilename}`;
      const role = AssetRoleResolver.resolveRole(filename, file.relativePath);
      const stat = fs.statSync(file.absolutePath);

      const cleanAlt = filename
        .replace(ext, '')
        .replace(/[-_]/g, ' ')
        .replace(/\d+/g, '')
        .trim();

      const processed: ProcessedAsset = {
        id: `asset-${hash.substring(0, 8)}`,
        originalPath: file.absolutePath,
        relativePath: relPathInLanding,
        filename: targetFilename,
        extension: ext,
        mimeType: this.getMimeType(ext),
        sizeBytes: stat.size,
        hash,
        role,
        altCandidate: cleanAlt || 'Imagem do cliente',
        isHeroPreload: role === 'hero',
      };

      processedAssets.push(processed);

      generated.push({
        filename: targetFilename,
        originalFormat: ext.replace('.', ''),
        optimizedFormat: ext.replace('.', ''),
        responsiveSrcset: `${relPathInLanding} 1x`,
        sizeBytes: stat.size,
        relativePath: relPathInLanding,
        absolutePath: targetAbsolutePath,
      });
    }

    const manifest: AssetManifest = {
      logo: processedAssets.find((a) => a.role === 'logo'),
      heroImage: processedAssets.find((a) => a.role === 'hero'),
      productImages: processedAssets.filter((a) => a.role === 'product'),
      galleryImages: processedAssets.filter((a) => a.role === 'gallery' || a.role === 'brand'),
      otherAssets: processedAssets.filter((a) => a.role === 'location' || a.role === 'decorative'),
      allAssets: processedAssets,
    };

    return { generated, manifest };
  }

  private static walkDirectory(dir: string, baseDir: string, fileList: Array<{ absolutePath: string; relativePath: string }>): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(baseDir, fullPath);
      if (entry.isDirectory()) {
        this.walkDirectory(fullPath, baseDir, fileList);
      } else if (entry.isFile()) {
        fileList.push({ absolutePath: fullPath, relativePath: relPath });
      }
    }
  }

  private static computeSHA256(filePath: string): string {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  private static getMimeType(ext: string): string {
    switch (ext) {
      case '.png': return 'image/png';
      case '.jpg':
      case '.jpeg': return 'image/jpeg';
      case '.webp': return 'image/webp';
      case '.svg': return 'image/svg+xml';
      default: return 'application/octet-stream';
    }
  }
}
