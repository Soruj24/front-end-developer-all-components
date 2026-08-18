"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PanelTop, Home, User, Settings, Bell, Search, FileText } from "lucide-react";

const installCommand = "npx component-library@latest add nav-tabs";

const usageCode = `import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "analytics", label: "Analytics", icon: BarChart },
  { id: "settings", label: "Settings", icon: Settings },
];

export function NavTabs() {
  const [active, setActive] = useState("overview");

  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={clsx(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
            active === tab.id
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}`;

function SimpleTabs() {
  const [active, setActive] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors -mb-px ${
              active === tab.id
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-background p-6 mt-4">
        <p className="text-sm text-muted-foreground">
          Content for <span className="font-medium text-foreground">{active}</span> tab.
        </p>
      </div>
    </div>
  );
}

function PillTabs() {
  const [active, setActive] = useState("all");
  const tabs = [
    { id: "all", label: "All Items" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              active === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-background p-6 mt-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{active}</span> items.
        </p>
      </div>
    </div>
  );
}

function UnderlineTabs() {
  const [active, setActive] = useState("profile");
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-background p-6 mt-4">
        <p className="text-sm text-muted-foreground">
          Managing <span className="font-medium text-foreground">{active}</span> settings.
        </p>
      </div>
    </div>
  );
}

function IconTabs() {
  const [active, setActive] = useState("home");
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex flex-1 flex-col items-center gap-1 px-4 py-3 text-xs font-medium transition-colors -mb-px ${
              active === tab.id
                ? "border-b-2 border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-background p-6 mt-4">
        <p className="text-sm text-muted-foreground">
          Active: <span className="font-medium text-foreground">{active}</span>
        </p>
      </div>
    </div>
  );
}

function BadgeTabs() {
  const [active, setActive] = useState("inbox");
  const tabs = [
    { id: "inbox", label: "Inbox", count: 12 },
    { id: "starred", label: "Starred", count: 3 },
    { id: "sent", label: "Sent", count: 0 },
    { id: "drafts", label: "Drafts", count: 5 },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors -mb-px ${
              active === tab.id
                ? "border-b-2 border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <Badge variant={active === tab.id ? "primary" : "secondary"}>
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-background p-6 mt-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{tabs.find((t) => t.id === active)?.count}</span> items in {active}.
        </p>
      </div>
    </div>
  );
}

function ScrollableTabs() {
  const [active, setActive] = useState("tab-1");
  const tabs = Array.from({ length: 12 }, (_, i) => ({
    id: `tab-${i + 1}`,
    label: `Section ${i + 1}`,
  }));

  return (
    <div className="w-full max-w-md">
      <div className="flex overflow-x-auto scrollbar-thin border-b gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors -mb-px flex-shrink-0 ${
              active === tab.id
                ? "border-b-2 border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-background p-6 mt-4">
        <p className="text-sm text-muted-foreground">
          Viewing <span className="font-medium text-foreground">{active}</span>
        </p>
      </div>
    </div>
  );
}

function VerticalTabs() {
  const [active, setActive] = useState("general");
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
    { id: "files", label: "Files", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              active === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-background p-6 mt-4">
        <p className="text-sm text-muted-foreground">
          Settings for <span className="font-medium text-foreground">{active}</span>.
        </p>
      </div>
    </div>
  );
}

export default function NavTabsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Nav Tabs</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Navigation tabs with animated underline indicator, keyboard support, and responsive overflow. Includes pill, underline, icon, badge, scrollable, and vertical layouts.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Simple Tabs</h3>
          <ComponentPreview id="nav-tabs-simple">
            <SimpleTabs />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Pill Tabs</h3>
          <ComponentPreview id="nav-tabs-pill">
            <PillTabs />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Underline Tabs</h3>
          <ComponentPreview id="nav-tabs-underline">
            <UnderlineTabs />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Icon Tabs</h3>
          <ComponentPreview id="nav-tabs-icon">
            <IconTabs />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Badge Tabs</h3>
          <ComponentPreview id="nav-tabs-badge">
            <BadgeTabs />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Scrollable Tabs</h3>
          <ComponentPreview id="nav-tabs-scrollable">
            <ScrollableTabs />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Vertical Tabs</h3>
          <ComponentPreview id="nav-tabs-vertical">
            <VerticalTabs />
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 text-muted-foreground">{"{ id: string; label: string; icon?: LucideIcon }[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">activeTab</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onTabChange</td>
                <td className="px-4 py-3 text-muted-foreground">{"(id: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"underline\" | \"pill\" | \"icon\" | \"badge\""}</td>
                <td className="px-4 py-3 text-muted-foreground">"underline"</td>
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
