"use client";

import { Home, Settings, User, Copy, Terminal, FileText, Trash2, Download } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Command } from "@/components/ui";

const COMMAND_SOURCE = `"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

interface CommandProps {
  placeholder?: string;
  loading?: boolean;
  className?: string;
  children: React.ReactNode | ((search: string) => React.ReactNode);
}

export function Command({ placeholder = "Type a command...", loading = false, className, children }: CommandProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = useCallback(() => { setSearch(""); inputRef.current?.focus(); }, []);

  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-lg", className)}>
      <div className="flex items-center gap-2.5 border-b border-border px-3.5 py-2.5">
        {loading ? <LoaderIcon /> : <SearchIcon />}
        <input ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} aria-label="Search commands"
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
        {search && <button type="button" onClick={clear} aria-label="Clear search" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"><XIcon /></button>}
      </div>
      <div className="max-h-80 overflow-y-auto p-1.5">
        {typeof children === "function" ? (children as (search: string) => React.ReactNode)(search) : children}
      </div>
    </div>
  );
}`;

interface Item {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  group?: string;
}

const BASIC_ITEMS: Item[] = [
  { value: "home", label: "Home" },
  { value: "profile", label: "Profile" },
  { value: "settings", label: "Settings" },
];

const ICONS_ITEMS: Item[] = [
  { value: "home", label: "Home", icon: Home },
  { value: "settings", label: "Settings", icon: Settings },
  { value: "profile", label: "Profile", icon: User },
];

const SHORTCUT_ITEMS: Item[] = [
  { value: "copy", label: "Copy", shortcut: "\u2318C" },
  { value: "paste", label: "Paste", shortcut: "\u2318V" },
  { value: "save", label: "Save", shortcut: "\u2318S" },
];

const GROUPED_ITEMS: Item[] = [
  { value: "home", label: "Home", icon: Home, group: "Navigation" },
  { value: "profile", label: "Profile", icon: User, group: "Navigation" },
  { value: "copy", label: "Copy", icon: Copy, group: "Edit" },
  { value: "terminal", label: "Terminal", icon: Terminal, group: "Tools" },
];

const DESTRUCTIVE_ITEMS: Item[] = [
  { value: "download", label: "Download", icon: Download, group: "Actions" },
  { value: "file", label: "New File", icon: FileText, group: "Actions" },
  { value: "delete", label: "Delete", icon: Trash2, group: "Danger Zone" },
];

const match = (items: Item[], s: string) =>
  items.filter((i) => i.label.toLowerCase().includes(s.toLowerCase()));

const BASIC_SOURCE = `import { Command } from "@/components/ui/Command";

const items = [{ value: "home", label: "Home" }, { value: "profile", label: "Profile" }];

<Command placeholder="Search commands...">
  {(search) => items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())).map((i) => (
    <div key={i.value} className="rounded-lg px-2.5 py-2 text-sm hover:bg-accent cursor-pointer">{i.label}</div>
  ))}
</Command>`;

const ICONS_SOURCE = `import { Command } from "@/components/ui/Command";
import { Home, Settings, User } from "lucide-react";

const items = [
  { value: "home", label: "Home", icon: Home },
  { value: "settings", label: "Settings", icon: Settings },
  { value: "profile", label: "Profile", icon: User },
];

<Command placeholder="Search commands...">
  {(search) => items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())).map((i) => (
    <div key={i.value} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-accent cursor-pointer">
      <i.icon className="h-4 w-4 text-muted-foreground" /><span>{i.label}</span>
    </div>
  ))}
</Command>`;

const GROUPED_SOURCE = `import { Command } from "@/components/ui/Command";
import { Home, User, Copy, Terminal } from "lucide-react";

const items = [
  { value: "home", label: "Home", icon: Home, group: "Navigation" },
  { value: "copy", label: "Copy", icon: Copy, group: "Edit" },
  { value: "terminal", label: "Terminal", icon: Terminal, group: "Tools" },
];

<Command placeholder="Search commands...">
  {(search) => {
    const rows = items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()));
    const groups = [...new Set(rows.map((i) => i.group ?? "Other"))];
    return groups.map((g) => (
      <div key={g} className="mb-1">
        <div className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{g}</div>
        {rows.filter((j) => (j.group ?? "Other") === g).map((j) => (
          <div key={j.value} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-accent cursor-pointer">
            <j.icon className="h-4 w-4 text-muted-foreground" /><span>{j.label}</span>
          </div>
        ))}
      </div>
    ));
  }}
</Command>`;

const SHORTCUTS_SOURCE = `import { Command } from "@/components/ui/Command";

const items = [
  { value: "copy", label: "Copy", shortcut: "\u2318C" },
  { value: "paste", label: "Paste", shortcut: "\u2318V" },
  { value: "save", label: "Save", shortcut: "\u2318S" },
];

<Command placeholder="Search commands...">
  {(search) => items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())).map((i) => (
    <div key={i.value} className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm hover:bg-accent cursor-pointer">
      <span>{i.label}</span>
      <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{i.shortcut}</kbd>
    </div>
  ))}
</Command>`;

const DESTRUCTIVE_SOURCE = `import { Command } from "@/components/ui/Command";
import { Download, FileText, Trash2 } from "lucide-react";

const items = [
  { value: "download", label: "Download", icon: Download, group: "Actions" },
  { value: "delete", label: "Delete", icon: Trash2, group: "Danger Zone" },
];

<Command placeholder="Search commands...">
  {(search) => {
    const rows = items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()));
    const groups = [...new Set(rows.map((i) => i.group ?? "Other"))];
    return groups.map((g) => (
      <div key={g} className="mb-1">
        <div className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{g}</div>
        {rows.filter((j) => (j.group ?? "Other") === g).map((j) => (
          <div key={j.value} className={\`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-accent cursor-pointer \${j.value === "delete" ? "text-red-500 hover:text-red-600" : ""}\`}>
            <j.icon className="h-4 w-4" /><span>{j.label}</span>
          </div>
        ))}
      </div>
    ));
  }}
</Command>`;

function ItemRow({ item, destructive }: { item: Item; destructive?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer ${
        destructive ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950" : ""
      }`}
    >
      <div className="flex items-center gap-2.5">
        {item.icon && <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
        <span>{item.label}</span>
      </div>
      {item.shortcut && (
        <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          {item.shortcut}
        </kbd>
      )}
    </div>
  );
}

function CommandDemo({ items, grouped, destructive }: { items: Item[]; grouped?: boolean; destructive?: boolean }) {
  return (
    <Command placeholder="Type a command...">
      {(search) => {
        const rows = match(items, search);
        if (grouped || destructive) {
          const groups = Array.from(new Set(rows.map((i) => i.group ?? "Other")));
          return (
            <div>
              {groups.map((g, idx) => (
                <div key={g} className={idx > 0 ? "mt-2" : ""}>
                  <div className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {g}
                  </div>
                  {rows
                    .filter((j) => (j.group ?? "Other") === g)
                    .map((j) => (
                      <ItemRow key={j.value} item={j} destructive={destructive && g === "Danger Zone"} />
                    ))}
                </div>
              ))}
            </div>
          );
        }
        return (
          <div>
            {rows.map((i) => (
              <ItemRow key={i.value} item={i} />
            ))}
          </div>
        );
      }}
    </Command>
  );
}

export default function CommandPage() {
  return (
    <ComponentDocPage
      name="Command"
      category="Forms"
      description="A fast, composable search input that filters and renders child content via a render-prop. Supports icons, grouped sections, keyboard shortcuts, and destructive actions."
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

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Filter a flat list of commands by name."
          code={BASIC_SOURCE}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <CommandDemo items={BASIC_ITEMS} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Render a Lucide icon alongside each command."
          code={ICONS_SOURCE}
          filename="with-icons.tsx"
        >
          <div className="w-full max-w-sm">
            <CommandDemo items={ICONS_ITEMS} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Grouped"
          description="Organize commands under labeled headings."
          code={GROUPED_SOURCE}
          filename="grouped.tsx"
        >
          <div className="w-full max-w-sm">
            <CommandDemo items={GROUPED_ITEMS} grouped />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Keyboard Shortcuts"
          description="Display keyboard shortcut badges next to commands."
          code={SHORTCUTS_SOURCE}
          filename="shortcuts.tsx"
        >
          <div className="w-full max-w-sm">
            <CommandDemo items={SHORTCUT_ITEMS} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Destructive Actions"
          description="Highlight dangerous actions with red styling."
          code={DESTRUCTIVE_SOURCE}
          filename="destructive.tsx"
        >
          <div className="w-full max-w-sm">
            <CommandDemo items={DESTRUCTIVE_ITEMS} grouped destructive />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
