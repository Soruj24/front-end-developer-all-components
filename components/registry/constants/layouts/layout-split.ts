import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutSplit: RegistryEntry = entry({
    id: "layout-split",
    title: "Split View",
    description: "Two equal panes divided by a vertical rule.",
    source: `const zone =
  "flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10";

export default function LayoutSplit() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className={zone}>Editor</div>
      <div className="w-px shrink-0 bg-border" />
      <div className={zone}>Preview</div>
    </div>
  );
}`,
  });
