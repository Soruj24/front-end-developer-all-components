import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const markerVariants: RegistryEntry = entry({
  id: "marker-variants",
  title: "Variants",
  description: "Different color variants.",
  source: `import { Marker } from "@/components/_marker";

export default function MarkerVariants() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <Marker variant="default" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Marker variant="primary" />
        <span className="text-xs text-muted-foreground">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Marker variant="secondary" />
        <span className="text-xs text-muted-foreground">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Marker variant="danger" />
        <span className="text-xs text-muted-foreground">Danger</span>
      </div>
    </div>
  );
}`,
});
