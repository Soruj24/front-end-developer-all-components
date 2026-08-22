import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutStackedSidebar: RegistryEntry = entry({
    id: "layout-stacked-sidebar",
    title: "Stacked Sidebar",
    description: "Top bar stacked above an icon rail and content.",
    source: `import {
  BarChart3Icon,
  BellIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

const railIcons = [
  { key: "home", Icon: HomeIcon },
  { key: "stats", Icon: BarChart3Icon },
  { key: "settings", Icon: SettingsIcon },
];

const railButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export default function LayoutStackedSidebar() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex h-9 shrink-0 w-full items-center justify-between border-b border-border bg-background px-3">
        <span className="text-xs font-semibold tracking-tight">Top Bar</span>
        <span className="flex items-center gap-1">
          <button type="button" aria-label="Search" className={railButton}>
            <SearchIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Notifications" className={railButton}>
            <BellIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </span>
      </div>
      <div className="flex flex-1">
        <div className="flex w-12 flex-col items-center gap-1 border-r border-border bg-muted/40 p-2">
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
        </div>
        <div className="flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10">
          Content
        </div>
      </div>
    </div>
  );
}`,
  });
