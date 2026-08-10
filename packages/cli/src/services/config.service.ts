import fs from 'fs';
import path from 'path';
import { KDLGlobalConfig, KDLConfigProfile } from '../types/config.types.js';
import { SystemUtils } from '../utils/system.js';
import { KDLError } from '../types/error.types.js';

export class ConfigService {
  private configPath: string;
  private config: KDLGlobalConfig;

  constructor(customConfigPath?: string) {
    const homeDir = SystemUtils.getInfo().homeDir;
    this.configPath = customConfigPath || path.join(homeDir, '.kdlrc.json');
    this.config = this.loadConfig();
  }

  private getDefaultConfig(): KDLGlobalConfig {
    const now = new Date().toISOString();
    return {
      version: '1.0.0',
      activeProfile: 'default',
      profiles: {
        default: {
          name: 'default',
          environment: 'development',
          outputDir: './dist',
          pluginsEnabled: true,
          logLevel: 'info',
        },
        production: {
          name: 'production',
          environment: 'production',
          outputDir: './build',
          pluginsEnabled: true,
          logLevel: 'warn',
        },
      },
      plugins: [],
      telemetryEnabled: false,
      createdAt: now,
      updatedAt: now,
    };
  }

  public loadConfig(): KDLGlobalConfig {
    try {
      if (fs.existsSync(this.configPath)) {
        const raw = fs.readFileSync(this.configPath, 'utf-8');
        const parsed = JSON.parse(raw) as KDLGlobalConfig;
        return { ...this.getDefaultConfig(), ...parsed };
      }
    } catch (err: any) {
      throw new KDLError(
        `Failed to parse configuration file at ${this.configPath}: ${err.message}`,
        'CONFIGURATION_ERROR',
        'ERR_CONFIG_PARSE',
      );
    }
    return this.getDefaultConfig();
  }

  public saveConfig(): void {
    try {
      this.config.updatedAt = new Date().toISOString();
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
    } catch (err: any) {
      throw new KDLError(
        `Failed to save configuration to ${this.configPath}: ${err.message}`,
        'CONFIGURATION_ERROR',
        'ERR_CONFIG_SAVE',
      );
    }
  }

  public getConfig(): KDLGlobalConfig {
    return this.config;
  }

  public getActiveProfile(): KDLConfigProfile {
    const activeName = this.config.activeProfile;
    const profile = this.config.profiles[activeName];
    if (!profile) {
      return this.config.profiles['default'];
    }
    return profile;
  }

  public setActiveProfile(name: string): void {
    if (!this.config.profiles[name]) {
      throw new KDLError(
        `Profile '${name}' does not exist in configuration.`,
        'CONFIGURATION_ERROR',
        'ERR_CONFIG_PROFILE_NOT_FOUND',
      );
    }
    this.config.activeProfile = name;
    this.saveConfig();
  }
}
