export interface KDLConfigProfile {
  name: string;
  environment: 'development' | 'production' | 'staging';
  outputDir: string;
  defaultNiche?: string;
  pluginsEnabled: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export interface KDLGlobalConfig {
  version: string;
  activeProfile: string;
  profiles: Record<string, KDLConfigProfile>;
  plugins: string[];
  telemetryEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}
