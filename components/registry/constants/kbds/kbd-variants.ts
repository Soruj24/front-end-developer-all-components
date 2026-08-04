import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const kbdVariants: RegistryEntry = entry({
  id: "kbd-variants",
  title: "Variants",
  description: "Different visual styles for the Kbd component.",
  source: `import { Kbd } from "@/components/_kbd";

export default function KbdVariants() {
  return (
    <div className="flex items-center gap-4">
      <Kbd variant="default">Default</Kbd>
      <Kbd variant="outline">Outline</Kbd>
      <Kbd variant="ghost">Ghost</Kbd>
    </div>
  );
}`,
});
