import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const searchFuzzyResults: RegistryEntry = entry({
    id: "search-fuzzy-results",
    title: "Fuzzy Search & Highlighting",
    description:
      "Standalone fuzzy matcher that ranks results by relevance and highlights every matched character.",
    dependencies: ["react"],
    source: `import { useMemo, useState } from "react";

const ITEMS = [
  { title: "Buttons", desc: "Variants, sizes, icons, loading states", icon: "▦", keywords: "button primary secondary outline" },
  { title: "Inputs", desc: "Text inputs, selects, checkboxes, switches", icon: "⌨", keywords: "input text field password" },
  { title: "Cards", desc: "Cards, tiles, media cards, interactive", icon: "⊞", keywords: "card tile panel" },
  { title: "Forms", desc: "Form layouts, validation, multi-step", icon: "☰", keywords: "form validation input" },
  { title: "Table", desc: "Data tables, sorting, filtering, sticky", icon: "⊟", keywords: "table data grid sort" },
  { title: "Modal", desc: "Centered, side, full-screen modals", icon: "⎔", keywords: "modal dialog popup overlay" },
  { title: "Dialog", desc: "Confirm, alert, form dialogs", icon: "◻", keywords: "dialog confirm alert" },
  { title: "Drawer", desc: "Left, right, bottom drawers", icon: "▨", keywords: "drawer side panel" },
  { title: "Dropdown", desc: "Menu dropdowns, select dropdowns", icon: "▾", keywords: "dropdown menu select" },
  { title: "Tooltip", desc: "Top, bottom, rich tooltips", icon: "◈", keywords: "tooltip hover hint" },
  { title: "Toast", desc: "Success, error, info notifications", icon: "◊", keywords: "toast notification message" },
  { title: "Carousel", desc: "Image, card, testimonial carousels", icon: "▸▸", keywords: "carousel slider gallery" },
  { title: "Command Menu", desc: "Cmd+K palette, grouped actions", icon: "⌘", keywords: "command palette cmd k" },
  { title: "Tabs", desc: "Underline, pills, icons, vertical tabs", icon: "▭", keywords: "tabs tab pills" },
  { title: "Search", desc: "Search bars, command palette", icon: "⌕", keywords: "search find query" },
  { title: "Skeleton", desc: "Text, card, table skeletons", icon: "▯", keywords: "skeleton loading placeholder" },
];

function fuzzyMatch(query, text) {
  const q = String(query).trim().toLowerCase();
  const t = String(text).toLowerCase();
  if (!q) return { score: 0, indices: [] };
  if (q.length > t.length) return { score: -Infinity, indices: [] };
  let qi = 0;
  let score = 0;
  let consecutive = 0;
  let prevMatched = -1;
  const indices = [];
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      const prev = ti > 0 ? t[ti - 1] : "";
      const wordStart = ti === 0 || !/[a-z0-9]/.test(prev);
      let add = 2;
      if (ti === 0 && qi === 0) add += 10;
      else if (qi === 0) add += 4;
      if (wordStart) add += 6;
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
  if (qi < q.length) return { score: -Infinity, indices: [] };
  if (indices[0] === 0) score += 4;
  if (indices[0] === 0 && indices[indices.length - 1] === q.length - 1) score += 6;
  if (t.length === q.length) score += 8;
  return { score, indices };
}

function Highlight({ text, indices }) {
  if (!indices || indices.length === 0) return text;
  const parts = [];
  let last = 0;
  indices.forEach((i, k) => {
    if (i < last || i >= text.length) return;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <mark key={k} className="rounded-[2px] bg-accent-soft px-px text-accent">
        {text[i]}
      </mark>
    );
    last = i + 1;
  });
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function FuzzySearchList() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = [];
    for (const item of ITEMS) {
      const m = fuzzyMatch(q, item.title + " " + item.keywords);
      if (m.score === -Infinity) continue;
      scored.push({ item, score: m.score, indices: m.indices });
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, 8);
  }, [query]);

  const maxScore = Math.max(1, ...results.map((r) => r.score));
  const examples = ["btn", "mod", "card", "dark"];

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a fuzzy query, e.g. &quot;btn&quot;..."
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-muted-foreground">Try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setQuery(ex)}
            className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground"
          >
            {ex}
          </button>
        ))}
      </div>

      {!query.trim() ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-12 text-center">
          <p className="text-sm font-medium">Start typing</p>
          <p className="text-xs text-muted-foreground">
            Subsequence matching ranks results — &ldquo;mod&rdquo; finds Modal &amp; Dropdown.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-12 text-center">
          <p className="text-sm font-medium">No matches for &ldquo;{query}&rdquo;</p>
          <p className="text-xs text-muted-foreground">Try a shorter term.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {results.map((result) => {
            const strength = Math.round((result.score / maxScore) * 100);
            return (
              <li
                key={result.item.title}
                onMouseEnter={() => setSelected(result.item.title)}
                className={"flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors " + (selected === result.item.title ? "border-ring/40 bg-muted/40" : "border-border")}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                  {result.item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    <Highlight text={result.item.title} indices={result.indices} />
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{result.item.desc}</span>
                </span>
                <span className="flex w-20 shrink-0 flex-col items-end gap-1">
                  <span className="h-1 w-full overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full bg-accent" style={{ width: Math.max(strength, 8) + "%" }} />
                  </span>
                  <span className="text-[10px] text-muted-foreground">{strength}%</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}`,
  });
