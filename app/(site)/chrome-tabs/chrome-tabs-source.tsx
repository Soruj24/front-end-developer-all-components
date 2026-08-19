import { useState } from "react";
import {
  X,
  Plus,
  Globe,
  GitBranch,
  Database,
  FileCode,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Users,
  Palette,
  Terminal,
  Search,
  Lock,
  MoreHorizontal,
  Check,
  Eye,
} from "lucide-react";

export const CHROME_TABS_SOURCE = `"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ChromeTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  closeable?: boolean;
  modified?: boolean;
}

interface ChromeTabsProps {
  tabs: ChromeTab[];
  activeId?: string;
  onClose?: (id: string) => void;
  onAdd?: () => void;
  renderContent?: (tab: ChromeTab) => React.ReactNode;
}

export function ChromeTabs({
  tabs,
  activeId,
  onClose,
  onAdd,
  renderContent,
}: ChromeTabsProps) {
  const [internalActive, setInternalActive] = useState(activeId ?? tabs[0]?.id ?? "");
  const active = activeId ?? internalActive;
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-end gap-0.5 bg-muted/50 px-2 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setInternalActive(tab.id)}
            className={cn(
              "group flex items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2 text-xs transition-all",
              tab.id === active
                ? "relative z-10 border-border bg-card text-foreground"
                : "border-transparent text-muted-foreground hover:bg-muted"
            )}
          >
            {tab.icon}
            <span className="max-w-24 truncate font-medium">{tab.label}</span>
            {tab.modified && <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />}
            {tab.closeable !== false && onClose && (
              <X
                className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
              />
            )}
          </button>
        ))}
        {onAdd && (
          <button onClick={onAdd} className="mb-1 rounded-md p-1.5 text-muted-foreground hover:bg-muted">
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="border-t p-4">
        {renderContent?.(activeTab!) ?? (
          <p className="text-sm text-muted-foreground">{activeTab?.label} content</p>
        )}
      </div>
    </div>
  );
}`;

export const BROWSER_EXAMPLE = `<ChromeTabs
  tabs={[
    { id: "1", label: "Google", icon: <Globe className="h-3.5 w-3.5" />, closeable: false },
    { id: "2", label: "GitHub", icon: <GitBranch className="h-3.5 w-3.5" /> },
    { id: "3", label: "Stack Overflow", icon: <Database className="h-3.5 w-3.5" /> },
    { id: "4", label: "MDN Web Docs", icon: <FileCode className="h-3.5 w-3.5" /> },
  ]}
/>`;

export const VERTICAL_EXAMPLE = `<ChromeTabs
  variant="vertical"
  tabs={[
    { id: "general", label: "General", icon: <Settings className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
  ]}
/>`;

export const PILL_EXAMPLE = `<ChromeTabs variant="pill" tabs={[
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
]} />`;

export const EDITOR_EXAMPLE = `<ChromeTabs
  variant="editor"
  tabs={[
    { id: "page.tsx", label: "page.tsx", modified: true },
    { id: "layout.tsx", label: "layout.tsx" },
    { id: "globals.css", label: "globals.css" },
  ]}
/>`;

export const TERMINAL_EXAMPLE = `<ChromeTabs variant="terminal" tabs={[
  { id: "bash-1", label: "bash" },
  { id: "node-1", label: "node" },
  { id: "ssh-1", label: "ssh" },
]} />`;

export const UNDERLINE_EXAMPLE = `<ChromeTabs
  variant="underline"
  tabs={[
    { id: "code", label: "Code", icon: <FileCode className="h-3.5 w-3.5" /> },
    { id: "issues", label: "Issues", badge: "12" },
    { id: "pull-requests", label: "Pull Requests", badge: "3" },
  ]}
/>`;

export const SETTINGS_EXAMPLE = `<ChromeTabs
  variant="underline"
  tabs={[
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "billing", label: "Billing" },
  ]}
/>`;

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  closeable?: boolean;
  badge?: string;
  modified?: boolean;
}

export const initialTabs: Tab[] = [
  { id: "1", label: "Google", icon: <Globe className="h-3.5 w-3.5" />, closeable: false },
  { id: "2", label: "GitHub", icon: <GitBranch className="h-3.5 w-3.5" /> },
  { id: "3", label: "Stack Overflow", icon: <Database className="h-3.5 w-3.5" /> },
  { id: "4", label: "MDN Web Docs", icon: <FileCode className="h-3.5 w-3.5" /> },
];

export function BrowserTabsDemo() {
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

export function VerticalTabsDemo() {
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

export function PillTabsDemo() {
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

export function EditorTabsDemo() {
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

export function TerminalTabsDemo() {
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

export function UnderlineTabsDemo() {
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

export function SettingsTabsDemo() {
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
