import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  Scale,
  Ruler,
  Thermometer,
  Droplets,
  Gauge,
  Grid,
  Landmark,
  HardDrive,
  X,
} from 'lucide-react';
import {
  CATEGORIES,
  CONVERTERS,
  POPULAR_CONVERTER_SLUGS,
  UNITS,
  CategoryId,
} from '../data/converters';
import { LogoMark } from '../components/LogoMark';

interface HomePageProps {
  navigate: (to: string, options?: { preserveInput?: string; scrollToId?: string }) => void;
}

const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  weight: Scale,
  length: Ruler,
  temperature: Thermometer,
  volume: Droplets,
  speed: Gauge,
  area: Grid,
  local: Landmark,
  data: HardDrive,
};

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredConverters = useMemo(() => {
    if (!normalizedQuery) return CONVERTERS;
    return CONVERTERS.filter((conv) => {
      const fromU = UNITS[conv.fromUnitId];
      const toU = UNITS[conv.toUnitId];
      const haystack = [
        conv.slug.replace(/-/g, ' '),
        conv.title,
        conv.shortTitle,
        conv.category,
        fromU?.name,
        fromU?.pluralName,
        fromU?.symbol,
        ...(fromU?.keywords || []),
        toU?.name,
        toU?.pluralName,
        toU?.symbol,
        ...(toU?.keywords || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return normalizedQuery
        .split(/\s+/)
        .every((term) => haystack.includes(term));
    });
  }, [normalizedQuery]);

  const popularConverters = useMemo(() => {
    return POPULAR_CONVERTER_SLUGS.map((slug) =>
      CONVERTERS.find((c) => c.slug === slug)!
    ).filter(Boolean);
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    navigate(`/${slug}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredConverters.length > 0) {
      navigate(`/${filteredConverters[0].slug}`);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0F1626] text-[#1F2A44] dark:text-white">
      {/* HERO SECTION WITH VERY SOFT LIGHT-BLUE GLOW */}
      <section className="relative overflow-hidden border-b border-[#1F2A44]/10 dark:border-white/10 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,_#EBF4FF_0%,_#F5F9FF_50%,_#FFFFFF_100%)] dark:bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,_#172542_0%,_#0F1626_100%)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="mx-auto text-center space-y-8">
            {/* Bold Headline & One Short Line Below */}
            <div className="space-y-4">
              <LogoMark className="w-20 h-20 mx-auto" />
              <h1 className="font-extrabold tracking-tight text-[#1F2A44] dark:text-white leading-[1.12] text-center text-[clamp(36px,9vw,42px)] md:text-[clamp(40px,4.5vw,64px)] md:whitespace-nowrap">
                <span className="block md:inline">Convert any </span>
                <span className="block md:inline">unit in a swift.</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#1F2A44] dark:text-slate-200 max-w-2xl mx-auto">
                {CONVERTERS.length} Dedicated Calculators — free, fast, and instant with no sign-up.
              </p>
            </div>

            {/* Large Search Box with Clearly Visible Border, Dark Readable Placeholder Text, Rounded Corners */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-[#1F2A44] dark:text-slate-300 absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="hero-converter-search"
                  type="text"
                  aria-label="Search unit converters"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder='Search converters, e.g. "kg to pounds", "inch", "celsius"...'
                  className="w-full pl-12 sm:pl-13 pr-24 py-4 sm:py-4.5 text-base sm:text-lg font-medium bg-white dark:bg-[#151F33] text-[#1F2A44] dark:text-white placeholder:text-[#1F2A44]/75 dark:placeholder:text-slate-300 rounded-2xl border-2 border-[#1F2A44]/30 dark:border-white/25 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none transition-colors"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#1F2A44] dark:text-white bg-[#F1F5F9] dark:bg-[#1C2840] border border-[#1F2A44]/20 dark:border-white/20 rounded-xl hover:bg-[#F2C94C] hover:text-[#1F2A44] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                ) : (
                  <span className="hidden sm:inline-block absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#1F2A44] dark:text-slate-300 font-mono-tabular pointer-events-none">
                    {CONVERTERS.length} tools
                  </span>
                )}
              </div>

              {/* Pill-Shaped Quick-Filter Chips with Dark Text */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="text-xs font-bold text-[#1F2A44] dark:text-slate-200 mr-1">
                  Quick filter:
                </span>
                {['kg', 'inch', 'feet', 'miles', 'celsius', 'gallon', 'mph'].map((term) => {
                  const isSelected = normalizedQuery === term;
                  return (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(isSelected ? '' : term)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                        isSelected
                          ? 'bg-[#F2C94C] text-[#1F2A44] border-[#1F2A44]'
                          : 'bg-white dark:bg-[#151F33] text-[#1F2A44] dark:text-white border-[#1F2A44]/25 dark:border-white/20 hover:border-[#F2C94C] hover:bg-[#F8FAFC] dark:hover:bg-white/10'
                      }`}
                    >
                      {term}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BELOW THE QUICK-FILTER CHIPS: MOST POPULAR ROW OF 4 ICON TILES + ALL CONVERTERS GROUPED BY CATEGORY */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-16" id="converters-directory">
        {/* MOST POPULAR ROW OF 4 ICON TILES */}
        <div className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2A44] dark:text-white">
            Most popular
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {popularConverters.map((conv) => {
              const TileIcon = CATEGORY_ICONS[conv.category];
              return (
                <a
                  key={conv.slug}
                  href={`/${conv.slug}`}
                  onClick={(e) => handleCardClick(e, conv.slug)}
                  className="group flex flex-col justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 hover:border-[#F2C94C] dark:hover:border-[#F2C94C] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F0F6FF] dark:bg-[#1E2D4A] text-[#1F2A44] dark:text-[#F2C94C] flex items-center justify-center shrink-0">
                    <TileIcon aria-hidden="true" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <span className="text-sm sm:text-base font-bold text-[#1F2A44] dark:text-white whitespace-nowrap truncate">
                      {conv.shortTitle}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="w-4 h-4 text-[#1F2A44] dark:text-slate-300 group-hover:translate-x-1 transition-transform shrink-0"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Active Search Filter Banner */}
        {normalizedQuery && (
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#1F2A44]/10 dark:border-white/10">
            <p className="text-sm font-semibold text-[#1F2A44] dark:text-slate-200">
              Showing <strong className="font-bold tabular-nums">{filteredConverters.length}</strong> matching converter{filteredConverters.length === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#1F2A44] dark:text-[#F2C94C] underline cursor-pointer"
            >
              Show all {CONVERTERS.length} converters
            </button>
          </div>
        )}

        {/* ALL CONVERTERS AS CLEAN ICON TILES GROUPED BY CATEGORY (4 columns desktop, 3 tablet, 2 mobile) */}
        {filteredConverters.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 text-center space-y-3">
            <p className="text-base font-bold text-[#1F2A44] dark:text-white">
              No unit converters found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-sm font-medium text-[#1F2A44] dark:text-slate-300 max-w-md mx-auto">
              Try searching by unit symbol or name such as &ldquo;kg&rdquo;, &ldquo;inch&rdquo;, &ldquo;feet&rdquo;, &ldquo;miles&rdquo;, &ldquo;celsius&rdquo;, &ldquo;gallon&rdquo;, or &ldquo;mph&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 text-xs font-bold rounded-full bg-[#F2C94C] text-[#1F2A44] hover:brightness-95 transition-all cursor-pointer"
            >
              Show All {CONVERTERS.length} Converters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {CATEGORIES.map((category) => {
              const categoryConverters = filteredConverters.filter(
                (c) => c.category === category.id
              );
              if (categoryConverters.length === 0) return null;

              const IconComponent = CATEGORY_ICONS[category.id];

              return (
                <div
                  key={category.id}
                  id={`category-${category.id}`}
                  className="scroll-mt-24 space-y-5"
                >
                  {/* Category Heading */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F0F6FF] dark:bg-[#1E2D4A] border border-[#1F2A44]/12 dark:border-white/10 text-[#1F2A44] dark:text-[#F2C94C] flex items-center justify-center shrink-0">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2A44] dark:text-white">
                      {category.name}
                    </h2>
                    {category.note && (
                      <span className="text-xs font-medium text-[#1F2A44]/75 dark:text-[#F2C94C] bg-[#F2C94C]/20 dark:bg-[#F2C94C]/10 border border-[#F2C94C]/40 rounded-lg px-2.5 py-1">
                        {category.note}
                      </span>
                    )}
                  </div>

                  {/* Responsive Grid: 4 columns on desktop (lg:grid-cols-4), 3 on tablet (md:grid-cols-3), 2 on mobile (grid-cols-2) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {categoryConverters.map((conv) => (
                      <a
                        key={conv.slug}
                        href={`/${conv.slug}`}
                        onClick={(e) => handleCardClick(e, conv.slug)}
                        className="group flex flex-col justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 hover:border-[#F2C94C] dark:hover:border-[#F2C94C] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F0F6FF] dark:bg-[#1E2D4A] text-[#1F2A44] dark:text-[#F2C94C] flex items-center justify-center shrink-0">
                          <IconComponent aria-hidden="true" className="w-5 h-5" />
                        </div>

                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <span className="text-sm sm:text-base font-bold text-[#1F2A44] dark:text-white whitespace-nowrap truncate">
                            {conv.shortTitle}
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="w-4 h-4 text-[#1F2A44] dark:text-slate-300 group-hover:translate-x-1 transition-transform shrink-0"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
