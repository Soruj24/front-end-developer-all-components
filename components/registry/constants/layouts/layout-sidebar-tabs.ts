import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutSidebarTabs: RegistryEntry = entry({
    id: "layout-sidebar-tabs",
    title: "Sidebar Tabs",
    description: "Sidebar whose sections switch via tabs.",
    source: `"use client";

import { useState } from "react";
import {
  ClockIcon,
  FileTextIcon,
  HomeIcon,
  Settings2Icon,
  UsersIcon,
} from "lucide-react";

const tabItems = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "history", label: "History", Icon: ClockIcon },
  { key: "docs", label: "Docs", Icon: FileTextIcon },
  { key: "team", label: "Team", Icon: UsersIcon },
  { key: "settings", label: "Settings", Icon: Settings2Icon },
];

export default function LayoutSidebarTabs() {
  const [active, setActive] = useState("home");
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex w-28 shrink-0 flex-col gap-1 border-r border-border bg-muted/40 p-2">
        {tabItems.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            aria-current={active === key ? "page" : undefined}
            className={\`flex items-center gap-1.5 rounded-md px-2 py-1 text-left text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 \${
              active === key
                ? "bg-primary-soft font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }\`}
          >
            <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-1 items-start justify-start p-3">
        <div className="w-full max-w-56 rounded-lg border border-border bg-card p-2 shadow-xs">
          <p className="truncate text-[11px] font-medium capitalize">{active}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Panel content for the selected tab.
          </p>
        </div>
      </div>
    </div>
  );
}`,
  });
