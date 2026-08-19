"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { CommandPalette, type CommandItem } from "@/components/ui";
import { demoCommands, nestedCommands } from "@/components/command-palette/demo";

const COMMAND_PALETTE_SOURCE = `"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface CommandItem {
  id: string;
  label: string;
  keywords?: string[];
  shortcut?: string;
  group?: string;
  icon?: ReactNode;
  danger?: boolean;
  pinned?: boolean;
  onSelect?: () => void;
  children?: CommandItem[];
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  bindShortcut?: boolean;
  width?: number;
}

const flatten = (items: CommandItem[]): CommandItem[] =>
  items.flatMap((i) => [i, ...(i.children ? flatten(i.children) : [])]);

export function CommandPalette({
  items,
  open,
  onOpenChange,
  placeholder = "Search commands or type a command...",
  emptyMessage = "No results found",
  bindShortcut = true,
  width = 560,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const flat = useMemo(() => flatten(items), [items]);
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? flat.filter((i) =>
          [i.label, ...(i.keywords ?? [])].some((k) => k.toLowerCase().includes(q))
        )
      : flat;
  }, [flat, query]);
  const safeSelected = Math.min(selected, Math.max(0, rows.length - 1));

  useEffect(() => {
    if (!bindShortcut) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [bindShortcut, open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const run = (item: CommandItem) => {
    item.onSelect?.();
    onOpenChange(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => (rows.length > 0 ? (i + 1) % rows.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) =>
        rows.length > 0 ? (i - 1 + rows.length) % rows.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = rows[safeSelected];
      if (row) run(row);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-start justify-center px-4 pb-8 pt-[14vh]">
      <div className="fixed inset-0 bg-black/40" onClick={() => onOpenChange(false)} aria-hidden="true" />
      <div
        className="relative z-10 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-popover"
        style={{ width, maxWidth: "100%" }}
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoFocus
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-72 overflow-y-auto p-2" style={{ maxHeight: 460 }}>
          {rows.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
          )}
          {rows.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => run(item)}
              onMouseEnter={() => setSelected(i)}
              className={\`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm \${i === safeSelected ? "bg-accent text-accent-foreground" : ""} \${item.danger ? "text-red-600" : ""}\`}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span className="flex-1 truncate">{item.label}</span>
              {item.shortcut && (
                <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {item.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`;

function wireActions(cmds: CommandItem[], onRun: (label: string) => void): CommandItem[] {
  return cmds.map((cmd) => ({
    ...cmd,
    onSelect: cmd.onSelect ?? (() => onRun(cmd.label)),
    children: cmd.children ? wireActions(cmd.children, onRun) : cmd.children,
  }));
}

function TriggerButton({ label, onOpen }: { label: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-card transition-colors hover:text-foreground"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
      </svg>
      {label}
      <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
        Ctrl K
      </kbd>
    </button>
  );
}

function PaletteDemo({ commands }: { commands: CommandItem[] }) {
  const [open, setOpen] = useState(false);
  const [ran, setRan] = useState("");
  const items = wireActions(commands, (label) => setRan(label));
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <TriggerButton label="Open command palette" onOpen={() => setOpen(true)} />
      {ran && <p className="text-sm text-muted-foreground">Ran: {ran}</p>}
      <CommandPalette items={items} open={open} onOpenChange={setOpen} bindShortcut={false} />
    </div>
  );
}

export default function CommandPalettePage() {
  return (
    <ComponentDocPage
      name="Command Palette"
      category="Overlays"
      description="A keyboard-driven spotlight search with nested submenus, pinned favorites, and recents, persisted to localStorage."
    >
      <PreviewPanel filename="command-palette.tsx">
        <PaletteDemo commands={demoCommands} />
      </PreviewPanel>

      <SourceCodeViewer
        source={COMMAND_PALETTE_SOURCE}
        filename="components/ui/CommandPalette/CommandPalette.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Search"
          description="Type to filter commands across groups; press Enter to run."
          code={COMMAND_PALETTE_SOURCE}
        >
          <PaletteDemo commands={demoCommands} />
        </ExampleBlock>

        <ExampleBlock
          title="Nested Submenus"
          description="Drill into parent commands with arrow keys; ArrowLeft returns."
          code={COMMAND_PALETTE_SOURCE}
        >
          <PaletteDemo commands={nestedCommands} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}