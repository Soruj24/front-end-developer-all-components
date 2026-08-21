"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { IconPicker, DEFAULT_ICONS } from "@/components/ui/IconPicker";

const ICONPICKER_SOURCE = `"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import type { IconPickerProps, IconPickerIcon } from "./IconPicker.types";

const DEFAULT_ICONS: IconPickerIcon[] = [
  { name: "home", label: "Home", svg: <path ... /> },
  { name: "user", label: "User", svg: <path ... /> },
  // ... 18 more icons
];

const gridCols: Record<number, string> = { 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6", 7: "grid-cols-7", 8: "grid-cols-8" };

export function IconPicker({ icons = DEFAULT_ICONS, value, onSelect, searchPlaceholder = "Search icons...", columns = 5, showPreview = true, className }: IconPickerProps) {
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const filtered = useMemo(() => icons.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())), [icons, search]);
  const previewIcon = useMemo(() => {
    if (!showPreview) return null;
    const target = hovered ?? value;
    if (!target) return null;
    return icons.find((i) => i.name === target) ?? null;
  }, [hovered, value, icons, showPreview]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative">
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder}
          className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="flex items-start gap-4">
        <div role="radiogroup" aria-label="Icon picker" className={cn("grid flex-1 gap-1.5", gridCols[columns] ?? "grid-cols-5")}>
          {filtered.length === 0 && <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No icons found.</p>}
          {filtered.map((icon) => (
            <button key={icon.name} type="button" role="radio" aria-checked={value === icon.name} aria-label={icon.label}
              onClick={() => onSelect?.(icon.name)} onMouseEnter={() => setHovered(icon.name)} onMouseLeave={() => setHovered(null)}
              className={cn("flex h-10 w-full items-center justify-center rounded-xl border transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                value === icon.name ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/30",
              )}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{icon.svg}</svg>
            </button>
          ))}
        </div>
        {showPreview && (
          <div className="hidden w-24 flex-shrink-0 sm:flex">
            {previewIcon ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3">
                <svg className="h-8 w-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{previewIcon.svg}</svg>
                <span className="text-center text-xs font-medium text-foreground">{previewIcon.label}</span>
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
                <span className="text-xs text-muted-foreground">Preview</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}`;

const SEARCHABLE_SRC = `import { IconPicker } from "@/components/ui/IconPicker";

<IconPicker onSelect={(icon) => console.log("Selected:", icon)} />`;

const NO_PREVIEW_SRC = `import { IconPicker } from "@/components/ui/IconPicker";

<IconPicker showPreview={false} onSelect={(icon) => console.log(icon)} />`;

const COLUMNS_SRC = `import { IconPicker } from "@/components/ui/IconPicker";

<IconPicker columns={6} onSelect={(icon) => console.log(icon)} />`;

const CONTROLLED_SRC = `const [selected, setSelected] = useState<string | null>(null);

<IconPicker value={selected} onSelect={setSelected} />
{selected && <p>Selected: {selected}</p>}`;

const CUSTOM_ICONS_SRC = `import { IconPicker } from "@/components/ui/IconPicker";
import type { IconPickerIcon } from "@/components/ui/IconPicker";

const customIcons: IconPickerIcon[] = [
  { name: "logo-react", label: "React", svg: <path d="..." /> },
  { name: "logo-vue", label: "Vue", svg: <path d="..." /> },
];

<IconPicker icons={customIcons} onSelect={(icon) => console.log(icon)} />`;

export default function IconPickerPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ComponentDocPage
      name="Icon Picker"
      category="Input"
      description="Searchable icon picker grid with search filtering, live preview, keyboard navigation, and selection. Supports custom icon sets and configurable columns."
    >
      <PreviewPanel filename="icon-picker-preview.tsx">
        <div className="w-full max-w-md">
          <IconPicker onSelect={(icon) => console.log("Selected:", icon)} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ICONPICKER_SOURCE}
        filename="components/ui/IconPicker/IconPicker.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Searchable"
          description="Filter icons by typing in the search input."
          code={SEARCHABLE_SRC}
          filename="searchable.tsx"
        >
          <div className="w-full max-w-md">
            <IconPicker onSelect={(icon) => console.log("Selected:", icon)} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Preview"
          description="Hide the preview panel for a more compact layout."
          code={NO_PREVIEW_SRC}
          filename="no-preview.tsx"
        >
          <div className="w-full max-w-md">
            <IconPicker showPreview={false} onSelect={(icon) => console.log(icon)} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="6 Columns"
          description="Configure the number of grid columns."
          code={COLUMNS_SRC}
          filename="columns.tsx"
        >
          <div className="w-full max-w-md">
            <IconPicker columns={6} onSelect={(icon) => console.log(icon)} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled Selection"
          description="Track the selected icon with controlled state."
          code={CONTROLLED_SRC}
          filename="controlled.tsx"
        >
          <div className="w-full max-w-md">
            <IconPicker value={selected} onSelect={setSelected} />
            {selected && (
              <p className="mt-3 text-sm text-muted-foreground">
                Selected:{" "}
                <span className="font-medium text-foreground">{selected}</span>
              </p>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Icons"
          description="Pass your own icon set via the icons prop."
          code={CUSTOM_ICONS_SRC}
          filename="custom-icons.tsx"
        >
          <div className="w-full max-w-md">
            <IconPicker
              icons={DEFAULT_ICONS.slice(0, 8)}
              columns={4}
              onSelect={(icon) => console.log(icon)}
            />
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Default
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Required
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  icons
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  IconPickerIcon[]
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  DEFAULT_ICONS
                </td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  value
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  string | null
                </td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  onSelect
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  (name: string) =&gt; void
                </td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  columns
                </td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  showPreview
                </td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  searchPlaceholder
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  &quot;Search icons...&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  className
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
