"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Combobox } from "@/components/ui/Combobox";

const COMBOBOX_SOURCE = `"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface ComboboxOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  group?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: React.ReactNode;
  maxSelected?: number;
  disabled?: boolean;
  className?: string;
}

export function Combobox({
  options, value, defaultValue, onValueChange, placeholder = "Select...",
  multiple = false, searchPlaceholder = "Search...", emptyMessage = "No results found.",
  maxSelected = 5, disabled = false, className,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (multiple) { const v = defaultValue; return Array.isArray(v) ? v : v ? [v] : []; }
    const v = defaultValue; return v ? [v as string] : [];
  });
  const isControlled = value !== undefined;
  const current = (isControlled ? (multiple ? value as string[] : [value as string]) : internalValue) as string[];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(() => options.filter((o) => current.includes(o.value)), [options, current]);
  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return options.filter((opt) => !opt.disabled && (String(opt.label).toLowerCase().includes(s) || opt.value.toLowerCase().includes(s)));
  }, [options, search]);

  const select = useCallback((opt: ComboboxOption) => {
    if (opt.disabled) return;
    let next: string[];
    if (multiple) { next = current.includes(opt.value) ? current.filter((v) => v !== opt.value) : [...current, opt.value].slice(0, maxSelected); }
    else { next = [opt.value]; setOpen(false); }
    if (!isControlled) setInternalValue(next);
    onValueChange?.(multiple ? next : next[0] ?? "");
    setSearch("");
  }, [multiple, current, maxSelected, isControlled, onValueChange]);

  const remove = useCallback((val: string) => {
    const next = current.filter((v) => v !== val);
    if (!isControlled) setInternalValue(next);
    onValueChange?.(multiple ? next : next[0] ?? "");
  }, [current, isControlled, multiple, onValueChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setSearch(""); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => { if (open) requestAnimationFrame(() => searchRef.current?.focus()); }, [open]);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button type="button" onClick={() => { if (!disabled) setOpen(!open); }} disabled={disabled} aria-haspopup="listbox" aria-expanded={open}
        className={cn("flex min-h-[42px] w-full items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2 text-left text-sm transition-colors",
          "hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50", open && "border-primary ring-2 ring-ring ring-offset-2")}>
        <div className="flex min-h-[24px] flex-1 flex-wrap items-center gap-1.5">
          {selected.length === 0 ? <span className="text-muted-foreground">{placeholder}</span>
            : multiple ? selected.map((val) => { const opt = options.find((o) => o.value === val); return opt ? (
              <span key={val} className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                {opt.label}
                <button type="button" onClick={(e) => { e.stopPropagation(); remove(val); }} className="rounded-sm hover:bg-secondary-foreground/20"><XIcon /></button>
              </span>) : null; })
            : <span className="font-medium text-foreground">{selected[0]?.label}</span>}
        </div>
        <svg className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div data-state={open ? "open" : "closed"}
        className={cn("absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg pointer-events-none",
          "data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95")}>
        <div className="border-b border-border p-2">
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-1.5">
            <SearchIcon />
            <input ref={searchRef} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
        <div className="max-h-60 overflow-y-auto p-1.5">
          {filtered.length === 0 ? <p className="px-2 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
            : filtered.map((opt) => { const isSelected = current.includes(opt.value); return (
              <button key={opt.value} type="button" disabled={opt.disabled} onClick={() => select(opt)}
                className={cn("relative flex w-full cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors",
                  "hover:bg-accent focus:bg-accent", isSelected && "bg-accent", opt.disabled && "pointer-events-none opacity-50")}>
                {opt.label}
                {!multiple && isSelected && <span className="ml-auto text-primary"><CheckIcon /></span>}
              </button>); })}
        </div>
      </div>
    </div>
  );
}`;

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "gatsby", label: "Gatsby" },
  { value: "astro", label: "Astro" },
];

const LANGUAGES = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "py", label: "Python" },
  { value: "go", label: "Go" },
];

const COUNTRIES = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active", group: "Status" },
  { value: "inactive", label: "Inactive", group: "Status" },
  { value: "pending", label: "Pending", group: "Status" },
  { value: "admin", label: "Admin", group: "Role" },
  { value: "editor", label: "Editor", group: "Role" },
];

const SINGLE_CODE = `import { useState } from "react";
import { Combobox } from "@/components/ui/Combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "gatsby", label: "Gatsby" },
];

export default function Example() {
  const [value, setValue] = useState("");
  return (
    <Combobox options={frameworks} value={value} onValueChange={(v) => setValue(v as string)} placeholder="Select framework..." />
  );
}`;

const MULTI_CODE = `import { useState } from "react";
import { Combobox } from "@/components/ui/Combobox";

const languages = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "py", label: "Python" },
];

export default function Example() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Combobox options={languages} value={value} onValueChange={(v) => setValue(v as string[])} multiple maxSelected={3} placeholder="Select languages..." />
  );
}`;

const DESC_CODE = `import { useState } from "react";
import { Combobox } from "@/components/ui/Combobox";

const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
];

export default function Example() {
  const [value, setValue] = useState("");
  return (
    <Combobox options={countries} value={value} onValueChange={(v) => setValue(v as string)} placeholder="Select country..." searchPlaceholder="Search countries..." />
  );
}`;

const GROUPED_CODE = `import { Combobox } from "@/components/ui/Combobox";

const options = [
  { value: "active", label: "Active", group: "Status" },
  { value: "inactive", label: "Inactive", group: "Status" },
  { value: "admin", label: "Admin", group: "Role" },
  { value: "editor", label: "Editor", group: "Role" },
];

<Combobox options={options} placeholder="Select status or role..." />`;

const DISABLED_CODE = `import { Combobox } from "@/components/ui/Combobox";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B", disabled: true },
  { value: "c", label: "Option C" },
];

<Combobox options={options} placeholder="B is disabled..." />`;

export default function ComboboxPage() {
  const [framework, setFramework] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [country, setCountry] = useState("");

  return (
    <ComponentDocPage
      name="Combobox"
      category="Forms"
      description="Searchable dropdown select with keyboard navigation, single/multi-select, descriptions, groups, and disabled options. Premium shadcn/ui-inspired design."
    >
      <PreviewPanel filename="combobox-preview.tsx">
        <div className="w-full max-w-sm">
          <Combobox
            options={FRAMEWORKS}
            value={framework}
            onValueChange={(v) => setFramework(v as string)}
            placeholder="Select framework..."
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={COMBOBOX_SOURCE}
        filename="components/ui/Combobox/Combobox.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Single Select"
          description="Pick a single item from a searchable list."
          code={SINGLE_CODE}
          filename="single-select.tsx"
        >
          <div className="w-full max-w-sm">
            <Combobox
              options={FRAMEWORKS}
              value={framework}
              onValueChange={(v) => setFramework(v as string)}
              placeholder="Select framework..."
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Selected:{" "}
              <span className="font-medium text-foreground">
                {framework || "—"}
              </span>
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Multi Select"
          description="Select multiple items with removable tags and a configurable max."
          code={MULTI_CODE}
          filename="multi-select.tsx"
        >
          <div className="w-full max-w-sm">
            <Combobox
              options={LANGUAGES}
              value={languages}
              onValueChange={(v) => setLanguages(v as string[])}
              multiple
              maxSelected={3}
              placeholder="Select languages..."
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Selected:{" "}
              <span className="font-medium text-foreground">
                {languages.length > 0 ? languages.join(", ") : "—"}
              </span>{" "}
              ({languages.length}/3)
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Description"
          description="Options with secondary description text for additional context."
          code={DESC_CODE}
          filename="with-description.tsx"
        >
          <div className="w-full max-w-sm">
            <Combobox
              options={COUNTRIES}
              value={country}
              onValueChange={(v) => setCountry(v as string)}
              placeholder="Select country..."
              searchPlaceholder="Search countries..."
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Grouped Options"
          description="Options organized into logical groups with section headers."
          code={GROUPED_CODE}
          filename="grouped.tsx"
        >
          <div className="w-full max-w-sm">
            <Combobox
              options={STATUS_OPTIONS}
              placeholder="Select status or role..."
              searchPlaceholder="Search..."
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Options"
          description="Individual options can be disabled."
          code={DISABLED_CODE}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-sm">
            <Combobox
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B", disabled: true },
                { value: "c", label: "Option C" },
              ]}
              placeholder="B is disabled..."
            />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
