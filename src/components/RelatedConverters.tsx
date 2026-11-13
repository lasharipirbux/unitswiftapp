import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  ConverterPageConfig,
  CONVERTERS,
  CATEGORIES,
  UNITS,
  formatConvertedNumber,
} from '../data/converters';

interface RelatedConvertersProps {
  currentConverter: ConverterPageConfig;
  navigate?: (to: string, options?: { preserveInput?: string; scrollToId?: string }) => void;
}

export function formatRelatedTileTitle(shortTitle: string): string {
  return shortTitle
    .split(' ')
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i > 0 && lower === 'to') return 'to';
      if (lower === 'mb') return 'MB';
      if (lower === 'gb') return 'GB';
      if (lower === 'kb') return 'KB';
      if (lower === 'tb') return 'TB';
      if (lower === 'mph') return 'MPH';
      if (lower === 'kmh') return 'KM/H';
      if (lower === 'ms') return 'm/s';
      if (lower === 'sqft') return 'Sq Ft';
      if (lower === 'sqm') return 'Sq M';
      if (lower === 'sqyard') return 'Sq Yard';
      if (lower === 'tbsp') return 'Tbsp';
      if (lower === 'tsp') return 'Tsp';
      if (lower === 'ml') return 'mL';
      if (lower === 'kg') return 'Kg';
      if (lower === 'cm') return 'Cm';
      if (lower === 'mm') return 'Mm';
      if (lower === 'km') return 'Km';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export const RelatedConverters: React.FC<RelatedConvertersProps> = ({
  currentConverter,
  navigate,
}) => {
  const categoryInfo = useMemo(() => {
    return CATEGORIES.find((c) => c.id === currentConverter.category);
  }, [currentConverter.category]);

  const relatedConverters = useMemo(() => {
    // 1. Get other converters from the same category
    const sameCategory = CONVERTERS.filter(
      (c) => c.category === currentConverter.category && c.slug !== currentConverter.slug
    );

    // Prioritize direct reverse converter, then converters sharing from/to units, then others in category
    sameCategory.sort((a, b) => {
      if (a.slug === currentConverter.reverseSlug) return -1;
      if (b.slug === currentConverter.reverseSlug) return 1;

      const aShares =
        a.fromUnitId === currentConverter.fromUnitId ||
        a.toUnitId === currentConverter.toUnitId ||
        a.fromUnitId === currentConverter.toUnitId ||
        a.toUnitId === currentConverter.fromUnitId;
      const bShares =
        b.fromUnitId === currentConverter.fromUnitId ||
        b.toUnitId === currentConverter.toUnitId ||
        b.fromUnitId === currentConverter.toUnitId ||
        b.toUnitId === currentConverter.fromUnitId;

      if (aShares && !bShares) return -1;
      if (!aShares && bShares) return 1;
      return 0;
    });

    if (sameCategory.length >= 6) {
      return sameCategory.slice(0, 6);
    }

    // If category has fewer than 6 (e.g. speed, data, temperature, volume), backfill up to 6
    const otherCategory = CONVERTERS.filter(
      (c) => c.category !== currentConverter.category && c.slug !== currentConverter.slug
    );
    return [...sameCategory, ...otherCategory].slice(0, 6);
  }, [currentConverter]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (navigate) {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <section className="pt-8 border-t border-[#1F2A44]/10 dark:border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
            Related Converters
          </h2>
          <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400">
            More {categoryInfo?.name || 'unit'} calculators from the same category.
          </p>
        </div>
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="text-xs font-semibold text-[#1F2A44] dark:text-[#F2C94C] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
        >
          View all {CONVERTERS.length} converters →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
        {relatedConverters.map((item) => {
          const fromU = UNITS[item.fromUnitId];
          const toU = UNITS[item.toUnitId];
          const titleText = formatRelatedTileTitle(item.shortTitle);
          const rateText = formatConvertedNumber(item.convert(1));

          return (
            <a
              key={item.slug}
              href={`/${item.slug}`}
              onClick={(e) => handleLinkClick(e, `/${item.slug}`)}
              className="group flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5 text-[11px] font-mono-tabular text-[#1F2A44]/60 dark:text-slate-400">
                  <span className="uppercase tracking-wider">
                    {fromU?.symbol} → {toU?.symbol}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#1F2A44]/40 dark:text-slate-400 group-hover:text-[#1F2A44] dark:group-hover:text-[#F2C94C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <h3 className="text-sm font-bold text-[#1F2A44] dark:text-white group-hover:text-[#1F2A44] dark:group-hover:text-[#F2C94C] group-hover:underline decoration-[#F2C94C] decoration-2 underline-offset-4 transition-colors leading-snug">
                  {titleText}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1F2A44]/10 dark:border-white/10 text-[11px] font-mono-tabular text-[#1F2A44]/70 dark:text-slate-400 flex items-center justify-between">
                <span>1 {fromU?.symbol}</span>
                <span className="font-semibold text-[#1F2A44] dark:text-[#F2C94C]">
                  {rateText} {toU?.symbol}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
