import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutHolyGrail: RegistryEntry = entry({
    id: "layout-holy-grail",
    title: "Holy Grail",
    description: "Header, flanking sidebars, main column and footer.",
    source: `export default function LayoutHolyGrail() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex h-8 shrink-0 w-full items-center border-b border-border bg-background px-3 text-xs font-semibold tracking-tight">
        Header
      </div>
      <div className="flex flex-1">
        <div className="w-16 shrink-0 border-r border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          Left
        </div>
        <div className="flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10">
          Main
        </div>
        <div className="w-16 shrink-0 border-l border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          Right
        </div>
      </div>
      <div className="flex h-7 shrink-0 w-full items-center border-t border-border bg-background px-3 text-[10px] text-muted-foreground/70">
        Footer
      </div>
    </div>
  );
}`,
  });
