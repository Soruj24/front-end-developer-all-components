import { commandPaletteFull } from "./command-palette-full";
import { commandPaletteNested } from "./command-palette-nested";
import { commandPaletteQuick } from "./command-palette-quick";

export { paletteIcons, triggerButton, withActionsBlock } from "./shared";
import type { RegistryEntry } from "../../types";

/** Command Palette examples. Each is one preview block on the Command Palette page. */
export const commandPalettes: RegistryEntry[] = [
  commandPaletteFull,
  commandPaletteNested,
  commandPaletteQuick,
];
