import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandGroups: RegistryEntry = entry({
  id: "command-groups",
  title: "Command with Groups",
  description: "Items organized into labeled groups.",
  source: `import { Command } from "@/components/_command";

const items = [
  { value: "home", label: "Home", icon: <HomeIcon />, group: "Navigation" },
  { value: "about", label: "About", icon: <SearchIcon />, group: "Navigation" },
  { value: "copy", label: "Copy", icon: <CopyIcon />, shortcut: "⌘C", group: "Edit" },
  { value: "paste", label: "Paste", icon: <ClipboardIcon />, shortcut: "⌘V", group: "Edit" },
  { value: "terminal", label: "Terminal", icon: <TerminalIcon />, group: "Tools" },
];

export default function CommandGroups() {
  return (
    <Command
      items={items}
      placeholder="Search with groups..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
