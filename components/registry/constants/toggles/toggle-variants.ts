import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const toggleVariants: RegistryEntry = entry({
  id: "toggle-variants",
  title: "Variants",
  description: "Different visual styles.",
  source: `import { Toggle } from "@/components/_toggle";

export default function ToggleVariants() {
  return (
    <div className="flex items-center gap-4">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
    </div>
  );
}`,
});
