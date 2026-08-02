/**
 * Zero-dependency fuzzy matching used by the documentation search.
 *
 * `fuzzyMatch` walks the query through the haystack character by character,
 * scoring word starts, camelCase boundaries, and consecutive runs, while
 * returning the matched indices so callers can render highlighted results.
 */

export interface FuzzyMatch {
  /** Higher is better. `-Infinity` means no match. */
  score: number;
  /** Indexes (into the original text) of the characters that matched. */
  indices: number[];
}

export const NO_MATCH: FuzzyMatch = { score: -Infinity, indices: [] };

const WORD_BOUNDARY = /[^a-z0-9]/;

export function fuzzyMatch(query: string, text: string): FuzzyMatch {
  const q = query.trim().toLowerCase();
  const t = text.toLowerCase();

  if (!q) return { score: 0, indices: [] };
  if (q.length > t.length) return NO_MATCH;

  let qi = 0;
  let score = 0;
  let consecutive = 0;
  let prevMatched = -1;
  const indices: number[] = [];

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      const prev = ti > 0 ? t[ti - 1] : "";
      const isFirst = ti === 0;
      const isWordStart = isFirst || WORD_BOUNDARY.test(prev);
      const isCamel =
        !isWordStart && /[a-z]/.test(prev) && /[A-Z]/.test(t[ti]);

      let add = 2;
      if (isFirst && qi === 0) add += 10;
      else if (qi === 0) add += 4;
      if (isWordStart) add += 6;
      if (isCamel) add += 4;
      if (consecutive > 0) add += 2 + consecutive * 2;

      score += add;
      consecutive += 1;
      prevMatched = ti;
      indices.push(ti);
      qi += 1;
    } else {
      consecutive = 0;
      if (prevMatched >= 0) score -= Math.min(1.5, (ti - prevMatched) * 0.15);
    }
  }

  if (qi < q.length) return NO_MATCH;

  const first = indices[0];
  const last = indices[indices.length - 1];
  if (first === 0) score += 4;
  if (first === 0 && last === q.length - 1) score += 6;
  if (t.length === q.length) score += 8;

  let contiguous = true;
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] !== indices[i - 1] + 1) {
      contiguous = false;
      break;
    }
  }
  if (contiguous) score += 5;

  return { score, indices };
}

/** Returns the best-scoring fuzzy match across several fields. */
export function bestMatch(
  query: string,
  fields: string[]
): FuzzyMatch {
  let best: FuzzyMatch = NO_MATCH;
  for (const field of fields) {
    const match = fuzzyMatch(query, field);
    if (match.score > best.score) best = match;
  }
  return best;
}
