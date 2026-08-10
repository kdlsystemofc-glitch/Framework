import { logger } from '../utils/logger.js';

export interface KDLPluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  hooks?: string[];
}

export interface KDLPlugin {
  manifest: KDLPluginManifest;
  init(context: Record<string, unknown>): Promise<void>;
  onBeforePhase?(phaseId: string): Promise<void>;
  onAfterPhase?(phaseId: string): Promise<void>;
}

export class PluginService {
  private plugins = new Map<string, KDLPlugin>();

  public registerPlugin(plugin: KDLPlugin): void {
    if (!plugin || !plugin.manifest || !plugin.manifest.id) {
      logger.warn('Attempted to register invalid plugin manifest');
      return;
    }
    this.plugins.set(plugin.manifest.id, plugin);
    logger.debug(`Registered plugin: ${plugin.manifest.name} v${plugin.manifest.version}`);
  }

  public getPlugins(): KDLPlugin[] {
    return Array.from(this.plugins.values());
  }

  public async executeHook(hookName: 'onBeforePhase' | 'onAfterPhase', phaseId: string): Promise<void> {
    for (const plugin of this.plugins.values()) {
      if (typeof plugin[hookName] === 'function') {
        try {
          await plugin[hookName]!(phaseId);
        } catch (err: any) {
          logger.warn(`Plugin '${plugin.manifest.name}' failed during hook ${hookName}: ${err.message}`);
        }
      }
    }
  }
}
