import fs from 'fs';
import path from 'path';

export interface PlaywrightQAResult {
  available: boolean;
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: string[];
  hasHorizontalOverflow: Record<string, boolean>;
  screenshots: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  domMetrics: {
    totalElements: number;
    hasH1: boolean;
    imagesCount: number;
    missingAltCount: number;
    linksCount: number;
    brokenLinksCount: number;
  };
  errorMessage?: string;
}

export class PlaywrightRunner {
  public static async runQA(targetUrl: string, outputReportDir: string): Promise<PlaywrightQAResult> {
    const screenshotsDir = path.join(outputReportDir, 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    let chromium: any;
    try {
      const pw = await import('playwright');
      chromium = pw.chromium;
    } catch (err: any) {
      return this.createUnavailableResult('Playwright package not installed.');
    }

    try {
      const browser = await chromium.launch({ headless: true });
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const failedRequests: string[] = [];
      const hasHorizontalOverflow: Record<string, boolean> = {};
      const screenshots: { mobile?: string; tablet?: string; desktop?: string } = {};

      const viewports = [
        { name: 'mobile', width: 390, height: 844 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1440, height: 900 },
      ];

      let domMetrics = {
        totalElements: 0,
        hasH1: false,
        imagesCount: 0,
        missingAltCount: 0,
        linksCount: 0,
        brokenLinksCount: 0,
      };

      for (const vp of viewports) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 1,
        });
        const page = await context.newPage();

        page.on('console', (msg: any) => {
          if (msg.type() === 'error') consoleErrors.push(`[${vp.name}] ${msg.text()}`);
        });

        page.on('pageerror', (err: any) => {
          pageErrors.push(`[${vp.name}] ${err.message}`);
        });

        page.on('response', (response: any) => {
          if (response.status() >= 400) {
            failedRequests.push(`[${vp.name}] ${response.status()} ${response.url()}`);
          }
        });

        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

        const screenshotPath = path.join(screenshotsDir, `${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        (screenshots as any)[vp.name] = screenshotPath;

        // Check horizontal overflow
        const isOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        hasHorizontalOverflow[vp.name] = isOverflow;

        if (vp.name === 'desktop') {
          domMetrics = await page.evaluate(() => {
            const allElements = document.querySelectorAll('*');
            const h1 = document.querySelector('h1');
            const imgs = Array.from(document.querySelectorAll('img'));
            const missingAlt = imgs.filter((img) => !img.hasAttribute('alt') || !img.getAttribute('alt')?.trim());
            const links = Array.from(document.querySelectorAll('a'));

            return {
              totalElements: allElements.length,
              hasH1: !!h1,
              imagesCount: imgs.length,
              missingAltCount: missingAlt.length,
              linksCount: links.length,
              brokenLinksCount: 0,
            };
          });
        }

        await context.close();
      }

      await browser.close();

      return {
        available: true,
        consoleErrors,
        pageErrors,
        failedRequests,
        hasHorizontalOverflow,
        screenshots,
        domMetrics,
      };
    } catch (err: any) {
      return this.createUnavailableResult(`Playwright launch issue: ${err.message}`);
    }
  }

  private static createUnavailableResult(reason: string): PlaywrightQAResult {
    return {
      available: false,
      consoleErrors: [],
      pageErrors: [],
      failedRequests: [],
      hasHorizontalOverflow: {},
      screenshots: {},
      domMetrics: {
        totalElements: 0,
        hasH1: false,
        imagesCount: 0,
        missingAltCount: 0,
        linksCount: 0,
        brokenLinksCount: 0,
      },
      errorMessage: reason,
    };
  }
}
