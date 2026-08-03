import type { JsonNode, JsonType, TypeStats } from "./JsonTreeViewer.types";

const IDENT = /^[A-Za-z_$][\w$]*$/;

export function getType(value: unknown): JsonType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const t = typeof value;
  if (t === "object") return "object";
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  if (t === "undefined") return "undefined";
  return "string";
}

export function buildPath(segments: (string | number)[]): string {
  let path = "$";
  for (const seg of segments) { if (typeof seg === "number") path += `[${seg}]`; else if (IDENT.test(seg)) path += `.${seg}`; else path += `[${JSON.stringify(seg)}]`; }
  return path;
}

export function valueText(type: JsonType, raw: unknown): string {
  switch (type) {
    case "array": return `${(raw as unknown[]).length} items`;
    case "object": return `${Object.keys(raw as Record<string, unknown>).length} keys`;
    case "string": return raw as string;
    case "number": case "boolean": return String(raw);
    case "null": case "undefined": return type;
  }
}

export function buildNode(value: unknown, key: string, segments: (string | number)[], depth: number, isRoot: boolean): JsonNode {
  const type = getType(value);
  let children: JsonNode[] = [];
  if (type === "object" || type === "array") {
    const entries: [string, unknown][] = type === "array" ? (value as unknown[]).map((v, i) => [String(i), v] as const) : Object.entries(value as Record<string, unknown>);
    children = entries.map(([k, v]) => buildNode(v, k, [...segments, type === "array" ? Number(k) : k], depth + 1, false));
  }
  return { key, path: buildPath(segments), type, raw: value, children, size: children.length, depth, isRoot, selfMatch: false, hasMatch: false };
}

export function applyQuery(node: JsonNode, query: string): JsonNode {
  if (!query.trim()) return node;
  const q = query.trim().toLowerCase();
  const selfMatch = `${node.key} ${valueText(node.type, node.raw)}`.toLowerCase().includes(q);
  let hasMatch = false;
  const children = node.children.map((child) => { const c = applyQuery(child, query); if (c.selfMatch || c.hasMatch) hasMatch = true; return c; });
  if (selfMatch) hasMatch = true;
  return { ...node, selfMatch, hasMatch, children };
}

export function computeInitialExpanded(data: unknown, depth: number): Set<string> {
  const result = new Set<string>();
  if (depth <= 0) return result;
  const visit = (value: unknown, segments: (string | number)[], d: number) => {
    const type = getType(value);
    if ((type === "object" || type === "array") && d < depth) {
      result.add(buildPath(segments));
      const entries: [string, unknown][] = type === "array" ? (value as unknown[]).map((v, i) => [String(i), v] as const) : Object.entries(value as Record<string, unknown>);
      for (const [k, v] of entries) visit(v, [...segments, type === "array" ? Number(k) : k], d + 1);
    }
  };
  visit(data, [], 0);
  return result;
}

export function collectContainerPaths(node: JsonNode): string[] {
  const paths: string[] = [];
  const visit = (n: JsonNode) => { if (n.type === "object" || n.type === "array") { paths.push(n.path); n.children.forEach(visit); } };
  visit(node);
  return paths;
}

export function computeStats(node: JsonNode): TypeStats {
  const stats: TypeStats = { object: 0, array: 0, string: 0, number: 0, boolean: 0, null: 0 };
  const visit = (n: JsonNode) => { if (n.type === "object" || n.type === "array") { stats[n.type] += 1; n.children.forEach(visit); } else if (n.type in stats) { stats[n.type as keyof TypeStats] += 1; } };
  visit(node);
  return stats;
}

export function countNodes(node: JsonNode): number {
  let count = 1;
  for (const child of node.children) count += countNodes(child);
  return count;
}

export function prettyJson(value: unknown): string {
  if (value === undefined) return "";
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}

export function copyToClipboard(text: string): void {
  if (navigator.clipboard?.writeText) { void navigator.clipboard.writeText(text); return; }
  const textarea = document.createElement("textarea");
  textarea.value = text; textarea.style.position = "fixed"; textarea.style.opacity = "0";
  document.body.appendChild(textarea); textarea.select();
  try { document.execCommand("copy"); } catch { /* ignore */ }
  document.body.removeChild(textarea);
}

export function formatLeaf(node: JsonNode): string {
  switch (node.type) {
    case "string": return JSON.stringify(node.raw);
    case "number": case "boolean": return String(node.raw);
    case "null": return "null";
    case "undefined": return "undefined";
    default: return "";
  }
}
