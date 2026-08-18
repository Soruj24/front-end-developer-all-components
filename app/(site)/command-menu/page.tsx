"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add command-menu`;

const usageCode = `import { CommandMenu } from "@/components/_command-menu"

<CommandMenu
  commands={commands}
  open={open}
  onClose={() => setOpen(false)}
/>`;

interface Command {
  id: string;
  label: string;
  shortcut: string;
  group: string;
  destructive?: boolean;
  icon?: string;
}

const allCommands: Command[] = [
  { id: "home", label: "Go to Home", shortcut: "G H", group: "Navigation", icon: "H" },
  { id: "settings", label: "Open Settings", shortcut: "G S", group: "Navigation", icon: "G" },
  { id: "profile", label: "View Profile", shortcut: "G P", group: "Navigation", icon: "U" },
  { id: "search", label: "Search", shortcut: "/", group: "Navigation", icon: "S" },
  { id: "new-file", label: "New File", shortcut: "N", group: "File", icon: "F" },
  { id: "new-folder", label: "New Folder", shortcut: "N F", group: "File", icon: "D" },
  { id: "save", label: "Save", shortcut: "Cmd+S", group: "File", icon: "S" },
  { id: "export", label: "Export as PDF", shortcut: "E", group: "File", icon: "P" },
  { id: "copy", label: "Copy", shortcut: "Cmd+C", group: "Edit", icon: "C" },
  { id: "paste", label: "Paste", shortcut: "Cmd+V", group: "Edit", icon: "P" },
  { id: "cut", label: "Cut", shortcut: "Cmd+X", group: "Edit", icon: "X" },
  { id: "undo", label: "Undo", shortcut: "Cmd+Z", group: "Edit", icon: "U" },
  { id: "select-all", label: "Select All", shortcut: "Cmd+A", group: "Edit", icon: "A" },
  { id: "delete-project", label: "Delete Project", shortcut: "", group: "Danger", destructive: true, icon: "D" },
];

const moreCommands: Command[] = [
  { id: "dashboard", label: "Open Dashboard", shortcut: "G D", group: "Pages", icon: "D" },
  { id: "analytics", label: "View Analytics", shortcut: "G A", group: "Pages", icon: "A" },
  { id: "reports", label: "Generate Report", shortcut: "R", group: "Pages", icon: "R" },
  { id: "notifications", label: "Notifications", shortcut: "G N", group: "Pages", icon: "N" },
  { id: "tasks", label: "Task Manager", shortcut: "G T", group: "Pages", icon: "T" },
  { id: "calendar", label: "Open Calendar", shortcut: "G C", group: "Pages", icon: "C" },
  { id: "duplicate", label: "Duplicate", shortcut: "Cmd+D", group: "Edit", icon: "D" },
  { id: "delete", label: "Delete", shortcut: "Del", group: "Edit", destructive: true, icon: "X" },
  { id: "rename", label: "Rename", shortcut: "F2", group: "File", icon: "R" },
  { id: "download", label: "Download", shortcut: "Cmd+J", group: "File", icon: "D" },
];

function PaletteButton({ label, onOpen, kbd = "Ctrl+K" }: { label: string; onOpen: () => void; kbd?: string }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground shadow-sm dark:border-border dark:bg-surface dark:text-muted-foreground"
    >
      <span className="text-muted-foreground">&lt;/&gt;</span>
      {label}
      <kbd className="rounded border border-border px-1.5 py-0.5 text-xs dark:border-border">{kbd}</kbd>
    </button>
  );
}

function CommandPalette({
  commands,
  open,
  onClose,
  placeholder = "Type a command...",
  showRecent = true,
  groups = true,
  maxHeight = "max-h-72",
}: {
  commands: Command[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  showRecent?: boolean;
  groups?: boolean;
  maxHeight?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>(["home", "settings", "search"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setQuery("");
        setActiveIndex(0);
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const execute = useCallback(
    (cmd: Command) => {
      alert(`Executed: ${cmd.label}`);
      setRecent((prev) => [cmd.id, ...prev.filter((id) => id !== cmd.id)].slice(0, 5));
      onClose();
    },
    [onClose]
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[activeIndex]) { e.preventDefault(); execute(filtered[activeIndex]); }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.children[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  const recentItems = recent.map((id) => commands.find((c) => c.id === id)).filter(Boolean) as Command[];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh]" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl border border-border bg-background shadow-modal dark:border-border dark:bg-surface" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-border px-4 dark:border-border">
          <span className="text-sm text-muted-foreground">&lt;/&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent py-3 text-sm outline-none"
          />
          {query && <button onClick={() => setQuery("")} className="text-xs text-muted-foreground hover:text-foreground">&times;</button>}
        </div>
        <div ref={listRef} className={`${maxHeight} overflow-y-auto p-2`}>
          {filtered.length === 0 && (
            <div className="px-2 py-6 text-center text-sm text-foreground">
              <p>No results for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-xs text-muted-foreground">Try a different search term</p>
            </div>
          )}
          {query === "" && showRecent && recentItems.length > 0 && (
            <div className="mb-2">
              <div className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Recently used</div>
              {recentItems.map((cmd) => {
                const idx = filtered.findIndex((c) => c.id === cmd.id);
                return (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm ${activeIndex === idx ? "bg-muted dark:bg-muted" : "hover:bg-muted dark:hover:bg-muted/50"}`}
                  >
                    <span className="flex items-center gap-2">
                      {cmd.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-muted text-[10px] font-bold dark:bg-muted">{cmd.icon}</span>}
                      <span className="text-xs text-muted-foreground">↩</span>
                      {cmd.label}
                    </span>
                    {cmd.shortcut && <kbd className="rounded border border-border px-1.5 py-0.5 text-xs dark:border-border">{cmd.shortcut}</kbd>}
                  </button>
                );
              })}
            </div>
          )}
          {groups ? Object.entries(grouped).map(([group, cmds]) => (
            <div key={group} className="mb-2 last:mb-0">
              <div className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{group}</div>
              {cmds.map((cmd) => {
                const idx = filtered.indexOf(cmd);
                return (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm ${activeIndex === idx ? "bg-muted dark:bg-muted" : "hover:bg-muted dark:hover:bg-muted/50"} ${cmd.destructive ? "text-danger dark:text-danger" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      {cmd.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-muted text-[10px] font-bold dark:bg-muted">{cmd.icon}</span>}
                      {cmd.label}
                    </span>
                    {cmd.shortcut && <kbd className={`rounded border px-1.5 py-0.5 text-xs ${cmd.destructive ? "border-danger text-danger dark:border-danger" : "border-border dark:border-border"}`}>{cmd.shortcut}</kbd>}
                  </button>
                );
              })}
            </div>
          )) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => execute(cmd)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm ${activeIndex === i ? "bg-muted dark:bg-muted" : "hover:bg-muted dark:hover:bg-muted/50"} ${cmd.destructive ? "text-danger dark:text-danger" : ""}`}
              >
                <span className="flex items-center gap-2">
                  {cmd.icon && <span className="flex h-5 w-5 items-center justify-center rounded bg-muted text-[10px] font-bold dark:bg-muted">{cmd.icon}</span>}
                  {cmd.label}
                </span>
                {cmd.shortcut && <kbd className="rounded border border-border px-1.5 py-0.5 text-xs dark:border-border">{cmd.shortcut}</kbd>}
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground dark:border-border">
          <span>↑↓ Navigate &middot; ↵ Select &middot; Esc Close</span>
          <kbd className="rounded border border-border px-1 py-0.5 text-[10px] dark:border-border">Ctrl+K</kbd>
        </div>
      </div>
    </div>
  );
}

export default function CommandMenuPage() {
  const [openDefault, setOpenDefault] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);
  const [openNoGroups, setOpenNoGroups] = useState(false);
  const [openNoRecent, setOpenNoRecent] = useState(false);
  const [openMinimal, setOpenMinimal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [openDanger, setOpenDanger] = useState(false);
  const [openShort, setOpenShort] = useState(false);
  const [openExtended, setOpenExtended] = useState(false);
  const [openIcons, setOpenIcons] = useState(false);
  const [openShortcuts, setOpenShortcuts] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [openDark, setOpenDark] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpenDefault(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Command Menu</h1>
          <Badge variant="primary">8 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Command palettes with search, keyboard navigation, recent items, and
          grouped results. Use the tabs to switch between the live preview,
          source code, CLI, installation, and dependency details for each
          example.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="cmd-palette-default">
        <div className="flex w-full flex-col items-center gap-4">
          <PaletteButton label="Search commands..." onOpen={() => setOpenDefault(true)} />
          <CommandPalette
            commands={allCommands}
            open={openDefault}
            onClose={() => setOpenDefault(false)}
            placeholder="Type a command..."
            showRecent
            groups
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="cmd-palette-layouts">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Large Palette</p>
            <p className="text-xs text-muted-foreground">Increased height for more items</p>
            <PaletteButton label="Search..." onOpen={() => setOpenLarge(true)} />
            <CommandPalette commands={[...allCommands, ...moreCommands]} open={openLarge} onClose={() => setOpenLarge(false)} placeholder="Search..." showRecent groups maxHeight="max-h-96" />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Without Groups</p>
            <p className="text-xs text-muted-foreground">Flat list, no sections</p>
            <PaletteButton label="Search commands..." onOpen={() => setOpenNoGroups(true)} />
            <CommandPalette commands={allCommands} open={openNoGroups} onClose={() => setOpenNoGroups(false)} placeholder="Search commands..." showRecent={false} groups={false} />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Without Recent</p>
            <p className="text-xs text-muted-foreground">No recently used section</p>
            <PaletteButton label="Find action..." onOpen={() => setOpenNoRecent(true)} />
            <CommandPalette commands={allCommands} open={openNoRecent} onClose={() => setOpenNoRecent(false)} placeholder="Find action..." showRecent={false} groups />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Minimal Palette</p>
            <p className="text-xs text-muted-foreground">Smaller, flat, no groups or recents</p>
            <PaletteButton label="Go to..." onOpen={() => setOpenMinimal(true)} />
            <CommandPalette commands={allCommands.filter((c) => c.group === "Navigation")} open={openMinimal} onClose={() => setOpenMinimal(false)} placeholder="Go to..." showRecent={false} groups={false} maxHeight="max-h-48" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="cmd-palette-filtered">
        <div className="grid w-full gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Edit Commands Only</p>
            <p className="text-xs text-muted-foreground">Filtered to the Edit group</p>
            <PaletteButton label="Edit..." onOpen={() => setOpenEdit(true)} />
            <CommandPalette commands={allCommands.filter((c) => c.group === "Edit")} open={openEdit} onClose={() => setOpenEdit(false)} placeholder="Edit..." showRecent={false} groups={false} />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">File Commands Only</p>
            <p className="text-xs text-muted-foreground">Filtered to the File group</p>
            <PaletteButton label="File..." onOpen={() => setOpenFile(true)} />
            <CommandPalette commands={allCommands.filter((c) => c.group === "File")} open={openFile} onClose={() => setOpenFile(false)} placeholder="File..." showRecent={false} groups={false} />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Navigation Only</p>
            <p className="text-xs text-muted-foreground">Filtered to the Navigation group</p>
            <PaletteButton label="Navigate..." onOpen={() => setOpenNav(true)} />
            <CommandPalette commands={allCommands.filter((c) => c.group === "Navigation")} open={openNav} onClose={() => setOpenNav(false)} placeholder="Navigate..." showRecent={false} groups={false} />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="cmd-palette-danger">
        <div className="flex w-full flex-col items-center gap-4">
          <PaletteButton label="Type command..." onOpen={() => setOpenDanger(true)} />
          <CommandPalette
            commands={allCommands}
            open={openDanger}
            onClose={() => setOpenDanger(false)}
            placeholder="Type command..."
            showRecent
            groups
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="cmd-palette-density">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Short Commands</p>
            <p className="text-xs text-muted-foreground">Fewer items, flat list</p>
            <PaletteButton label="Quick action..." onOpen={() => setOpenShort(true)} />
            <CommandPalette commands={allCommands.slice(0, 5)} open={openShort} onClose={() => setOpenShort(false)} placeholder="Quick action..." showRecent={false} groups={false} />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Extended Commands</p>
            <p className="text-xs text-muted-foreground">20+ items with sections</p>
            <PaletteButton label="Search 20+..." onOpen={() => setOpenExtended(true)} />
            <CommandPalette commands={[...allCommands, ...moreCommands]} open={openExtended} onClose={() => setOpenExtended(false)} placeholder="Search 20+..." showRecent groups />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="cmd-palette-display">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Icons Only</p>
            <p className="text-xs text-muted-foreground">No shortcut keys shown</p>
            <PaletteButton label="Search..." onOpen={() => setOpenIcons(true)} />
            <CommandPalette commands={allCommands.map((c) => ({ ...c, shortcut: "" }))} open={openIcons} onClose={() => setOpenIcons(false)} placeholder="Search..." showRecent groups />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Shortcuts Only</p>
            <p className="text-xs text-muted-foreground">No icons, just labels and keys</p>
            <PaletteButton label="Shortcut search..." onOpen={() => setOpenShortcuts(true)} />
            <CommandPalette commands={allCommands.map((c) => ({ ...c, icon: "" }))} open={openShortcuts} onClose={() => setOpenShortcuts(false)} placeholder="Shortcut search..." showRecent groups />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="cmd-palette-placeholders">
        <div className="grid w-full gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Custom Placeholder</p>
            <p className="text-xs text-muted-foreground">Branded help text</p>
            <PaletteButton label="Ask me anything..." onOpen={() => setOpenCustom(true)} />
            <CommandPalette commands={allCommands} open={openCustom} onClose={() => setOpenCustom(false)} placeholder="Ask me anything..." showRecent groups />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Dark Background</p>
            <p className="text-xs text-muted-foreground">Same palette, any query</p>
            <PaletteButton label="Search dark..." onOpen={() => setOpenDark(true)} />
            <CommandPalette commands={allCommands} open={openDark} onClose={() => setOpenDark(false)} placeholder="Search dark..." showRecent groups />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-4 dark:border-border">
            <p className="text-sm font-medium">Search-Focused</p>
            <p className="text-xs text-muted-foreground">Starts with a search-open feel</p>
            <PaletteButton label="Find anything..." onOpen={() => setOpenSearch(true)} />
            <CommandPalette commands={[...allCommands, ...moreCommands]} open={openSearch} onClose={() => setOpenSearch(false)} placeholder="Find anything..." showRecent={false} groups />
          </div>
        </div>
      </ComponentPreview>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">commands</td>
                <td className="px-4 py-3 text-muted-foreground">Command[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">open</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClose</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Type a command...&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showRecent</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">groups</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
