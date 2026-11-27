import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { CATEGORIES, CONVERTERS, findConverterBySlug, getConverterSeoTitle, getConverterSeoDescription } from '../src/data/converters';
import { RICH_CONVERTER_CONTENT } from '../src/data/richConverterContent';
import { Layout } from '../src/components/Layout';
import { HomePage } from '../src/pages/HomePage';
import { ConverterPage } from '../src/pages/ConverterPage';
import { BulkConverterPage } from '../src/pages/BulkConverterPage';
import {
  AboutPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsPage,
  DisclaimerPage,
} from '../src/pages/InfoPages';

export const BASE_URL = 'https://unitswift.org';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
export const DEFAULT_OG_IMAGE_ALT = 'UnitSwift - Free Unit Converters';

interface RouteMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  noindex?: boolean;
  breadcrumbs?: { name: string; path: string }[];
  faqs?: { question: string; answer: string }[];
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export function normalizeRoutePath(rawUrl: string): string {
  const withoutHash = rawUrl.split('#')[0] || '/';
  const withoutQuery = withoutHash.split('?')[0] || '/';
  const cleaned = withoutQuery.replace(/\/+$/, '');
  if (!cleaned) return '/';
  const normalized = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  if (normalized === '/privacy') return '/privacy-policy';
  return normalized;
}

export function resolveRouteMeta(rawPath: string): RouteMeta {
  const currentPath = normalizeRoutePath(rawPath);

  if (currentPath === '/') {
    return {
      title: `UnitSwift – ${CONVERTERS.length} Free Online Unit Converters & Pakistani Land/Weight Calculators`,
      description: `Convert weight, length, area, temperature, data, and Pakistani local units (Marla, Kanal, Tola, Seer, Maund, Gaz) instantly. ${CONVERTERS.length} free, fast, client-side converters with Bulk CSV support.`,
      canonicalUrl: `${BASE_URL}/`,
    };
  }

  const slug = currentPath.slice(1);
  const converter = findConverterBySlug(slug);
  if (converter) {
    const rich = RICH_CONVERTER_CONTENT[converter.slug];
    const categoryObj = CATEGORIES.find((c) => c.id === converter.category);
    return {
      title: getConverterSeoTitle(converter),
      description: getConverterSeoDescription(converter),
      canonicalUrl: `${BASE_URL}/${converter.slug}`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: categoryObj?.name || converter.category, path: `/#category-${converter.category}` },
        { name: converter.shortTitle, path: `/${converter.slug}` },
      ],
      faqs: rich?.faqs,
    };
  }

  if (currentPath === '/bulk-converter') {
    return {
      title: 'Bulk Unit Converter (CSV) – Convert Many Values at Once | UnitSwift',
      description:
        'Convert many unit values at once with UnitSwift Bulk Converter. Upload a CSV file or paste numbers for any unit pair and download the result CSV in your browser.',
      canonicalUrl: `${BASE_URL}/bulk-converter`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Bulk Convert (CSV)', path: '/bulk-converter' },
      ],
    };
  }

  if (currentPath === '/about') {
    return {
      title: 'About UnitSwift – Free Unit Converter Built by Naseeb',
      description: `UnitSwift is a free unit converter with ${CONVERTERS.length} calculators built by Naseeb, offering instant browser conversions with no sign-up and no personal tracking.`,
      canonicalUrl: `${BASE_URL}/about`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
    };
  }

  if (currentPath === '/contact') {
    return {
      title: 'Contact UnitSwift – Report an Issue or Request a Unit',
      description:
        'Found a wrong conversion value or want a new converter added to UnitSwift? Write to us directly by email to share feedback or unit requests.',
      canonicalUrl: `${BASE_URL}/contact`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ],
    };
  }

  if (currentPath === '/privacy-policy') {
    return {
      title: 'Privacy Policy – UnitSwift Free Online Unit Converter',
      description:
        'Read the UnitSwift Privacy Policy. We do not collect personal data, all calculations happen in your browser, and future analytics or ads may use cookies.',
      canonicalUrl: `${BASE_URL}/privacy-policy`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
      ],
    };
  }

  if (currentPath === '/terms') {
    return {
      title: 'Terms of Service – UnitSwift Free Online Unit Converter',
      description: `Read the UnitSwift Terms of Service for using our ${CONVERTERS.length} free browser-based unit conversion calculators.`,
      canonicalUrl: `${BASE_URL}/terms`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    };
  }

  if (currentPath === '/disclaimer') {
    return {
      title: 'Disclaimer – UnitSwift Free Online Unit Converter',
      description: `Read the UnitSwift Disclaimer regarding informational calculations, regional unit variations like Marla and Tola, and reference accuracy.`,
      canonicalUrl: `${BASE_URL}/disclaimer`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Disclaimer', path: '/disclaimer' },
      ],
    };
  }

  return {
    title: 'Page Not Found – UnitSwift',
    description: `Explore all ${CONVERTERS.length} free unit converters on UnitSwift.`,
    canonicalUrl: `${BASE_URL}${currentPath}`,
    noindex: true,
  };
}

export function renderRouteBodyHtml(rawPath: string): string {
  const currentPath = normalizeRoutePath(rawPath);
  const noopNavigate = () => {};
  const noopToggleTheme = () => {};

  const slug = currentPath.slice(1);
  const activeConverter = findConverterBySlug(slug);

  let pageNode: React.ReactNode;
  if (currentPath === '/') {
    pageNode = React.createElement(HomePage, { navigate: noopNavigate });
  } else if (activeConverter) {
    pageNode = React.createElement(ConverterPage, {
      converter: activeConverter,
      navigate: noopNavigate,
    });
  } else if (currentPath === '/bulk-converter') {
    pageNode = React.createElement(BulkConverterPage, { navigate: noopNavigate });
  } else if (currentPath === '/about') {
    pageNode = React.createElement(AboutPage, { navigate: noopNavigate });
  } else if (currentPath === '/contact') {
    pageNode = React.createElement(ContactPage, { navigate: noopNavigate });
  } else if (currentPath === '/privacy-policy') {
    pageNode = React.createElement(PrivacyPolicyPage, { navigate: noopNavigate });
  } else if (currentPath === '/terms') {
    pageNode = React.createElement(TermsPage, { navigate: noopNavigate });
  } else if (currentPath === '/disclaimer') {
    pageNode = React.createElement(DisclaimerPage, { navigate: noopNavigate });
  } else {
    pageNode = React.createElement(HomePage, { navigate: noopNavigate });
  }

  return renderToString(
    React.createElement(Layout, {
      currentPath,
      navigate: noopNavigate,
      isDark: false,
      onToggleTheme: noopToggleTheme,
      children: pageNode,
    })
  );
}

export function injectRouteMeta(html: string, rawPath: string, includePrerenderedBody = false): string {
  const meta = resolveRouteMeta(rawPath);
  const titleAttr = escapeHtmlAttr(meta.title);
  const titleText = escapeHtmlText(meta.title);
  const descAttr = escapeHtmlAttr(meta.description);
  const canonicalAttr = escapeHtmlAttr(meta.canonicalUrl);
  const robotsContent = meta.noindex ? 'noindex, nofollow' : 'index, follow';

  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${titleText}</title>`);
  out = out.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${robotsContent}" />`
  );
  const canonicalTag = `<link rel="canonical" href="${canonicalAttr}" />`;
  if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i.test(out)) {
    out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, canonicalTag);
  } else if (/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i.test(out)) {
    out = out.replace(
      /(<meta\s+name="robots"\s+content="[^"]*"\s*\/?>)/i,
      `$1\n    ${canonicalTag}`
    );
  } else {
    out = out.replace('</head>', `    ${canonicalTag}\n  </head>`);
  }
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${descAttr}" />`
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${titleAttr}" />`
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${descAttr}" />`
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalAttr}" />`
  );
  out = out.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`
  );
  out = out.replace(
    /<meta\s+property="og:image:width"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image:width" content="1200" />`
  );
  out = out.replace(
    /<meta\s+property="og:image:height"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image:height" content="630" />`
  );
  out = out.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image:alt" content="${DEFAULT_OG_IMAGE_ALT}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${titleAttr}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${descAttr}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`
  );

  const webAppSchema = safeJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    url: meta.canonicalUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    description: meta.description,
    author: {
      '@type': 'Person',
      name: 'Naseeb',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  });

  out = out.replace(
    /<script\s+id="schema-jsonld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="schema-jsonld" type="application/ld+json">${webAppSchema}</script>`
  );

  // Remove any previously injected breadcrumb/faq scripts before re-injecting
  out = out.replace(/<script\s+id="breadcrumb-schema-jsonld"[^>]*>[\s\S]*?<\/script>\s*/g, '');
  out = out.replace(/<script\s+id="faq-schema-jsonld"[^>]*>[\s\S]*?<\/script>\s*/g, '');

  const extraScripts: string[] = [];

  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    const breadcrumbSchema = safeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: meta.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item:
          crumb.path === '/'
            ? `${BASE_URL}/`
            : crumb.path.startsWith('/#')
              ? `${BASE_URL}${crumb.path}`
              : `${BASE_URL}/${crumb.path.replace(/^\/+|\/+$/g, '')}`,
      })),
    });
    extraScripts.push(
      `    <script id="breadcrumb-schema-jsonld" type="application/ld+json">${breadcrumbSchema}</script>`
    );
  }

  if (meta.faqs && meta.faqs.length > 0) {
    const faqSchema = safeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    extraScripts.push(
      `    <script id="faq-schema-jsonld" type="application/ld+json">${faqSchema}</script>`
    );
  }

  if (extraScripts.length > 0) {
    out = out.replace('</head>', `${extraScripts.join('\n')}\n  </head>`);
  }

  if (includePrerenderedBody) {
    const renderedHtml = renderRouteBodyHtml(rawPath);
    out = out.replace('<div id="root"></div>', () => `<div id="root">${renderedHtml}</div>`);
  }

  return out;
}

export function prerenderAllRouteHtml(distDir: string): number {
  const baseHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) return 0;

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  // Pre-render root dist/index.html with full React HTML + canonical & metadata
  fs.writeFileSync(baseHtmlPath, injectRouteMeta(baseHtml, '/', true), 'utf8');

  const routePaths = [
    ...CONVERTERS.map((c) => `/${c.slug}`),
    '/bulk-converter',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ];

  for (const routePath of routePaths) {
    const slug = routePath.slice(1);
    const routeHtmlPath = path.join(distDir, `${slug}.html`);
    fs.writeFileSync(
      routeHtmlPath,
      injectRouteMeta(baseHtml, routePath, true),
      'utf8'
    );

    const legacyDir = path.join(distDir, slug);
    if (fs.existsSync(legacyDir) && fs.statSync(legacyDir).isDirectory()) {
      fs.rmSync(legacyDir, { recursive: true, force: true });
    }
  }

  return routePaths.length;
}

