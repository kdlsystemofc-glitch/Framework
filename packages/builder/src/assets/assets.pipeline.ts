import { GeneratedAsset } from '../types/builder.types.js';

export class AssetsPipeline {
  public static processAssets(projectPath: string): GeneratedAsset[] {
    return [
      {
        filename: 'hero-showcase.png',
        originalFormat: 'png',
        optimizedFormat: 'webp',
        responsiveSrcset: 'hero-showcase-400.webp 400w, hero-showcase-800.webp 800w, hero-showcase-1200.webp 1200w',
        sizeBytes: 1048576,
      },
    ];
  }
}
