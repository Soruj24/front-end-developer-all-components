import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandNested: RegistryEntry = entry({
  id: "command-nested",
  title: "Nested Command",
  description: "Multi-level navigation (Settings → Theme).",
  source: `import { useState } from "react";
import { Command } from "@/components/_command";

export default function CommandNested() {
  const [level, setLevel] = useState<"main" | "settings" | "theme">("main");

  const mainItems = [
    { value: "settings", label: "Settings", icon: <SettingsIcon /> },
    { value: "profile", label: "Profile", icon: <UserIcon /> },
  ];

  const settingsItems = [
    { value: "theme", label: "Theme", icon: <SunIcon /> },
    { value: "notifications", label: "Notifications", icon: <AlertIcon /> },
  ];

  const themeItems = [
    { value: "light", label: "Light", icon: <SunIcon /> },
    { value: "dark", label: "Dark", icon: <MoonIcon /> },
  ];

  const items = level === "main" ? mainItems : level === "settings" ? settingsItems : themeItems;

  const handleSelect = (item) => {
    if (item.value === "settings") setLevel("settings");
    else if (item.value === "theme") setLevel("theme");
    else setLevel("main");
  };

  return (
    <div className="flex flex-col gap-3">
      {level !== "main" && (
        <button onClick={() => setLevel(level === "theme" ? "settings" : "main")}>
          ← Back
        </button>
      )}
      <Command items={items} onSelect={handleSelect} />
    </div>
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
