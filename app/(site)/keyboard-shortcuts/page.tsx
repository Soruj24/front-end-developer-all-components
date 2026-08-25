"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";
import type { ShortcutGroup } from "@/components/ui/KeyboardShortcuts";

const KEYBOARDSHORTCUTS_SOURCE = `"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import { Kbd } from "@/components/ui/Kbd";

interface ShortcutItem {
  keys: string[];
  description: string;
}

interface ShortcutGroup {
  category: string;
  items: ShortcutItem[];
}

interface KeyboardShortcutsProps {
  shortcuts: ShortcutGroup[];
  searchable?: boolean;
  className?: string;
}

export function KeyboardShortcuts({ shortcuts, searchable = true, className }: KeyboardShortcutsProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return shortcuts;
    const q = query.trim().toLowerCase();
    return shortcuts
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          item.description.toLowerCase().includes(q) ||
          item.keys.some((k) => k.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [shortcuts, query]);

  return (
    <div className={cn("flex flex-col", className)}>
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shortcuts..."
              className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 hover:border-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-150 hover:text-foreground">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      <div className="space-y-5">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h4 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat.category}</h4>
            <div className="space-y-0.5">
              {cat.items.map((item) => (
                <div key={item.description} className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-muted/60">
                  <span className="text-sm text-foreground">{item.description}</span>
                  <div className="flex items-center gap-1.5">
                    {item.keys.map((key, i) => (
                      <span key={key} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-[10px] text-muted-foreground/50">+</span>}
                        <Kbd>{key}</Kbd>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <svg className="mb-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">No shortcuts match &ldquo;{query.trim()}&rdquo;</p>
            <button type="button" onClick={() => setQuery("")} className="mt-1 text-xs text-primary transition-colors duration-150 hover:underline">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}`;

const shortcuts: ShortcutGroup[] = [
  { category: "General", items: [
    { keys: ["Ctrl", "S"], description: "Save document" },
    { keys: ["Ctrl", "Z"], description: "Undo" },
    { keys: ["Ctrl", "Shift", "Z"], description: "Redo" },
    { keys: ["Ctrl", "C"], description: "Copy" },
  ]},
  { category: "Navigation", items: [
    { keys: ["Ctrl", "K"], description: "Open search" },
    { keys: ["Ctrl", "/"], description: "Toggle sidebar" },
    { keys: ["Esc"], description: "Close modal" },
  ]},
  { category: "Editor", items: [
    { keys: ["Ctrl", "B"], description: "Bold text" },
    { keys: ["Ctrl", "I"], description: "Italic text" },
    { keys: ["Ctrl", "U"], description: "Underline text" },
    { keys: ["Tab"], description: "Indent" },
  ]},
];

const compactShortcuts: ShortcutGroup[] = [
  { category: "File", items: [
    { keys: ["Ctrl", "N"], description: "New file" },
    { keys: ["Ctrl", "O"], description: "Open file" },
    { keys: ["Ctrl", "S"], description: "Save" },
    { keys: ["Ctrl", "Shift", "S"], description: "Save as" },
  ]},
];

export default function KeyboardShortcutsPage() {
  return (
    <ComponentDocPage
      name="Keyboard Shortcuts"
      category="Utility"
      description="Keyboard shortcut reference with search, category grouping, and key combination display."
    >
      <PreviewPanel filename="keyboard-shortcuts-preview.tsx">
        <KeyboardShortcuts shortcuts={shortcuts} />
      </PreviewPanel>

      <SourceCodeViewer
        source={KEYBOARDSHORTCUTS_SOURCE}
        filename="components/ui/KeyboardShortcuts/KeyboardShortcuts.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Grouped shortcuts with search."
          code={`import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";

const shortcuts = [
  { category: "General", items: [
    { keys: ["Ctrl", "S"], description: "Save document" },
    { keys: ["Ctrl", "Z"], description: "Undo" },
  ]},
];

<KeyboardShortcuts shortcuts={shortcuts} />`}
          filename="default.tsx"
        >
          <KeyboardShortcuts shortcuts={shortcuts} />
        </ExampleBlock>

        <ExampleBlock
          title="Without Search"
          description="Disable the search input."
          code={`import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";

<KeyboardShortcuts shortcuts={shortcuts} searchable={false} />`}
          filename="no-search.tsx"
        >
          <KeyboardShortcuts shortcuts={shortcuts} searchable={false} />
        </ExampleBlock>

        <ExampleBlock
          title="Single Category"
          description="Display a single category of shortcuts."
          code={`import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";

const fileShortcuts = [
  { category: "File", items: [
    { keys: ["Ctrl", "N"], description: "New file" },
    { keys: ["Ctrl", "O"], description: "Open file" },
    { keys: ["Ctrl", "S"], description: "Save" },
  ]},
];

<KeyboardShortcuts shortcuts={fileShortcuts} searchable={false} />`}
          filename="single-category.tsx"
        >
          <KeyboardShortcuts shortcuts={compactShortcuts} searchable={false} />
        </ExampleBlock>

        <ExampleBlock
          title="Searchable"
          description="Filter shortcuts by description or key name."
          code={`import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";

<KeyboardShortcuts shortcuts={shortcuts} searchable={true} />`}
          filename="searchable.tsx"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Try searching for &quot;save&quot; or &quot;Ctrl&quot;</p>
            <KeyboardShortcuts shortcuts={shortcuts} searchable={true} />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
