import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PopularPakistaniConvertersProps {
  currentSlug?: string;
  navigate?: (to: string, options?: { preserveInput?: string; scrollToId?: string }) => void;
}

export const POPULAR_PAKISTANI_CONVERTERS = [
  { slug: 'marla-to-sqft', label: 'Marla to Sqft' },
  { slug: 'kanal-to-marla', label: 'Kanal to Marla' },
  { slug: 'tola-to-gram', label: 'Tola to Gram' },
  { slug: 'seer-to-kg', label: 'Seer to KG' },
  { slug: 'maund-to-kg', label: 'Maund to KG' },
  { slug: 'gaz-to-feet', label: 'Gaz to Feet' },
] as const;

export const PopularPakistaniConverters: React.FC<PopularPakistaniConvertersProps> = ({
  currentSlug,
  navigate,
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (navigate) {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <section
      aria-labelledby="popular-pakistani-converters-heading"
      className="pt-8 border-t border-[#1F2A44]/10 dark:border-white/10 space-y-4"
    >
      <div>
        <h2
          id="popular-pakistani-converters-heading"
          className="text-lg sm:text-xl font-bold text-[#1F2A44] dark:text-white"
        >
          Popular Pakistani Converters
        </h2>
        <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400">
          Quick links to frequently used Pakistani land, gold, and weight calculators.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {POPULAR_PAKISTANI_CONVERTERS.map((item) => {
          const isCurrent = currentSlug === item.slug;
          return (
            <a
              key={item.slug}
              href={`/${item.slug}/`}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, `/${item.slug}/`)}
              className={`group flex items-center justify-between gap-2 px-3.5 py-3 rounded-xl border transition-all duration-200 ${
                isCurrent
                  ? 'bg-[#F2C94C]/15 dark:bg-[#F2C94C]/10 border-[#F2C94C] text-[#1F2A44] dark:text-[#F2C94C]'
                  : 'bg-white dark:bg-[#151F33] border-[#1F2A44]/12 dark:border-white/10 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] text-[#1F2A44] dark:text-white shadow-xs hover:shadow-md'
              }`}
            >
              <span className="text-xs sm:text-sm font-bold group-hover:underline decoration-[#F2C94C] decoration-2 underline-offset-4 truncate">
                {item.label}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="w-3.5 h-3.5 text-[#1F2A44]/45 dark:text-slate-400 group-hover:text-[#1F2A44] dark:group-hover:text-[#F2C94C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
};
