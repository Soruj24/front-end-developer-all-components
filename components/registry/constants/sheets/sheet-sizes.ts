import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sheetSizes: RegistryEntry = entry({
  id: "sheet-sizes",
  title: "Sizes",
  description: "Different sheet sizes.",
  source: `import { Sheet } from "@/components/_sheet";

export default function SheetSizes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet
        size="sm"
        trigger={<button className="rounded border px-4 py-2 text-sm">Small</button>}
        title="Small Sheet"
      >
        <p className="text-sm text-muted-foreground">Small size sheet.</p>
      </Sheet>
      <Sheet
        size="md"
        trigger={<button className="rounded border px-4 py-2 text-sm">Medium</button>}
        title="Medium Sheet"
      >
        <p className="text-sm text-muted-foreground">Medium size sheet.</p>
      </Sheet>
      <Sheet
        size="lg"
        trigger={<button className="rounded border px-4 py-2 text-sm">Large</button>}
        title="Large Sheet"
      >
        <p className="text-sm text-muted-foreground">Large size sheet.</p>
      </Sheet>
    </div>
  );
}`,
});
