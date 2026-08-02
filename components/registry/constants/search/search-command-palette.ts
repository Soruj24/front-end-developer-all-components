import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const searchCommandPalette: RegistryEntry = entry({
    id: "search-command-palette",
    title: "Command Palette Search",
    description:
      "A premium documentation search dialog with Ctrl+K, fuzzy matching, recent searches, popular components, category browsing, and keyboard navigation.",
    dependencies: ["react"],
    source: `import { useEffect, useMemo, useRef, useState } from "react";

const DOCS = [
  { title: "Buttons", desc: "Variants, sizes, icons, loading states", href: "/buttons", icon: "▦", category: "Components", popular: true, keywords: "button primary secondary outline" },
  { title: "Inputs", desc: "Text inputs, selects, checkboxes, switches", href: "/inputs", icon: "⌨", category: "Components", popular: true, keywords: "input text field password" },
  { title: "Cards", desc: "Cards, tiles, media cards, interactive", href: "/cards", icon: "⊞", category: "Components", popular: true, keywords: "card tile panel" },
  { title: "Forms", desc: "Form layouts, validation, multi-step", href: "/forms", icon: "☰", category: "Components", popular: true, keywords: "form validation input" },
  { title: "Table", desc: "Data tables, sorting, filtering, sticky", href: "/table", icon: "⊟", category: "Components", popular: true, keywords: "table data grid sort" },
  { title: "Badge", desc: "Colored badges, dots, status indicators", href: "/badge", icon: "⬡", category: "Components", popular: true, keywords: "badge status tag dot" },
  { title: "Avatar", desc: "User avatars, groups, status rings", href: "/avatar", icon: "◉", category: "Components", popular: true, keywords: "avatar profile user image" },
  { title: "Modal", desc: "Centered, side, full-screen modals", href: "/modal", icon: "⎔", category: "Overlays", popular: true, keywords: "modal dialog popup overlay" },
  { title: "Dialog", desc: "Confirm, alert, form dialogs", href: "/dialog", icon: "◻", category: "Overlays", popular: true, keywords: "dialog confirm alert" },
  { title: "Drawer", desc: "Left, right, bottom drawers", href: "/drawer", icon: "▨", category: "Overlays", popular: true, keywords: "drawer side panel" },
  { title: "Dropdown", desc: "Menu dropdowns, select dropdowns", href: "/dropdown", icon: "▾", category: "Overlays", popular: true, keywords: "dropdown menu select" },
  { title: "Tooltip", desc: "Top, bottom, rich tooltips", href: "/tooltip", icon: "◈", category: "Overlays", popular: true, keywords: "tooltip hover hint" },
  { title: "Toast", desc: "Success, error, info notifications", href: "/toast", icon: "◊", category: "Overlays", popular: true, keywords: "toast notification message" },
  { title: "Accordion", desc: "Single, multiple, icon accordions", href: "/accordion", icon: "║", category: "Overlays", popular: true, keywords: "accordion collapse faq" },
  { title: "Carousel", desc: "Image, card, testimonial carousels", href: "/carousel", icon: "▸▸", category: "Overlays", popular: true, keywords: "carousel slider gallery" },
  { title: "Command Menu", desc: "Cmd+K palette, grouped actions", href: "/command-menu", icon: "⌘", category: "Menus", popular: true, keywords: "command palette cmd k" },
  { title: "Context Menu", desc: "Right-click menus, nested", href: "/context-menu", icon: "↘", category: "Menus", popular: false, keywords: "context menu right click" },
  { title: "Navigation", desc: "Sidebars, top bars, breadcrumbs", href: "/navigation", icon: "♢", category: "Navigation", popular: true, keywords: "navigation sidebar topbar breadcrumb" },
  { title: "Tabs", desc: "Underline, pills, icons, vertical tabs", href: "/tabs", icon: "▭", category: "Navigation", popular: true, keywords: "tabs tab pills" },
  { title: "Search", desc: "Search bars, command palette", href: "/search", icon: "⌕", category: "Navigation", popular: false, keywords: "search find query" },
  { title: "Pagination", desc: "Page numbers, prev/next, compact", href: "/pagination", icon: "‹›", category: "Components", popular: false, keywords: "pagination page numbers" },
  { title: "Timeline", desc: "Vertical, horizontal, icon timelines", href: "/timeline", icon: "≡", category: "Components", popular: false, keywords: "timeline steps history" },
  { title: "Header", desc: "Brand, nav, search, CTA headers", href: "/header", icon: "⊓", category: "Navigation", popular: false, keywords: "header navbar top" },
  { title: "Footer", desc: "Multi-column, simple, social footers", href: "/footer", icon: "⊥", category: "Navigation", popular: false, keywords: "footer bottom" },
  { title: "Skeleton", desc: "Text, card, table skeletons", href: "/skeleton", icon: "▯", category: "Feedback", popular: false, keywords: "skeleton loading placeholder" },
  { title: "Empty State", desc: "Empty inbox, search, data states", href: "/empty-state", icon: "□", category: "Feedback", popular: false, keywords: "empty state no data" },
];

const CATEGORIES = ["Components", "Navigation", "Overlays", "Menus", "Feedback"];

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
      const camel = !wordStart && /[a-z]/.test(prev) && /[A-Z]/.test(t[ti]);
      let add = 2;
      if (ti === 0 && qi === 0) add += 10;
      else if (qi === 0) add += 4;
      if (wordStart) add += 6;
      if (camel) add += 4;
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

export default function DocumentationSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [anim, setAnim] = useState(false);
  const [visible, setVisible] = useState(false);
  const [recents, setRecents] = useState([]);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("docs:recent-searches");
      setRecents(raw ? JSON.parse(raw) : []);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) {
      setAnim(false);
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
    setVisible(true);
    setQuery("");
    setActive(-1);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnim(true))
    );
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (open && visible && inputRef.current) inputRef.current.focus();
  }, [open, visible]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    setActive(query.trim() ? 0 : -1);
  }, [query]);

  useEffect(() => {
    if (active < 0 || !listRef.current) return;
    const el = listRef.current.querySelector('[data-index="' + active + '"]');
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = [];
    for (const item of DOCS) {
      const title = fuzzyMatch(q, item.title);
      if (title.score === -Infinity) {
        const kw = fuzzyMatch(q, item.category + " " + item.keywords);
        if (kw.score === -Infinity) continue;
        scored.push({ item, score: kw.score * 0.6, indices: [] });
      } else {
        const kw = fuzzyMatch(q, item.category + " " + item.keywords);
        const score =
          kw.score === -Infinity ? title.score : title.score + kw.score * 0.35;
        scored.push({ item, score, indices: title.indices });
      }
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, 20);
  }, [query]);

  const saveRecent = (value) => {
    const v = String(value).trim();
    if (!v) return;
    setRecents((prev) => [v, ...prev.filter((r) => r !== v)].slice(0, 5));
  };

  const select = (item) => {
    if (query.trim()) saveRecent(query.trim());
    setOpen(false);
    window.location.href = item.href;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length) setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length) setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) select(r.item);
    }
  };

  if (!visible) return null;

  const hasQuery = query.trim().length > 0;
  const popular = DOCS.filter((d) => d.popular).slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[8vh] sm:pt-[14vh]">
      <div
        className={"absolute inset-0 bg-black/45 transition-opacity duration-200 " + (anim ? "opacity-100" : "opacity-0")}
        onClick={() => setOpen(false)}
      />
      <div
        className={"relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-200 " + (anim ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.97] opacity-0")}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search components, pages, topics..."
            className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {hasQuery ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                if (inputRef.current) inputRef.current.focus();
              }}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:inline-block">
              esc
            </kbd>
          )}
        </div>

        <div ref={listRef} className="scrollbar-thin max-h-[min(70vh,28rem)] overflow-y-auto">
          {!hasQuery ? (
            <div className="flex flex-col gap-5 p-3">
              {recents.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-2 pb-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent searches</span>
                    <button type="button" onClick={() => setRecents([])} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
                  </div>
                  {recents.map((recent) => (
                    <button
                      key={recent}
                      type="button"
                      onClick={() => setQuery(recent)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-muted"
                    >
                      <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="flex-1 truncate">{recent}</span>
                    </button>
                  ))}
                </div>
              )}
              <div>
                <span className="block px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Popular components</span>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {popular.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => select(item)}
                      className="flex items-center gap-2.5 rounded-lg border border-border px-2.5 py-2 text-left hover:border-ring/50 hover:bg-muted/60"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">{item.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{item.title}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">{item.category}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="block px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Browse categories</span>
                <div className="flex flex-wrap gap-1.5 px-1 pb-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setQuery(cat)}
                      className="rounded-full border border-border px-2.5 py-1 text-xs font-medium hover:border-ring/50 hover:bg-muted"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
              <p className="text-sm font-medium text-foreground">No results for &ldquo;{query}&rdquo;</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="text-xs font-medium text-accent hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5 p-2">
              {results.map((result, index) => (
                <button
                  key={result.item.title}
                  type="button"
                  data-index={index}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => select(result.item)}
                  className={"flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors " + (index === active ? "bg-muted" : "hover:bg-muted/50")}
                >
                  <span className={"flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm " + (index === active ? "bg-foreground text-background" : "bg-muted text-muted-foreground")}>
                    {result.item.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      <Highlight text={result.item.title} indices={result.indices} />
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{result.item.desc}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{result.item.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          <span>↑↓ navigate · ↵ select · esc close</span>
          {hasQuery ? <span>{results.length} result{results.length === 1 ? "" : "s"}</span> : <span />}
        </div>
      </div>
    </div>
  );
}`,
  });
