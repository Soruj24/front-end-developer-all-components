import type { CommandItem, FlatCommand, Row, Section, BuildOptions } from "./CommandPalette.types";

export function readList(key: string): string[] | null {
  try { const raw = window.localStorage.getItem(key); if (!raw) return null; const value: unknown = JSON.parse(raw); return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : null; } catch { return null; }
}

export function writeList(key: string, value: string[]) { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ } }

export function escapeRegExp(text: string): string { return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

export function scoreItem(item: CommandItem, query: string): number {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const group = (item.group ?? "").toLowerCase();
  let score = 0;
  for (const term of query.split(/\s+/).filter(Boolean)) { const li = label.indexOf(term); const ki = keywords.indexOf(term); const gi = group.indexOf(term); if (li < 0 && ki < 0 && gi < 0) return -1; score += li >= 0 ? 1000 - li : ki >= 0 ? 600 - ki : 300 - gi; }
  return score;
}

export function flattenTree(items: CommandItem[], parents: CommandItem[] = []): FlatCommand[] {
  const out: FlatCommand[] = [];
  for (const item of items) { out.push({ item, parents }); if (item.children && item.children.length > 0) out.push(...flattenTree(item.children, [...parents, item])); }
  return out;
}

export function makeRow(item: CommandItem, parents: CommandItem[], section: string): Row {
  return { key: [...parents.map((p) => p.id), item.id].join("/"), item, parents, section };
}

export function groupRows<T extends FlatCommand>(rows: T[], rowsToSection: (row: T) => string): Section[] {
  const groups = new Map<string, T[]>();
  for (const row of rows) { const title = rowsToSection(row); const list = groups.get(title); if (list) list.push(row); else groups.set(title, [row]); }
  const sections: Section[] = [];
  for (const [title, list] of groups) sections.push({ title, rows: list.map((row) => makeRow(row.item, row.parents, title)) });
  return sections;
}

export function buildSections({ items, stack, query, recents, favorites, pinned }: BuildOptions): Section[] {
  const q = query.trim().toLowerCase();
  if (stack.length > 0) {
    const parent = stack[stack.length - 1]; const children = parent.children ?? [];
    if (!q) return [{ title: null, rows: children.map((item) => makeRow(item, stack, "Commands")) }];
    const scored = children.map((item) => ({ item, score: scoreItem(item, q) })).filter((m) => m.score >= 0).sort((a, b) => b.score - a.score);
    return [{ title: null, rows: scored.map((m) => makeRow(m.item, stack, "Commands")) }];
  }
  if (q) {
    const scored = flattenTree(items).map((flat) => ({ ...flat, score: scoreItem(flat.item, q) })).filter((m) => m.score >= 0).sort((a, b) => b.score - a.score);
    const isPinned = (flat: FlatCommand) => pinned.includes(flat.item.id) || favorites.includes(flat.item.id);
    const pinnedRows = scored.filter(isPinned); const rest = scored.filter((flat) => !isPinned(flat));
    const sections: Section[] = [];
    if (pinnedRows.length > 0) sections.push({ title: "Pinned", rows: pinnedRows.map((row) => makeRow(row.item, row.parents, "Pinned")) });
    sections.push(...groupRows(rest, (row) => row.item.group ?? "Results"));
    return sections;
  }
  const sections: Section[] = [];
  const favoriteRows = items.filter((item) => favorites.includes(item.id));
  if (favoriteRows.length > 0) sections.push({ title: "Favorites", rows: favoriteRows.map((item) => makeRow(item, [], "Favorites")) });
  const pinnedRows = items.filter((item) => pinned.includes(item.id) && !favorites.includes(item.id));
  if (pinnedRows.length > 0) sections.push({ title: "Pinned", rows: pinnedRows.map((item) => makeRow(item, [], "Pinned")) });
  const recentRows = recents.map((id) => items.find((item) => item.id === id)).filter((item): item is CommandItem => Boolean(item));
  if (recentRows.length > 0) sections.push({ title: "Recent", rows: recentRows.map((item) => makeRow(item, [], "Recent")) });
  const groups = new Map<string, CommandItem[]>();
  for (const item of items) { const title = item.group ?? "Commands"; const list = groups.get(title); if (list) list.push(item); else groups.set(title, [item]); }
  for (const [title, groupItems] of groups) sections.push({ title, rows: groupItems.map((item) => makeRow(item, [], title)) });
  return sections;
}
