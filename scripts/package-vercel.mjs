/**
 * Post-build script: packages the Nitro Cloudflare-format output into
 * Vercel's Build Output API v3 structure (.vercel/output/).
 *
 * The Lovable vite-tanstack-config always builds the SSR bundle targeting
 * Cloudflare Workers (export default { fetch(req, env, ctx) {} }).
 * This script wraps that handler in a standard Node.js CJS function that
 * Vercel's runtime knows how to call.
 */

import { cpSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const OUT = resolve(root, '.vercel/output');

// Start clean
rmSync(OUT, { recursive: true, force: true });

// 1. Static client assets → .vercel/output/static/
mkdirSync(`${OUT}/static`, { recursive: true });
cpSync(resolve(root, 'dist/client'), `${OUT}/static`, { recursive: true });
console.log('✓ Copied static assets');

// 2. Server bundle → .vercel/output/functions/ssr.func/
const FUNC = `${OUT}/functions/ssr.func`;
mkdirSync(FUNC, { recursive: true });
cpSync(resolve(root, 'dist/server'), FUNC, { recursive: true });
console.log('✓ Copied server bundle');

// 3. Node.js CJS handler that bridges Cloudflare module → Vercel Node.js function.
//    Uses dynamic import() to load the ESM bundle, then calls its web-compatible
//    fetch() method and pipes the response back to Node's ServerResponse.
writeFileSync(`${FUNC}/handler.cjs`, `
'use strict';

let appPromise;

module.exports = async function handler(req, res) {
  if (!appPromise) {
    appPromise = import('./index.mjs').then(function (m) { return m.default; });
  }
  const app = await appPromise;

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host  = req.headers['host'] || 'localhost';
  const url   = new URL(req.url, proto + '://' + host);

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v != null) headers.set(k, Array.isArray(v) ? v.join(', ') : String(v));
  }

  const webReq = new Request(url.href, { method: req.method, headers });
  const webRes = await app.fetch(webReq, {}, { waitUntil: function(p) { p.catch(console.error); } });

  res.statusCode = webRes.status;
  for (const [k, v] of webRes.headers.entries()) {
    if (k !== 'transfer-encoding') res.setHeader(k, v);
  }
  res.end(Buffer.from(await webRes.arrayBuffer()));
};
`.trim());
console.log('✓ Wrote handler.cjs');

// 4. Vercel function config
writeFileSync(`${FUNC}/.vc-config.json`, JSON.stringify({
  runtime: 'nodejs20.x',
  handler: 'handler.cjs',
  launcherType: 'Nodejs',
  shouldAddHelpers: false,
}, null, 2));
console.log('✓ Wrote .vc-config.json');

// 5. Vercel routing config:
//    - Long-cache immutable headers for hashed assets
//    - Serve everything else from .vercel/output/static/ (filesystem)
//    - Fall back to the SSR function for any unmatched route (SPA/SSR catch-all)
writeFileSync(`${OUT}/config.json`, JSON.stringify({
  version: 3,
  routes: [
    {
      src: '^/assets/(.*)$',
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      continue: true,
    },
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/ssr' },
  ],
}, null, 2));
console.log('✓ Wrote config.json');

console.log('\n✅ .vercel/output/ ready for deployment');
