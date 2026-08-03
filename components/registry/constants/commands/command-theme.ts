import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandTheme: RegistryEntry = entry({
  id: "command-theme",
  title: "Theme Switcher Command",
  description: "Theme switcher (Light/Dark/System).",
  source: `import { Command } from "@/components/_command";

const items = [
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark", label: "Dark", icon: <MoonIcon /> },
  { value: "system", label: "System", icon: <SettingsIcon /> },
];

export default function CommandTheme() {
  return (
    <Command
      items={items}
      placeholder="Choose theme..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
