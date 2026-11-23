import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, ChevronDown, ArrowRight, ArrowUp, Download } from 'lucide-react';
import { CONVERTERS, CATEGORIES, CategoryId } from '../data/converters';
import { LogoMark } from './LogoMark';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface LayoutProps {
  currentPath: string;
  navigate: (to: string, options?: { preserveInput?: string; scrollToId?: string }) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentPath,
  navigate,
  isDark,
  onToggleTheme,
  children,
}) => {
  const [activeDesktopCategory, setActiveDesktopCategory] = useState<CategoryId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<CategoryId | null>(null);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const hoverOpenedTimestampRef = useRef<number>(0);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleDesktopClose = () => {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveDesktopCategory(null);
    }, 140);
  };

  // Listen for browser PWA install availability (beforeinstallprompt)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredInstallPrompt) return;
    await deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredInstallPrompt(null);
    }
  };

  // Close dropdown and mobile menu on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDesktopCategory(null);
        setMobileMenuOpen(false);
      }
    };

    const handleDocumentMouseDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDesktopCategory(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      clearCloseTimer();
    };
  }, []);

  // Show Back to Top button after scrolling down a little
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, scrollToId?: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    clearCloseTimer();
    setActiveDesktopCategory(null);
    setMobileMenuOpen(false);
    navigate(path, { scrollToId });
  };

  const handleDesktopCategoryMouseEnter = (catId: CategoryId) => {
    clearCloseTimer();
    if (activeDesktopCategory !== catId) {
      hoverOpenedTimestampRef.current = Date.now();
      setActiveDesktopCategory(catId);
    }
  };

  const handleDesktopCategoryClick = (catId: CategoryId) => {
    clearCloseTimer();
    if (activeDesktopCategory === catId) {
      // If it was just opened by hover right before the click (<250ms), keep it open; otherwise toggle closed
      if (Date.now() - hoverOpenedTimestampRef.current > 250) {
        setActiveDesktopCategory(null);
      } else {
        hoverOpenedTimestampRef.current = 0;
      }
    } else {
      hoverOpenedTimestampRef.current = 0;
      setActiveDesktopCategory(catId);
    }
  };

  const toggleMobileCategory = (catId: CategoryId) => {
    setMobileExpandedCategory((prev) => (prev === catId ? null : catId));
  };

  const activeCategoryObj = activeDesktopCategory
    ? CATEGORIES.find((c) => c.id === activeDesktopCategory)
    : null;

  const activeCategoryConverters = activeDesktopCategory
    ? CONVERTERS.filter((c) => c.category === activeDesktopCategory)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2A44] dark:bg-[#0F1626] dark:text-[#F6F8FA] transition-colors duration-150">
      {/* Thin yellow measuring-tape strip with tick marks at the very top only */}
      <div
        aria-hidden="true"
        className="w-full h-2.5 bg-[#F2C94C] border-b border-[#1F2A44]/20 measuring-tape-ticks shrink-0 select-none"
      />

      {/* Top Navigation Bar */}
      <header
        ref={headerRef}
        className="sticky top-0 z-30 bg-white dark:bg-[#0F1626] border-b border-[#E2E8F0] dark:border-white/10"
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-1.5 xl:gap-2 px-3 sm:px-5 h-16">
          {/* Left: UnitSwift Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="inline-flex items-center gap-1.5 lg:gap-2 text-base lg:text-lg xl:text-xl font-bold tracking-tight text-[#1F2A44] dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2C94C]"
          >
            <LogoMark className="w-6 h-6 xl:w-7 xl:h-7 shrink-0" />
            <span>UnitSwift</span>
          </a>

          {/* Center (Laptop & Desktop >= 1024px): Category Links + Bulk CSV on a Single Line */}
          <nav
            aria-label="Unit Categories"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleDesktopClose}
            className="hidden lg:flex items-center gap-0 xl:gap-0.5 whitespace-nowrap min-w-0"
          >
            {CATEGORIES.map((cat) => {
              const isOpen = activeDesktopCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onMouseEnter={() => handleDesktopCategoryMouseEnter(cat.id)}
                  onClick={() => handleDesktopCategoryClick(cat.id)}
                  className={`inline-flex items-center gap-0.5 px-1 xl:px-2 py-2 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isOpen
                      ? 'bg-[#F1F5F9] dark:bg-white/10 text-[#1F2A44] dark:text-[#F2C94C]'
                      : 'text-[#1F2A44] dark:text-slate-200 hover:bg-[#F8FAFC] dark:hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#1F2A44] dark:text-slate-300 transition-transform duration-150 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              );
            })}
            <a
              href="/bulk-converter/"
              onClick={(e) => handleLinkClick(e, '/bulk-converter/')}
              className={`inline-flex items-center px-1.5 xl:px-2 py-2 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentPath === '/bulk-converter'
                  ? 'bg-[#F2C94C]/25 dark:bg-[#F2C94C]/15 text-[#1F2A44] dark:text-[#F2C94C]'
                  : 'text-[#1F2A44] dark:text-slate-200 hover:bg-[#F8FAFC] dark:hover:bg-white/5'
              }`}
            >
              Bulk CSV
            </a>
          </nav>

          {/* Far Right: Tablet Bulk CSV + Optional Install App Button + Dark Mode Button + Mobile/Tablet (<1024px) Menu Button */}
          <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
            <a
              href="/bulk-converter/"
              onClick={(e) => handleLinkClick(e, '/bulk-converter/')}
              className={`hidden md:inline-flex lg:hidden items-center px-2.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentPath === '/bulk-converter'
                  ? 'bg-[#F2C94C]/25 dark:bg-[#F2C94C]/15 text-[#1F2A44] dark:text-[#F2C94C]'
                  : 'text-[#1F2A44] dark:text-slate-200 hover:bg-[#F8FAFC] dark:hover:bg-white/5'
              }`}
            >
              Bulk CSV
            </a>

            {deferredInstallPrompt && (
              <button
                type="button"
                onClick={handleInstallClick}
                aria-label="Install UnitSwift app"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg bg-[#F2C94C] text-[#1F2A44] hover:brightness-95 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F2A44]"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Install app</span>
              </button>
            )}

            <button
              type="button"
              onClick={onToggleTheme}
              title="Toggle dark mode"
              aria-label="Toggle dark mode"
              aria-pressed={isDark}
              className="w-9 h-9 rounded-full inline-flex items-center justify-center bg-[#1F2A44] text-white dark:bg-[#F2C94C] dark:text-[#1F2A44] hover:opacity-90 transition-opacity shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C94C]"
            >
              {isDark ? (
                <Sun aria-hidden="true" className="w-4 h-4 shrink-0" />
              ) : (
                <Moon aria-hidden="true" className="w-4 h-4 shrink-0" />
              )}
            </button>

            {/* Mobile & Tablet (<1024px) Menu Button — hidden on laptop/desktop (lg:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-[#151F33] text-[#1F2A44] dark:text-white border border-[#1F2A44]/25 dark:border-white/20 hover:bg-[#F1F5F9] dark:hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 shrink-0" />
                  <span>Menu</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 shrink-0" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Laptop & Desktop (>= 1024px) Big Dropdown Panel */}
        {activeCategoryObj && (
          <div
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleDesktopClose}
            className="hidden lg:block absolute left-0 right-0 top-full z-40 px-4 sm:px-6 pt-2 pb-4 pointer-events-none"
          >
            <div className="max-w-[960px] mx-auto rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 p-6 pointer-events-auto">
              <div className="flex items-center justify-between gap-4 pb-3 mb-4 border-b border-[#1F2A44]/10 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-bold text-[#1F2A44] dark:text-white">
                      {activeCategoryObj.name} Converters
                    </h2>
                    {activeCategoryObj.note && (
                      <span className="text-xs font-medium text-[#1F2A44] dark:text-[#F2C94C] bg-[#F2C94C]/25 dark:bg-[#F2C94C]/15 border border-[#F2C94C]/50 rounded-md px-2 py-0.5">
                        {activeCategoryObj.note}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#1F2A44] dark:text-slate-300 mt-0.5">
                    {activeCategoryObj.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#1F2A44] dark:text-slate-300 font-mono-tabular shrink-0">
                  {activeCategoryConverters.length} {activeCategoryConverters.length === 1 ? 'calculator' : 'calculators'}
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
                {activeCategoryConverters.map((conv) => (
                  <a
                    key={conv.slug}
                    href={`/${conv.slug}/`}
                    onClick={(e) => handleLinkClick(e, `/${conv.slug}/`)}
                    className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0F1626] border border-[#1F2A44]/12 dark:border-white/10 hover:border-[#F2C94C] dark:hover:border-[#F2C94C] transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#1F2A44] dark:text-white">
                      {conv.shortTitle}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="w-4 h-4 text-[#1F2A44] dark:text-slate-300 group-hover:translate-x-1 transition-transform shrink-0"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile & Tablet (<1024px) Full-Width Expandable Category Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Unit Categories"
            className="lg:hidden w-full bg-white dark:bg-[#0F1626] border-t border-[#E2E8F0] dark:border-white/10 max-h-[80vh] overflow-y-auto"
          >
            <div className="divide-y divide-[#1F2A44]/10 dark:divide-white/10">
              {CATEGORIES.map((cat) => {
                const isExpanded = mobileExpandedCategory === cat.id;
                const catConverters = CONVERTERS.filter((c) => c.category === cat.id);

                return (
                  <div key={cat.id} className="bg-white dark:bg-[#0F1626]">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => toggleMobileCategory(cat.id)}
                      className="w-full flex items-center justify-between px-4 sm:px-6 py-3.5 text-left text-sm font-bold text-[#1F2A44] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.name}</span>
                        {cat.note && (
                          <span className="text-[11px] font-medium text-[#1F2A44]/75 dark:text-[#F2C94C]">
                            ({cat.note})
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`w-4 h-4 text-[#1F2A44] dark:text-slate-300 transition-transform duration-150 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#F8FAFC] dark:bg-[#151F33]">
                        {catConverters.map((conv) => (
                          <a
                            key={conv.slug}
                            href={`/${conv.slug}/`}
                            onClick={(e) => handleLinkClick(e, `/${conv.slug}/`)}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0F1626] border border-[#1F2A44]/15 dark:border-white/15 hover:border-[#F2C94C] transition-colors"
                          >
                            <span className="text-sm font-semibold text-[#1F2A44] dark:text-white">
                              {conv.shortTitle}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className="w-4 h-4 text-[#1F2A44] dark:text-slate-300 shrink-0"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="bg-white dark:bg-[#0F1626]">
                <a
                  href="/bulk-converter/"
                  onClick={(e) => handleLinkClick(e, '/bulk-converter/')}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-3.5 text-left text-sm font-bold text-[#1F2A44] dark:text-[#F2C94C] hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors"
                >
                  <span>Bulk Convert (CSV)</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Soft Dark Charcoal (#1F2937) Footer with Thin Accent Top Border, White Headings, and Light Gray (#D1D5DB) Text */}
      <footer className="bg-[#1F2937] text-[#D1D5DB] border-t-2 border-[#38BDF8] mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-white/10">
            {/* Column 1: Brand & Author */}
            <div className="min-w-0 space-y-3">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="text-lg font-bold tracking-tight text-white hover:text-[#38BDF8] transition-colors inline-block"
              >
                UnitSwift
              </a>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                Convert any unit in a swift. Pure client-side precision math with zero popups, zero tracking, and instant results on any device.
              </p>
            </div>

            {/* Column 3: Navigation Column (Home, About, Contact, Privacy Policy, Terms) */}
            <div className="min-w-[130px] space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Navigation
              </h2>
              <ul className="space-y-2.5 text-sm font-semibold">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="text-[#D1D5DB] hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/bulk-converter/"
                    onClick={(e) => handleLinkClick(e, '/bulk-converter/')}
                    className="text-[#D1D5DB] hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    Bulk Convert (CSV)
                  </a>
                </li>
                <li>
                  <a
                    href="/about/"
                    onClick={(e) => handleLinkClick(e, '/about/')}
                    className="text-[#D1D5DB] hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact/"
                    onClick={(e) => handleLinkClick(e, '/contact/')}
                    className="text-[#D1D5DB] hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy/"
                    onClick={(e) => handleLinkClick(e, '/privacy-policy/')}
                    className="text-[#D1D5DB] hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms/"
                    onClick={(e) => handleLinkClick(e, '/terms/')}
                    className="text-[#D1D5DB] hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/disclaimer/"
                    onClick={(e) => handleLinkClick(e, '/disclaimer/')}
                    className="text-[#D1D5DB] hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-medium text-[#D1D5DB]">
            <div className="flex flex-wrap items-center gap-2 text-[#D1D5DB]">
              <span className="font-bold text-white">UnitSwift</span>
              <span aria-hidden="true" className="text-[#D1D5DB]/60">·</span>
              <span className="font-semibold text-white">By Naseeb</span>
              <span aria-hidden="true" className="text-[#D1D5DB]/60">·</span>
              <span className="text-[#D1D5DB]">Free, fast, no sign-up.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Back to Top Button (Bottom-Right) */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-[#1F2A44] text-[#F2C94C] dark:bg-[#F2C94C] dark:text-[#1F2A44] border-2 border-[#F2C94C] dark:border-[#1F2A44] shadow-md hover:brightness-95 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C94C] ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
      </button>
    </div>
  );
};
