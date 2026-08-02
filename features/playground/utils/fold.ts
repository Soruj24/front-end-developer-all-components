import { FOLD_MARKERS } from "../constants";
import type { LanguageId } from "../types";

export interface FoldRange {
  start: number;
  end: number;
}

function braceEnd(lines: string[], start: number): number {
  let depth = 0;
  for (let i = start; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") depth += 1;
      else if (ch === "}") {
        depth -= 1;
        if (depth === 0) return i;
      }
    }
  }
  return -1;
}

/**
 * Returns the 0-based fold range for a block-start line, or null when the line
 * cannot be folded. Uses brace matching for code, heading nesting for markdown.
 */
export function foldRangeFromLine(source: string, language: LanguageId, lineIndex: number): FoldRange | null {
  const lines = source.split("\n");
  const line = lines[lineIndex];
  if (!line) return null;
  const markers = FOLD_MARKERS[language];
  if (markers && markers.test(line)) {
    if (language === "md") {
      const heading = line.match(/^(#+)/)?.[1].length ?? 1;
      for (let i = lineIndex + 1; i < lines.length; i++) {
        const next = lines[i].match(/^(#+)/);
        if (next && next[1].length <= heading) return { start: lineIndex, end: i - 1 };
      }
      return { start: lineIndex, end: lines.length - 1 };
    }
    const end = braceEnd(lines, lineIndex);
    if (end > lineIndex) return { start: lineIndex, end };
  }
  return null;
}

/** All foldable block-start lines for a file. */
export function foldCandidates(source: string, language: LanguageId): number[] {
  const lines = source.split("\n");
  const re = FOLD_MARKERS[language];
  if (!re) return [];
  const out: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) out.push(i);
  }
  return out;
}

/** Splits source into visible lines, skipping content hidden by active folds. */
export function applyFolds(lines: string[], folds: FoldRange[]): Array<{ lineIndex: number; text: string }> {
  const hidden = new Set<number>();
  for (const fold of folds) {
    for (let i = fold.start + 1; i <= fold.end; i++) hidden.add(i);
  }
  const out: Array<{ lineIndex: number; text: string }> = [];
  for (let i = 0; i < lines.length; i++) {
    if (!hidden.has(i)) out.push({ lineIndex: i, text: lines[i] });
  }
  return out;
}
