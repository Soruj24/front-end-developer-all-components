import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paletteIcons, triggerButton, withActionsBlock } from "./shared";

export const commandPaletteQuick: RegistryEntry = entry({
    id: "command-palette-quick",
    title: "Quick Actions",
    description:
      "A compact, focused palette — narrower width, custom placeholder, and a small set of flat commands.",
    source: `import { useState } from "react";
import { CommandPalette } from "@/components/ui";

${paletteIcons}

const actions = [
  { id: "theme", label: "Toggle Dark Mode", keywords: ["dark", "light"], shortcut: "Cmd+Shift+D", icon: ThemeIcon() },
  { id: "lock", label: "Lock Screen", keywords: ["security", "screen"], shortcut: "Cmd+L", icon: LockIcon() },
  { id: "log-out", label: "Log Out", keywords: ["signout", "exit"], icon: LogoutIcon() },
  { id: "font-in", label: "Increase Font", keywords: ["zoom", "bigger"], icon: TypeIcon() },
  { id: "font-out", label: "Decrease Font", keywords: ["zoom", "smaller"], icon: TypeIcon() },
  { id: "settings", label: "Open Settings", keywords: ["preferences"], shortcut: "G S", icon: GearIcon() },
];

${withActionsBlock}

${triggerButton}

export default function CommandPaletteQuick() {
  const [open, setOpen] = useState(false);
  const items = withActions(actions);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <TriggerButton label="Quick actions" onOpen={() => setOpen(true)} />
      <CommandPalette
        items={items}
        open={open}
        onOpenChange={setOpen}
        placeholder="Type an action..."
        width={420}
        maxHeight={320}
        storageKey="demo:command-palette-quick"
      />
    </div>
  );
}`,
  });
