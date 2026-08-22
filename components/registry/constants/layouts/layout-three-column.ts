import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutThreeColumn: RegistryEntry = entry({
    id: "layout-three-column",
    title: "Three Column",
    description: "Header with an icon rail, main pane, and details panel.",
    source: `import {
  BarChart3Icon,
  BellIcon,
  HomeIcon,
  SettingsIcon,
} from "lucide-react";

const railButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export default function LayoutThreeColumn() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex h-8 shrink-0 w-full items-center justify-between border-b border-border bg-background px-3">
        <span className="text-xs font-semibold tracking-tight">App</span>
        <button type="button" aria-label="Notifications" className={railButton}>
          <BellIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-1">
        <div className="flex w-12 flex-col items-center gap-1 border-r border-border bg-muted/40 p-1.5">
          {[HomeIcon, BarChart3Icon, SettingsIcon].map((Icon, i) => (
            <button key={i} type="button" aria-label={\`rail-\${i}\`} className={railButton}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10">
          Main
        </div>
        <div className="flex w-20 shrink-0 flex-col gap-2 border-l border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          <span className="font-medium text-muted-foreground">Details</span>
          <span>Info</span>
          <span>Activity</span>
        </div>
      </div>
    </div>
  );
}`,
  });
