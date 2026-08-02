import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sidebarCollapsibleActive: RegistryEntry = entry({
    id: "sidebar-collapsible-active",
    title: "Collapsible & Active",
    description: "An interactive sidebar that collapses, tracks active items, and shows badges.",
    source: `import { useState } from "react";

const sectionData = [
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
];

export default function SidebarCollapsibleActive() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex h-72 w-full max-w-xs flex-col rounded-xl border border-black/[.08] bg-white text-zinc-900 dark:border-white/[.145] dark:bg-black">
      <div className={\`flex items-center justify-between px-3 py-2.5 \${collapsed ? "justify-center" : ""}\`}>
        {!collapsed && <span className="text-sm font-bold tracking-tight">Acme</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-6 w-6 items-center justify-center rounded-md text-xs opacity-60 hover:opacity-100"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2">
        {sectionData.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <span className="block px-2 pb-0.5 pt-2 text-[10px] font-medium uppercase tracking-wide opacity-50">
                {section.title}
              </span>
            )}
            {section.items.map((item) => {
              const isActive = active === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className={\`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all \${
                    isActive
                      ? "bg-zinc-200/80 font-medium dark:bg-zinc-800"
                      : "opacity-60 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  } \${collapsed ? "justify-center" : ""}\`}
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
  );
}`,
  });
