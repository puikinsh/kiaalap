import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages = readdirSync(root).filter(
  (file) => file.endsWith('.html') && !file.includes('template') && !file.includes('-new')
);

test('every page builds with resolved partials and deployable local assets', () => {
  assert.ok(existsSync(dist), 'Run npm run build first');
  for (const page of pages) {
    const html = readFileSync(resolve(dist, page), 'utf8').replace(
      /<script\b([^>]*)>[\s\S]*?<\/script>/g,
      '<script$1></script>'
    );
    assert.doesNotMatch(html, /\{\{[>#/]/, page);
    assert.doesNotMatch(html, /(?:src|href)=["'](?:\/src\/|\/?node_modules\/)/, page);
    for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
      const url = match[1].split(/[?#]/)[0];
      if (!url || /^(?:https?:|data:|mailto:|tel:|javascript:)/.test(url)) continue;
      if (/\.(?:css|js|woff2?|ico|png|jpe?g|svg)$/.test(url)) {
        assert.ok(!url.startsWith('/'), `${page}: asset breaks subdirectory deployment: ${url}`);
        assert.ok(existsSync(resolve(dist, url)), `${page}: missing ${url}`);
      }
    }
  }
});

test('non-chart pages keep their initial JavaScript below 45 kB gzip', () => {
  for (const page of ['starter.html', 'login.html', 'all-students.html']) {
    const html = readFileSync(resolve(dist, page), 'utf8');
    const scripts = new Set();
    for (const tag of html.matchAll(/<(?:script|link)\b[^>]*>/g)) {
      if (!/type="module"|rel="modulepreload"/.test(tag[0])) continue;
      const url = tag[0].match(/(?:src|href)="([^"']+\.js)"/)?.[1];
      if (url) scripts.add(url);
    }
    if (page !== 'login.html') assert.ok(scripts.size, `${page}: no module entry`);
    let bytes = 0;
    for (const script of scripts) bytes += gzipSync(readFileSync(resolve(dist, script))).length;
    assert.ok(bytes < 45_000, `${page}: ${bytes} bytes gzip exceeds budget`);
    console.log(`${page}: ${(bytes / 1000).toFixed(1)} kB initial JavaScript gzip`);
  }
});
