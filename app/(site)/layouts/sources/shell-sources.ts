/** Verbatim pattern sources (Code Viewer). */
export const SIDEBAR_MAIN_SOURCE = `"use client";

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

/** Icon rail beside a main content area. */
export function SidebarMainDemo() {
  return (
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
  );
}`;

export const HOLY_GRAIL_SOURCE = `import { ArrowRightIcon } from "lucide-react";

const zone =
  "flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10";

/** Header, flanking sidebars, main column and footer. */
export function HolyGrailDemo() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex h-8 shrink-0 items-center border-b border-border bg-background px-3 text-xs font-semibold tracking-tight">
        Header
      </div>
      <div className="flex flex-1">
        <div className="w-16 shrink-0 border-r border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          Left
        </div>
        <div className={zone}>Main</div>
        <div className="w-16 shrink-0 border-l border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          Right
        </div>
      </div>
      <div className="flex h-7 shrink-0 items-center border-t border-border bg-background px-3 text-[10px] text-muted-foreground/70">
        Footer
      </div>
    </div>
  );
}`;
