import fs from 'fs';
import path from 'path';

export interface MeasuredLighthouseScores {
  available: boolean;
  performance?: number;
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
  fcpMs?: number;
  lcpMs?: number;
  cls?: number;
  tbtMs?: number;
  speedIndexMs?: number;
  rawJsonPath?: string;
  errorMessage?: string;
}

export class LighthouseRunner {
  public static async runLighthouse(targetUrl: string, outputReportDir: string): Promise<MeasuredLighthouseScores> {
    try {
      // Dynamic import to prevent build time TS module resolution errors
      const lhPkg = 'lighthouse';
      const clPkg = 'chrome-launcher';
      const lighthouse = await import(/* template */ lhPkg);
      const chromeLauncher = await import(/* template */ clPkg);

      const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
      const options = {
        logLevel: 'error' as const,
        output: 'json' as const,
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
      };

      const runnerResult = await (lighthouse as any).default(targetUrl, options);
      await chrome.kill();

      if (!runnerResult || !runnerResult.lhr) {
        return { available: false, errorMessage: 'Lighthouse execution returned no result.' };
      }

      const lhr = runnerResult.lhr;
      const rawJsonPath = path.join(outputReportDir, 'lighthouse.json');
      fs.mkdirSync(outputReportDir, { recursive: true });
      fs.writeFileSync(rawJsonPath, JSON.stringify(lhr, null, 2), 'utf-8');

      return {
        available: true,
        performance: Math.round((lhr.categories.performance?.score || 0) * 100),
        accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((lhr.categories.seo?.score || 0) * 100),
        fcpMs: lhr.audits['first-contentful-paint']?.numericValue,
        lcpMs: lhr.audits['largest-contentful-paint']?.numericValue,
        cls: lhr.audits['cumulative-layout-shift']?.numericValue,
        tbtMs: lhr.audits['total-blocking-time']?.numericValue,
        speedIndexMs: lhr.audits['speed-index']?.numericValue,
        rawJsonPath,
      };
    } catch (err: any) {
      return {
        available: false,
        errorMessage: `Lighthouse execution unavailable: ${err.message}`,
      };
    }
  }
}
