"use client";

import { useState } from "react";
import { Command } from "@/components/_command";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import type { CommandItemProps } from "@/components/_command/Command.types";

const installCommand = `npx component-library@latest add command`;

const usageCode = `import { Command } from "@/components/_command"

<Command
  items={items}
  onSelect={(item) => console.log(item)}
  placeholder="Type a command..."
/>`;

function SearchIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function SearchIconSmall() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

const navigationItems: CommandItemProps[] = [
  { value: "home", label: "Home", icon: <HomeIcon />, shortcut: "⌘H" },
  { value: "about", label: "About", icon: <SearchIconSmall /> },
  { value: "settings", label: "Settings", icon: <SettingsIcon />, shortcut: "⌘," },
  { value: "profile", label: "Profile", icon: <UserIcon />, shortcut: "⌘P" },
  { value: "dashboard", label: "Dashboard", icon: <FolderIcon />, shortcut: "⌘D" },
];

const groupedItems: CommandItemProps[] = [
  { value: "home", label: "Home", icon: <HomeIcon />, group: "Navigation" },
  { value: "about", label: "About", icon: <SearchIconSmall />, group: "Navigation" },
  { value: "contact", label: "Contact", icon: <MailIcon />, group: "Navigation" },
  { value: "copy", label: "Copy", icon: <CopyIcon />, shortcut: "⌘C", group: "Edit" },
  { value: "paste", label: "Paste", icon: <ClipboardIcon />, shortcut: "⌘V", group: "Edit" },
  { value: "cut", label: "Cut", icon: <TrashIcon />, shortcut: "⌘X", group: "Edit" },
  { value: "terminal", label: "Terminal", icon: <TerminalIcon />, group: "Tools" },
  { value: "git", label: "Git", icon: <GitIcon />, group: "Tools" },
];

const shortcutItems: CommandItemProps[] = [
  { value: "copy", label: "Copy", shortcut: "⌘C" },
  { value: "paste", label: "Paste", shortcut: "⌘V" },
  { value: "cut", label: "Cut", shortcut: "⌘X" },
  { value: "undo", label: "Undo", shortcut: "⌘Z" },
  { value: "redo", label: "Redo", shortcut: "⌘⇧Z" },
  { value: "find", label: "Find", shortcut: "⌘F" },
  { value: "replace", label: "Replace", shortcut: "⌘H" },
  { value: "select-all", label: "Select All", shortcut: "⌘A" },
];

const codeItems: CommandItemProps[] = [
  { value: "terminal", label: "Terminal", icon: <TerminalIcon />, shortcut: "⌘`" },
  { value: "code", label: "Code Editor", icon: <CodeIcon />, shortcut: "⌘E" },
  { value: "files", label: "Files", icon: <FolderIcon />, shortcut: "⌘⇧F" },
  { value: "search", label: "Search", icon: <SearchIconSmall />, shortcut: "⌘/" },
  { value: "git", label: "Git", icon: <GitIcon /> },
  { value: "debug", label: "Debug", icon: <AlertIcon />, shortcut: "⌘⇧D" },
];

const mailItems: CommandItemProps[] = [
  { value: "inbox", label: "Inbox", icon: <InboxIcon />, shortcut: "12" },
  { value: "drafts", label: "Drafts", icon: <MailIcon />, shortcut: "3" },
  { value: "sent", label: "Sent", icon: <SendIcon /> },
  { value: "archive", label: "Archive", icon: <ArchiveIcon /> },
  { value: "spam", label: "Spam", icon: <AlertIcon />, shortcut: "2" },
  { value: "trash", label: "Trash", icon: <TrashIcon /> },
];

const themeItems: CommandItemProps[] = [
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark", label: "Dark", icon: <MoonIcon /> },
  { value: "system", label: "System", icon: <SettingsIcon /> },
];

export default function CommandPage() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Command</h1>
          <Badge variant="primary">9 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Fast, composable, unstyled command menu for React. Search through actions,
          navigation, and tools with keyboard navigation and fuzzy matching.
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

      <ComponentPreview id="command-default">
        <div className="flex flex-col gap-3">
          <Command
            items={navigationItems}
            onSelect={(item) => setSelected(item.value)}
            placeholder="Type a command or search..."
          />
          {selected && (
            <p className="text-sm text-muted-foreground">
              Selected: <span className="font-medium text-foreground">{selected}</span>
            </p>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="command-groups">
        <Command
          items={groupedItems}
          placeholder="Search with groups..."
        />
      </ComponentPreview>

      <ComponentPreview id="command-shortcuts">
        <Command
          items={shortcutItems}
          placeholder="Search with keyboard shortcuts..."
        />
      </ComponentPreview>

      <ComponentPreview id="command-icons">
        <Command
          items={codeItems}
          placeholder="Search with icons..."
        />
      </ComponentPreview>

      <ComponentPreview id="command-badges">
        <Command
          items={mailItems}
          placeholder="Search mail..."
        />
      </ComponentPreview>

      <ComponentPreview id="command-dialog">
        <CommandDialogDemo />
      </ComponentPreview>

      <ComponentPreview id="command-nested">
        <NestedCommandDemo />
      </ComponentPreview>

      <ComponentPreview id="command-max-results">
        <Command
          items={navigationItems}
          maxResults={3}
          placeholder="Max 3 results..."
        />
      </ComponentPreview>

      <ComponentPreview id="command-custom-empty">
        <Command
          items={[]}
          emptyMessage="No commands found. Try a different search."
          placeholder="Search commands..."
        />
      </ComponentPreview>

      <ComponentPreview id="command-theme">
        <Command
          items={themeItems}
          placeholder="Choose theme..."
        />
      </ComponentPreview>
    </div>
  );
}

function CommandDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <SearchIcon />
        Search commands...
        <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-full max-w-lg">
            <Command
              items={navigationItems}
              variant="dialog"
              onSelect={() => setOpen(false)}
              placeholder="Type a command or search..."
            />
          </div>
        </div>
      )}
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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">CommandItemProps[]</td>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;dialog&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxResults</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">emptyMessage</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;No results found.&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function NestedCommandDemo() {
  const [level, setLevel] = useState<"main" | "settings" | "theme">("main");
  const [result, setResult] = useState("");

  const mainItems: CommandItemProps[] = [
    { value: "settings", label: "Settings", icon: <SettingsIcon /> },
    { value: "profile", label: "Profile", icon: <UserIcon /> },
    { value: "help", label: "Help", icon: <SearchIconSmall /> },
  ];

  const settingsItems: CommandItemProps[] = [
    { value: "theme", label: "Theme", icon: <SunIcon /> },
    { value: "notifications", label: "Notifications", icon: <AlertIcon /> },
    { value: "security", label: "Security", icon: <SettingsIcon /> },
  ];

  const themeItems: CommandItemProps[] = [
    { value: "light", label: "Light", icon: <SunIcon /> },
    { value: "dark", label: "Dark", icon: <MoonIcon /> },
    { value: "system", label: "System", icon: <SettingsIcon /> },
  ];

  const items = level === "main" ? mainItems : level === "settings" ? settingsItems : themeItems;
  const placeholder = level === "main" ? "Search commands..." : level === "settings" ? "Search settings..." : "Choose theme...";

  const handleSelect = (item: CommandItemProps) => {
    if (item.value === "settings") setLevel("settings");
    else if (item.value === "theme") setLevel("theme");
    else {
      setResult(item.value);
      setLevel("main");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {level !== "main" && (
        <button
          type="button"
          onClick={() => setLevel(level === "theme" ? "settings" : "main")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
      )}
      <Command
        items={items}
        onSelect={handleSelect}
        placeholder={placeholder}
      />
      {result && (
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{result}</span>
        </p>
      )}
    </div>
  );
}
