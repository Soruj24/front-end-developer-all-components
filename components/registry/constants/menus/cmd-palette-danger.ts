import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { cmdButtonSource, cmdData, cmdPaletteSource } from "./shared";

export const cmdPaletteDanger: RegistryEntry = entry({
    id: "cmd-palette-danger",
    title: "Danger & Destructive",
    description: "A grouped palette with a destructive delete action highlighted.",
    source: `import { useEffect, useRef, useCallback, useState } from "react";

${cmdData}

${cmdButtonSource}

${cmdPaletteSource}

export default function CommandMenuDanger() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <PaletteButton label="Type command..." onOpen={() => setOpen(true)} />
      <CommandPalette
        commands={allCommands}
        open={open}
        onClose={() => setOpen(false)}
        placeholder="Type command..."
        showRecent
        groups
      />
    </div>
  );
}`,
  });
