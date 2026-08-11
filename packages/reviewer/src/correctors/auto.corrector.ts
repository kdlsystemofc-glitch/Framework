import fs from 'fs';
import path from 'path';
import { AuditIssue } from '../types/reviewer.types.js';

export class AutoCorrector {
  public static applyAutoFixes(arg1: string | AuditIssue[], arg2?: AuditIssue[] | any): number {
    let landingDir = '';
    let directHtmlPath = '';
    let issues: AuditIssue[] = [];

    if (typeof arg1 === 'string') {
      landingDir = arg1;
      issues = Array.isArray(arg2) ? arg2 : [];
    } else if (Array.isArray(arg1)) {
      issues = arg1;
      if (arg2 && typeof arg2 === 'object' && arg2.htmlFilePath) {
        directHtmlPath = arg2.htmlFilePath;
        landingDir = path.dirname(arg2.htmlFilePath);
      }
    }

    if (!landingDir && !directHtmlPath) return 0;

    const htmlPath = directHtmlPath && fs.existsSync(directHtmlPath)
      ? directHtmlPath
      : path.join(landingDir, 'index.html');

    let fixesApplied = 0;

    if (fs.existsSync(htmlPath)) {
      let html = fs.readFileSync(htmlPath, 'utf-8');
      let htmlModified = false;

      for (const issue of issues) {
        if (!issue.autoFixable) continue;

        // Fix doctype
        if (issue.id === 'html-no-doctype' || issue.message.includes('doctype')) {
          if (!html.toLowerCase().includes('<!doctype html>')) {
            html = '<!DOCTYPE html>\n' + html;
            fixesApplied++;
            htmlModified = true;
          }
        }

        // Fix missing alt attributes
        if (issue.id === 'af-missing-alt' || issue.message.includes('alt attribute')) {
          html = html.replace(/<img(?![^>]*\balt=)([^>]+)>/gi, '<img alt="Brand showcase image" $1>');
          fixesApplied++;
          htmlModified = true;
        }

        // Fix KDL brand leakage
        if (issue.id?.startsWith('cf-leak-') || issue.message.includes('KDL brand leakage')) {
          html = html.replace(/KDL Gold Standard/gi, '')
                     .replace(/KDL Framework/gi, '')
                     .replace(/Powered by KDL/gi, '')
                     .replace(/Stage Showcase/gi, '');
          fixesApplied++;
          htmlModified = true;
        }

        // Fix filesystem paths
        if (issue.id === 'cf-fs-path' || issue.message.includes('filesystem path')) {
          html = html.replace(/file:\/\/\/[A-Z]:\/[^\s"']+/gi, './assets/')
                     .replace(/[A-Z]:\\[^\s"']+/gi, './assets/');
          fixesApplied++;
          htmlModified = true;
        }

        // Fix dummy href="#"
        if (issue.id === 'ia-empty-href' || issue.message.includes('dummy href="#"')) {
          html = html.replace(/href=["']#["']/g, 'href="#contact"');
          fixesApplied++;
          htmlModified = true;
        }
      }

      if (htmlModified) {
        fs.writeFileSync(htmlPath, html, 'utf-8');
      }
    }

    return fixesApplied;
  }
}
