import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const separatorVertical: RegistryEntry = entry({
  id: "separator-vertical",
  title: "Vertical",
  description: "Vertical separator.",
  source: `import { Separator } from "@/components/_separator";

export default function SeparatorVertical() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" className="h-6" />
      <span className="text-sm">Right</span>
    </div>
  );
}`,
});
