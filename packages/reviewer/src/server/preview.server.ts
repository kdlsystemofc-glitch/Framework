import http from 'http';
import fs from 'fs';
import path from 'path';

export class LocalPreviewServer {
  private server?: http.Server;
  private port = 0;
  private landingDir: string;

  constructor(landingDir: string) {
    this.landingDir = landingDir;
  }

  public async start(preferredPort = 8085): Promise<string> {
    return new Promise((resolve, reject) => {
      this.server = http.createServer((req, res) => {
        let reqUrl = req.url || '/';
        if (reqUrl === '/') reqUrl = '/index.html';

        const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
        const filePath = path.join(this.landingDir, safePath);

        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mimeMap: Record<string, string> = {
          '.html': 'text/html; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.webp': 'image/webp',
          '.svg': 'image/svg+xml',
          '.xml': 'application/xml',
          '.txt': 'text/plain',
        };

        const contentType = mimeMap[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      });

      this.server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          // Try next port if preferred is busy
          this.server?.listen(0, '127.0.0.1');
        } else {
          reject(err);
        }
      });

      this.server.listen(preferredPort, '127.0.0.1', () => {
        const addr = this.server?.address() as any;
        this.port = addr.port;
        resolve(`http://127.0.0.1:${this.port}`);
      });
    });
  }

  public async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => resolve());
      } else {
        resolve();
      }
    });
  }

  public getUrl(): string {
    return `http://127.0.0.1:${this.port}`;
  }
}
