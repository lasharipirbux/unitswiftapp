import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  ConverterPageConfig,
  CATEGORIES,
  UNITS,
  formatConvertedNumber,
} from '../data/converters';
import { RICH_CONVERTER_CONTENT } from '../data/richConverterContent';
import { RelatedConverters } from '../components/RelatedConverters';
import { BulkConvertTool } from '../components/BulkConvertTool';

interface ConverterPageProps {
  converter: ConverterPageConfig;
  initialInput?: string;
  navigate: (to: string, options?: { preserveInput?: string; scrollToId?: string }) => void;
}

const TABLE_VALUES = [1, 5, 10, 50, 100];
const QUICK_REF_STANDARD_VALUES = [1, 5, 10, 50, 100, 500, 1000];
const US_CUSTOM_QUICK_REF_SLUGS = new Set([
  'pounds-to-kg',
  'gallon-to-liter',
  'celsius-to-fahrenheit',
  'feet-to-meter',
  'ounce-to-gram',
]);

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

  const isValidInput = useMemo(() => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return false;
    return Number.isFinite(Number(trimmed));
  }, [inputValue]);

  const numericInput = useMemo(() => {
    if (!isValidInput) return 0;
    const parsed = Number(inputValue.trim());
    return Object.is(parsed, -0) ? 0 : parsed;
  }, [inputValue, isValidInput]);

  const convertedResult = useMemo(() => {
    if (!isValidInput) return NaN;
    return activeConvertFn(numericInput);
  }, [activeConvertFn, isValidInput, numericInput]);

  const formattedResult = useMemo(() => {
    if (!isValidInput) return '—';
    return formatConvertedNumber(convertedResult);
  }, [convertedResult, isValidInput]);

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
    if (!isValidInput) return;
    navigator.clipboard?.writeText(`${formattedResult} ${activeToUnit?.symbol || ''}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const categoryInfo = useMemo(() => {
    return CATEGORIES.find((c) => c.id === converter.category);
  }, [converter.category]);


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
        <p className="text-base font-semibold text-[#1F2A44] dark:text-[#F2C94C]">
          1 {activeFromUnit?.symbol} = {unitRate} {activeToUnit?.pluralName}
        </p>
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
                    step="any"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value (e.g. 1)"
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
                disabled={!isValidInput}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border border-[#1F2A44]/15 dark:border-white/15 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
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
                {isValidInput ? (
                  <>
                    {numericInput} {activeFromUnit?.symbol} = <strong>{formattedResult} {activeToUnit?.symbol}</strong>
                  </>
                ) : (
                  <span>Enter a number above to see the instant result</span>
                )}
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

      {/* Collapsible Bulk Convert (CSV) Section */}
      {activeFromUnit && activeToUnit && (
        <BulkConvertTool
          fromUnit={activeFromUnit}
          toUnit={activeToUnit}
          convertFn={activeConvertFn}
          collapsible={true}
          defaultOpen={false}
        />
      )}

      {converter.slug === 'marla-to-sqft' ? (() => {
        const rich = RICH_CONVERTER_CONTENT['marla-to-sqft'];
        const refMarlaValues = [1, 2, 3, 5, 7, 10, 12, 20, 50, 100, 500, 1000];
        const commonPlotSizes = [
          {
            size: '3 Marla',
            area: '816.75 sq ft',
            description:
              'A compact plot size commonly used for small, affordable starter houses in cities and housing schemes.',
          },
          {
            size: '5 Marla',
            area: '1,361.25 sq ft',
            description:
              'The most popular residential plot size in Pakistan for small to medium family homes.',
          },
          {
            size: '10 Marla',
            area: '2,722.5 sq ft',
            description:
              'A spacious plot size chosen by larger families who want extra bedrooms, a car porch, and a small lawn.',
          },
          {
            size: '1 Kanal (20 Marla)',
            area: '5,445 sq ft',
            description:
              'A large plot size used for big family homes with wide driveways and gardens (1 kanal = 20 marla = 5,445 sq ft).',
          },
        ];

        return (
          <article className="space-y-10 pt-6 border-t border-[#1F2A44]/10 dark:border-white/10">
            {/* 1. Short intro (80-100 words): what a marla is and why people in Pakistan convert it */}
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

            {/* 2. "How to convert marla to square feet": formula in simple words + worked example */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                How to convert marla to square feet
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

            {/* 3. Ready reference table: 1, 2, 3, 5, 7, 10, 12, 20 marla in sq ft, sq yards, and sq meters */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 overflow-hidden">
              <div className="p-6 sm:px-8 border-b border-[#1F2A44]/10 dark:border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                  Marla to Square Feet, Square Yards, and Square Meters Reference Table
                </h2>
                <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400 mt-1">
                  Ready reference for 1, 2, 3, 5, 7, 10, 12, 20, 50, 100, 500, and 1,000 marla in sq ft, sq yards, and sq meters (1 marla = 272.25 sq ft).
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1F2A44]/10 dark:border-white/10 bg-[#F6F8FA] dark:bg-[#0F1626]/70 text-xs font-semibold text-[#1F2A44] dark:text-slate-300">
                      <th className="py-3 px-6 sm:px-8">Marla</th>
                      <th className="py-3 px-6 sm:px-8">Square Feet (sq ft)</th>
                      <th className="py-3 px-6 sm:px-8">Square Yards (sq yd)</th>
                      <th className="py-3 px-6 sm:px-8 text-right">Square Meters (sq m)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F2A44]/10 dark:divide-white/10 text-sm font-mono-tabular">
                    {refMarlaValues.map((val) => {
                      const sqFt = formatConvertedNumber(converter.convert(val));
                      const sqYd = formatConvertedNumber(val * 30.25);
                      const sqM = formatConvertedNumber(Number((val * 25.29285264).toFixed(2)));
                      return (
                        <tr
                          key={val}
                          onClick={() => setInputValue(String(val))}
                          className="hover:bg-[#F6F8FA] dark:hover:bg-[#0F1626]/50 cursor-pointer transition-colors"
                          title={`Click to load ${val} marla into calculator`}
                        >
                          <td className="py-3 px-6 sm:px-8 font-medium text-[#1F2A44] dark:text-white">
                            {val} marla
                          </td>
                          <td className="py-3 px-6 sm:px-8 font-bold text-[#1F2A44] dark:text-[#F2C94C]">
                            {sqFt} sq ft
                          </td>
                          <td className="py-3 px-6 sm:px-8 text-[#1F2A44]/85 dark:text-slate-200">
                            {sqYd} sq yd
                          </td>
                          <td className="py-3 px-6 sm:px-8 text-right text-[#1F2A44]/85 dark:text-slate-200">
                            {sqM} sq m
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. "Common plot sizes in Pakistan" + 5. Note on housing society marla sizes */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                  Common plot sizes in Pakistan
                </h2>
                <p className="text-sm text-[#1F2A44]/80 dark:text-slate-300">
                  Most housing societies and cities in Pakistan sell residential plots in these four standard sizes. Remember that <strong>1 kanal = 20 marla = 5,445 sq ft</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonPlotSizes.map((plot) => (
                  <div
                    key={plot.size}
                    className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/10 dark:border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-[#1F2A44] dark:text-white">
                        {plot.size}
                      </h3>
                      <span className="text-xs font-mono-tabular font-bold px-2.5 py-1 rounded-md bg-[#F2C94C]/25 dark:bg-[#F2C94C]/15 text-[#1F2A44] dark:text-[#F2C94C]">
                        {plot.area}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#1F2A44]/80 dark:text-slate-300 leading-relaxed">
                      {plot.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* 5. Note */}
              <div className="p-4 rounded-xl bg-[#F2C94C]/20 dark:bg-[#F2C94C]/10 border border-[#F2C94C]/60 dark:border-[#F2C94C]/40 text-xs sm:text-sm font-medium text-[#1F2A44] dark:text-[#F2C94C]">
                <strong>Note:</strong> In some housing societies and cities the marla size can differ (for example 225 sq ft). Always check the size in your property documents.
              </div>
            </section>

            {/* 6. 6 FAQs */}
            <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                Frequently Asked Questions (FAQs)
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
          </article>
        );
      })() : (
        <>
          {/* Small Table of 8 Common Values for that Unit Pair */}
          <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2A44]/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#1F2A44] dark:text-white">
                  Common {activeFromUnit?.pluralName} to {activeToUnit?.pluralName} Conversion Table
                </h2>
                <p className="text-xs text-[#1F2A44]/65 dark:text-slate-400">
                  9 common reference values for {activeFromUnit?.symbol} to {activeToUnit?.symbol}
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
                  {[1, 2, 5, 10, 25, 50, 100, 500, 1000].map((val) => {
                    const rowConverted = formatConvertedNumber(activeConvertFn(val));
                    const isSelected = parseFloat(inputValue) === val;

                    return (
                      <tr
                        key={val}
                        onClick={() => setInputValue(String(val))}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#F2C94C]/20 dark:bg-[#F2C94C]/15 font-semibold'
                            : 'hover:bg-[#F6F8FA] dark:hover:bg-[#0F1626]/60'
                        }`}
                        title={`Click to load ${val} ${activeFromUnit?.symbol} into calculator`}
                      >
                        <td className="py-3 px-6 text-[#1F2A44] dark:text-white">
                          {val} {activeFromUnit?.symbol}
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

          {/* RICH ~500-WORD CONTENT SECTION (FOR ALL OTHER CONVERTER PAGES) */}
          {RICH_CONVERTER_CONTENT[converter.slug] && (() => {
            const rich = RICH_CONVERTER_CONTENT[converter.slug];
            const fromU = UNITS[converter.fromUnitId];
            const toU = UNITS[converter.toUnitId];

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

                {/* 3. Quick Reference Table */}
                {(() => {
                  const tableValues = US_CUSTOM_QUICK_REF_SLUGS.has(converter.slug)
                    ? rich.quickRefValues
                    : QUICK_REF_STANDARD_VALUES;
                  const formattedList = tableValues
                    .map((v, i) =>
                      i === tableValues.length - 1
                        ? `and ${v.toLocaleString('en-US')}`
                        : v.toLocaleString('en-US')
                    )
                    .join(', ');

                  return (
                    <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 overflow-hidden">
                      <div className="p-6 sm:px-8 border-b border-[#1F2A44]/10 dark:border-white/10">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                          Quick Reference Table
                        </h2>
                        <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400 mt-1">
                          Quick reference conversions for {formattedList} {fromU?.pluralName.toLowerCase()} in {toU?.pluralName.toLowerCase()}.
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
                            {tableValues.map((val) => {
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
                  );
                })()}

                {/* Common Uses (Real-life US examples) */}
                {rich.commonUses && rich.commonUses.length > 0 && (
                  <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                      Common uses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rich.commonUses.map((use, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/10 dark:border-white/10 space-y-1.5"
                        >
                          <h3 className="text-sm sm:text-base font-bold text-[#1F2A44] dark:text-[#F2C94C]">
                            {use.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#1F2A44]/85 dark:text-slate-300 leading-relaxed">
                            {use.example}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Pakistani Unit Guide (for Pakistan-specific converter pages) */}
                {rich.pakistaniUnitGuide && (
                  <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                        Pakistani unit guide
                      </h2>
                      <span
                        dir="auto"
                        className="px-3 py-1 rounded-lg bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/12 dark:border-white/15 text-xs sm:text-sm font-semibold text-[#1F2A44] dark:text-[#F2C94C]"
                      >
                        {rich.pakistaniUnitGuide.urduLabel}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm sm:text-base text-[#1F2A44]/85 dark:text-slate-300 leading-relaxed">
                      {rich.pakistaniUnitGuide.paragraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl bg-[#F2C94C]/15 dark:bg-[#19253D] border border-[#F2C94C]/50 dark:border-[#F2C94C]/30 space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1F2A44] dark:text-[#F2C94C]">
                        Real-Life Example
                      </h3>
                      <p className="text-sm text-[#1F2A44]/90 dark:text-slate-200 leading-relaxed">
                        {rich.pakistaniUnitGuide.realLifeExample}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/15 dark:border-white/15 space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#1F2A44] dark:text-white">
                        Regional Differences
                      </h3>
                      <p className="text-xs sm:text-sm text-[#1F2A44]/80 dark:text-slate-300 leading-relaxed">
                        {rich.pakistaniUnitGuide.regionalNote}
                      </p>
                    </div>
                  </section>
                )}

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

                {/* 5. FAQ (All Questions Matching JSON-LD Schema) */}
                <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 p-6 sm:p-8 space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1F2A44] dark:text-white">
                    FAQ
                  </h2>
                  <div className={`grid grid-cols-1 ${rich.faqs.length >= 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-5`}>
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
              </article>
            );
          })()}
        </>
      )}

      {/* RELATED CONVERTERS SECTION (6 Clean Same-Category Tiles) */}
      <RelatedConverters
        currentConverter={converter}
        navigate={navigate}
      />
    </div>
  );
};
