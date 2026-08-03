import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandIcons: RegistryEntry = entry({
  id: "command-icons",
  title: "Command with Icons",
  description: "Code-focused items with SVG icons.",
  source: `import { Command } from "@/components/_command";

const items = [
  { value: "terminal", label: "Terminal", icon: <TerminalIcon />, shortcut: "⌘\`" },
  { value: "code", label: "Code Editor", icon: <CodeIcon />, shortcut: "⌘E" },
  { value: "files", label: "Files", icon: <FolderIcon />, shortcut: "⌘⇧F" },
  { value: "search", label: "Search", icon: <SearchIcon />, shortcut: "⌘/" },
  { value: "git", label: "Git", icon: <GitIcon /> },
];

export default function CommandIcons() {
  return (
    <Command
      items={items}
      placeholder="Search with icons..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
