"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Search,
  Home,
  Settings,
  User,
  FileText,
  LayoutDashboard,
  Bell,
  Mail,
  Calendar,
  ChevronRight,
  Command,
  ArrowRight,
  Star,
} from "lucide-react";

const installCommand = `npx component-library@latest add quick-nav`;

const usageCode = `import { useState } from "react";
import { Search, Home, Settings, User } from "lucide-react";

function QuickNav({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search commands..." className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <div className="p-2">
          <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Navigation</p>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted">
            <Home className="h-4 w-4" /> Home
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted">
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>
      </div>
    </div>
  );
}`;

type NavItem = { icon: React.ReactNode; label: string; shortcut?: string; section: string };

const navItems: NavItem[] = [
  { icon: <Home className="h-4 w-4" />, label: "Home", shortcut: "⌘H", section: "Navigation" },
  { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard", shortcut: "⌘D", section: "Navigation" },
  { icon: <FileText className="h-4 w-4" />, label: "Documents", shortcut: "⌘F", section: "Navigation" },
  { icon: <User className="h-4 w-4" />, label: "Profile", shortcut: "⌘U", section: "Account" },
  { icon: <Settings className="h-4 w-4" />, label: "Settings", shortcut: "⌘,", section: "Account" },
  { icon: <Bell className="h-4 w-4" />, label: "Notifications", shortcut: "⌘N", section: "Account" },
  { icon: <Mail className="h-4 w-4" />, label: "Messages", shortcut: "⌘M", section: "Account" },
  { icon: <Calendar className="h-4 w-4" />, label: "Calendar", shortcut: "⌘K", section: "Tools" },
  { icon: <Star className="h-4 w-4" />, label: "Favorites", section: "Tools" },
];

function QuickNavPopup({
  open,
  onClose,
  variant = "default",
}: {
  open: boolean;
  onClose: () => void;
  variant?: string;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  if (!open) return null;

  const filtered = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<string, NavItem[]>
  );

  const isCompact = variant === "compact";
  const isGrouped = variant === "grouped" || variant === "default";

  return (
    <div className="relative w-full max-w-md rounded-xl border border-border bg-background shadow-2xl">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          placeholder="Search commands..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="pointer-events-none hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
          ESC
        </kbd>
      </div>
      <div className="max-h-72 overflow-y-auto p-2">
        {isGrouped ? (
          Object.entries(grouped).map(([section, items]) => (
            <div key={section}>
              <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">{section}</p>
              {items.map((item, i) => (
                <button
                  key={item.label}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 ${isCompact ? "py-1.5" : "py-2"} text-sm transition-colors ${
                    filtered.indexOf(item) === selected
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                  )}
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                </button>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-0.5">
            {filtered.map((item, i) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  i === selected ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && (
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            ))}
          </div>
        )}
        {filtered.length === 0 && (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">No results found.</p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">↑↓</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">↵</kbd> Select</span>
        </div>
        <Command className="h-3 w-3" />
      </div>
    </div>
  );
}

export default function QuickNavPage() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Quick Nav</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A keyboard-driven command palette for快速 navigation. Search commands, jump to pages, and execute actions without leaving the keyboard.
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

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Standard command palette with grouped sections.</p>
        </div>
        <ComponentPreview id="quick-nav-default">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setOpen1(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Search commands...</span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
            </button>
            <QuickNavPopup open={open1} onClose={() => setOpen1(false)} variant="default" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Compact</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tighter spacing for smaller popovers.</p>
        </div>
        <ComponentPreview id="quick-nav-compact">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setOpen2(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Quick search...</span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
            </button>
            <QuickNavPopup open={open2} onClose={() => setOpen2(false)} variant="compact" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Flat List</h2>
          <p className="mt-1 text-sm text-muted-foreground">All items in a single list without sections.</p>
        </div>
        <ComponentPreview id="quick-nav-flat">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setOpen3(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Jump to...</span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘J</kbd>
            </button>
            <QuickNavPopup open={open3} onClose={() => setOpen3(false)} variant="flat" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Command palette with action shortcuts at the bottom.</p>
        </div>
        <ComponentPreview id="quick-nav-actions">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setOpen4(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted"
            >
              <Command className="h-4 w-4" />
              <span className="flex-1 text-left">Type a command...</span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘/</kbd>
            </button>
            {open4 && (
              <div className="relative w-full max-w-md rounded-xl border border-border bg-background shadow-2xl">
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Command className="h-4 w-4 text-muted-foreground" />
                  <input autoFocus placeholder="Type a command..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Recent</p>
                  {[
                    { icon: <Home className="h-4 w-4" />, label: "Go to Home" },
                    { icon: <FileText className="h-4 w-4" />, label: "Open Documents" },
                    { icon: <Settings className="h-4 w-4" />, label: "Edit Settings" },
                  ].map((item) => (
                    <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                      {item.icon}
                      <span className="flex-1 text-left">{item.label}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                    </button>
                  ))}
                  <div className="my-1 h-px bg-border" />
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Actions</p>
                  {[
                    { icon: <Mail className="h-4 w-4" />, label: "Compose Message" },
                    { icon: <Calendar className="h-4 w-4" />, label: "New Event" },
                  ].map((item) => (
                    <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                      {item.icon}
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                  <button onClick={() => setOpen4(false)} className="hover:text-foreground">Close</button>
                </div>
              </div>
            )}
          </div>
        </ComponentPreview>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">open</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClose</td>
                <td className="px-4 py-3 text-muted-foreground">{`() => void`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">NavItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default" | "compact" | "flat"`}</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Search commands...&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
