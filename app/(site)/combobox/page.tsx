"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Combobox } from "@/components/ui/Combobox";

const COMBOBOX_SOURCE = `import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function Combobox({ options, value, onValueChange, placeholder, searchPlaceholder, emptyMessage, className }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const filtered = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));
  const selected = options.find((o) => o.value === value);
  const select = (val) => { onValueChange?.(val); setOpen(false); setSearch(""); };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setSearch(""); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <span className={cn(!selected && "text-muted-foreground")}>{selected?.label ?? placeholder}</span>
        <svg className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform duration-200", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div data-state={open ? "open" : "closed"} className="pointer-events-none absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
        <div className="border-b border-border p-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder} className="w-full rounded-md bg-transparent px-2 py-1.5 text-sm outline-none" />
        </div>
        <div className="max-h-60 overflow-y-auto p-1">
          {filtered.length === 0 ? <p className="px-2 py-4 text-center text-sm text-muted-foreground">{emptyMessage}</p> : filtered.map((opt) => (
            <button key={opt.value} onClick={() => select(opt.value)} className={cn("relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground", opt.value === value && "bg-accent text-accent-foreground")}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const FRAMEWORKS = [
  { value: "next", label: "Next.js" }, { value: "remix", label: "Remix" },
  { value: "gatsby", label: "Gatsby" }, { value: "astro", label: "Astro" },
];

const LANGUAGES = [
  { value: "js", label: "JavaScript" }, { value: "ts", label: "TypeScript" },
  { value: "py", label: "Python" }, { value: "go", label: "Go" },
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

const SINGLE_SOURCE = `import { useState } from "react";
import { Combobox } from "@/components/ui/Combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "gatsby", label: "Gatsby" },
];

export default function Example() {
  const [value, setValue] = useState("");
  return (
    <Combobox options={frameworks} value={value} onValueChange={setValue} placeholder="Select framework..." />
  );
}`;

const MULTI_SOURCE = `import { useState } from "react";
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

const DESC_SOURCE = `import { useState } from "react";
import { Combobox } from "@/components/ui/Combobox";

const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
];

export default function Example() {
  const [value, setValue] = useState("");
  return (
    <Combobox options={countries} value={value} onValueChange={setValue} placeholder="Select country..." searchPlaceholder="Search countries..." />
  );
}`;

const GROUPED_SOURCE = `import { Combobox } from "@/components/ui/Combobox";

const options = [
  { value: "active", label: "Active", group: "Status" },
  { value: "inactive", label: "Inactive", group: "Status" },
  { value: "admin", label: "Admin", group: "Role" },
  { value: "editor", label: "Editor", group: "Role" },
];

<Combobox options={options} placeholder="Select status or role..." />`;

export default function ComboboxPage() {
  const [framework, setFramework] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [country, setCountry] = useState("");

  return (
    <ComponentDocPage
      name="Combobox"
      category="Forms"
      description="Searchable dropdown select built on a popover with command palette. Users can type to filter options and select one or multiple items."
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

      <SourceCodeViewer source={COMBOBOX_SOURCE} filename="components/ui/Combobox/Combobox.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Single Select" description="Pick a single item from a searchable list." code={SINGLE_SOURCE} filename="single-select.tsx">
          <div className="w-full max-w-sm">
            <Combobox options={FRAMEWORKS} value={framework} onValueChange={(v) => setFramework(v as string)} placeholder="Select framework..." />
            <p className="mt-2 text-xs text-muted-foreground">Selected: <span className="font-medium text-foreground">{framework || "—"}</span></p>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Multi Select" description="Select multiple items with a configurable maximum." code={MULTI_SOURCE} filename="multi-select.tsx">
          <div className="w-full max-w-sm">
            <Combobox options={LANGUAGES} value={languages} onValueChange={(v) => setLanguages(v as string[])} multiple maxSelected={3} placeholder="Select languages..." />
            <p className="mt-2 text-xs text-muted-foreground">Selected: <span className="font-medium text-foreground">{languages.length > 0 ? languages.join(", ") : "—"}</span> ({languages.length}/3)</p>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Description" description="Options can carry secondary text for additional context." code={DESC_SOURCE} filename="with-description.tsx">
          <div className="w-full max-w-sm">
            <Combobox options={COUNTRIES} value={country} onValueChange={(v) => setCountry(v as string)} placeholder="Select country..." searchPlaceholder="Search countries..." />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Grouped Options" description="Options organized into logical groups." code={GROUPED_SOURCE} filename="grouped.tsx">
          <div className="w-full max-w-sm">
            <Combobox options={STATUS_OPTIONS} placeholder="Select status or role..." searchPlaceholder="Search..." />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
