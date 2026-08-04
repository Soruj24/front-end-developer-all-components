import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const toggleSizes: RegistryEntry = entry({
  id: "toggle-sizes",
  title: "Sizes",
  description: "Different sizes for the toggle.",
  source: `import { Toggle } from "@/components/_toggle";

export default function ToggleSizes() {
  return (
    <div className="flex items-center gap-4">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}`,
});
