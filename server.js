const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SITE_DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.m4a': 'audio/mp4',
  '.mp4': 'audio/mp4',
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  if (pathname === '/api/tg-avatar') {
    fetch('https://t.me/fuck_up1337', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Bot)' },
    })
      .then(r => r.text())
      .then(html => {
        const m = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
        if (m) {
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ url: m[1] }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'avatar not found' }));
        }
      })
      .catch(() => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'fetch failed' }));
      });
    return;
  }

  let filePath = path.join(SITE_DIR, pathname === '/' ? 'fuckup.html' : pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(SITE_DIR, pathname + '.html');
  }
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
