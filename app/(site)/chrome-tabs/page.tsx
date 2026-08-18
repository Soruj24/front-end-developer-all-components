"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  X,
  Plus,
  GripVertical,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Users,
  Palette,
  Database,
  Terminal,
  FileCode,
  Folder,
  Search,
  GitBranch,
  MoreHorizontal,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

const installCommand = `npx component-library@latest add chrome-tabs`;
const usageCode = `import { ChromeTabs } from "@/components/chrome-tabs";

<ChromeTabs
  tabs={[
    { id: "1", label: "Home", icon: "🏠" },
    { id: "2", label: "Settings", icon: "⚙️" },
  ]}
/>`;

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  closeable?: boolean;
  badge?: string;
  modified?: boolean;
}

const initialTabs: Tab[] = [
  { id: "1", label: "Google", icon: <Globe className="h-3.5 w-3.5" />, closeable: false },
  { id: "2", label: "GitHub", icon: <GitBranch className="h-3.5 w-3.5" /> },
  { id: "3", label: "Stack Overflow", icon: <Database className="h-3.5 w-3.5" /> },
  { id: "4", label: "MDN Web Docs", icon: <FileCode className="h-3.5 w-3.5" /> },
];

function BrowserTabsDemo() {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [active, setActive] = useState("1");
  const [url, setUrl] = useState("https://www.google.com");

  const close = (id: string) => {
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (active === id) setActive(tabs.find((t) => t.id !== id)?.id ?? "");
  };

  const addTab = () => {
    const id = String(Date.now());
    setTabs((prev) => [...prev, { id, label: "New Tab", icon: <Globe className="h-3.5 w-3.5" /> }]);
    setActive(id);
    setUrl("chrome://newtab");
  };

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="flex items-center gap-0 bg-muted/50 px-2 pt-2">
        <div className="flex items-center gap-1 pr-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex flex-1 items-end gap-0.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActive(tab.id); setUrl(`https://${tab.label.toLowerCase().replace(/\s/g, "")}.com`); }}
              className={`group flex items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2 text-xs transition-all ${
                active === tab.id
                  ? "border-black/[.08] bg-card text-foreground relative z-10 dark:border-white/[.145]"
                  : "border-transparent text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.icon}
              <span className="max-w-[100px] truncate font-medium">{tab.label}</span>
              {tab.modified && <div className="h-1.5 w-1.5 rounded-full bg-foreground/50" />}
              {tab.closeable !== false && (
                <X
                  className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  onClick={(e) => { e.stopPropagation(); close(tab.id); }}
                />
              )}
            </button>
          ))}
          <button onClick={addTab} className="mb-1 rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 border-b border-black/[.06] bg-card px-3 py-2 dark:border-white/[.08]">
        <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1.5 flex-1">
          <Lock className="h-3 w-3 text-muted-foreground" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Search or enter URL"
          />
          <Search className="h-3 w-3 text-muted-foreground" />
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="flex h-48 items-center justify-center bg-background p-6">
        <p className="text-sm text-muted-foreground">Content for: {tabs.find((t) => t.id === active)?.label}</p>
      </div>
    </div>
  );
}

function VerticalTabsDemo() {
  const [active, setActive] = useState("general");
  const sections = [
    { id: "general", label: "General", icon: <Settings className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
    { id: "team", label: "Team", icon: <Users className="h-4 w-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="h-4 w-4" /> },
  ];

  return (
    <div className="flex rounded-xl border border-black/[.08] overflow-hidden w-full max-w-lg dark:border-white/[.145]">
      <div className="flex w-44 flex-col border-r border-black/[.06] bg-muted/30 dark:border-white/[.08]">
        <div className="border-b border-black/[.06] px-3 py-2.5 dark:border-white/[.08]">
          <span className="text-xs font-semibold">Settings</span>
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex items-center gap-2.5 px-3 py-2.5 text-left text-xs font-medium transition-colors ${
              active === s.id
                ? "bg-background text-foreground border-r-2 border-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-card p-5">
        <h3 className="text-sm font-semibold">{sections.find((s) => s.id === active)?.label}</h3>
        <p className="mt-1 text-xs text-muted-foreground">Configure your {active.toLowerCase()} preferences here.</p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-black/[.06] p-3 dark:border-white/[.08]">
            <div>
              <p className="text-xs font-medium">Email notifications</p>
              <p className="text-[10px] text-muted-foreground">Receive email updates</p>
            </div>
            <div className="h-5 w-9 rounded-full bg-foreground p-0.5">
              <div className="h-4 w-4 rounded-full bg-background transition-transform translate-x-4" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-black/[.06] p-3 dark:border-white/[.08]">
            <div>
              <p className="text-xs font-medium">Two-factor auth</p>
              <p className="text-[10px] text-muted-foreground">Add extra security</p>
            </div>
            <div className="h-5 w-9 rounded-full bg-muted p-0.5">
              <div className="h-4 w-4 rounded-full bg-background transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PillTabsDemo() {
  const [active, setActive] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-1 rounded-full bg-muted p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              active === t.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-black/[.08] bg-card p-4 dark:border-white/[.145]">
        <p className="text-sm font-medium">{tabs.find((t) => t.id === active)?.label} Content</p>
        <p className="mt-1 text-xs text-muted-foreground">Viewing {active.toLowerCase()} data and metrics.</p>
      </div>
    </div>
  );
}

function EditorTabsDemo() {
  const [active, setActive] = useState("page.tsx");
  const files = [
    { id: "page.tsx", name: "page.tsx", icon: <FileCode className="h-3.5 w-3.5 text-blue-500" />, modified: false },
    { id: "layout.tsx", name: "layout.tsx", icon: <FileCode className="h-3.5 w-3.5 text-purple-500" />, modified: true },
    { id: "globals.css", name: "globals.css", icon: <Palette className="h-3.5 w-3.5 text-pink-500" />, modified: false },
    { id: "components.tsx", name: "components.tsx", icon: <FileCode className="h-3.5 w-3.5 text-green-500" />, modified: true },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="flex items-center gap-0 border-b border-black/[.06] bg-zinc-900 dark:border-white/[.1]">
        <div className="flex items-center gap-1 px-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex flex-1 items-end overflow-x-auto">
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => setActive(file.id)}
              className={`group flex items-center gap-1.5 border-r border-white/[.06] px-3 py-2 text-[11px] transition-colors ${
                active === file.id
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
            >
              {file.icon}
              <span className="font-mono">{file.name}</span>
              {file.modified && <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />}
              <X className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
      <div className="bg-zinc-900 p-4 font-mono text-xs text-zinc-300">
        <div className="space-y-1">
          <p><span className="text-purple-400">import</span> {'{'} <span className="text-green-300">useState</span> {'}'} <span className="text-purple-400">from</span> <span className="text-amber-300">"react"</span>;</p>
          <p><span className="text-purple-400">import</span> {'{'} <span className="text-green-300">Badge</span> {'}'} <span className="text-purple-400">from</span> <span className="text-amber-300">"@/components/Badge"</span>;</p>
          <p>&nbsp;</p>
          <p><span className="text-purple-400">export default function</span> <span className="text-blue-300">Page</span>() {'{'}</p>
          <p>&nbsp;&nbsp;<span className="text-purple-400">return</span> (</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">div</span>&gt;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">h1</span>&gt;Hello World&lt;/<span className="text-blue-300">h1</span>&gt;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-300">div</span>&gt;</p>
          <p>&nbsp;&nbsp;);</p>
          <p>{'}'}</p>
        </div>
      </div>
    </div>
  );
}

function TerminalTabsDemo() {
  const [active, setActive] = useState("bash-1");
  const [sessions, setSessions] = useState([
    { id: "bash-1", name: "bash", pid: "12345" },
    { id: "node-1", name: "node", pid: "12346" },
    { id: "ssh-1", name: "ssh", pid: "12347" },
  ]);

  const closeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (active === id) setActive(sessions.find((s) => s.id !== id)?.id ?? "");
  };

  const addSession = () => {
    const id = `bash-${Date.now()}`;
    setSessions((prev) => [...prev, { id, name: "bash", pid: String(Math.floor(Math.random() * 90000) + 10000) }]);
    setActive(id);
  };

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="flex items-center gap-0 border-b border-black/[.06] bg-zinc-900 dark:border-white/[.1]">
        <div className="flex items-center gap-1 px-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex flex-1 items-end overflow-x-auto">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`group flex items-center gap-1.5 border-r border-white/[.06] px-3 py-2 text-[11px] transition-colors ${
                active === s.id
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
            >
              <Terminal className="h-3 w-3" />
              <span className="font-mono">{s.name}</span>
              <span className="text-[9px] text-zinc-500">#{s.pid}</span>
              <X
                className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => { e.stopPropagation(); closeSession(s.id); }}
              />
            </button>
          ))}
          <button onClick={addSession} className="px-2 py-2 text-zinc-400 hover:text-white transition-colors">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="bg-zinc-950 p-4 font-mono text-xs text-green-400">
        <div className="space-y-1">
          <p><span className="text-zinc-500">~</span> $ npm run build</p>
          <p className="text-zinc-400">Creating an optimized production build...</p>
          <p className="text-zinc-400">Compiled successfully.</p>
          <p className="mt-2"><span className="text-zinc-500">~</span> $ <span className="animate-pulse">_</span></p>
        </div>
      </div>
    </div>
  );
}

function UnderlineTabsDemo() {
  const [active, setActive] = useState("code");
  const tabs = [
    { id: "code", label: "Code", icon: <FileCode className="h-3.5 w-3.5" /> },
    { id: "issues", label: "Issues", icon: <Shield className="h-3.5 w-3.5" />, badge: "12" },
    { id: "pull-requests", label: "Pull Requests", icon: <GitBranch className="h-3.5 w-3.5" />, badge: "3" },
    { id: "actions", label: "Actions", icon: <Terminal className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center gap-0 border-b border-black/[.06] dark:border-white/[.08]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
              active === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge && (
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {tab.badge}
              </span>
            )}
            {active === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </div>
      <div className="p-4">
        <p className="text-sm font-medium">{tabs.find((t) => t.id === active)?.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">Viewing {active.toLowerCase()} content.</p>
      </div>
    </div>
  );
}

function SettingsTabsDemo() {
  const [active, setActive] = useState("profile");
  const sections = [
    { id: "profile", label: "Profile", desc: "Your personal information" },
    { id: "account", label: "Account", desc: "Security and password" },
    { id: "appearance", label: "Appearance", desc: "Theme and display" },
    { id: "notifications", label: "Notifications", desc: "Email and push alerts" },
    { id: "billing", label: "Billing", desc: "Plans and payment" },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="border-b border-black/[.06] px-5 py-4 dark:border-white/[.1]">
        <h3 className="text-sm font-semibold">Settings</h3>
        <p className="text-xs text-muted-foreground">Manage your account settings</p>
      </div>
      <div className="flex border-b border-black/[.06] dark:border-white/[.1]">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`relative px-4 py-3 text-xs font-medium transition-colors ${
              active === s.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
            {active === s.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </div>
      <div className="p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <button className="ml-auto rounded-lg border border-black/[.08] px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors dark:border-white/[.145]">
              Edit
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-black/[.06] p-3 dark:border-white/[.08]">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Password</p>
                  <p className="text-[10px] text-muted-foreground">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Change</button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-black/[.06] p-3 dark:border-white/[.08]">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">Two-factor auth</p>
                  <p className="text-[10px] text-muted-foreground">Add extra security</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-emerald-600">Enabled</span>
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChromeTabsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Chrome Tabs
          </h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Browser-style tab interface with close buttons, add tab, vertical variant, and pill-style
          tab navigation.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Browser Tabs</h3>
          <p className="text-sm text-muted-foreground">
            Chrome-style tabs with favicons, close buttons, URL bar, and traffic lights.
          </p>
          <ComponentPreview id="chrome-browser">
            <BrowserTabsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Vertical Tabs</h3>
          <p className="text-sm text-muted-foreground">
            Sidebar navigation with icons, active indicator, and settings panel.
          </p>
          <ComponentPreview id="chrome-vertical">
            <VerticalTabsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pill Tabs</h3>
          <p className="text-sm text-muted-foreground">
            Rounded pill-style selector with smooth transitions.
          </p>
          <ComponentPreview id="chrome-pill">
            <PillTabsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Editor Tabs</h3>
          <p className="text-sm text-muted-foreground">
            Code editor with file tabs, syntax highlighting, and modified indicators.
          </p>
          <ComponentPreview id="chrome-editor">
            <EditorTabsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Terminal Tabs</h3>
          <p className="text-sm text-muted-foreground">
            Multiple terminal sessions with PID labels and command output.
          </p>
          <ComponentPreview id="chrome-terminal">
            <TerminalTabsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Underline Tabs</h3>
          <p className="text-sm text-muted-foreground">
            Simple underline indicator with badges and icons.
          </p>
          <ComponentPreview id="chrome-underline">
            <UnderlineTabsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Settings Tabs</h3>
          <p className="text-sm text-muted-foreground">
            Settings page with horizontal tabs and content panel.
          </p>
          <ComponentPreview id="chrome-settings">
            <SettingsTabsDemo />
          </ComponentPreview>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">tabs</td>
                <td className="px-4 py-3 text-muted-foreground">Tab[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">activeTab</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onTabChange</td>
                <td className="px-4 py-3 text-muted-foreground">{"(id: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"browser\" | \"pill\" | \"underline\" | \"vertical\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"browser\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
