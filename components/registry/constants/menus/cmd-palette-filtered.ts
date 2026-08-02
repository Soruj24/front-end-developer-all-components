import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { cmdButtonSource, cmdData, cmdPaletteSource } from "./shared";

export const cmdPaletteFiltered: RegistryEntry = entry({
    id: "cmd-palette-filtered",
    title: "Filtered Command Sets",
    description: "Palettes scoped to a single group — Edit, File, or Navigation.",
    source: `import { useEffect, useRef, useCallback, useState } from "react";

${cmdData}

${cmdButtonSource}

${cmdPaletteSource}

export default function CommandMenuFiltered() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Edit Commands Only</p>
        <p className="text-xs text-zinc-400">Filtered to the Edit group</p>
        <PaletteButton label="Edit..." onOpen={() => setOpenEdit(true)} />
        <CommandPalette commands={allCommands.filter((c) => c.group === "Edit")} open={openEdit} onClose={() => setOpenEdit(false)} placeholder="Edit..." showRecent={false} groups={false} />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">File Commands Only</p>
        <p className="text-xs text-zinc-400">Filtered to the File group</p>
        <PaletteButton label="File..." onOpen={() => setOpenFile(true)} />
        <CommandPalette commands={allCommands.filter((c) => c.group === "File")} open={openFile} onClose={() => setOpenFile(false)} placeholder="File..." showRecent={false} groups={false} />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Navigation Only</p>
        <p className="text-xs text-zinc-400">Filtered to the Navigation group</p>
        <PaletteButton label="Navigate..." onOpen={() => setOpenNav(true)} />
        <CommandPalette commands={allCommands.filter((c) => c.group === "Navigation")} open={openNav} onClose={() => setOpenNav(false)} placeholder="Navigate..." showRecent={false} groups={false} />
      </div>
    </div>
  );
}`,
  });
