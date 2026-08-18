"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  SearchDialog,
  SearchTrigger,
  Highlight,
  docItems,
  searchDocs,
} from "@/components/search";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Full command-palette documentation search                          */
/* ------------------------------------------------------------------ */

function DocumentationSearchDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement)?.tagName ?? ""
        )
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <SearchTrigger onClick={() => setOpen(true)} />
      <p className="text-xs text-muted-foreground">
        Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">⌘K</kbd> or{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">Ctrl K</kbd> anywhere
      </p>
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fuzzy search with highlighted, ranked results                      */
/* ------------------------------------------------------------------ */

function FuzzyResultsDemo() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchDocs(docItems, query, 12).flatMap((group) => group.results);
  }, [query]);

  const maxScore = useMemo(
    () => Math.max(1, ...results.map((r) => r.score)),
    [results]
  );

  const examples = ["btn", "dialog", "dark", "table sort"];

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
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
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
              query === ex
                ? "border-ring/60 bg-muted text-foreground"
                : "border-border text-muted-foreground hover:border-ring/40 hover:text-foreground"
            )}
          >
            {ex}
          </button>
        ))}
      </div>

      {!query.trim() ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-12 text-center">
          <p className="text-sm font-medium text-foreground">Start typing</p>
          <p className="text-xs text-muted-foreground">
            Subsequence matching ranks results — &ldquo;mdi&rdquo; finds Modal &amp; Dialog.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-12 text-center">
          <p className="text-sm font-medium text-foreground">
            No matches for &ldquo;{query}&rdquo;
          </p>
          <p className="text-xs text-muted-foreground">Try a shorter term.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {results.map((result) => {
            const strength = Math.round((result.score / maxScore) * 100);
            return (
              <li
                key={result.item.id}
                className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 transition-colors hover:border-ring/40 hover:bg-muted/40"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                  {result.item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    <Highlight
                      text={result.item.title}
                      indices={result.titleMatch.indices}
                    />
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {result.item.category} · {result.item.description}
                  </span>
                </span>
                <span className="flex w-20 shrink-0 flex-col items-end gap-1">
                  <span className="h-1 w-full overflow-hidden rounded-full bg-muted">
                    <span
                      className="block h-full rounded-full bg-accent transition-[width] duration-300"
                      style={{ width: `${Math.max(strength, 8)}%` }}
                    />
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    {strength}%
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const searchProps = [
  { prop: "variant", type: "\"command-palette\" | \"inline\" | \"fuzzy\"", default: "\"command-palette\"", required: "No" },
  { prop: "placeholder", type: "string", default: "\"Search...\"", required: "No" },
  { prop: "onSearch", type: "(query: string) => void", default: "-", required: "No" },
  { prop: "items", type: "SearchItem[]", default: "[]", required: "No" },
  { prop: "hotkey", type: "string", default: "\"⌘K\"", required: "No" },
];

const installCommand = `npx component-library@latest add search`;

const usageCode = `import { SearchDialog, SearchTrigger } from "@/components/search";

<SearchTrigger onClick={() => setOpen(true)} />
<SearchDialog open={open} onClose={() => setOpen(false)} />`;

const FEATURES = [
  "Ctrl + K",
  "Command palette",
  "Recent searches",
  "Popular components",
  "Categories",
  "Keyboard navigation",
  "Fuzzy search",
  "Highlighted results",
  "Animated dialog",
  "Dark mode",
  "Responsive",
];

export default function SearchPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Search</h1>
          <Badge variant="primary">2 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A premium documentation search experience — a command palette driven
          by fuzzy matching, with recent searches, popular components, category
          browsing, and full keyboard navigation.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {FEATURES.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

      <ComponentPreview id="search-command-palette">
        <DocumentationSearchDemo />
      </ComponentPreview>

      <ComponentPreview id="search-fuzzy-results">
        <FuzzyResultsDemo />
      </ComponentPreview>
    </section>

    {/* API Reference */}
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Prop</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Default</th>
              <th className="px-4 py-3 text-left font-medium">Required</th>
            </tr>
          </thead>
          <tbody>
            {searchProps.map((row, i) => (
              <tr key={row.prop} className={i < searchProps.length - 1 ? "border-b" : ""}>
                <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                <td className="px-4 py-3">{row.required}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </div>
  );
}
