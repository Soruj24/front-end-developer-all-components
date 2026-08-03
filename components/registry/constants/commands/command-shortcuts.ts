import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandShortcuts: RegistryEntry = entry({
  id: "command-shortcuts",
  title: "Command with Shortcuts",
  description: "Show keyboard shortcuts next to items.",
  source: `import { Command } from "@/components/_command";

const items = [
  { value: "copy", label: "Copy", shortcut: "⌘C" },
  { value: "paste", label: "Paste", shortcut: "⌘V" },
  { value: "cut", label: "Cut", shortcut: "⌘X" },
  { value: "undo", label: "Undo", shortcut: "⌘Z" },
  { value: "find", label: "Find", shortcut: "⌘F" },
];

export default function CommandShortcuts() {
  return (
    <Command
      items={items}
      placeholder="Search with keyboard shortcuts..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
