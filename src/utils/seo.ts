export const BASE_URL = 'https://unitswift.org';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/pwa-512x512.png`;

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  breadcrumbs?: {
    name: string;
    path: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export function updatePageSEO({ title, description, path, breadcrumbs, faqs }: PageSEO) {
  document.title = title;

  const setMeta = (selector: string, attrName: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const normalizedPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;

  setMeta('meta[name="description"]', 'name', 'description', description);
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMeta('meta[property="og:image"]', 'property', 'og:image', DEFAULT_OG_IMAGE);
  setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'UnitSwift');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', DEFAULT_OG_IMAGE);

  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  const schemaScript = document.getElementById('schema-jsonld');
  if (schemaScript) {
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      url: canonicalUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      description,
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
  }

  let breadcrumbScript = document.getElementById('breadcrumb-schema-jsonld') as HTMLScriptElement | null;
  if (breadcrumbs && breadcrumbs.length > 0) {
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'breadcrumb-schema-jsonld';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`}`,
      })),
    });
  } else if (breadcrumbScript) {
    breadcrumbScript.remove();
  }

  let faqScript = document.getElementById('faq-schema-jsonld') as HTMLScriptElement | null;
  if (faqs && faqs.length > 0) {
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.id = 'faq-schema-jsonld';
      faqScript.type = 'application/ld+json';
      document.head.appendChild(faqScript);
    }
    faqScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  } else if (faqScript) {
    faqScript.remove();
  }
}


