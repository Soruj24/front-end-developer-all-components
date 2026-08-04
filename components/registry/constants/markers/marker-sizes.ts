import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const markerSizes: RegistryEntry = entry({
  id: "marker-sizes",
  title: "Sizes",
  description: "Different sizes for the marker.",
  source: `import { Marker } from "@/components/_marker";

export default function MarkerSizes() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <Marker size={8} />
        <span className="text-xs text-muted-foreground">8px</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Marker size={12} />
        <span className="text-xs text-muted-foreground">12px</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Marker size={16} />
        <span className="text-xs text-muted-foreground">16px</span>
      </div>
    </div>
  );
}`,
});
