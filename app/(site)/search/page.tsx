"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import SearchInput from "@/components/ui/SearchInput";
const SEARCHINPUT_SOURCE = `"use client";
import { forwardRef, useState, useRef, useEffect } from "react";
export interface SearchInputProps {
  value: string; onChange: (value: string) => void; placeholder: string;
  onClear: () => void; shortcut?: string; recentSearches?: string[];
  onRecentClick?: (search: string) => void; className?: string;
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

const BASIC_SOURCE = `import SearchInput from "@/components/ui/SearchInput";

function BasicSearch() {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder="Search..."
      onClear={() => setValue("")}
    />
  );
}`;

const SHORTCUT_SOURCE = `import SearchInput from "@/components/ui/SearchInput";

function ShortcutSearch() {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder="Search..."
      onClear={() => setValue("")}
      shortcut="⌘K"
    />
  );
}`;

const RECENT_SEARCHES_SOURCE = `import SearchInput from "@/components/ui/SearchInput";

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
}`;

export default function SearchPage() {
  const [value, setValue] = useState("");
  const [shortcutValue, setShortcutValue] = useState("");
  const [recentValue, setRecentValue] = useState("");

  return (
    <ComponentDocPage
      name="Search Input"
      category="Forms"
      description="A search input with clear button, keyboard shortcut badge, and recent searches dropdown. Supports focus states, recent search history, and keyboard-first interactions."
    >
      <PreviewPanel filename="SearchInput.tsx">
        <div className="w-full max-w-md">
          <SearchInput
            value={value}
            onChange={setValue}
            placeholder="Search components..."
            onClear={() => setValue("")}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SEARCHINPUT_SOURCE}
        filename="components/ui/SearchInput.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple search input with a clear button."
          code={BASIC_SOURCE}
        >
          <div className="w-full max-w-sm">
            <SearchInput
              value={value}
              onChange={setValue}
              placeholder="Search..."
              onClear={() => setValue("")}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Keyboard Shortcut"
          description="Displays a keyboard shortcut badge when the input is empty."
          code={SHORTCUT_SOURCE}
        >
          <div className="w-full max-w-sm">
            <SearchInput
              value={shortcutValue}
              onChange={setShortcutValue}
              placeholder="Search..."
              onClear={() => setShortcutValue("")}
              shortcut="⌘K"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Recent Searches"
          description="Shows a dropdown of recent search terms when focused."
          code={RECENT_SEARCHES_SOURCE}
        >
          <div className="w-full max-w-sm">
            <SearchInput
              value={recentValue}
              onChange={setRecentValue}
              placeholder="Search components..."
              onClear={() => setRecentValue("")}
              shortcut="⌘K"
              recentSearches={["Button", "Dialog", "Table"]}
              onRecentClick={(s) => setRecentValue(s)}
            />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
