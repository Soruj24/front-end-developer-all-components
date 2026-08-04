import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const markerDefault: RegistryEntry = entry({
  id: "marker-default",
  title: "Default",
  description: "Default marker with dot indicator.",
  source: `import { Marker } from "@/components/_marker";

export default function MarkerDefault() {
  return (
    <div className="flex items-center gap-4">
      <Marker />
      <Marker variant="primary" />
      <Marker variant="secondary" />
      <Marker variant="danger" />
    </div>
  );
}`,
});
