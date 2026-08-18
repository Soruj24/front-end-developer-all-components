"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const sidebarProps = [
  { prop: "items", type: "SidebarItem[]", default: "-", required: "Yes" },
  { prop: "activeItem", type: "string", default: "-", required: "No" },
  { prop: "variant", type: "\"default\" | \"dark\" | \"gradient\" | \"compact\"", default: "\"default\"", required: "No" },
  { prop: "collapsible", type: "boolean", default: "false", required: "No" },
  { prop: "footer", type: "ReactNode", default: "-", required: "No" },
];

const installCommand = `npx component-library@latest add sidebar`;

const usageCode = `import { Sidebar } from "@/components/sidebar";

<Sidebar
  items={sidebarItems}
  activeItem="Dashboard"
  collapsible
/>`;

const frame =
  "flex h-64 w-full overflow-hidden rounded-lg border border-border";
const content =
  "flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950";

export default function SidebarPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [expandedTree, setExpandedTree] = useState<Record<string, boolean>>({ Projects: true, Settings: false });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sidebar</h1>
          <Badge variant="primary">5 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of sidebar patterns — classic dashboards, collapsed icon
          rails, dark admin, nested trees, gradient premium, search and user
          footers, and interactive collapsible navigation.
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
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <h3 className="text-lg font-medium text-foreground">Classic Dashboard</h3>

      <ComponentPreview id="sidebar-classic-dashboard">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className={frame}>
            <div className="flex w-36 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
              <span className="mb-2 px-2 text-[10px] font-bold">CL</span>
              {["⌂", "📊", "📝", "👤"].map((icon, i) => (
                <button key={i} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${i === 0 ? "bg-muted font-medium dark:bg-muted" : "text-muted-foreground/70 hover:bg-black/[.04]"}`}>
                  <span>{icon}</span>
                  <span className="text-[10px]">{["Home", "Analytics", "Posts", "Profile"][i]}</span>
                </button>
              ))}
              <div className="mt-auto border-t border-black/[.08] pt-2 dark:border-white/[.145]">
                <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground/70 hover:bg-black/[.04]">
                  <span>⚙</span>
                  <span className="text-[10px]">Settings</span>
                </button>
              </div>
            </div>
            <div className={content}>Dashboard Content</div>
          </div>

          <div className={frame}>
            <div className="flex w-14 flex-col items-center gap-2 border-r border-black/[.08] bg-muted/40 py-3 dark:border-white/[.145] dark:bg-black">
              <span className="mb-1 text-sm font-bold">C</span>
              {["⌂", "📊", "📝", "👤", "⚙"].map((icon, i) => (
                <button key={i} className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${i === 0 ? "bg-foreground text-background" : "text-muted-foreground/70 hover:bg-black/[.04]"}`}>
                  {icon}
                </button>
              ))}
            </div>
            <div className={content}>Content Area</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="sidebar-dark-admin">
        <div className="flex h-64 w-full overflow-hidden rounded-lg border border-zinc-700">
          <div className="flex w-36 flex-col gap-1 border-r border-zinc-700 bg-zinc-900 p-2">
            <span className="mb-2 px-2 text-[10px] font-bold text-zinc-300">Admin</span>
            {[
              { icon: "⌂", label: "Dashboard" },
              { icon: "👥", label: "Users" },
              { icon: "📊", label: "Analytics" },
              { icon: "⚙", label: "Settings" },
            ].map((item, i) => (
              <button key={item.label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${i === 0 ? "bg-zinc-800 font-medium text-white" : "text-muted-foreground/70 hover:bg-muted"}`}>
                <span>{item.icon}</span>
                <span className="text-[10px]">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center bg-zinc-950 text-[10px] text-muted-foreground">
            Main Content
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="sidebar-nested-tree">
        <div className={frame}>
          <div className="flex w-40 flex-col gap-0.5 overflow-y-auto border-r border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
            <span className="mb-1 px-2 text-[10px] font-bold">Workspace</span>
            <button className="rounded-md px-2 py-1 text-left text-xs text-muted-foreground hover:bg-black/[.04] dark:text-muted-foreground/70">Dashboard</button>
            <div>
              <button
                onClick={() => setExpandedTree({ ...expandedTree, Projects: !expandedTree.Projects })}
                className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-xs text-muted-foreground hover:bg-black/[.04]"
              >
                <span className={`text-[10px] transition-transform ${expandedTree.Projects ? "rotate-90" : ""}`}>▸</span>
                Projects
              </button>
              {expandedTree.Projects && (
                <div className="ml-4 flex flex-col">
                  {["Project A", "Project B"].map((p) => (
                    <button key={p} className="rounded-md px-2 py-0.5 text-left text-[10px] text-muted-foreground/70 hover:bg-black/[.04]">{p}</button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setExpandedTree({ ...expandedTree, Settings: !expandedTree.Settings })}
                className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-xs text-muted-foreground hover:bg-black/[.04]"
              >
                <span className={`text-[10px] transition-transform ${expandedTree.Settings ? "rotate-90" : ""}`}>▸</span>
                Settings
              </button>
            </div>
          </div>
          <div className={content}>Content</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="sidebar-gradient-premium">
        <div className="flex h-64 w-full overflow-hidden rounded-lg">
          <div className="flex w-40 flex-col gap-1 bg-gradient-to-b from-purple-600 to-indigo-700 p-3 text-white">
            <span className="mb-3 text-xs font-bold tracking-wide text-white/80">Premium</span>
            {[
              { icon: "◆", label: "Overview" },
              { icon: "♢", label: "Analytics" },
              { icon: "◇", label: "Reports" },
              { icon: "○", label: "Settings" },
            ].map((item, i) => (
              <button key={item.label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${i === 0 ? "bg-white/20 font-medium" : "text-white/70 hover:bg-white/10"}`}>
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="mt-auto border-t border-white/10 pt-3">
              <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-white/60">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px]">JD</span>
                <span>John Doe</span>
              </div>
            </div>
          </div>
          <div className={content}>Content</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="sidebar-search-user">
        <div className={frame}>
          <div className="flex w-40 flex-col border-r border-black/[.08] bg-muted/40 dark:border-white/[.145] dark:bg-black">
            <div className="border-b border-black/[.08] p-2 dark:border-white/[.145]">
              <div className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[10px] text-muted-foreground/70 dark:bg-zinc-900">
                <span>⌕</span>
                <span>Search...</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-0.5 p-2">
              {["Dashboard", "Analytics", "Settings"].map((item, i) => (
                <button key={item} className={`rounded-md px-2 py-1.5 text-left text-xs ${i === 0 ? "bg-muted font-medium dark:bg-muted" : "text-muted-foreground hover:bg-black/[.04]"}`}>{item}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-black/[.08] p-2 dark:border-white/[.145]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">👤</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium">Alex Rivera</p>
                <p className="truncate text-[8px] text-muted-foreground/70">alex@example.com</p>
              </div>
            </div>
          </div>
          <div className={content}>Content</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="sidebar-collapsible-active">
        <div className="flex h-72 w-full max-w-xs flex-col rounded-xl border border-black/[.08] bg-white text-zinc-900 dark:border-white/[.145] dark:bg-black">
          <div className={`flex items-center justify-between px-3 py-2.5 ${collapsed ? "justify-center" : ""}`}>
            {!collapsed && <span className="text-sm font-bold tracking-tight">Acme</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-xs opacity-60 hover:opacity-100"
            >
              {collapsed ? "→" : "←"}
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2">
            {[
              {
                title: "Main",
                items: [
                  { label: "Dashboard", icon: "⌂", count: 0 },
                  { label: "Analytics", icon: "📊", count: 0 },
                  { label: "Reports", icon: "📋", count: 3 },
                ],
              },
              {
                title: "Content",
                items: [
                  { label: "Posts", icon: "📝", count: 12 },
                  { label: "Media", icon: "🖼", count: 0 },
                  { label: "Pages", icon: "📄", count: 0 },
                ],
              },
              {
                title: "Settings",
                items: [
                  { label: "Profile", icon: "👤", count: 0 },
                  { label: "Security", icon: "🔒", count: 1 },
                  { label: "Billing", icon: "💳", count: 0 },
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                {!collapsed && (
                  <span className="block px-2 pb-0.5 pt-2 text-[10px] font-medium uppercase tracking-wide opacity-50">
                    {section.title}
                  </span>
                )}
                {section.items.map((item) => {
                  const isActive = activeNav === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveNav(item.label)}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all ${
                        isActive
                          ? "bg-muted/80 font-medium dark:bg-muted"
                          : "opacity-60 hover:bg-muted dark:hover:bg-muted"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.count > 0 && (
                            <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-current bg-opacity-20 px-1 text-[10px] font-medium">
                              {item.count}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2 border-t border-black/[.08] px-3 py-2 dark:border-white/[.145]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] text-background">JD</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium">Jane Doe</p>
                <p className="truncate text-[8px] opacity-50">jane@acme.co</p>
              </div>
            </div>
          )}
        </div>
      </ComponentPreview>
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
            {sidebarProps.map((row, i) => (
              <tr key={row.prop} className={i < sidebarProps.length - 1 ? "border-b" : ""}>
                <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                <td className="px-4 py-3">{row.required}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </div>
  );
}
