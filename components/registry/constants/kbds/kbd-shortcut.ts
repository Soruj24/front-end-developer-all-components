import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const kbdShortcut: RegistryEntry = entry({
  id: "kbd-shortcut",
  title: "Shortcut",
  description: "Keyboard shortcut combination.",
  source: `import { Kbd } from "@/components/_kbd";

export default function KbdShortcut() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>K</Kbd>
        <span className="text-sm text-muted-foreground">Open search</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>Shift</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>P</Kbd>
        <span className="text-sm text-muted-foreground">Command palette</span>
      </div>
    </div>
  );
}`,
});
