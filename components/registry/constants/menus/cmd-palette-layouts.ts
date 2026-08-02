import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { cmdButtonSource, cmdData, cmdPaletteSource } from "./shared";

export const cmdPaletteLayouts: RegistryEntry = entry({
    id: "cmd-palette-layouts",
    title: "Palette Layouts",
    description:
      "Large, minimal, group-free, and recent-free layouts of the same palette.",
    source: `import { useEffect, useRef, useCallback, useState } from "react";

${cmdData}

${cmdButtonSource}

${cmdPaletteSource}

export default function CommandMenuLayouts() {
  const [openLarge, setOpenLarge] = useState(false);
  const [openNoGroups, setOpenNoGroups] = useState(false);
  const [openNoRecent, setOpenNoRecent] = useState(false);
  const [openMinimal, setOpenMinimal] = useState(false);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Large Palette</p>
        <p className="text-xs text-zinc-400">Increased height for more items</p>
        <PaletteButton label="Search..." onOpen={() => setOpenLarge(true)} />
        <CommandPalette commands={[...allCommands, ...moreCommands]} open={openLarge} onClose={() => setOpenLarge(false)} placeholder="Search..." showRecent groups maxHeight="max-h-96" />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Without Groups</p>
        <p className="text-xs text-zinc-400">Flat list, no sections</p>
        <PaletteButton label="Search commands..." onOpen={() => setOpenNoGroups(true)} />
        <CommandPalette commands={allCommands} open={openNoGroups} onClose={() => setOpenNoGroups(false)} placeholder="Search commands..." showRecent={false} groups={false} />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Without Recent</p>
        <p className="text-xs text-zinc-400">No recently used section</p>
        <PaletteButton label="Find action..." onOpen={() => setOpenNoRecent(true)} />
        <CommandPalette commands={allCommands} open={openNoRecent} onClose={() => setOpenNoRecent(false)} placeholder="Find action..." showRecent={false} groups />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Minimal Palette</p>
        <p className="text-xs text-zinc-400">Smaller, flat, no groups or recents</p>
        <PaletteButton label="Go to..." onOpen={() => setOpenMinimal(true)} />
        <CommandPalette commands={allCommands.filter((c) => c.group === "Navigation")} open={openMinimal} onClose={() => setOpenMinimal(false)} placeholder="Go to..." showRecent={false} groups={false} maxHeight="max-h-48" />
      </div>
    </div>
  );
}`,
  });
