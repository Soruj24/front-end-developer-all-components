#!/usr/bin/env node
/**
 * Audit preview surfaces for fixed-width Tailwind classes that can break the
 * device-responsive live preview frame (375 / 430 / 768 / 1024 / 1280px).
 *
 * Findings are annotated with the nearest device preset they overflow and
 * whether a scrollable wrapper (`overflow-x-auto` / `overflow-auto`) sits
 * nearby. Run with `--fail` to exit non-zero when a hard overflow is found.
 *
 * Usage:
 *   node scripts/audit-preview-widths.mjs [--fail] [--width 375]
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DEVICE_WIDTHS = [375, 430, 768, 1024, 1280];

const args = process.argv.slice(2);
const fail = args.includes("--fail");
const widthArg = args.find((a) => a.startsWith("--width="));
const WATCH_WIDTH = widthArg ? Number(widthArg.split("=")[1]) : 375;

const SCAN_DIRS = [
  "features/components/live-preview",
  "components/preview",
  "components/playground",
  "app/(site)",
];

const CLASS_RE = /className="([^"]*)"/g;
const WIDTH_RE =
  /(?<!-)w-\[(\d+(?:\.\d+)?)px\]|min-w-\[(\d+(?:\.\d+)?)px\]|max-w-\[(\d+(?:\.\d+)?)px\]|grid-cols-\[(repeat\([^)]*\)|[^\]]+)\]/g;

const OVERFLOW_RE = /\b(?:overflow-x-auto|overflow-auto)\b/;

function listFiles(dir) {
  const out = [];
  const abs = join(ROOT, dir);
  if (!statSync(abs, { throwIfNoEntry: false })) return out;
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else if (/\.(tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function nearestPreset(pixels) {
  return DEVICE_WIDTHS.filter((w) => pixels > w).at(-1) ?? null;
}

const findings = [];
let scanned = 0;

for (const dir of SCAN_DIRS) {
  for (const file of listFiles(dir)) {
    const text = readFileSync(join(ROOT, file), "utf8");
    const lines = text.split("\n");
    scanned += 1;

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      for (const match of line.matchAll(CLASS_RE)) {
        const cls = match[1];
        WIDTH_RE.lastIndex = 0;
        for (const w of cls.matchAll(WIDTH_RE)) {
          const value = w[1] ?? w[2] ?? w[3];
          if (!value) continue;
          const pixels = Number(value);
          const overflow = pixels > WATCH_WIDTH;
          const scrollable =
            OVERFLOW_RE.test(cls) ||
            lines
              .slice(Math.max(0, i - 3), i)
              .some((l) => OVERFLOW_RE.test(l));
          findings.push({
            file,
            line: i + 1,
            cls: w[0],
            pixels,
            preset: nearestPreset(pixels),
            overflow,
            scrollable,
          });
        }
      }
    }
  }
}

const hard = findings.filter((f) => f.overflow && !f.scrollable);
const soft = findings.filter((f) => !f.overflow || f.scrollable);

const sort = (a, b) => b.pixels - a.pixels;

console.log(`\nPreview width audit — watching ${WATCH_WIDTH}px\n`);
console.log(`Scanned ${scanned} files, found ${findings.length} fixed-width classes.\n`);

if (hard.length) {
  console.log(`HARD OVERFLOW (> ${WATCH_WIDTH}px, no scroll wrapper)`);
  for (const f of hard.sort(sort)) {
    console.log(`  ${f.file}:${f.line}  ${f.cls}  (${f.pixels}px)`);
  }
} else {
  console.log("No hard overflows. ✓");
}

if (soft.length) {
  console.log(`\nScrollable / tolerated (> ${WATCH_WIDTH}px but wrapped, or smaller)`);
  for (const f of soft.sort(sort).slice(0, 40)) {
    const note = f.scrollable ? "wrapped" : "below watch width";
    console.log(`  ${f.file}:${f.line}  ${f.cls}  (${f.pixels}px, ${note})`);
  }
}

if (fail && hard.length) {
  console.log(`\nAudit failed: ${hard.length} hard overflow(s).`);
  process.exit(1);
}
console.log(`\nDone.`);
