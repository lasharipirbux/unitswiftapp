import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  ConverterPageConfig,
  CONVERTERS,
  UNITS,
  formatConvertedNumber,
} from '../data/converters';
import { RICH_CONVERTER_CONTENT } from '../data/richConverterContent';

interface RelatedConvertersProps {
  currentConverter: ConverterPageConfig;
  navigate?: (to: string, options?: { preserveInput?: string; scrollToId?: string }) => void;
}

const RELATED_COUNT = 5;

function getDimensionKey(conv: ConverterPageConfig): string {
  const fromU = UNITS[conv.fromUnitId];
  return fromU?.dimensionGroup || fromU?.category || conv.category;
}

const DIMENSION_LABELS: Record<string, string> = {
  weight: 'weight & mass',
  length: 'length & distance',
  temperature: 'temperature',
  volume: 'volume & liquid',
  speed: 'speed',
  area: 'area & land',
  data: 'digital data',
  pressure: 'pressure',
  time: 'time',
};

export function getRelatedConvertersForPage(currentConverter: ConverterPageConfig): ConverterPageConfig[] {
  if (currentConverter.slug === 'tola-to-gram') {
    const preferred = ['gram-to-tola', 'kg-to-pounds', 'ounce-to-gram', 'maund-to-kg', 'tola-to-kg'];
    return preferred
      .map((s) => CONVERTERS.find((c) => c.slug === s))
      .filter((c): c is ConverterPageConfig => Boolean(c))
      .slice(0, RELATED_COUNT);
  }

  if (currentConverter.slug === 'marla-to-sqft') {
    const preferred = [
      'sqft-to-marla',
      'kanal-to-marla',
      'marla-to-square-yards',
      'marla-to-square-meter',
      'acre-to-kanal',
    ];
    return preferred
      .map((s) => CONVERTERS.find((c) => c.slug === s))
      .filter((c): c is ConverterPageConfig => Boolean(c))
      .slice(0, RELATED_COUNT);
  }

  const currentDim = getDimensionKey(currentConverter);
  const richRelatedSlugs = RICH_CONVERTER_CONTENT[currentConverter.slug]?.relatedSlugs || [];

  const reverseConverter = CONVERTERS.find(
    (c) =>
      c.slug !== currentConverter.slug &&
      (c.slug === currentConverter.reverseSlug ||
        (c.fromUnitId === currentConverter.toUnitId && c.toUnitId === currentConverter.fromUnitId))
  );

  const candidates = CONVERTERS.filter((c) => c.slug !== currentConverter.slug);

  const scored = candidates.map((c) => {
    let score = 0;
    if (reverseConverter && c.slug === reverseConverter.slug) {
      score += 10000;
    }
    const cDim = getDimensionKey(c);
    if (cDim === currentDim) {
      score += 1000;
    }
    if (c.category === currentConverter.category) {
      score += 200;
    }
    const sharesUnit =
      c.fromUnitId === currentConverter.fromUnitId ||
      c.toUnitId === currentConverter.toUnitId ||
      c.fromUnitId === currentConverter.toUnitId ||
      c.toUnitId === currentConverter.fromUnitId;
    if (sharesUnit) {
      score += 150;
    }
    const richIndex = richRelatedSlugs.indexOf(c.slug);
    if (richIndex !== -1) {
      score += 80 - richIndex * 10;
    }
    if (c.popular) {
      score += 25;
    }
    return { converter: c, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, RELATED_COUNT).map((item) => item.converter);
}

export const RelatedConverters: React.FC<RelatedConvertersProps> = ({
  currentConverter,
  navigate,
}) => {
  const dimensionLabel = useMemo(() => {
    const dim = getDimensionKey(currentConverter);
    return DIMENSION_LABELS[dim] || 'unit';
  }, [currentConverter]);

  const relatedConverters = useMemo(
    () => getRelatedConvertersForPage(currentConverter),
    [currentConverter]
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (navigate) {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <section
      aria-labelledby="related-converters-heading"
      className="pt-8 border-t border-[#1F2A44]/10 dark:border-white/10 space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2
            id="related-converters-heading"
            className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white"
          >
            Related Converters
          </h2>
          <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400">
            Similar {dimensionLabel} converters and quick reverse calculation.
          </p>
        </div>
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="text-xs font-semibold text-[#1F2A44] dark:text-[#F2C94C] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
        >
          Back to Home · View all {CONVERTERS.length} converters →
        </a>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          relatedConverters.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
        } gap-3 sm:gap-3.5`}
      >
        {relatedConverters.map((item) => {
          const fromU = UNITS[item.fromUnitId];
          const toU = UNITS[item.toUnitId];
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
                  {item.title}
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
