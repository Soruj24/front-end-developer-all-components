import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { cmdButtonSource, cmdData, cmdPaletteSource } from "./shared";

export const cmdPalettePlaceholders: RegistryEntry = entry({
    id: "cmd-palette-placeholders",
    title: "Placeholders & Context",
    description: "Custom placeholder text and search-focused variants.",
    source: `import { useEffect, useRef, useCallback, useState } from "react";

${cmdData}

${cmdButtonSource}

${cmdPaletteSource}

export default function CommandMenuPlaceholders() {
  const [openCustom, setOpenCustom] = useState(false);
  const [openDark, setOpenDark] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Custom Placeholder</p>
        <p className="text-xs text-zinc-400">Branded help text</p>
        <PaletteButton label="Ask me anything..." onOpen={() => setOpenCustom(true)} />
        <CommandPalette commands={allCommands} open={openCustom} onClose={() => setOpenCustom(false)} placeholder="Ask me anything..." showRecent groups />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Dark Background</p>
        <p className="text-xs text-zinc-400">Same palette, any query</p>
        <PaletteButton label="Search dark..." onOpen={() => setOpenDark(true)} />
        <CommandPalette commands={allCommands} open={openDark} onClose={() => setOpenDark(false)} placeholder="Search dark..." showRecent groups />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium">Search-Focused</p>
        <p className="text-xs text-zinc-400">Starts with a search-open feel</p>
        <PaletteButton label="Find anything..." onOpen={() => setOpenSearch(true)} />
        <CommandPalette commands={[...allCommands, ...moreCommands]} open={openSearch} onClose={() => setOpenSearch(false)} placeholder="Find anything..." showRecent={false} groups />
      </div>
    </div>
  );
}`,
  });
