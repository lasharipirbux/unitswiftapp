import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ConverterPage } from './pages/ConverterPage';
import { AboutPage, ContactPage, PrivacyPolicyPage } from './pages/InfoPages';
import { CATEGORIES, findConverterBySlug } from './data/converters';
import { RICH_CONVERTER_CONTENT } from './data/richConverterContent';
import { updatePageSEO } from './utils/seo';

const SESSION_PATH_KEY = 'unitswift_active_path';

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  const withoutHash = rawPath.split('#')[0] || '/';
  const withoutQuery = withoutHash.split('?')[0] || '/';
  const cleaned = withoutQuery.replace(/\/+$/, '');
  if (!cleaned) return '/';
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

function getInitialPath(): string {
  const urlPath = normalizePath(window.location.pathname);
  if (urlPath !== '/') {
    try {
      sessionStorage.setItem(SESSION_PATH_KEY, urlPath);
    } catch {
      // Ignore storage errors
    }
    return urlPath;
  }

  // If the preview iframe reloaded at '/', restore the active converter path from sessionStorage
  try {
    const savedPath = sessionStorage.getItem(SESSION_PATH_KEY);
    if (savedPath && savedPath !== '/') {
      const normalizedSaved = normalizePath(savedPath);
      if (
        findConverterBySlug(normalizedSaved.slice(1)) ||
        normalizedSaved === '/about' ||
        normalizedSaved === '/contact' ||
        normalizedSaved === '/privacy-policy'
      ) {
        return normalizedSaved;
      }
    }
  } catch {
    // Ignore storage errors
  }

  return '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [preservedInput, setPreservedInput] = useState<string | undefined>(undefined);

  // Default to light mode for every visitor regardless of device settings, and remember manual toggle choice
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('unitswift_theme_mode') === 'dark';
    } catch {
      return false;
    }
  });

  // Apply .dark class to <html> and remember choice
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('unitswift_theme_mode', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [isDark]);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Ensure initial history entry and URL match currentPath on mount, and listen to browser Back / Forward buttons
  useEffect(() => {
    const initialNormalized = normalizePath(currentPath);
    try {
      sessionStorage.setItem(SESSION_PATH_KEY, initialNormalized);
      if (normalizePath(window.location.pathname) !== initialNormalized || !window.history.state?.path) {
        window.history.replaceState(
          { path: initialNormalized, scrollToId: window.history.state?.scrollToId },
          '',
          initialNormalized
        );
      }
    } catch {
      // Ignore history/storage errors
    }
  }, []);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const statePath = typeof event.state?.path === 'string' ? event.state.path : window.location.pathname;
      const nextPath = normalizePath(statePath);
      try {
        sessionStorage.setItem(SESSION_PATH_KEY, nextPath);
      } catch {
        // Ignore storage errors
      }
      setPreservedInput(undefined);
      setCurrentPath(nextPath);

      const scrollToId = event.state?.scrollToId || (window.location.hash ? window.location.hash.slice(1) : undefined);
      if (scrollToId) {
        setTimeout(() => {
          const el = document.getElementById(scrollToId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (to: string, options?: { preserveInput?: string; scrollToId?: string }) => {
      const hashFromTo = to.includes('#') ? to.split('#')[1] : undefined;
      const scrollTargetId = options?.scrollToId || hashFromTo;
      const targetPath = normalizePath(to);

      setPreservedInput(options?.preserveInput);

      try {
        sessionStorage.setItem(SESSION_PATH_KEY, targetPath);
      } catch {
        // Ignore storage errors
      }

      setCurrentPath((prevPath) => {
        const currentUrlPath = normalizePath(window.location.pathname);
        if (targetPath !== prevPath || targetPath !== currentUrlPath) {
          try {
            window.history.pushState(
              { path: targetPath, scrollToId: scrollTargetId },
              '',
              targetPath
            );
          } catch {
            // Ignore pushState errors
          }
        }
        return targetPath;
      });

      if (scrollTargetId) {
        setTimeout(() => {
          const el = document.getElementById(scrollTargetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    },
    []
  );

  // Resolve current route and update SEO title + meta description + FAQ schema
  const slug = currentPath.slice(1);
  const activeConverter = findConverterBySlug(slug);

  useEffect(() => {
    if (currentPath === '/') {
      updatePageSEO({
        title: 'UnitSwift – Convert Any Unit in a Swift | 70 Free Unit Converters',
        description:
          'Convert weight, length, temperature, volume, speed, area, local and data units instantly. Free, fast unit converter with 70 calculators.',
        path: '/',
      });
    } else if (activeConverter) {
      const richContent = RICH_CONVERTER_CONTENT[activeConverter.slug];
      const categoryObj = CATEGORIES.find((c) => c.id === activeConverter.category);
      updatePageSEO({
        title: activeConverter.seoTitle,
        description: activeConverter.seoDescription,
        path: `/${activeConverter.slug}`,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: categoryObj?.name || activeConverter.category, path: `/#category-${activeConverter.category}` },
          { name: activeConverter.shortTitle, path: `/${activeConverter.slug}` },
        ],
        faqs: richContent?.faqs,
      });
    } else if (currentPath === '/about') {
      updatePageSEO({
        title: 'About UnitSwift – Free Unit Converter Built by Naseeb',
        description:
          'UnitSwift is a free unit converter with 70 calculators built by Naseeb, offering instant browser conversions with no sign-up and no personal tracking.',
        path: '/about',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ],
      });
    } else if (currentPath === '/contact') {
      updatePageSEO({
        title: 'Contact UnitSwift – Report an Issue or Request a Unit',
        description:
          'Found a wrong conversion value or want a new converter added to UnitSwift? Write to us directly by email to share feedback or unit requests.',
        path: '/contact',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ],
      });
    } else if (currentPath === '/privacy-policy') {
      updatePageSEO({
        title: 'Privacy Policy – UnitSwift Free Online Unit Converter',
        description:
          'Read the UnitSwift Privacy Policy. We do not collect personal data, all calculations happen in your browser, and future analytics or ads may use cookies.',
        path: '/privacy-policy',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ],
      });
    } else {
      updatePageSEO({
        title: 'Page Not Found – UnitSwift',
        description: 'Explore all 70 free unit converters on UnitSwift.',
        path: currentPath,
      });
    }
  }, [currentPath, activeConverter]);

  return (
    <Layout
      currentPath={currentPath}
      navigate={navigate}
      isDark={isDark}
      onToggleTheme={handleToggleTheme}
    >
      {currentPath === '/' ? (
        <HomePage navigate={navigate} />
      ) : activeConverter ? (
        <ConverterPage
          converter={activeConverter}
          initialInput={preservedInput}
          navigate={navigate}
        />
      ) : currentPath === '/about' ? (
        <AboutPage navigate={navigate} />
      ) : currentPath === '/contact' ? (
        <ContactPage navigate={navigate} />
      ) : currentPath === '/privacy-policy' ? (
        <PrivacyPolicyPage navigate={navigate} />
      ) : (
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
          <p className="text-xs font-mono-tabular font-semibold text-[#1F2A44]/60 dark:text-[#F2C94C]">
            404 · Converter Not Found
          </p>
          <h1 className="text-3xl font-bold text-[#1F2A44] dark:text-white">
            We couldn&rsquo;t find that unit page
          </h1>
          <p className="text-sm text-[#1F2A44]/70 dark:text-slate-300 max-w-md mx-auto">
            The URL <code className="font-mono-tabular">{currentPath}</code> doesn&rsquo;t match one of our 70 unit converters.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2.5 text-sm font-bold rounded-xl bg-[#F2C94C] text-[#1F2A44] hover:brightness-95 transition-all cursor-pointer"
            >
              Browse All 70 Converters
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
