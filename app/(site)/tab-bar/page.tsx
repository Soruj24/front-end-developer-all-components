"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Home,
  Search,
  PlusCircle,
  User,
  Bell,
  MessageSquare,
  Settings,
  ShoppingCart,
  Heart,
  Grid3X3,
} from "lucide-react";

const installCommand = `npx component-library@latest add tab-bar`;

const usageCode = `import { useState } from "react";
import { Home, Search, User } from "lucide-react";

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex items-center border-t bg-background">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={\`flex flex-1 flex-col items-center gap-1 py-2 text-xs \${
            active === tab.id ? "text-primary" : "text-muted-foreground"
          }\`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}`;

type Tab = { id: string; icon: React.ReactNode; label: string; badge?: number };

const defaultTabs: Tab[] = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
  { id: "search", icon: <Search className="h-5 w-5" />, label: "Search" },
  { id: "add", icon: <PlusCircle className="h-5 w-5" />, label: "Post" },
  { id: "notifications", icon: <Bell className="h-5 w-5" />, label: "Alerts", badge: 3 },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "Profile" },
];

function TabBarDemo({
  tabs,
  variant = "default",
}: {
  tabs: Tab[];
  variant?: string;
}) {
  const [active, setActive] = useState(tabs[0].id);

  const isFilled = variant === "filled";
  const isPill = variant === "pill";
  const isMinimal = variant === "minimal";

  return (
    <div className="w-full max-w-sm">
      <div
        className={`flex items-center border-t border-border ${
          isFilled ? "bg-muted" : "bg-background"
        } ${isPill ? "gap-1 p-1" : ""}`}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex flex-1 flex-col items-center gap-1 ${
                isPill
                  ? `rounded-xl py-2 text-xs ${isActive ? "bg-background shadow-sm font-medium text-foreground" : "text-muted-foreground"}`
                  : `${isMinimal ? "py-3" : "py-2.5"} text-xs ${
                      isActive
                        ? isFilled
                          ? "text-foreground font-medium"
                          : "text-foreground"
                        : "text-muted-foreground"
                    }`
              } transition-colors`}
            >
              <span className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -right-1.5 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
              </span>
              <span>{tab.label}</span>
              {isActive && !isPill && !isMinimal && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function IconOnlyTabBar() {
  const [active, setActive] = useState("home");
  const tabs = defaultTabs;

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center border-t border-border bg-background">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex flex-1 items-center justify-center py-3 transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -right-1 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-0.5 text-[9px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
              </span>
              {isActive && (
                <span className="absolute top-0 h-0.5 w-6 rounded-full bg-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FloatingTabBar() {
  const [active, setActive] = useState("home");
  const tabs = defaultTabs;

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-around rounded-2xl border border-border bg-background px-2 py-1 shadow-lg">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-[10px] transition-all ${
                isActive
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="relative">
                {tab.icon}
                {tab.badge && !isActive && (
                  <span className="absolute -right-1 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-0.5 text-[9px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TabBarPage() {
  const shopTabs: Tab[] = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: "Shop" },
    { id: "search", icon: <Search className="h-5 w-5" />, label: "Browse" },
    { id: "cart", icon: <ShoppingCart className="h-5 w-5" />, label: "Cart", badge: 2 },
    { id: "wishlist", icon: <Heart className="h-5 w-5" />, label: "Saved" },
    { id: "profile", icon: <User className="h-5 w-5" />, label: "Account" },
  ];

  const socialTabs: Tab[] = [
    { id: "feed", icon: <Home className="h-5 w-5" />, label: "Feed" },
    { id: "explore", icon: <Grid3X3 className="h-5 w-5" />, label: "Explore" },
    { id: "messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages", badge: 12 },
    { id: "notifications", icon: <Bell className="h-5 w-5" />, label: "Activity" },
    { id: "profile", icon: <User className="h-5 w-5" />, label: "You" },
  ];

  const minimalTabs: Tab[] = [
    { id: "all", icon: <Grid3X3 className="h-5 w-5" />, label: "All" },
    { id: "active", icon: <Settings className="h-5 w-5" />, label: "Active" },
    { id: "archived", icon: <User className="h-5 w-5" />, label: "Archived" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tab Bar</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Mobile bottom navigation bar with icon tabs, badges, and active indicators. Supports filled, pill, floating, and minimal variants.
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
          <p className="mt-1 text-sm text-muted-foreground">Standard tab bar with icons, labels, and active indicator.</p>
        </div>
        <ComponentPreview id="tab-bar-default">
          <TabBarDemo tabs={defaultTabs} variant="default" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Filled</h2>
          <p className="mt-1 text-sm text-muted-foreground">Active tab highlighted with filled background.</p>
        </div>
        <ComponentPreview id="tab-bar-filled">
          <TabBarDemo tabs={defaultTabs} variant="filled" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Pill</h2>
          <p className="mt-1 text-sm text-muted-foreground">Active tab shown as a pill shape with background.</p>
        </div>
        <ComponentPreview id="tab-bar-pill">
          <TabBarDemo tabs={socialTabs} variant="pill" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Minimal</h2>
          <p className="mt-1 text-sm text-muted-foreground">Minimal tab bar without top border.</p>
        </div>
        <ComponentPreview id="tab-bar-minimal">
          <TabBarDemo tabs={minimalTabs} variant="minimal" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon Only</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tab bar with icons only, no labels.</p>
        </div>
        <ComponentPreview id="tab-bar-icon-only">
          <IconOnlyTabBar />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Floating</h2>
          <p className="mt-1 text-sm text-muted-foreground">Floating tab bar with rounded corners and shadow.</p>
        </div>
        <ComponentPreview id="tab-bar-floating">
          <FloatingTabBar />
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
                <td className="px-4 py-3 font-mono text-xs">tabs</td>
                <td className="px-4 py-3 text-muted-foreground">Tab[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">active</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{`(id: string) => void`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default" | "filled" | "pill" | "minimal"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
