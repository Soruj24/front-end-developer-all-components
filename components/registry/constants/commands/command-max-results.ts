import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandMaxResults: RegistryEntry = entry({
  id: "command-max-results",
  title: "Command with Max Results",
  description: "Limited to 3 results.",
  source: `import { Command } from "@/components/_command";

const items = [
  { value: "home", label: "Home", icon: <HomeIcon />, shortcut: "⌘H" },
  { value: "settings", label: "Settings", icon: <SettingsIcon />, shortcut: "⌘," },
  { value: "profile", label: "Profile", icon: <UserIcon />, shortcut: "⌘P" },
  { value: "dashboard", label: "Dashboard", icon: <FolderIcon />, shortcut: "⌘D" },
];

export default function CommandMaxResults() {
  return (
    <Command
      items={items}
      maxResults={3}
      placeholder="Max 3 results..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
