import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { cmdButtonSource, cmdData, cmdPaletteSource } from "./shared";

export const cmdPaletteDisplay: RegistryEntry = entry({
    id: "cmd-palette-display",
    title: "Icons & Shortcuts",
    description: "Icon-only rows, shortcut-only rows, and both combined.",
    source: `import { useEffect, useRef, useCallback, useState } from "react";

${cmdData}

${cmdButtonSource}

${cmdPaletteSource}

export default function CommandMenuDisplay() {
  const [openIcons, setOpenIcons] = useState(false);
  const [openShortcuts, setOpenShortcuts] = useState(false);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Icons Only</p>
        <p className="text-xs text-zinc-400">No shortcut keys shown</p>
        <PaletteButton label="Search..." onOpen={() => setOpenIcons(true)} />
        <CommandPalette commands={allCommands.map((c) => ({ ...c, shortcut: "" }))} open={openIcons} onClose={() => setOpenIcons(false)} placeholder="Search..." showRecent groups />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Shortcuts Only</p>
        <p className="text-xs text-zinc-400">No icons, just labels and keys</p>
        <PaletteButton label="Shortcut search..." onOpen={() => setOpenShortcuts(true)} />
        <CommandPalette commands={allCommands.map((c) => ({ ...c, icon: "" }))} open={openShortcuts} onClose={() => setOpenShortcuts(false)} placeholder="Shortcut search..." showRecent groups />
      </div>
    </div>
  );
}`,
  });
