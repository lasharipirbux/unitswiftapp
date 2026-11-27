import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, ArrowUpRight } from 'lucide-react';
import {
  UNITS,
  CONVERTERS,
  UnitDefinition,
  findConverterByUnits,
  convertAnyUnit,
} from '../data/converters';
import { BulkConvertTool } from '../components/BulkConvertTool';

interface BulkConverterPageProps {
  navigate: (to: string) => void;
}

type DimensionGroupId =
  | 'weight'
  | 'length'
  | 'area'
  | 'volume'
  | 'temperature'
  | 'speed'
  | 'data'
  | 'pressure'
  | 'time';

const DIMENSION_GROUPS: { id: DimensionGroupId; label: string; defaultFrom: string; defaultTo: string }[] = [
  { id: 'weight', label: 'Weight & Mass', defaultFrom: 'kg', defaultTo: 'pounds' },
  { id: 'length', label: 'Length & Distance', defaultFrom: 'inch', defaultTo: 'cm' },
  { id: 'area', label: 'Area & Land (Marla, Kanal, Sq Ft)', defaultFrom: 'marla', defaultTo: 'sqft' },
  { id: 'temperature', label: 'Temperature', defaultFrom: 'celsius', defaultTo: 'fahrenheit' },
  { id: 'volume', label: 'Volume & Liquid', defaultFrom: 'liter', defaultTo: 'gallon' },
  { id: 'speed', label: 'Speed', defaultFrom: 'mph', defaultTo: 'kmh' },
  { id: 'data', label: 'Digital Data', defaultFrom: 'gb', defaultTo: 'mb' },
  { id: 'pressure', label: 'Pressure', defaultFrom: 'psi', defaultTo: 'bar' },
  { id: 'time', label: 'Time', defaultFrom: 'hour', defaultTo: 'minute' },
];

function getUnitDimension(unit: UnitDefinition): DimensionGroupId {
  if (unit.dimensionGroup) return unit.dimensionGroup;
  if (unit.category === 'local') return 'area';
  return unit.category as DimensionGroupId;
}

export const BulkConverterPage: React.FC<BulkConverterPageProps> = ({ navigate }) => {
  const [selectedDimension, setSelectedDimension] = useState<DimensionGroupId>('weight');
  const [fromUnitId, setFromUnitId] = useState<string>('kg');
  const [toUnitId, setToUnitId] = useState<string>('pounds');

  const availableUnits = useMemo(() => {
    return Object.values(UNITS).filter((u) => getUnitDimension(u) === selectedDimension);
  }, [selectedDimension]);

  const handleDimensionChange = (dimId: DimensionGroupId) => {
    setSelectedDimension(dimId);
    const group = DIMENSION_GROUPS.find((g) => g.id === dimId);
    if (group) {
      setFromUnitId(group.defaultFrom);
      setToUnitId(group.defaultTo);
    }
  };

  const handleSwapUnits = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  const handleQuickPairSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (!slug) return;
    const conv = CONVERTERS.find((c) => c.slug === slug);
    if (!conv) return;
    const fUnit = UNITS[conv.fromUnitId];
    if (fUnit) {
      setSelectedDimension(getUnitDimension(fUnit));
      setFromUnitId(conv.fromUnitId);
      setToUnitId(conv.toUnitId);
    }
  };

  const fromUnit = UNITS[fromUnitId] || UNITS.kg;
  const toUnit = UNITS[toUnitId] || UNITS.pounds;

  const matchingConverter = useMemo(
    () => findConverterByUnits(fromUnit.id, toUnit.id),
    [fromUnit.id, toUnit.id]
  );

  const convertFn = useMemo(() => {
    if (matchingConverter) {
      return matchingConverter.convert;
    }
    return (val: number) => convertAnyUnit(val, fromUnit.id, toUnit.id);
  }, [matchingConverter, fromUnit.id, toUnit.id]);

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#1F2A44] dark:text-slate-300"
      >
        <a
          href="/"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            navigate('/');
          }}
          className="text-[#2D3E63] dark:text-slate-300 hover:text-[#1F2A44] dark:hover:text-[#F2C94C] hover:underline underline-offset-4 transition-colors"
        >
          Home
        </a>
        <span aria-hidden="true" className="text-[#1F2A44]/50 dark:text-slate-400">
          &gt;
        </span>
        <a
          href="/bulk-converter"
          aria-current="page"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            navigate('/bulk-converter');
          }}
          className="font-semibold text-[#1F2A44] dark:text-white hover:underline underline-offset-4 transition-colors"
        >
          Bulk Convert (CSV)
        </a>
      </nav>

      {/* Page Header */}
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1F2A44] dark:text-white">
          Bulk Unit Converter (CSV &amp; Paste)
        </h1>
        <p className="text-sm sm:text-base text-[#1F2A44]/80 dark:text-slate-300 max-w-3xl leading-relaxed">
          Convert many values at once between any two compatible units. Paste a column of numbers or upload a CSV file from Excel or Google Sheets, preview the converted table instantly, and download the result CSV—100% in your browser.
        </p>
      </header>

      {/* Unit Pair Picker Card */}
      <section className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
        <div className="h-2 bg-[#F2C94C] measuring-tape-ticks" aria-hidden="true" />
        <div className="p-5 sm:p-6 space-y-5">
          {/* Category Pills */}
          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70 dark:text-slate-300">
              1. Choose Measurement Type
            </span>
            <div className="flex flex-wrap gap-2">
              {DIMENSION_GROUPS.map((group) => {
                const isActive = selectedDimension === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleDimensionChange(group.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[#1F2A44] text-white border-[#1F2A44] dark:bg-[#F2C94C] dark:text-[#1F2A44] dark:border-[#F2C94C]'
                        : 'bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-slate-200 border-[#1F2A44]/15 dark:border-white/15 hover:border-[#F2C94C]'
                    }`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* From Unit / Swap / To Unit Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end pt-2">
            <div className="space-y-1.5">
              <label
                htmlFor="bulk-from-unit"
                className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] dark:text-slate-200"
              >
                From Unit
              </label>
              <select
                id="bulk-from-unit"
                value={fromUnit.id}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border-2 border-[#1F2A44]/20 dark:border-white/20 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none text-sm font-bold cursor-pointer"
              >
                {availableUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.pluralName} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapUnits}
                aria-label="Swap From and To units"
                title="Swap units"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#F2C94C] text-[#1F2A44] font-bold text-xs hover:brightness-95 transition-all cursor-pointer"
              >
                <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
                <span>Swap</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="bulk-to-unit"
                className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] dark:text-slate-200"
              >
                To Unit
              </label>
              <select
                id="bulk-to-unit"
                value={toUnit.id}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border-2 border-[#1F2A44]/20 dark:border-white/20 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none text-sm font-bold cursor-pointer"
              >
                {availableUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.pluralName} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Quick Preset Converter Dropdown & Dedicated Page Link */}
          <div className="pt-3 border-t border-[#1F2A44]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <label
                htmlFor="bulk-preset-pair"
                className="font-semibold text-[#1F2A44]/75 dark:text-slate-300"
              >
                Quick load popular pair:
              </label>
              <select
                id="bulk-preset-pair"
                value={matchingConverter?.slug || ''}
                onChange={handleQuickPairSelect}
                className="px-3 py-1.5 rounded-lg bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border border-[#1F2A44]/20 dark:border-white/20 text-xs font-semibold cursor-pointer"
              >
                <option value="">Select from {CONVERTERS.length} converters...</option>
                {CONVERTERS.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.shortTitle} ({c.title.replace(' Converter', '')})
                  </option>
                ))}
              </select>
            </div>

            {matchingConverter && (
              <a
                href={`/${matchingConverter.slug}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  navigate(`/${matchingConverter.slug}`);
                }}
                className="inline-flex items-center gap-1 font-bold text-[#1F2A44] dark:text-[#F2C94C] hover:underline underline-offset-4"
              >
                <span>Open single {matchingConverter.shortTitle} calculator</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Bulk Convert Tool (Always Expanded on /bulk-converter) */}
      <BulkConvertTool
        fromUnit={fromUnit}
        toUnit={toUnit}
        convertFn={convertFn}
        collapsible={false}
      />
    </div>
  );
};
