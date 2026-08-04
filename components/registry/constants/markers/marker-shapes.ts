import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const markerShapes: RegistryEntry = entry({
  id: "marker-shapes",
  title: "Shapes",
  description: "Different shapes for the marker.",
  source: `import { Marker } from "@/components/_marker";

export default function MarkerShapes() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <Marker shape="circle" />
        <span className="text-xs text-muted-foreground">Circle</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Marker shape="square" />
        <span className="text-xs text-muted-foreground">Square</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Marker shape="dot" />
        <span className="text-xs text-muted-foreground">Dot</span>
      </div>
    </div>
  );
}`,
});
