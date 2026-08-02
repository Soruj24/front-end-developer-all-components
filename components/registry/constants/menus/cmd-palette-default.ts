import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { cmdButtonSource, cmdData, cmdPaletteSource } from "./shared";

export const cmdPaletteDefault: RegistryEntry = entry({
    id: "cmd-palette-default",
    title: "Default Palette",
    description:
      "The canonical palette — grouped sections, recently used, icons, shortcuts, and keyboard hints.",
    source: `import { useEffect, useRef, useCallback, useState } from "react";

${cmdData}

${cmdButtonSource}

${cmdPaletteSource}

export default function CommandMenuDefault() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <PaletteButton label="Search commands..." onOpen={() => setOpen(true)} />
      <CommandPalette
        commands={allCommands}
        open={open}
        onClose={() => setOpen(false)}
        placeholder="Type a command..."
        showRecent
        groups
      />
    </div>
  );
}`,
  });
