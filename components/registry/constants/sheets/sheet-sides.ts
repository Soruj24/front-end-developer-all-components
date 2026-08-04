import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sheetSides: RegistryEntry = entry({
  id: "sheet-sides",
  title: "Sides",
  description: "Sheet from different sides.",
  source: `import { Sheet } from "@/components/_sheet";

export default function SheetSides() {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet
        side="left"
        trigger={<button className="rounded border px-4 py-2 text-sm">Left</button>}
        title="Left Sheet"
      >
        <p className="text-sm text-muted-foreground">Content from the left.</p>
      </Sheet>
      <Sheet
        side="right"
        trigger={<button className="rounded border px-4 py-2 text-sm">Right</button>}
        title="Right Sheet"
      >
        <p className="text-sm text-muted-foreground">Content from the right.</p>
      </Sheet>
      <Sheet
        side="top"
        trigger={<button className="rounded border px-4 py-2 text-sm">Top</button>}
        title="Top Sheet"
      >
        <p className="text-sm text-muted-foreground">Content from the top.</p>
      </Sheet>
      <Sheet
        side="bottom"
        trigger={<button className="rounded border px-4 py-2 text-sm">Bottom</button>}
        title="Bottom Sheet"
      >
        <p className="text-sm text-muted-foreground">Content from the bottom.</p>
      </Sheet>
    </div>
  );
}`,
});
