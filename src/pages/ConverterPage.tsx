import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeftRight,
  ArrowUpRight,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  ConverterPageConfig,
  CONVERTERS,
  CATEGORIES,
  UNITS,
  formatConvertedNumber,
  findConverterBySlug,
} from '../data/converters';
import { RICH_CONVERTER_CONTENT } from '../data/richConverterContent';

interface ConverterPageProps {
  converter: ConverterPageConfig;
  initialInput?: string;
  navigate: (to: string, options?: { preserveInput?: string; scrollToId?: string }) => void;
}

const TABLE_VALUES = [1, 5, 10, 50, 100];

export const ConverterPage: React.FC<ConverterPageProps> = ({
  converter,
  initialInput,
  navigate,
}) => {
  const [inputValue, setInputValue] = useState<string>(initialInput || '1');
  const [isReversedInPlace, setIsReversedInPlace] = useState<boolean>(false);
  const [swapRotation, setSwapRotation] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync when converter route changes
  useEffect(() => {
    setIsReversedInPlace(false);
    if (initialInput !== undefined && initialInput !== '') {
      setInputValue(initialInput);
    } else {
      setInputValue('1');
    }
  }, [converter.slug, initialInput]);

  const activeFromUnit = isReversedInPlace
    ? UNITS[converter.toUnitId]
    : UNITS[converter.fromUnitId];
  const activeToUnit = isReversedInPlace
    ? UNITS[converter.fromUnitId]
    : UNITS[converter.toUnitId];

  const activeConvertFn = isReversedInPlace
    ? converter.reverseConvert
    : converter.convert;

  const activeFormula = isReversedInPlace
    ? converter.reverseFormulaText
    : converter.formulaText;

  const numericInput = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  const convertedResult = useMemo(() => {
    return activeConvertFn(numericInput);
  }, [activeConvertFn, numericInput]);

  const formattedResult = useMemo(() => {
    return formatConvertedNumber(convertedResult);
  }, [convertedResult]);

  const unitRate = useMemo(() => {
    return formatConvertedNumber(activeConvertFn(1));
  }, [activeConvertFn]);

  const handleSwap = () => {
    setSwapRotation((prev) => prev + 180);
    if (converter.reverseSlug && !isReversedInPlace) {
      navigate(`/${converter.reverseSlug}`, { preserveInput: inputValue });
    } else {
      setIsReversedInPlace((prev) => !prev);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${formattedResult} ${activeToUnit?.symbol || ''}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const categoryInfo = useMemo(() => {
    return CATEGORIES.find((c) => c.id === converter.category);
  }, [converter.category]);

  // More converters: prioritize same category, then popular/other converters
  const moreConverters = useMemo(() => {
    const sameCategory = CONVERTERS.filter(
      (c) => c.category === converter.category && c.slug !== converter.slug
    );
    const otherCategories = CONVERTERS.filter(
      (c) => c.category !== converter.category
    );
    return [...sameCategory, ...otherCategories].slice(0, 8);
  }, [converter]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, scrollToId?: string) => {
    e.preventDefault();
    navigate(path, { scrollToId });
  };

  const displayTitle = isReversedInPlace
    ? `${activeFromUnit?.pluralName} to ${activeToUnit?.pluralName} Converter`
    : converter.title;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Page Header: Small Breadcrumb Above Heading + H1 + Description */}
      <header className="space-y-3 max-w-3xl">
        {/* Small Breadcrumb: "Home > Weight > kg to pounds" where each part is a link */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#1F2A44] dark:text-slate-300">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-[#2D3E63] dark:text-slate-300 hover:text-[#1F2A44] dark:hover:text-[#F2C94C] hover:underline underline-offset-4 transition-colors"
          >
            Home
          </a>
          <span aria-hidden="true" className="text-[#1F2A44]/50 dark:text-slate-400">
            &gt;
          </span>
          <a
            href={`/#category-${converter.category}`}
            onClick={(e) => handleLinkClick(e, '/', `category-${converter.category}`)}
            className="text-[#2D3E63] dark:text-slate-300 hover:text-[#1F2A44] dark:hover:text-[#F2C94C] hover:underline underline-offset-4 transition-colors"
          >
            {categoryInfo?.name || converter.category}
          </a>
          <span aria-hidden="true" className="text-[#1F2A44]/50 dark:text-slate-400">
            &gt;
          </span>
          <a
            href={`/${converter.slug}`}
            aria-current="page"
            onClick={(e) => handleLinkClick(e, `/${converter.slug}`)}
            className="font-semibold text-[#1F2A44] dark:text-white hover:underline underline-offset-4 transition-colors"
          >
            {converter.shortTitle}
          </a>
        </nav>

        <div className="flex items-center gap-2 text-xs text-[#1F2A44]/65 dark:text-[#F2C94C] font-mono-tabular">
          <span>{categoryInfo?.name} Conversion</span>
          <span aria-hidden="true">·</span>
          <span>1 {activeFromUnit?.symbol} = {unitRate} {activeToUnit?.symbol}</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] dark:text-white"
          style={{ textWrap: 'balance' }}
        >
          {displayTitle}
        </h1>
        {/* 2-3 line description */}
        <div className="space-y-1 text-sm sm:text-base text-[#1F2A44]/75 dark:text-slate-300 leading-relaxed">
          <p>{converter.descriptionLine1}</p>
          <p>{converter.descriptionLine2}</p>
          {converter.descriptionLine3 && <p>{converter.descriptionLine3}</p>}
        </div>
        {converter.note && (
          <p className="text-xs font-medium text-[#1F2A44]/80 dark:text-[#F2C94C] bg-[#F2C94C]/20 dark:bg-[#F2C94C]/10 border border-[#F2C94C]/50 rounded-lg px-3.5 py-2 inline-block">
            Note: {converter.note}
          </p>
        )}
      </header>

      {/* Main Converter Grid: Left Calculator Card + Right 1, 5, 10, 50, 100 Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Converter Calculator Card */}
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
          <div className="h-2 bg-[#F2C94C] measuring-tape-ticks" aria-hidden="true" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Input + Swap + Output Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              {/* FROM Input */}
              <div className="space-y-2">
                <label
                  htmlFor="converter-number-input"
                  className="block text-xs font-semibold text-[#1F2A44]/70 dark:text-slate-300"
                >
                  From: {activeFromUnit?.pluralName} ({activeFromUnit?.symbol})
                </label>
                <div className="relative">
                  <input
                    id="converter-number-input"
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3.5 text-2xl font-bold font-mono-tabular bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white rounded-xl border-2 border-[#1F2A44]/20 dark:border-white/20 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1F2A44]/55 dark:text-slate-400 font-mono-tabular pointer-events-none">
                    {activeFromUnit?.symbol}
                  </span>
                </div>
              </div>

              {/* Swap Button */}
              <div className="sm:pt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  title={`Swap to ${activeToUnit?.pluralName} to ${activeFromUnit?.pluralName}`}
                  aria-label="Swap conversion units"
                  className="w-full sm:w-12 h-12 rounded-xl bg-[#F2C94C] text-[#1F2A44] font-bold hover:brightness-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
                >
                  <ArrowLeftRight
                    className="w-5 h-5 transition-transform duration-200"
                    style={{ transform: `rotate(${swapRotation}deg)` }}
                  />
                  <span className="sm:hidden text-xs font-bold">
                    Swap ({activeToUnit?.symbol} → {activeFromUnit?.symbol})
                  </span>
                </button>
              </div>

              {/* TO Instant Result */}
              <div className="space-y-2">
                <span className="block text-xs font-semibold text-[#1F2A44]/70 dark:text-slate-300">
                  To: {activeToUnit?.pluralName} ({activeToUnit?.symbol})
                </span>
                <div className="px-4 py-3.5 rounded-xl bg-[#1F2A44] dark:bg-[#0F1626] border-2 border-[#1F2A44] dark:border-[#F2C94C]/50 flex items-center justify-between gap-2">
                  <span
                    className="text-2xl font-bold font-mono-tabular text-[#F2C94C] truncate"
                    title={`${formattedResult} ${activeToUnit?.symbol}`}
                  >
                    {formattedResult}
                  </span>
                  <span className="text-xs font-bold text-white/80 font-mono-tabular shrink-0">
                    {activeToUnit?.symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Preset Value Buttons & Copy Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1F2A44]/10 dark:border-white/10">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[#1F2A44]/60 dark:text-slate-400 mr-1">
                  Quick values:
                </span>
                {TABLE_VALUES.map((preset) => {
                  const isCurrent = parseFloat(inputValue) === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setInputValue(String(preset))}
                      className={`px-2.5 py-1 text-xs font-mono-tabular font-semibold rounded-md transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#1F2A44] text-white dark:bg-[#F2C94C] dark:text-[#1F2A44]'
                          : 'bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44]/80 dark:text-slate-300 hover:bg-[#1F2A44]/10 dark:hover:bg-white/10'
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setInputValue('1')}
                  title="Reset to 1"
                  className="p-1.5 text-xs text-[#1F2A44]/60 dark:text-slate-400 hover:text-[#1F2A44] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border border-[#1F2A44]/15 dark:border-white/15 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#F2C94C]" />
                    <span>Copied {formattedResult} {activeToUnit?.symbol}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>
            </div>

            {/* Exact Conversion Equation Readout */}
            <div className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-[#1F2A44]/60 dark:text-slate-400 font-medium">
                  Exact Formula:{' '}
                </span>
                <code className="font-mono-tabular font-semibold text-[#1F2A44] dark:text-[#F2C94C]">
                  {activeFormula}
                </code>
              </div>
              <div className="font-mono-tabular text-[#1F2A44]/75 dark:text-slate-300">
                {inputValue || '0'} {activeFromUnit?.symbol} = <strong>{formattedResult} {activeToUnit?.symbol}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Table of 1, 5, 10, 50, 100 Converted */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1F2A44]/10 dark:border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1F2A44] dark:text-white">
                {activeFromUnit?.pluralName} to {activeToUnit?.pluralName} Table
              </h2>
              <p className="text-xs text-[#1F2A44]/65 dark:text-slate-400">
                Standard 1, 5, 10, 50, 100 reference values
              </p>
            </div>
            <span className="text-xs font-mono-tabular text-[#1F2A44]/60 dark:text-slate-400">
              {activeFromUnit?.symbol} → {activeToUnit?.symbol}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1F2A44]/10 dark:border-white/10 bg-[#F6F8FA]/60 dark:bg-[#0F1626]/60 text-xs font-semibold text-[#1F2A44]/70 dark:text-slate-300">
                  <th className="py-3 px-6">{activeFromUnit?.pluralName} ({activeFromUnit?.symbol})</th>
                  <th className="py-3 px-6 text-right">{activeToUnit?.pluralName} ({activeToUnit?.symbol})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2A44]/10 dark:divide-white/10 text-sm font-mono-tabular">
                {TABLE_VALUES.map((rowVal) => {
                  const rowConverted = formatConvertedNumber(activeConvertFn(rowVal));
                  const isSelected = parseFloat(inputValue) === rowVal;

                  return (
                    <tr
                      key={rowVal}
                      onClick={() => setInputValue(String(rowVal))}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#F2C94C]/20 dark:bg-[#F2C94C]/15 font-semibold'
                          : 'hover:bg-[#F6F8FA] dark:hover:bg-[#0F1626]/60'
                      }`}
                      title={`Click to load ${rowVal} ${activeFromUnit?.symbol} into calculator`}
                    >
                      <td className="py-3 px-6 text-[#1F2A44] dark:text-white">
                        {rowVal} {activeFromUnit?.symbol}
                      </td>
                      <td className="py-3 px-6 text-right font-semibold text-[#1F2A44] dark:text-[#F2C94C]">
                        {rowConverted} {activeToUnit?.symbol}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 bg-[#F6F8FA]/60 dark:bg-[#0F1626]/50 border-t border-[#1F2A44]/10 dark:border-white/10 text-xs text-[#1F2A44]/60 dark:text-slate-400">
            Click any row above to set the input value to that measurement.
          </div>
        </div>
      </div>

      {/* RICH ~500-WORD CONTENT SECTION (FOR THE 10 SPECIFIED CONVERTER PAGES ONLY) */}
      {RICH_CONVERTER_CONTENT[converter.slug] && (() => {
        const rich = RICH_CONVERTER_CONTENT[converter.slug];
        const fromU = UNITS[converter.fromUnitId];
        const toU = UNITS[converter.toUnitId];
        const relatedItems = rich.relatedSlugs
          .map((s) => findConverterBySlug(s))
          .filter((c): c is ConverterPageConfig => Boolean(c));

        return (
          <article className="space-y-10 pt-6 border-t border-[#1F2A44]/10 dark:border-white/10">
            {/* 1. What Is [X] to [Y] Conversion */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                {rich.whatIsHeading}
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#1F2A44]/85 dark:text-slate-300 leading-relaxed">
                {rich.whatIsParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>

            {/* 2. How to Convert [X] to [Y] (Formula + Worked Example) */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                {rich.howToHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#1F2A44]/85 dark:text-slate-300 leading-relaxed">
                {rich.howToIntro}
              </p>

              <div className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/15 dark:border-white/15">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#1F2A44]/65 dark:text-slate-400 mb-1">
                  Conversion Formula
                </span>
                <code className="text-base sm:text-lg font-bold font-mono-tabular text-[#1F2A44] dark:text-[#F2C94C]">
                  {rich.formulaBox}
                </code>
              </div>

              <div className="p-5 rounded-xl bg-[#F2C94C]/15 dark:bg-[#19253D] border border-[#F2C94C]/50 dark:border-[#F2C94C]/30 space-y-1.5">
                <h3 className="text-sm sm:text-base font-bold text-[#1F2A44] dark:text-[#F2C94C]">
                  {rich.workedExampleTitle}
                </h3>
                <p className="text-sm text-[#1F2A44]/90 dark:text-slate-200 leading-relaxed">
                  {rich.workedExampleBody}
                </p>
              </div>
            </section>

            {/* 3. Quick Reference Table (10 Common Values) */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 overflow-hidden">
              <div className="p-6 sm:px-8 border-b border-[#1F2A44]/10 dark:border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                  Quick Reference Table
                </h2>
                <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400 mt-1">
                  10 common {fromU?.pluralName.toLowerCase()} to {toU?.pluralName.toLowerCase()} conversions for everyday lookup.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1F2A44]/10 dark:border-white/10 bg-[#F6F8FA] dark:bg-[#0F1626]/70 text-xs font-semibold text-[#1F2A44] dark:text-slate-300">
                      <th className="py-3 px-6 sm:px-8">{fromU?.pluralName} ({fromU?.symbol})</th>
                      <th className="py-3 px-6 sm:px-8">{toU?.pluralName} ({toU?.symbol})</th>
                      <th className="py-3 px-6 sm:px-8 text-right">Equation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F2A44]/10 dark:divide-white/10 text-sm font-mono-tabular">
                    {rich.quickRefValues.map((val) => {
                      const out = formatConvertedNumber(converter.convert(val));
                      return (
                        <tr
                          key={val}
                          onClick={() => setInputValue(String(val))}
                          className="hover:bg-[#F6F8FA] dark:hover:bg-[#0F1626]/50 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-6 sm:px-8 font-medium text-[#1F2A44] dark:text-white">
                            {val} {fromU?.symbol}
                          </td>
                          <td className="py-3 px-6 sm:px-8 font-bold text-[#1F2A44] dark:text-[#F2C94C]">
                            {out} {toU?.symbol}
                          </td>
                          <td className="py-3 px-6 sm:px-8 text-right text-xs text-[#1F2A44]/70 dark:text-slate-400">
                            {val} {fromU?.symbol} = {out} {toU?.symbol}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Common Mistakes */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                Common Mistakes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {rich.commonMistakes.map((mistake, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/10 dark:border-white/10 space-y-2"
                  >
                    <span className="text-xs font-mono-tabular font-bold text-[#1F2A44]/60 dark:text-[#F2C94C]">
                      0{idx + 1}. Pitfall to Avoid
                    </span>
                    <h3 className="text-sm font-bold text-[#1F2A44] dark:text-white leading-snug">
                      {mistake.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1F2A44]/80 dark:text-slate-300 leading-relaxed">
                      {mistake.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. FAQ (4 Questions with Short Answers) */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                FAQ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {rich.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/10 dark:border-white/10 space-y-2"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-[#1F2A44] dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1F2A44]/80 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Related converters (4 internal links) */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#1F2A44] dark:text-white">
                Related converters
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {relatedItems.map((rel) => {
                  const rFrom = UNITS[rel.fromUnitId];
                  const rTo = UNITS[rel.toUnitId];
                  return (
                    <li key={rel.slug}>
                      <a
                        href={`/${rel.slug}`}
                        onClick={(e) => handleLinkClick(e, `/${rel.slug}`)}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/12 dark:border-white/10 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] transition-colors group"
                      >
                        <div>
                          <span className="text-sm font-bold text-[#1F2A44] dark:text-white group-hover:underline decoration-[#F2C94C] decoration-2 underline-offset-4 block">
                            {rel.shortTitle}
                          </span>
                          <span className="text-xs font-mono-tabular text-[#1F2A44]/65 dark:text-slate-400">
                            1 {rFrom?.symbol} = {formatConvertedNumber(rel.convert(1))} {rTo?.symbol}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#1F2A44]/50 dark:text-[#F2C94C] shrink-0" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          </article>
        );
      })()}

      {/* MORE CONVERTERS SECTION */}
      <section className="pt-6 border-t border-[#1F2A44]/10 dark:border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#1F2A44] dark:text-white">
              More converters
            </h2>
            <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400">
              Explore related unit calculators or switch to another measurement category.
            </p>
          </div>
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-xs font-semibold text-[#1F2A44] dark:text-[#F2C94C] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            View all 54 converters →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moreConverters.map((item) => {
            const fromU = UNITS[item.fromUnitId];
            const toU = UNITS[item.toUnitId];
            const sample = formatConvertedNumber(item.convert(1));

            return (
              <a
                key={item.slug}
                href={`/${item.slug}`}
                onClick={(e) => handleLinkClick(e, `/${item.slug}`)}
                className="group p-4 rounded-xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#1F2A44]/60 dark:text-slate-400 mb-1">
                    <span className="capitalize">{item.category}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#1F2A44] dark:group-hover:text-[#F2C94C] transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1F2A44] dark:text-white group-hover:underline decoration-[#F2C94C] decoration-2 underline-offset-4">
                    {item.shortTitle}
                  </h3>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#1F2A44]/10 dark:border-white/10 text-xs font-mono-tabular text-[#1F2A44]/70 dark:text-slate-400">
                  1 {fromU?.symbol} = {sample} {toU?.symbol}
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
