import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ConverterPage } from './pages/ConverterPage';
import { AboutPage, ContactPage } from './pages/InfoPages';
import { findConverterBySlug } from './data/converters';
import { RICH_CONVERTER_CONTENT } from './data/richConverterContent';
import { updatePageSEO } from './utils/seo';

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  const cleaned = rawPath.replace(/\/+$/, '');
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
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

  // Listen to browser Back / Forward navigation
  useEffect(() => {
    const onPopState = () => {
      setPreservedInput(undefined);
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (to: string, options?: { preserveInput?: string; scrollToId?: string }) => {
      const targetPath = normalizePath(to.split('#')[0] || '/');
      setPreservedInput(options?.preserveInput);

      if (targetPath !== currentPath) {
        window.history.pushState({}, '', targetPath);
        setCurrentPath(targetPath);
      }

      if (options?.scrollToId) {
        setTimeout(() => {
          const el = document.getElementById(options.scrollToId!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    },
    [currentPath]
  );

  // Resolve current route and update SEO title + meta description + FAQ schema
  const slug = currentPath.slice(1);
  const activeConverter = findConverterBySlug(slug);

  useEffect(() => {
    if (currentPath === '/') {
      updatePageSEO({
        title: 'UnitSwift – Convert Any Unit in a Swift | Free Unit Converter',
        description:
          'Convert weight, length, temperature, volume, and speed units instantly with UnitSwift. Free, fast, no sign-up unit converter.',
        path: '/',
      });
    } else if (activeConverter) {
      const richContent = RICH_CONVERTER_CONTENT[activeConverter.slug];
      updatePageSEO({
        title: activeConverter.seoTitle,
        description: activeConverter.seoDescription,
        path: `/${activeConverter.slug}`,
        faqs: richContent?.faqs,
      });
    } else if (currentPath === '/about') {
      updatePageSEO({
        title: 'About UnitSwift – Free, Fast Unit Converter By Naseeb',
        description:
          'Learn how UnitSwift delivers instant, accurate unit conversions in your browser with no sign-up and no ads popups.',
        path: '/about',
      });
    } else if (currentPath === '/contact') {
      updatePageSEO({
        title: 'Contact UnitSwift – Suggest a Converter or Send Feedback',
        description:
          'Get in touch with Naseeb at UnitSwift to request new unit converters or share feedback.',
        path: '/contact',
      });
    } else {
      updatePageSEO({
        title: 'Page Not Found – UnitSwift',
        description: 'Explore all 50 free unit converters on UnitSwift.',
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
      ) : (
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
          <p className="text-xs font-mono-tabular font-semibold text-[#1F2A44]/60 dark:text-[#F2C94C]">
            404 · Converter Not Found
          </p>
          <h1 className="text-3xl font-bold text-[#1F2A44] dark:text-white">
            We couldn&rsquo;t find that unit page
          </h1>
          <p className="text-sm text-[#1F2A44]/70 dark:text-slate-300 max-w-md mx-auto">
            The URL <code className="font-mono-tabular">{currentPath}</code> doesn&rsquo;t match one of our 50 unit converters.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2.5 text-sm font-bold rounded-xl bg-[#F2C94C] text-[#1F2A44] hover:brightness-95 transition-all cursor-pointer"
            >
              Browse All 50 Converters
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
