import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const kbdSizes: RegistryEntry = entry({
  id: "kbd-sizes",
  title: "Sizes",
  description: "Different sizes for the Kbd component.",
  source: `import { Kbd } from "@/components/_kbd";

export default function KbdSizes() {
  return (
    <div className="flex items-center gap-4">
      <Kbd size="sm">Small</Kbd>
      <Kbd size="md">Medium</Kbd>
      <Kbd size="lg">Large</Kbd>
    </div>
  );
}`,
});
