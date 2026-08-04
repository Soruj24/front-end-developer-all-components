import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const markerWithLabel: RegistryEntry = entry({
  id: "marker-with-label",
  title: "With Label",
  description: "Marker with text label.",
  source: `import { Marker } from "@/components/_marker";

export default function MarkerWithLabel() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Marker variant="primary" />
        <span className="text-sm">Active</span>
      </div>
      <div className="flex items-center gap-2">
        <Marker variant="danger" />
        <span className="text-sm">Offline</span>
      </div>
      <div className="flex items-center gap-2">
        <Marker variant="secondary" />
        <span className="text-sm">Away</span>
      </div>
    </div>
  );
}`,
});
