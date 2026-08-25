"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import CommandMenu from "@/components/ui/CommandMenu";

const COMMANDMENU_SOURCE = `"use client";

import { useState, useEffect, useRef, useCallback, ReactNode, KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect: () => void;
  danger?: boolean;
}

interface CommandGroup {
  group: string;
  items: CommandItem[];
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
}

const CommandMenu = ({ open, onClose, groups, placeholder = "Type a command..." }: CommandMenuProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const flatItems = groups.flatMap((g) =>
    g.items.filter((item) => !query || item.label.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => { if (!open) { setQuery(""); setSelectedIndex(0); } }, [open]);
  useEffect(() => { setSelectedIndex(0); }, [query]);
  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler as unknown as EventListener);
    return () => document.removeEventListener("keydown", handler as unknown as EventListener);
  }, [open, onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((p) => (p + 1) % Math.max(flatItems.length, 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((p) => p <= 0 ? Math.max(flatItems.length - 1, 0) : p - 1); }
    else if (e.key === "Enter" && flatItems[selectedIndex]) { e.preventDefault(); flatItems[selectedIndex].onSelect(); onClose(); }
  }, [flatItems, selectedIndex, onClose]);

  if (!open) return null;
  let globalIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      <div className="fixed inset-0 bg-overlay/80 backdrop-blur-sm animate-in fade-in-0" onClick={onClose} />
      <div className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl ring-1 ring-black/[0.04] dark:ring-white/[0.08] animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center gap-3 border-b border-border/60 px-4">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} placeholder={placeholder}
            className="flex-1 bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/50" />
          <kbd className="hidden shrink-0 rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground/70 sm:inline-block">esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {flatItems.length === 0 && (
            <div className="flex flex-col items-center gap-1.5 py-10 text-center">
              <svg className="h-8 w-8 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">No results found</span>
              <span className="text-xs text-muted-foreground/60">Try a different search term</span>
            </div>
          )}
          {groups.map((group) => {
            const filtered = group.items.filter((item) => !query || item.label.toLowerCase().includes(query.toLowerCase()));
            if (filtered.length === 0) return null;
            return (
              <div key={group.group}>
                <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">{group.group}</div>
                {filtered.map((item) => {
                  globalIndex++;
                  const idx = globalIndex;
                  return (
                    <button key={item.id} onClick={() => { item.onSelect(); onClose(); }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn("flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors duration-100",
                        idx === selectedIndex ? "bg-muted/80" : "hover:bg-muted/50",
                        item.danger ? "text-danger" : "text-foreground")}>
                      {item.icon && <span className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground/70">{item.icon}</span>}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.shortcut && (
                        <span className="shrink-0 rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground/70 ring-1 ring-black/[0.04] dark:ring-white/[0.08]">{item.shortcut}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;`;

const GROUPED_SOURCE = `import { useState } from "react";
import CommandMenu from "@/components/ui/CommandMenu";

export default function GroupedDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Search Commands</button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        groups={[
          { group: "Navigation", items: [
            { id: "home", label: "Go Home", shortcut: "G H", onSelect: () => {} },
            { id: "settings", label: "Settings", shortcut: "G S", onSelect: () => {} },
          ]},
          { group: "Actions", items: [
            { id: "copy", label: "Copy", shortcut: "Cmd+C", onSelect: () => {} },
            { id: "paste", label: "Paste", shortcut: "Cmd+V", onSelect: () => {} },
          ]},
        ]}
      />
    </>
  );
}`;

const DANGER_SOURCE = `import { useState } from "react";
import CommandMenu from "@/components/ui/CommandMenu";

export default function DangerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Type command...</button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        groups={[
          { group: "Actions", items: [
            { id: "save", label: "Save Changes", shortcut: "Cmd+S", onSelect: () => {} },
          ]},
          { group: "Danger Zone", items: [
            { id: "delete", label: "Delete Project", onSelect: () => {}, danger: true },
          ]},
        ]}
      />
    </>
  );
}`;

const TRIGGER = "inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08] transition-all duration-150 hover:bg-muted/50 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]";

const ALL_GROUPS = [
  { group: "Navigation", items: [
    { id: "home", label: "Go to Home", shortcut: "G H", onSelect: () => alert("Home") },
    { id: "settings", label: "Open Settings", shortcut: "G S", onSelect: () => alert("Settings") },
    { id: "profile", label: "View Profile", shortcut: "G P", onSelect: () => alert("Profile") },
  ]},
  { group: "File", items: [
    { id: "new-file", label: "New File", shortcut: "N", onSelect: () => alert("New File") },
    { id: "save", label: "Save", shortcut: "Cmd+S", onSelect: () => alert("Saved") },
  ]},
  { group: "Edit", items: [
    { id: "copy", label: "Copy", shortcut: "Cmd+C", onSelect: () => alert("Copied") },
    { id: "paste", label: "Paste", shortcut: "Cmd+V", onSelect: () => alert("Pasted") },
  ]},
];

const DANGER_GROUPS = [
  { group: "Actions", items: [
    { id: "save", label: "Save Changes", shortcut: "Cmd+S", onSelect: () => alert("Saved") },
  ]},
  { group: "Danger Zone", items: [
    { id: "delete", label: "Delete Project", onSelect: () => alert("Deleted"), danger: true },
    { id: "reset", label: "Reset All", onSelect: () => alert("Reset"), danger: true },
  ]},
];

export default function CommandMenuPage() {
  const [openBasic, setOpenBasic] = useState(false);
  const [openGrouped, setOpenGrouped] = useState(false);
  const [openDanger, setOpenDanger] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);

  return (
    <ComponentDocPage
      name="Command Menu"
      category="Overlays"
      description="A searchable command palette with keyboard navigation, grouped results, and shortcut display. Supports filtering, danger actions, and custom placeholders."
    >
      <PreviewPanel filename="command-menu-preview.tsx">
        <div className="flex flex-col items-center gap-4">
          <button className={TRIGGER} onClick={() => setOpenBasic(true)}>Search commands...</button>
          <CommandMenu open={openBasic} onClose={() => setOpenBasic(false)} groups={ALL_GROUPS} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={COMMANDMENU_SOURCE} filename="components/ui/CommandMenu.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Grouped Commands" description="Commands organized into labeled groups with keyboard shortcuts." code={GROUPED_SOURCE} filename="grouped-demo.tsx">
          <div className="flex flex-col items-center gap-4">
            <button className={TRIGGER} onClick={() => setOpenGrouped(true)}>Search commands...</button>
            <CommandMenu open={openGrouped} onClose={() => setOpenGrouped(false)} groups={ALL_GROUPS} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Danger Actions" description="Mark items as danger for destructive operations with distinct styling." code={DANGER_SOURCE} filename="danger-demo.tsx">
          <div className="flex flex-col items-center gap-4">
            <button className={TRIGGER} onClick={() => setOpenDanger(true)}>Type command...</button>
            <CommandMenu open={openDanger} onClose={() => setOpenDanger(false)} groups={DANGER_GROUPS} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Custom Placeholder" description="Provide a custom placeholder to match your use case." code={GROUPED_SOURCE} filename="custom-placeholder.tsx">
          <div className="flex flex-col items-center gap-4">
            <button className={TRIGGER} onClick={() => setOpenCustom(true)}>Ask me anything...</button>
            <CommandMenu open={openCustom} onClose={() => setOpenCustom(false)} groups={ALL_GROUPS} placeholder="Ask me anything..." />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
