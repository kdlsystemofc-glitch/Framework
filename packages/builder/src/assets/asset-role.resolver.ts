import { AssetRole, ProcessedAsset } from '../types/builder.types.js';

export class AssetRoleResolver {
  public static resolveRole(filename: string, relativePath: string): AssetRole {
    const lower = filename.toLowerCase();
    const relLower = relativePath.toLowerCase();

    if (relLower.includes('logo') || lower.includes('logo')) {
      return 'logo';
    }

    if (lower.includes('hero') || lower.includes('banner') || lower.includes('main')) {
      return 'hero';
    }

    if (relLower.includes('product') || lower.includes('prato') || lower.includes('lanche') || lower.includes('item')) {
      return 'product';
    }

    if (relLower.includes('location') || lower.includes('fachada') || lower.includes('mapa')) {
      return 'location';
    }

    if (relLower.includes('gallery') || relLower.includes('fotos') || relLower.includes('images')) {
      return 'gallery';
    }

    return 'brand';
  }
}
