/** Small shared helpers for the playground. */

export function uid(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Simple line-based diff (LCS by line) for the version-history viewer. */
export function diffLines(a: string, b: string): Array<{ type: "same" | "add" | "remove"; text: string }> {
  const A = a.split("\n");
  const B = b.split("\n");
  const table: number[][] = Array.from({ length: A.length + 1 }, () =>
    new Array<number>(B.length + 1).fill(0)
  );
  for (let i = A.length - 1; i >= 0; i--) {
    for (let j = B.length - 1; j >= 0; j--) {
      table[i][j] = A[i] === B[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const out: Array<{ type: "same" | "add" | "remove"; text: string }> = [];
  let i = 0;
  let j = 0;
  while (i < A.length && j < B.length) {
    if (A[i] === B[j]) {
      out.push({ type: "same", text: A[i] });
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      out.push({ type: "remove", text: A[i] });
      i += 1;
    } else {
      out.push({ type: "add", text: B[j] });
      j += 1;
    }
  }
  while (i < A.length) out.push({ type: "remove", text: A[i++] });
  while (j < B.length) out.push({ type: "add", text: B[j++] });
  return out;
}
