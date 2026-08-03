import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandDefault: RegistryEntry = entry({
  id: "command-default",
  title: "Default Command",
  description: "A basic command palette with search and keyboard navigation.",
  source: `import { Command } from "@/components/_command";

const items = [
  { value: "home", label: "Home", icon: <HomeIcon />, shortcut: "⌘H" },
  { value: "settings", label: "Settings", icon: <SettingsIcon />, shortcut: "⌘," },
  { value: "profile", label: "Profile", icon: <UserIcon />, shortcut: "⌘P" },
];

export default function CommandDefault() {
  return (
    <Command
      items={items}
      onSelect={(item) => console.log(item.value)}
      placeholder="Type a command or search..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
