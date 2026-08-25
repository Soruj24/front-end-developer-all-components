import { getRegistryItem } from "@/components/registry";
import type { PlaygroundFile } from "./types";
import { ENTRY_FILE } from "./constants";

/** Registry id prefix -> docs route. Longest prefix wins; unknown prefixes fall back to /components. */
const CATEGORY_ROUTES: Array<[prefix: string, route: string]> = [
  ["prompt-builder", "/prompt-builder"],
  ["command-palette", "/command-palette"],
  ["code-playground", "/code-playground"],
  ["api-explorer", "/api-explorer"],
  ["json-tree-viewer", "/json-tree-viewer"],
  ["terminal-emulator", "/terminal-emulator"],
  ["floating-toolbar", "/floating-toolbar"],
  ["bento-grid", "/bento-grid"],
  ["spotlight-search", "/spotlight-search"],
  ["dependency-graph", "/dependency-graph"],
  ["pricing-calculator", "/pricing-calculator"],
  ["pagination", "/pagination"],
  ["navigation", "/navigation"],
  ["empty-state", "/empty-state"],
  ["accordion", "/accordion"],
  ["dropdown", "/dropdown"],
  ["navbar", "/navbar"],
  ["context-menu", "/context-menu"],
  ["button", "/buttons"],
  ["avatar", "/avatar"],
  ["badge", "/badge"],
  ["input", "/inputs"],
  ["card", "/cards"],
  ["header", "/header"],
  ["form", "/forms"],
  ["table", "/table"],
  ["timeline", "/timeline"],
  ["carousel", "/carousel"],
  ["modal", "/modal"],
  ["dialog", "/dialog"],
  ["footer", "/footer"],
  ["layout", "/layouts"],
  ["drawer", "/drawer"],
  ["search", "/search"],
  ["dock", "/dock"],
  ["tab", "/tabs"],
  ["tooltip", "/tooltip"],
  ["popover", "/popover"],
  ["sidebar", "/sidebar"],
  ["toast", "/toast"],
  ["skeleton", "/skeleton"],
  ["hero", "/hero"],
  ["faq", "/faq"],
  ["testimonial", "/testimonials"],
];

export function docsRouteFor(id: string): string {
  for (const [prefix, route] of CATEGORY_ROUTES) {
    if (id === prefix || id.startsWith(`${prefix}-`)) return route;
  }
  return "/components";
}

/** Converts a registry item into a single-entry playground project. */
export function registryItemToFiles(id: string): PlaygroundFile[] {
  const item = getRegistryItem(id);
  if (!item) return [];
  return [{ name: ENTRY_FILE, source: item.source }];
}

/** Decodes a base64 `?p=` share payload into a project, or null. */
export function decodeSharePayload(raw: string | null): PlaygroundFile[] | null {
  if (!raw) return null;
  try {
    const json = decodeURIComponent(atob(raw));
    const value: unknown = JSON.parse(json);
    if (!Array.isArray(value)) return null;
    const files = value.filter(
      (f): f is PlaygroundFile =>
        Boolean(f) && typeof f === "object" && typeof (f as PlaygroundFile).name === "string" && typeof (f as PlaygroundFile).source === "string"
    );
    return files.length > 0 ? files : null;
  } catch {
    return null;
  }
}
