import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { cmdButtonSource, cmdData, cmdPaletteSource } from "./shared";

export const cmdPaletteDensity: RegistryEntry = entry({
    id: "cmd-palette-density",
    title: "Command Density",
    description: "A five-item quick palette and a 20+ item extended palette.",
    source: `import { useEffect, useRef, useCallback, useState } from "react";

${cmdData}

${cmdButtonSource}

${cmdPaletteSource}

export default function CommandMenuDensity() {
  const [openShort, setOpenShort] = useState(false);
  const [openExtended, setOpenExtended] = useState(false);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Short Commands</p>
        <p className="text-xs text-zinc-400">Fewer items, flat list</p>
        <PaletteButton label="Quick action..." onOpen={() => setOpenShort(true)} />
        <CommandPalette commands={allCommands.slice(0, 5)} open={openShort} onClose={() => setOpenShort(false)} placeholder="Quick action..." showRecent={false} groups={false} />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Extended Commands</p>
        <p className="text-xs text-zinc-400">20+ items with sections</p>
        <PaletteButton label="Search 20+..." onOpen={() => setOpenExtended(true)} />
        <CommandPalette commands={[...allCommands, ...moreCommands]} open={openExtended} onClose={() => setOpenExtended(false)} placeholder="Search 20+..." showRecent groups />
      </div>
    </div>
  );
}`,
  });
