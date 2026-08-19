"use client";

import { Home, Settings, User } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Command } from "@/components/ui";

const COMMAND_SOURCE = `"use client"

import { useState } from "react"
import type { ReactNode } from "react"

const cn = (...c: Array<string | false | null | undefined>): string =>
  c.filter(Boolean).join(" ")

export interface CommandProps {
  placeholder?: string
  className?: string
  children: ReactNode
}

export function Command({
  placeholder = "Type a command...",
  className,
  children,
}: CommandProps) {
  const [search, setSearch] = useState("")
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border bg-white dark:bg-zinc-900", className)}>
      <div className="flex items-center border-b px-3">
        <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-zinc-400" />
        {search && (
          <button onClick={() => setSearch("")} className="rounded p-1 text-zinc-400 hover:text-zinc-600">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto p-1">
        {typeof children === "function" ? (children as (search: string) => ReactNode)(search) : children}
      </div>
    </div>
  )
}`

interface Item {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  group?: string;
}

const BASIC_ITEMS: Item[] = [{ value: "home", label: "Home" }, { value: "profile", label: "Profile" }];
const ICONS_ITEMS: Item[] = [{ value: "home", label: "Home", icon: Home }, { value: "settings", label: "Settings", icon: Settings }, { value: "profile", label: "Profile", icon: User }];
const SHORTCUT_ITEMS: Item[] = [{ value: "copy", label: "Copy", shortcut: "⌘C" }, { value: "paste", label: "Paste", shortcut: "⌘V" }, { value: "save", label: "Save", shortcut: "⌘S" }];
const GROUPED_ITEMS: Item[] = [{ value: "home", label: "Home", group: "Navigation" }, { value: "profile", label: "Profile", group: "Navigation" }, { value: "copy", label: "Copy", group: "Edit" }, { value: "terminal", label: "Terminal", group: "Tools" }];

const match = (items: Item[], s: string) =>
  items.filter((i) => i.label.toLowerCase().includes(s.toLowerCase()));

const ItemRow = ({ item }: { item: Item }) => (
  <div className="flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">
    <div className="flex items-center gap-2">{item.icon && <item.icon className="h-4 w-4" />} <span>{item.label}</span></div>
    {item.shortcut && <kbd className="font-mono text-xs text-muted-foreground">{item.shortcut}</kbd>}
  </div>
);

function CommandDemo({ items, grouped }: { items: Item[]; grouped?: boolean }) {
  return (
    <Command placeholder="Type a command...">
      {(search) => {
        const rows = match(items, search);
        if (grouped) {
          const groups = Array.from(new Set(rows.map((i) => i.group ?? "Other")));
          return (
            <div className="p-1">
              {groups.map((g, i) => (
                <div key={g} className={i ? "mt-2" : ""}>
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">{g}</div>
                  {rows
                    .filter((j) => (j.group ?? "Other") === g)
                    .map((j) => (
                      <ItemRow key={j.value} item={j} />
                    ))}
                </div>
              ))}
            </div>
          );
        }
        return (
          <div className="p-1">
            {rows.map((i) => (
              <ItemRow key={i.value} item={i} />
            ))}
          </div>
        );
      }}
    </Command>
  );
}

const BASIC_SOURCE = `import { Command } from "@/components/ui/Command"

const items = [{ value: "home", label: "Home" }, { value: "profile", label: "Profile" }]

<Command placeholder="Search commands...">
  {(search) => items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())).map((i) => (<div key={i.value} className="rounded px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">{i.label}</div>))}
</Command>`

const ICONS_SOURCE = `import { Command } from "@/components/ui/Command"
import { Home, User } from "lucide-react"

const items = [{ value: "home", label: "Home", icon: Home }, { value: "profile", label: "Profile", icon: User }]

<Command placeholder="Search commands...">
  {(search) => items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())).map((i) => (<div key={i.value} className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"><i.icon className="h-4 w-4" /><span>{i.label}</span></div>))}
</Command>`

const GROUPED_SOURCE = `import { Command } from "@/components/ui/Command"

const items = [{ value: "home", label: "Home", group: "Navigation" }, { value: "copy", label: "Copy", group: "Edit" }, { value: "terminal", label: "Terminal", group: "Tools" }]

<Command placeholder="Search commands...">
  {(search) => Array.from(new Set(items.map((i) => i.group))).map((group) => (<div key={group} className="p-1"><div className="px-2 py-1 text-xs font-semibold text-muted-foreground">{group}</div>{items.filter((i) => i.group === group && i.label.toLowerCase().includes(search.toLowerCase())).map((i) => (<div key={i.value} className="rounded px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">{i.label}</div>))}</div>))}
</Command>`

const SEARCHABLE_SOURCE = `import { Command } from "@/components/ui/Command"

const items = [{ value: "copy", label: "Copy", shortcut: "⌘C" }, { value: "paste", label: "Paste", shortcut: "⌘V" }, { value: "save", label: "Save", shortcut: "⌘S" }]

<Command placeholder="Search commands...">
  {(search) => items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())).map((i) => (<div key={i.value} className="flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"><span>{i.label}</span><kbd className="font-mono text-xs text-muted-foreground">{i.shortcut}</kbd></div>))}
</Command>`

export default function CommandPage() {
  return (
    <ComponentDocPage
      name="Command"
      category="Forms"
      description="A fast, composable search input that filters and renders child content via a render-prop. Supports icons, grouped sections, and keyboard shortcuts."
    >
      <PreviewPanel filename="command-preview.tsx">
        <div className="w-full max-w-sm">
          <CommandDemo items={GROUPED_ITEMS} grouped />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={COMMAND_SOURCE}
        filename="components/ui/Command/Command.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Filter a flat list of commands by name." code={BASIC_SOURCE}>
          <div className="w-full max-w-sm"><CommandDemo items={BASIC_ITEMS} /></div>
        </ExampleBlock>
        <ExampleBlock title="With Icons" description="Render an icon alongside each command." code={ICONS_SOURCE}>
          <div className="w-full max-w-sm"><CommandDemo items={ICONS_ITEMS} /></div>
        </ExampleBlock>
        <ExampleBlock title="Grouped" description="Organize commands under labeled headings." code={GROUPED_SOURCE}>
          <div className="w-full max-w-sm"><CommandDemo items={GROUPED_ITEMS} grouped /></div>
        </ExampleBlock>
        <ExampleBlock title="Searchable" description="Display keyboard shortcuts next to commands." code={SEARCHABLE_SOURCE}>
          <div className="w-full max-w-sm"><CommandDemo items={SHORTCUT_ITEMS} /></div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
