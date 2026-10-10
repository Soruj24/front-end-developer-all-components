import { CN_SOURCE } from "../constants/target-env";

const CN_IMPORT_RE = /import\s*\{\s*cn\s*\}\s*from\s*["']@\/lib\/cn["'];?\n?/g;
const HOOK_RE = /\b(useState|useEffect|useMemo|useRef|useCallback|useContext)\b/;
const BROWSER_RE = /\b(document|window|localStorage|navigator)\b/;

/** True when the source needs "use client" in a Next.js App Router project. */
export function needsClientDirective(source: string): boolean {
  return HOOK_RE.test(source) || BROWSER_RE.test(source) || /"use client"/.test(source);
}

/**
 * Rewrites a registry source into a zero-alias standalone file.
 * Replaces the `@/lib/cn` import with an embedded cn() helper so the
 * copied file compiles without workspace aliases.
 */
export function toStandalone(source: string): string {
  if (!CN_IMPORT_RE.test(source)) return source;
  CN_IMPORT_RE.lastIndex = 0;
  const helper = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nfunction cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`;
  return source.replace(CN_IMPORT_RE, helper);
}

/** Exact embedded cn() utility file shipped alongside standalone copies. */
export function cnFile(): { filename: string; language: string; code: string } {
  return { filename: "lib/cn.ts", language: "ts", code: CN_SOURCE };
}
