export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private level: LogLevel = 'info';

  constructor(level: LogLevel = 'info') {
    this.level = level;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  private shouldLog(targetLevel: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[targetLevel] >= levels[this.level];
  }

  public debug(message: string, ...meta: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] [${new Date().toISOString()}] ${message}`, ...meta);
    }
  }

  public info(message: string, ...meta: unknown[]): void {
    if (this.shouldLog('info')) {
      console.log(`[KDL INFO] ${message}`, ...meta);
    }
  }

  public success(message: string, ...meta: unknown[]): void {
    if (this.shouldLog('info')) {
      console.log(`[KDL SUCCESS] ✔ ${message}`, ...meta);
    }
  }

  public warn(message: string, ...meta: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`[KDL WARN] ⚠ ${message}`, ...meta);
    }
  }

  public error(message: string, ...meta: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error(`[KDL ERROR] ✖ ${message}`, ...meta);
    }
  }
}

export const logger = new Logger();
