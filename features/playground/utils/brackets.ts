const PAIRS: Record<string, string> = { "(": ")", "[": "]", "{": "}", ")": "(", "]": "[", "}": "{" };
const OPEN = new Set(["(", "[", "{"]);
const CLOSE = new Set([")", "]", "}"]);

export function isBracketChar(ch: string | undefined): boolean {
  return Boolean(ch && (OPEN.has(ch) || CLOSE.has(ch)));
}

/**
 * Finds the offset of the bracket that matches the one at `offset` (either an
 * open bracket right before the offset or a close bracket at the offset).
 * Returns null when no match exists.
 */
export function matchingBracket(source: string, offset: number): number | null {
  if (offset < 0 || offset > source.length) return null;
  const ch = source[offset] ?? source[offset - 1];
  if (!ch || !PAIRS[ch]) return null;
  const isOpen = OPEN.has(ch);
  if (isOpen) {
    const openCh = ch;
    const closeCh = PAIRS[ch];
    let count = 0;
    for (let i = offset; i < source.length; i++) {
      const c = source[i];
      if (c === openCh) count += 1;
      else if (c === closeCh) {
        count -= 1;
        if (count === 0) return i;
      }
    }
  } else {
    const closeCh = ch;
    const openCh = PAIRS[ch];
    let count = 0;
    for (let i = offset; i >= 0; i--) {
      const c = source[i];
      if (c === closeCh) count += 1;
      else if (c === openCh) {
        count -= 1;
        if (count === 0) return i;
      }
    }
  }
  return null;
}

/** Converts a string offset into a 0-based { line, col }. */
export function offsetToPosition(source: string, offset: number): { line: number; col: number } {
  let line = 0;
  let col = 0;
  for (let i = 0; i < offset && i < source.length; i++) {
    if (source[i] === "\n") {
      line += 1;
      col = 0;
    } else {
      col += 1;
    }
  }
  return { line, col };
}
