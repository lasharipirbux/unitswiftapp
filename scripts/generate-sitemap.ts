import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONVERTERS } from '../src/data/converters';

export const BASE_URL = 'https://unitswift.org';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapEntries(lastmod = getTodayDateString()): SitemapEntry[] {
  const seen = new Set<string>();
  const entries: SitemapEntry[] = [];

  const addEntry = (rawPath: string, changefreq: SitemapEntry['changefreq'], priority: string) => {
    const cleanPath = rawPath === '/' ? '/' : `/${rawPath.replace(/^\/+|\/+$/g, '')}`;
    const loc = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;

    if (loc.includes('://www.')) {
      throw new Error(`Invalid sitemap URL contains www: ${loc}`);
    }
    if (seen.has(loc)) {
      return;
    }
    seen.add(loc);
    entries.push({ loc, lastmod, changefreq, priority });
  };

  // Home page
  addEntry('/', 'weekly', '1.0');

  // All converter pages generated automatically from the live CONVERTERS registry
  for (const converter of CONVERTERS) {
    const slug = converter.slug.trim();
    if (!slug) {
      throw new Error(`Empty converter slug found for "${converter.title}"`);
    }
    addEntry(`/${slug}`, 'monthly', converter.popular ? '0.9' : '0.8');
  }

  // Static pages
  addEntry('/about', 'monthly', '0.6');
  addEntry('/contact', 'monthly', '0.6');
  addEntry('/privacy-policy', 'monthly', '0.5');

  return entries;
}

export function generateSitemapXml(lastmod = getTodayDateString()): { xml: string; totalUrls: number } {
  const entries = buildSitemapEntries(lastmod);

  const urlBlocks = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlBlocks}\n</urlset>\n`;

  return { xml, totalUrls: entries.length };
}

export function writeSitemapFile(rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')): {
  outputPath: string;
  totalUrls: number;
  converterCount: number;
  lastmod: string;
} {
  const lastmod = getTodayDateString();
  const { xml, totalUrls } = generateSitemapXml(lastmod);
  const outputPath = path.join(rootDir, 'public', 'sitemap.xml');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, xml, 'utf8');

  return {
    outputPath,
    totalUrls,
    converterCount: CONVERTERS.length,
    lastmod,
  };
}

const isDirectExecution =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectExecution) {
  const result = writeSitemapFile();
  console.log(
    `Generated sitemap.xml with ${result.totalUrls} URLs (${result.converterCount} converters + 4 static pages, lastmod ${result.lastmod})`
  );
}
