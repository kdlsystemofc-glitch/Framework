export class Formatter {
  public static banner(title: string, version: string): string {
    const border = '='.repeat(60);
    return [
      border,
      `  KDL LANDING FRAMEWORK CLI — ${title}`,
      `  Version: ${version} | Status: Operating System active`,
      border,
    ].join('\n');
  }

  public static header(text: string): string {
    return `\n--- ${text.toUpperCase()} ---`;
  }

  public static phaseStatus(phaseId: string, name: string, status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'): string {
    const iconMap = {
      PENDING: '⏳',
      RUNNING: '🔄',
      COMPLETED: '✅',
      FAILED: '❌',
    };
    return `[${iconMap[status]}] ${phaseId}: ${name} (${status})`;
  }
}
