"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Search, X, Filter, Clock, Star, ArrowRight, Command } from "lucide-react";

const installCommand = `npx component-library@latest add search-bar`;

const usageCode = `import { SearchBar } from "@/components/ui/search-bar";

export default function Demo() {
  return <SearchBar placeholder="Search..." onSearch={(q) => console.log(q)} />;
}`;

function SearchInputDemo() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search components..." className="w-full rounded-lg border bg-background pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}
      </div>
    </div>
  );
}

function AutocompleteDemo() {
  const [query, setQuery] = useState("");
  const suggestions = ["Button", "Badge", "Card", "Dialog", "Input", "Table", "Tabs"].filter((s) => s.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to search..." className="w-full rounded-lg border bg-background pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        {query && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border bg-background shadow-lg z-10">
            {suggestions.map((s) => (
              <button key={s} onClick={() => setQuery(s)} className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 text-left">
                <Search className="h-3 w-3 text-muted-foreground" /> {s}
              </button>
            ))}
            {suggestions.length === 0 && <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSearchDemo() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="w-full max-w-md space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search with filters..." className="w-full rounded-lg border bg-background pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="flex gap-2">
          {["all", "components", "blocks", "templates"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              <Filter className="h-3 w-3" /> {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentSearchesDemo() {
  const [recent] = useState(["button variants", "card layout", "form validation", "modal dialog"]);
  const [query, setQuery] = useState("");
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="w-full rounded-lg border bg-background pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="space-y-1">
          {recent.map((item, i) => (
            <button key={i} onClick={() => setQuery(item)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground text-left transition-colors">
              <Clock className="h-3 w-3" /> {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickSearchDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 rounded-lg border bg-background px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
          <Search className="h-4 w-4" />
          <span>Quick search...</span>
          <div className="ml-auto flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
            <Command className="h-2.5 w-2.5" /> K
          </div>
        </button>
        {open && (
          <div className="mt-2 rounded-xl border bg-background shadow-xl p-3 space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" autoFocus placeholder="Type a command or search..." className="w-full rounded-lg bg-muted/50 pl-10 pr-3 py-2 text-sm outline-none" />
            </div>
            <div className="space-y-1">
              <p className="px-2 text-[10px] font-medium text-muted-foreground uppercase">Suggestions</p>
              {["Go to Dashboard", "Open Settings", "View Profile"].map((item) => (
                <button key={item} className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-muted/50 text-left">
                  {item} <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchResultsDemo() {
  const results = [
    { title: "Button", desc: "Interactive button component with variants", tag: "Component" },
    { title: "Card", desc: "Container for grouping related content", tag: "Component" },
    { title: "Dashboard Block", desc: "Pre-built dashboard layout section", tag: "Block" },
  ];
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border bg-background shadow-sm">
        <div className="border-b px-4 py-3 text-sm font-medium">Search Results (3)</div>
        <div className="divide-y">
          {results.map((r, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors">
              <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Search className="h-4 w-4 text-primary" /></div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{r.title}</p>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{r.tag}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommandSearchDemo() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border bg-background shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Command className="h-4 w-4 text-muted-foreground" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search commands..." className="flex-1 bg-transparent text-sm outline-none" />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">ESC</kbd>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          <p className="px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase">Navigation</p>
          {["Dashboard", "Components", "Templates", "Documentation"].map((item) => (
            <button key={item} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted/50 text-left">
              <ArrowRight className="h-3 w-3 text-muted-foreground" /> {item}
            </button>
          ))}
          <p className="px-2 py-1 mt-1 text-[10px] font-medium text-muted-foreground uppercase">Actions</p>
          {["Toggle Theme", "Copy Code", "Report Issue"].map((item) => (
            <button key={item} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted/50 text-left">
              <Star className="h-3 w-3 text-muted-foreground" /> {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchBarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Search Bar</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A versatile search bar component with autocomplete, filters, and command palette support.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various search bar demonstrations.</p>
        </div>

        <ComponentPreview id="search-bar-input">
          <SearchInputDemo />
        </ComponentPreview>

        <ComponentPreview id="search-bar-autocomplete">
          <AutocompleteDemo />
        </ComponentPreview>

        <ComponentPreview id="search-bar-filter">
          <FilterSearchDemo />
        </ComponentPreview>

        <ComponentPreview id="search-bar-recent">
          <RecentSearchesDemo />
        </ComponentPreview>

        <ComponentPreview id="search-bar-quick">
          <QuickSearchDemo />
        </ComponentPreview>

        <ComponentPreview id="search-bar-results">
          <SearchResultsDemo />
        </ComponentPreview>

        <ComponentPreview id="search-bar-command">
          <CommandSearchDemo />
        </ComponentPreview>
      </section>

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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"Search..."</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSearch</td>
                <td className="px-4 py-3 text-muted-foreground">(query: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
