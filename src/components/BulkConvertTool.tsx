import React, { useState, useMemo, useRef } from 'react';
import {
  ChevronDown,
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Trash2,
  Copy,
  Check,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { UnitDefinition, formatConvertedNumber } from '../data/converters';

interface BulkConvertToolProps {
  fromUnit: UnitDefinition;
  toUnit: UnitDefinition;
  convertFn: (val: number) => number;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

interface ParsedRow {
  id: number;
  rawInput: string;
  numericValue: number;
  convertedValue: number;
  formattedConverted: string;
}

function parseBulkInput(rawText: string, convertFn: (val: number) => number): ParsedRow[] {
  if (!rawText.trim()) return [];

  const lines = rawText.split(/\r?\n/);
  const rows: ParsedRow[] = [];
  let rowIndex = 1;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Split CSV line by comma, semicolon, or tab
    const cells = trimmedLine
      .split(/[,;\t]/)
      .map((c) => c.trim().replace(/^["']|["']$/g, '').trim())
      .filter(Boolean);

    // Find the first cell that is a valid finite number
    let foundNumber: number | null = null;
    let matchedRaw = '';

    for (const cell of cells) {
      // Allow plain numbers and scientific notation
      if (/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(cell)) {
        const parsed = Number(cell);
        if (Number.isFinite(parsed)) {
          foundNumber = Object.is(parsed, -0) ? 0 : parsed;
          matchedRaw = cell;
          break;
        }
      }
    }

    if (foundNumber !== null) {
      const converted = convertFn(foundNumber);
      rows.push({
        id: rowIndex++,
        rawInput: matchedRaw,
        numericValue: foundNumber,
        convertedValue: converted,
        formattedConverted: formatConvertedNumber(converted),
      });
    }
  }

  return rows;
}

export const BulkConvertTool: React.FC<BulkConvertToolProps> = ({
  fromUnit,
  toUnit,
  convertFn,
  collapsible = true,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(collapsible ? defaultOpen : true);
  const [rawInput, setRawInput] = useState<string>('1\n5\n10\n25\n50\n100');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const parsedRows = useMemo(
    () => parseBulkInput(rawInput, convertFn),
    [rawInput, convertFn]
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = typeof event.target?.result === 'string' ? event.target.result : '';
      setRawInput(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadCsv = () => {
    if (parsedRows.length === 0) return;

    const header = `"Original Value (${fromUnit.symbol})","Converted Value (${toUnit.symbol})"`;
    const csvLines = parsedRows.map((row) => {
      const cleanNumericConverted = Number.isFinite(row.convertedValue)
        ? Number(row.convertedValue.toFixed(6))
        : 0;
      return `${row.numericValue},${cleanNumericConverted}`;
    });

    const csvContent = [header, ...csvLines].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `unitswift-${fromUnit.id}-to-${toUnit.id}-bulk.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (parsedRows.length === 0) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 16;
    const contentWidth = pageWidth - marginX * 2;
    const bottomMargin = 18;
    const rowHeight = 7.5;

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const unitsLabel = `${fromUnit.pluralName} (${fromUnit.symbol}) to ${toUnit.pluralName} (${toUnit.symbol})`;

    const drawDocumentHeader = (isFirstPage: boolean): number => {
      // Top yellow measuring-tape accent bar
      doc.setFillColor(242, 201, 76); // #F2C94C
      doc.rect(0, 0, pageWidth, 3.5, 'F');

      if (isFirstPage) {
        // Brand Name & URL
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(31, 42, 68); // #1F2A44
        doc.text('UnitSwift', marginX, 15);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(80, 95, 125);
        doc.text('https://unitswift.org', pageWidth - marginX, 15, { align: 'right' });

        // Subtitle: Units used & Today's Date
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(31, 42, 68);
        doc.text(`Bulk Conversion: ${unitsLabel}`, marginX, 24);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(90, 105, 135);
        doc.text(`Date: ${todayStr}   |   Total Values: ${parsedRows.length}`, marginX, 30);

        // Divider line
        doc.setDrawColor(210, 218, 230);
        doc.setLineWidth(0.3);
        doc.line(marginX, 33.5, pageWidth - marginX, 33.5);

        return 38;
      } else {
        // Compact running header on continuation pages
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(31, 42, 68);
        doc.text(`UnitSwift (unitswift.org) — ${unitsLabel}`, marginX, 12);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(90, 105, 135);
        doc.text(todayStr, pageWidth - marginX, 12, { align: 'right' });

        return 17;
      }
    };

    const drawTableHeader = (y: number): number => {
      doc.setFillColor(31, 42, 68); // #1F2A44
      doc.rect(marginX, y, contentWidth, 8, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(255, 255, 255);
      doc.text('#', marginX + 4, y + 5.4);
      doc.text(`Original Value (${fromUnit.symbol})`, marginX + 20, y + 5.4);
      doc.text(
        `Converted Value (${toUnit.symbol})`,
        pageWidth - marginX - 4,
        y + 5.4,
        { align: 'right' }
      );

      return y + 8;
    };

    let currentY = drawDocumentHeader(true);
    currentY = drawTableHeader(currentY);

    parsedRows.forEach((row, idx) => {
      if (currentY + rowHeight > pageHeight - bottomMargin) {
        doc.addPage();
        currentY = drawDocumentHeader(false);
        currentY = drawTableHeader(currentY);
      }

      // Alternating row background
      if (idx % 2 === 1) {
        doc.setFillColor(246, 248, 250); // #F6F8FA
        doc.rect(marginX, currentY, contentWidth, rowHeight, 'F');
      }

      // Row bottom border
      doc.setDrawColor(230, 235, 242);
      doc.setLineWidth(0.2);
      doc.line(marginX, currentY + rowHeight, pageWidth - marginX, currentY + rowHeight);

      // Row #
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(110, 122, 145);
      doc.text(String(row.id), marginX + 4, currentY + 5.1);

      // Original Value
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(31, 42, 68);
      doc.text(`${row.numericValue} ${fromUnit.symbol}`, marginX + 20, currentY + 5.1);

      // Converted Value
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(31, 42, 68);
      doc.text(
        `${row.formattedConverted} ${toUnit.symbol}`,
        pageWidth - marginX - 4,
        currentY + 5.1,
        { align: 'right' }
      );

      currentY += rowHeight;
    });

    // Add page numbers & footer on every page
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(120, 130, 150);
      doc.text(
        'Generated by UnitSwift — https://unitswift.org',
        marginX,
        pageHeight - 8
      );
      doc.text(
        `Page ${p} of ${totalPages}`,
        pageWidth - marginX,
        pageHeight - 8,
        { align: 'right' }
      );
    }

    doc.save(`unitswift-${fromUnit.id}-to-${toUnit.id}-bulk.pdf`);
  };

  const handleCopyResults = () => {
    if (parsedRows.length === 0) return;
    const text = parsedRows
      .map((r) => `${r.numericValue}\t${r.formattedConverted}`)
      .join('\n');
    navigator.clipboard?.writeText(text);
    setCopiedTable(true);
    window.setTimeout(() => setCopiedTable(false), 1800);
  };

  const handleClear = () => {
    setRawInput('');
    setUploadedFileName(null);
  };

  const handleLoadSample = () => {
    setRawInput('1\n5\n10\n25\n50\n100');
    setUploadedFileName(null);
  };

  const content = (
    <div className={collapsible ? 'p-5 sm:p-6 pt-0 space-y-5 border-t border-[#1F2A44]/10 dark:border-white/10' : 'p-5 sm:p-6 space-y-5'}>
      {/* Active From / To Indicator */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F6F8FA] dark:bg-[#0F1626] border border-[#1F2A44]/12 dark:border-white/10 font-medium text-[#1F2A44] dark:text-slate-200">
          <span>Converting:</span>
          <strong className="font-bold text-[#1F2A44] dark:text-[#F2C94C]">
            {fromUnit.pluralName} ({fromUnit.symbol})
          </strong>
          <span aria-hidden="true">→</span>
          <strong className="font-bold text-[#1F2A44] dark:text-[#F2C94C]">
            {toUnit.pluralName} ({toUnit.symbol})
          </strong>
        </div>

        <span className="text-[#1F2A44]/65 dark:text-slate-400 font-medium">
          100% browser-only · No server upload
        </span>
      </div>

      {/* Input & Result Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Paste Numbers or Upload CSV */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor={`bulk-input-${fromUnit.id}-${toUnit.id}`}
              className="text-xs font-bold uppercase tracking-wider text-[#1F2A44] dark:text-slate-200"
            >
              Paste numbers (one per line) or upload CSV
            </label>

            <div className="flex items-center gap-1.5">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt,text/csv,text/plain"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#F2C94C] text-[#1F2A44] hover:brightness-95 transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Upload CSV</span>
              </button>
            </div>
          </div>

          {uploadedFileName && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#F0F6FF] dark:bg-[#1E2D4A] text-xs font-medium text-[#1F2A44] dark:text-slate-200">
              <span className="truncate">Loaded file: <strong>{uploadedFileName}</strong></span>
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-bold underline ml-2 cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          <textarea
            id={`bulk-input-${fromUnit.id}-${toUnit.id}`}
            rows={7}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder={`Enter ${fromUnit.pluralName.toLowerCase()} (${fromUnit.symbol}), one per line...\n10\n25.5\n100`}
            className="w-full p-3.5 rounded-xl bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border border-[#1F2A44]/20 dark:border-white/20 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none text-sm font-mono-tabular leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[#1F2A44]/65 dark:text-slate-400 font-mono-tabular">
              {parsedRows.length} valid {parsedRows.length === 1 ? 'value' : 'values'} detected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs font-semibold text-[#1F2A44]/75 dark:text-slate-300 hover:text-[#1F2A44] dark:hover:text-[#F2C94C] underline underline-offset-2 cursor-pointer"
              >
                Sample values
              </button>
              {rawInput.trim() !== '' && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2A44]/75 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Result Table & Download CSV / Download PDF */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F2A44] dark:text-slate-200">
              Converted Results ({fromUnit.symbol} → {toUnit.symbol})
            </span>

            {parsedRows.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyResults}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border border-[#1F2A44]/15 dark:border-white/15 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] transition-colors cursor-pointer"
                >
                  {copiedTable ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#F2C94C]" aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Table</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#1F2A44] text-white dark:bg-[#F2C94C] dark:text-[#1F2A44] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#F2C94C] text-[#1F2A44] border border-[#1F2A44]/20 hover:brightness-95 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden bg-white dark:bg-[#0F1626]">
            {parsedRows.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#1F2A44]/65 dark:text-slate-400">
                Paste numbers on the left or upload a CSV file to see instant bulk conversions.
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#F6F8FA] dark:bg-[#151F33] border-b border-[#1F2A44]/10 dark:border-white/10 text-xs font-semibold text-[#1F2A44]/75 dark:text-slate-300">
                    <tr>
                      <th className="py-2.5 px-4 w-12">#</th>
                      <th className="py-2.5 px-4">
                        Original Value ({fromUnit.symbol})
                      </th>
                      <th className="py-2.5 px-4 text-right">
                        Converted Value ({toUnit.symbol})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F2A44]/10 dark:divide-white/10 text-sm font-mono-tabular">
                    {parsedRows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-[#F6F8FA]/70 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="py-2 px-4 text-xs text-[#1F2A44]/50 dark:text-slate-400">
                          {row.id}
                        </td>
                        <td className="py-2 px-4 text-[#1F2A44] dark:text-white">
                          {row.numericValue} {fromUnit.symbol}
                        </td>
                        <td className="py-2 px-4 text-right font-semibold text-[#1F2A44] dark:text-[#F2C94C]">
                          {row.formattedConverted} {toUnit.symbol}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Required Google Sheets Note */}
      <p className="text-xs text-[#1F2A44]/75 dark:text-slate-300 bg-[#F6F8FA] dark:bg-[#0F1626] px-4 py-2.5 rounded-xl border border-[#1F2A44]/10 dark:border-white/10">
        For Google Sheets: download your sheet as CSV, upload here, then open the result CSV in Google Sheets.
      </p>
    </div>
  );

  if (!collapsible) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
        {content}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F6F8FA]/70 dark:hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F0F6FF] dark:bg-[#1E2D4A] text-[#1F2A44] dark:text-[#F2C94C] flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-[#1F2A44] dark:text-white">
                Convert many values at once
              </h2>
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-[#F2C94C]/25 dark:bg-[#F2C94C]/15 text-[#1F2A44] dark:text-[#F2C94C] border border-[#F2C94C]/40">
                Bulk Convert (CSV)
              </span>
            </div>
            <p className="text-xs text-[#1F2A44]/65 dark:text-slate-400 mt-0.5">
              Paste a list of {fromUnit.pluralName.toLowerCase()} or upload a CSV file to convert to {toUnit.pluralName.toLowerCase()} in bulk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-xs font-semibold text-[#1F2A44]/70 dark:text-slate-300">
            {isOpen ? 'Hide' : 'Open'}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-4 h-4 text-[#1F2A44] dark:text-slate-300 transition-transform duration-150 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && content}
    </div>
  );
};
