"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { MultiSelect, type MultiSelectOption } from "@/components/ui/MultiSelect";

const MULTI_SELECT_SOURCE = `"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { cn } from "@/lib/cn";

interface MultiSelectOption {
  id: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  maxDisplay?: number;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({ options, value = [], onChange, placeholder = "Select items...", searchable = true, maxDisplay = 3, disabled = false, className }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    if (!search) return options;
    return options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  const toggle = useCallback((id) => {
    if (disabled) return;
    onChange?.(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  }, [value, onChange, disabled]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button type="button" onClick={() => { if (!disabled) { setOpen(!open); setTimeout(() => inputRef.current?.focus(), 0); } }}
        disabled={disabled} aria-expanded={open} aria-haspopup="listbox"
        className={cn("flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          open && "ring-2 ring-primary/20 border-primary/40", disabled && "pointer-events-none opacity-50")}>
        {value.length === 0 && <span className="text-muted-foreground/60">{placeholder}</span>}
        {selectedLabels.slice(0, maxDisplay).map((label, i) => (
          <span key={value[i]} className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {label}
            <button type="button" onClick={(e) => { e.stopPropagation(); remove(value[i]); }} className="rounded-full p-0.5 hover:bg-primary/20">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </span>
        ))}
        {overflowCount > 0 && <span className="rounded-lg bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">+{overflowCount} more</span>}
        <svg className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div role="listbox" aria-multiselectable="true"
          className="absolute z-50 mt-1.5 max-h-60 w-full overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-lg animate-in fade-in-0 zoom-in-95">
          {searchable && <input ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none" />}
          {filtered.map((opt) => {
            const isSelected = value.includes(opt.id);
            return (
              <button key={opt.id} type="button" role="option" aria-selected={isSelected} disabled={opt.disabled} onClick={() => toggle(opt.id)}
                className={cn("flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted focus-visible:bg-muted active:bg-muted/80",
                  isSelected && "bg-primary/5", opt.disabled && "pointer-events-none opacity-40")}>
                <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all",
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 bg-background")}>
                  {isSelected && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="flex-1 truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}`;

const allOptions: MultiSelectOption[] = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "next", label: "Next.js" },
  { id: "nuxt", label: "Nuxt" },
];

export default function MultiSelectPage() {
  const [selected, setSelected] = useState<string[]>(["react", "next"]);

  return (
    <ComponentDocPage
      name="Multi Select"
      category="Input"
      description="Multi-select dropdown with tag display, search filtering, and keyboard navigation."
    >
      <PreviewPanel filename="multi-select-preview.tsx">
        <div className="w-full max-w-sm">
          <MultiSelect options={allOptions} value={selected} onChange={setSelected} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={MULTI_SELECT_SOURCE} filename="components/ui/MultiSelect/MultiSelect.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Standard multi-select with search and tags."
          code={`import { MultiSelect } from "@/components/ui/MultiSelect";

<MultiSelect options={options} value={selected} onChange={setSelected} />`}
          filename="default.tsx"
        >
          <div className="w-full max-w-sm">
            <MultiSelect options={allOptions} value={selected} onChange={setSelected} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Without Search"
          description="Disable the search input."
          code={`<MultiSelect options={options} value={selected} onChange={setSelected} searchable={false} />`}
          filename="no-search.tsx"
        >
          <div className="w-full max-w-sm">
            <MultiSelect options={allOptions} value={selected} onChange={setSelected} searchable={false} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Max Display"
          description="Limit the number of visible tags before showing overflow."
          code={`<MultiSelect options={options} value={selected} onChange={setSelected} maxDisplay={2} />`}
          filename="max-display.tsx"
        >
          <div className="w-full max-w-sm">
            <MultiSelect options={allOptions} value={selected} onChange={setSelected} maxDisplay={2} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Disable the entire component."
          code={`<MultiSelect options={options} value={selected} onChange={setSelected} disabled />`}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-sm">
            <MultiSelect options={allOptions} value={selected} onChange={setSelected} disabled />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
