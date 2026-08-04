import { kbdDefault } from "./kbd-default";
import { kbdVariants } from "./kbd-variants";
import { kbdSizes } from "./kbd-sizes";
import { kbdShortcut } from "./kbd-shortcut";
import type { RegistryEntry } from "../../types";

export const kbds: RegistryEntry[] = [
  kbdDefault,
  kbdVariants,
  kbdSizes,
  kbdShortcut,
];
