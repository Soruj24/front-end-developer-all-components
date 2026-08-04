import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const separatorDefault: RegistryEntry = entry({
  id: "separator-default",
  title: "Default",
  description: "Default horizontal separator.",
  source: `import { Separator } from "@/components/_separator";

export default function SeparatorDefault() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">Content above</p>
      <Separator />
      <p className="text-sm">Content below</p>
    </div>
  );
}`,
});
