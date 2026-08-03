import type { SpotlightItem, Section } from "./SpotlightSearch.types";

export function readList(key: string): string[] | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : null;
  } catch { return null; }
}

export function writeList(key: string, value: string[]) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

export function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function scoreItem(item: SpotlightItem, query: string): number {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const category = item.category.toLowerCase();
  const subtitle = (item.subtitle ?? "").toLowerCase();
  let score = 0;
  for (const term of query.split(/\s+/).filter(Boolean)) {
    const li = label.indexOf(term);
    const ki = keywords.indexOf(term);
    const ci = category.indexOf(term);
    const si = subtitle.indexOf(term);
    if (li < 0 && ki < 0 && ci < 0 && si < 0) return -1;
    score += li >= 0 ? 1000 - li : ki >= 0 ? 600 - ki : ci >= 0 ? 350 - ci : 300 - si;
  }
  return score;
}

export function buildSections(items: SpotlightItem[], query: string, recents: string[]): Section[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    const sections: Section[] = [];
    const recentRows = recents.map((id) => items.find((item) => item.id === id)).filter((item): item is SpotlightItem => Boolean(item));
    if (recentRows.length > 0) sections.push({ title: "Recent", rows: recentRows });
    const popularRows = items.filter((item) => item.popular);
    if (popularRows.length > 0) sections.push({ title: "Popular", rows: popularRows });
    const groups = new Map<string, SpotlightItem[]>();
    for (const item of items) { const list = groups.get(item.category); if (list) list.push(item); else groups.set(item.category, [item]); }
    for (const [title, rows] of groups) sections.push({ title, rows });
    return sections;
  }
  const scored = items.map((item) => ({ item, score: scoreItem(item, q) })).filter((m) => m.score >= 0).sort((a, b) => b.score - a.score);
  const groups = new Map<string, SpotlightItem[]>();
  for (const { item } of scored) { const list = groups.get(item.category); if (list) list.push(item); else groups.set(item.category, [item]); }
  return Array.from(groups, ([title, rows]) => ({ title, rows }));
}
