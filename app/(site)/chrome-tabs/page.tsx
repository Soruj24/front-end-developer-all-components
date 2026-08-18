"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { X, Plus, GripVertical } from "lucide-react";

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
  icon?: string;
  closeable?: boolean;
}

const initialTabs: Tab[] = [
  { id: "1", label: "Home", icon: "🏠", closeable: false },
  { id: "2", label: "Dashboard", icon: "📊" },
  { id: "3", label: "Settings", icon: "⚙️" },
  { id: "4", label: "Profile", icon: "👤" },
];

function ChromeTabsDemo() {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [active, setActive] = useState("1");

  const close = (id: string) => {
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (active === id) setActive(tabs[0]?.id ?? "");
  };

  const addTab = () => {
    const id = String(Date.now());
    setTabs((prev) => [...prev, { id, label: "New Tab", icon: "📄" }]);
    setActive(id);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-0 rounded-t-lg bg-muted/30 border border-b-0 px-2 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`group flex items-center gap-2 rounded-t-lg border border-b-0 px-4 py-2 text-sm transition-all ${
              active === tab.id
                ? "border-border bg-card text-foreground relative z-10"
                : "border-transparent text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="max-w-[100px] truncate">{tab.label}</span>
            {tab.closeable !== false && (
              <X
                className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => { e.stopPropagation(); close(tab.id); }}
              />
            )}
          </button>
        ))}
        <button onClick={addTab} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="rounded-b-lg rounded-tr-lg border bg-card p-6">
        <p className="text-sm text-muted-foreground">Content for: {tabs.find((t) => t.id === active)?.label}</p>
      </div>
    </div>
  );
}

function VerticalTabsDemo() {
  const [active, setActive] = useState("general");
  const sections = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "billing", label: "Billing", icon: "💳" },
  ];

  return (
    <div className="flex gap-0 rounded-lg border overflow-hidden w-full max-w-md">
      <div className="flex flex-col border-r bg-muted/30 w-40">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-left transition-colors ${
              active === s.id ? "bg-card text-foreground border-r-2 border-primary" : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-card p-4">
        <p className="text-sm font-medium">{sections.find((s) => s.id === active)?.label} Settings</p>
        <p className="mt-1 text-xs text-muted-foreground">Configure your {active} preferences here.</p>
      </div>
    </div>
  );
}

function PillTabsDemo() {
  const [active, setActive] = useState("overview");
  const tabs = ["overview", "analytics", "reports", "settings"];
  return (
    <div className="flex gap-1 rounded-full bg-muted p-1 w-fit">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors capitalize ${
            active === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default function ChromeTabsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Chrome Tabs</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Browser-style tab interface with close buttons, add tab, vertical variant, and pill-style tab navigation.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Browser Tabs</h2>
        <ComponentPreview>
          <ChromeTabsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Tabs</h2>
        <ComponentPreview>
          <VerticalTabsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Pill Tabs</h2>
        <ComponentPreview>
          <PillTabsDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">tabs</td><td className="px-4 py-3 text-muted-foreground">Tab[]</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">activeTab</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onTabChange</td><td className="px-4 py-3 text-muted-foreground">(id: string) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
