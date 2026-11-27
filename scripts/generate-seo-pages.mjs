import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const BASE_URL = 'https://unitswift.org';

function assertExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required ${label}: ${filePath}`);
  }
}

function ensureRobotsTxt() {
  const expected = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
  for (const dir of [PUBLIC_DIR, DIST_DIR]) {
    const robotsPath = path.join(dir, 'robots.txt');
    fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(robotsPath) || fs.readFileSync(robotsPath, 'utf8') !== expected) {
      fs.writeFileSync(robotsPath, expected, 'utf8');
    }
  }
}

function ensureNoConflictingRedirects() {
  for (const dir of [PUBLIC_DIR, DIST_DIR]) {
    const redirectsPath = path.join(dir, '_redirects');
    if (fs.existsSync(redirectsPath)) {
      const content = fs.readFileSync(redirectsPath, 'utf8').trim();
      if (!content) {
        fs.rmSync(redirectsPath, { force: true });
      }
    }
  }
}

function parseSitemapUrls(sitemapPath) {
  assertExists(sitemapPath, 'sitemap.xml');
  const xml = fs.readFileSync(sitemapPath, 'utf8');

  if (!xml.trim().startsWith('<?xml') || !xml.includes('<urlset') || xml.includes('<html')) {
    throw new Error(`Invalid XML sitemap at ${sitemapPath}`);
  }

  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length === 0) {
    throw new Error(`No <loc> URLs found in ${sitemapPath}`);
  }

  for (const loc of locs) {
    if (!loc.startsWith(BASE_URL)) {
      throw new Error(`Sitemap URL does not use ${BASE_URL}: ${loc}`);
    }
    if (loc !== `${BASE_URL}/` && loc.endsWith('/')) {
      throw new Error(`Subpage sitemap URL has unexpected trailing slash: ${loc}`);
    }
  }

  return locs;
}

function verifyAndFinalizeRouteHtml(htmlPath, canonicalUrl) {
  assertExists(htmlPath, `static route HTML (${canonicalUrl})`);
  const html = fs.readFileSync(htmlPath, 'utf8');

  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/gi)];
  if (canonicalMatches.length !== 1 || canonicalMatches[0][1] !== canonicalUrl) {
    throw new Error(
      `Canonical mismatch in ${htmlPath}: expected exactly 1 tag for "${canonicalUrl}", found ${canonicalMatches
        .map((m) => m[1])
        .join(', ')}`
    );
  }

  const ogUrlMatch = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"\s*\/?>/i);
  if (!ogUrlMatch || ogUrlMatch[1] !== canonicalUrl) {
    throw new Error(`og:url mismatch in ${htmlPath}: expected "${canonicalUrl}"`);
  }

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"\s*\/?>/i);
  if (!titleMatch || !titleMatch[1].trim() || !descMatch || !descMatch[1].trim()) {
    throw new Error(`Missing title or meta description in ${htmlPath}`);
  }

  const rootMatch = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/i);
  if (!rootMatch || rootMatch[1].trim().length < 200 || !/<h1\b/i.test(rootMatch[1])) {
    throw new Error(`Missing semantic pre-rendered #root content (with <h1>) in ${htmlPath}`);
  }

  return {
    title: titleMatch[1].trim(),
    canonicalUrl,
  };
}

function main() {
  assertExists(DIST_DIR, 'dist directory');
  assertExists(path.join(DIST_DIR, 'index.html'), 'dist/index.html');

  ensureNoConflictingRedirects();
  ensureRobotsTxt();

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  const urls = parseSitemapUrls(sitemapPath);

  const seenTitles = new Map();
  let verifiedCount = 0;

  for (const url of urls) {
    const routePath = url.slice(BASE_URL.length) || '/';
    const slug = routePath === '/' ? '' : routePath.slice(1);
    const targetHtmlPath =
      routePath === '/' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, `${slug}.html`);

    // Clean up any legacy directory-index folder that would trigger a trailing-slash redirect mismatch
    if (slug) {
      const legacyDir = path.join(DIST_DIR, slug);
      if (fs.existsSync(legacyDir) && fs.statSync(legacyDir).isDirectory()) {
        fs.rmSync(legacyDir, { recursive: true, force: true });
      }
    }

    const { title } = verifyAndFinalizeRouteHtml(targetHtmlPath, url);
    if (seenTitles.has(title)) {
      throw new Error(`Duplicate <title> "${title}" found on ${url} and ${seenTitles.get(title)}`);
    }
    seenTitles.set(title, url);
    verifiedCount++;
  }

  console.log(
    `Verified ${verifiedCount} static SEO HTML files in dist/ (non-www, HTTPS, self-referencing canonicals, valid sitemap.xml & robots.txt)`
  );
}

main();
