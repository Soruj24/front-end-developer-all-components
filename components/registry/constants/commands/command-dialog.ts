import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandDialog: RegistryEntry = entry({
  id: "command-dialog",
  title: "Command Dialog",
  description: "Command palette as a dialog overlay with ⌘K keyboard shortcut.",
  source: `import { useState } from "react";
import { Command } from "@/components/_command";

const items = [
  { value: "home", label: "Home", icon: <HomeIcon />, shortcut: "⌘H" },
  { value: "settings", label: "Settings", icon: <SettingsIcon />, shortcut: "⌘," },
  { value: "profile", label: "Profile", icon: <UserIcon />, shortcut: "⌘P" },
];

export default function CommandDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-muted-foreground hover:bg-accent"
      >
        Search commands... ⌘K
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-full max-w-lg">
            <Command
              items={items}
              variant="dialog"
              onSelect={() => setOpen(false)}
              placeholder="Type a command or search..."
            />
          </div>
        </div>
      )}
    </div>
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
