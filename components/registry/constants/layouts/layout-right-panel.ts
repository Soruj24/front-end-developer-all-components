import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutRightPanel: RegistryEntry = entry({
    id: "layout-right-panel",
    title: "Right Panel",
    description: "Main canvas with an auxiliary inspector panel.",
    source: `export default function LayoutRightPanel() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10">
        Canvas
      </div>
      <div className="flex w-24 shrink-0 flex-col gap-2 border-l border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
        <span className="font-medium text-muted-foreground">Inspector</span>
        <span>Position</span>
        <span>Styles</span>
        <span>Events</span>
      </div>
    </div>
  );
}`,
  });
