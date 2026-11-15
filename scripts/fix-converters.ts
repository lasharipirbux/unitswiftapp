import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/data/converters.ts');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Remove the messed up POPULAR_CONVERTER_SLUGS section inserted in the middle
const popularStartIdx = code.indexOf('export const POPULAR_CONVERTER_SLUGS = [');
// The original POPULAR_CONVERTER_SLUGS was at the end. Let's find all occurrences of POPULAR_CONVERTER_SLUGS.
// Actually let's just clean up by reading original CONVERTERS array up to line 2466, then appending the 50 converters, then TO_BASE_FACTORS, convertAnyUnit, formatConvertedNumber, findConverterByUnits, findConverterBySlug, and POPULAR_CONVERTER_SLUGS.

// Let's find where CONVERTERS array starts and where line 2466 is.
const convsStart = code.indexOf('export const CONVERTERS: ConverterPageConfig[] = [');
// Let's find the original closing bracket of CONVERTERS before TO_BASE_FACTORS
const baseFactorsIdx = code.indexOf('// Universal converter function between ANY two compatible units');
if (baseFactorsIdx === -1) {
  console.error('Cannot find base factors');
  process.exit(1);
}

// Extract the 50 new converters from the bottom of the file
const startOfNewConvs = code.indexOf('slug: \'masha-to-gram\'');
if (startOfNewConvs === -1) {
  console.error('Cannot find start of new converters');
  process.exit(1);
}

const endOfNewConvs = code.lastIndexOf('  }\n];');
// Let's extract the exact new converters block (from the first { of masha-to-gram to the last } of ms-to-knots)
const blockStart = code.lastIndexOf(',\n  {\n    slug: \'masha-to-gram\'');
const blockEnd = code.lastIndexOf('  }\n];') + 3; // up to ];

const newConvsBlock = code.slice(blockStart + 2, blockEnd - 1); // inside items

// Let's rebuild the file cleanly:
// Part 1: from start of file up to line 2465 (just before ];)
const originalConvsEnd = code.indexOf('  },\n];\n\n\n  \n\n  \n\n// Universal converter function');
// Let's find where the base factors start
const baseFactorsCodeStart = code.indexOf('// Universal converter function');

// Let's read the file lines or use clean slicing.
console.log('Fixing converters.ts structure...');
