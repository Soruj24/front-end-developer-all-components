import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutSidebarMain: RegistryEntry = entry({
    id: "layout-sidebar-main",
    title: "Sidebar + Main & Left Nav",
    description: "Icon rail and labelled navigation list beside content.",
    source: `"use client";

import {
  BarChart3Icon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const railIcons = [
  { key: "home", Icon: HomeIcon },
  { key: "stats", Icon: BarChart3Icon },
  { key: "settings", Icon: SettingsIcon },
];

const railButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

const zone =
  "flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10";

export default function LayoutSidebarMain() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
        <div className="flex w-14 flex-col items-center gap-1 border-r border-border bg-muted/40 p-2">
          {railIcons.map(({ key, Icon }, i) => (
            <button
              key={key}
              type="button"
              aria-label={key}
              aria-current={i === 0 ? "page" : undefined}
              className={\`\${railButton} \${i === 0 ? "bg-primary-soft text-primary" : ""}\`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
          <button type="button" aria-label="Account" className={\`\${railButton} mt-auto\`}>
            <UserIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <div className={zone}>Main Content</div>
      </div>
      <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
        <div className="flex w-24 flex-col gap-1 border-r border-border bg-muted/40 p-2">
          <span className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Menu
          </span>
          {["Dashboard", "Analytics", "Reports", "Settings"].map((item, i) => (
            <button
              key={item}
              type="button"
              aria-current={i === 0 ? "page" : undefined}
              className={\`rounded-md px-2 py-1 text-left text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 \${
                i === 0
                  ? "bg-primary-soft font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }\`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className={zone}>Content</div>
      </div>
    </div>
  );
}`,
  });
