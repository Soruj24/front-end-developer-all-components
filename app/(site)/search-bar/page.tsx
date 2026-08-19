"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import SearchInput from "@/components/ui/SearchInput";

const SEARCHINPUT_SOURCE = `"use client";

import { forwardRef, useState, useRef, useEffect } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onClear: () => void;
  shortcut?: string;
  recentSearches?: string[];
  onRecentClick?: (search: string) => void;
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder, onClear, shortcut, recentSearches, onRecentClick, className = "" }, ref) => {
    const [focused, setFocused] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setFocused(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
      <div ref={wrapperRef} className={\`relative \${className}\`}>
        <div className={\`flex items-center gap-2 rounded-xl border bg-background px-3 py-2.5 transition-colors \${focused ? "border-ring" : "border-border"}\`}>
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input ref={ref} type="text" value={value} onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)} placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle" />
          {value && (
            <button onClick={() => { onClear(); onChange(""); }}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {!value && shortcut && (
            <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">{shortcut}</span>
          )}
        </div>
        {focused && recentSearches && recentSearches.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-popover">
            <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Recent searches</div>
            {recentSearches.map((s) => (
              <button key={s} onClick={() => onRecentClick?.(s)} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-foreground hover:bg-muted">
                <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>{s}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export default SearchInput;`;

const BASIC_CODE = `import SearchInput from "@/components/ui/SearchInput";

function BasicSearch() {
  const [value, setValue] = useState("");
  return <SearchInput value={value} onChange={setValue} placeholder="Search..." onClear={() => setValue("")} />;
}

export default BasicSearch;`;

const SHORTCUT_CODE = `import SearchInput from "@/components/ui/SearchInput";

function ShortcutSearch() {
  const [value, setValue] = useState("");
  return <SearchInput value={value} onChange={setValue} placeholder="Search..." onClear={() => setValue("")} shortcut="⌘K" />;
}

export default ShortcutSearch;`;

const RECENT_CODE = `import SearchInput from "@/components/ui/SearchInput";

function RecentSearches() {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder="Search components..."
      onClear={() => setValue("")}
      shortcut="⌘K"
      recentSearches={["Button", "Dialog", "Table"]}
      onRecentClick={(s) => setValue(s)}
    />
  );
}

export default RecentSearches;`;

const RESULTS_CODE = `import SearchInput from "@/components/ui/SearchInput";

function SearchWithResults() {
  const [value, setValue] = useState("");
  const results = ["Button", "Badge", "Card"].filter((r) => r.toLowerCase().includes(value.toLowerCase()));
  return (
    <div className="w-full max-w-md">
      <SearchInput value={value} onChange={setValue} placeholder="Search..." onClear={() => setValue("")} />
      <div className="mt-2 rounded-lg border divide-y">
        {results.map((r) => <button key={r} className="w-full px-3 py-2 text-sm text-left hover:bg-muted">{r}</button>)}
      </div>
    </div>
  );
}

export default SearchWithResults;`;

function AutocompleteSearch() {
  const [value, setValue] = useState("");
  const suggestions = ["Button", "Badge", "Card", "Dialog", "Input", "Table", "Tabs"].filter((s) => s.toLowerCase().includes(value.toLowerCase()));
  return (
    <div className="w-full max-w-md space-y-3">
      <SearchInput value={value} onChange={setValue} placeholder="Type to search..." onClear={() => setValue("")} shortcut="⌘K" recentSearches={suggestions} onRecentClick={setValue} />
    </div>
  );
}

const AUTOCOMPLETE_CODE = `import SearchInput from "@/components/ui/SearchInput";

<SearchInput value={value} onChange={setValue} placeholder="Type to search..." onClear={() => setValue("")} shortcut="⌘K" recentSearches={suggestions} onRecentClick={setValue} />`;

export default function SearchBarPage() {
  const [basicValue, setBasicValue] = useState("");
  const [shortcutValue, setShortcutValue] = useState("");
  const [recentValue, setRecentValue] = useState("");
  const [resultsValue, setResultsValue] = useState("");
  const results = ["Button", "Badge", "Card"].filter((r) => r.toLowerCase().includes(resultsValue.toLowerCase()));

  return (
    <ComponentDocPage
      name="Search Bar"
      category="Forms"
      description="A search input with clear button, keyboard shortcut badge, recent searches dropdown, and autocomplete support."
    >
      <PreviewPanel filename="search-bar-preview.tsx">
        <div className="w-full max-w-md">
          <SearchInput value={basicValue} onChange={setBasicValue} placeholder="Search components..." onClear={() => setBasicValue("")} shortcut="⌘K" recentSearches={["Button", "Dialog", "Table"]} onRecentClick={setBasicValue} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={SEARCHINPUT_SOURCE} filename="components/ui/SearchInput.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple search input with a clear button." code={BASIC_CODE}>
          <div className="w-full max-w-sm"><SearchInput value={basicValue} onChange={setBasicValue} placeholder="Search..." onClear={() => setBasicValue("")} /></div>
        </ExampleBlock>

        <ExampleBlock title="Keyboard Shortcut" description="Displays a shortcut badge when the input is empty." code={SHORTCUT_CODE}>
          <div className="w-full max-w-sm"><SearchInput value={shortcutValue} onChange={setShortcutValue} placeholder="Search..." onClear={() => setShortcutValue("")} shortcut="⌘K" /></div>
        </ExampleBlock>

        <ExampleBlock title="Recent Searches" description="Shows a dropdown of recent search terms when focused." code={RECENT_CODE}>
          <div className="w-full max-w-sm">
            <SearchInput value={recentValue} onChange={setRecentValue} placeholder="Search components..." onClear={() => setRecentValue("")} shortcut="⌘K" recentSearches={["Button", "Dialog", "Table"]} onRecentClick={setRecentValue} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Autocomplete" description="Live suggestions as you type, using the recent searches dropdown." code={AUTOCOMPLETE_CODE}>
          <AutocompleteSearch />
        </ExampleBlock>

        <ExampleBlock title="Search Results" description="Results list that updates as you type." code={RESULTS_CODE}>
          <div className="w-full max-w-md">
            <SearchInput value={resultsValue} onChange={setResultsValue} placeholder="Search..." onClear={() => setResultsValue("")} shortcut="⌘K" />
            <div className="mt-2 rounded-lg border divide-y">
              {results.map((r) => <button key={r} className="w-full px-3 py-2 text-sm text-left hover:bg-muted">{r}</button>)}
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
