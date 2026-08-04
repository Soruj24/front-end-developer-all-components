import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const kbdDefault: RegistryEntry = entry({
  id: "kbd-default",
  title: "Default",
  description: "Default keyboard shortcut indicator.",
  source: `import { Kbd } from "@/components/_kbd";

export default function KbdDefault() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>Ctrl</Kbd>
      <span className="text-muted-foreground">+</span>
      <Kbd>K</Kbd>
    </div>
  );
}`,
});
