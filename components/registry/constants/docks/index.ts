import { dockMagnifying } from "./dock-magnifying";
import { dockMinimal } from "./dock-minimal";
import { dockKeyboard } from "./dock-keyboard";

import type { RegistryEntry } from "../../types";

/** Dock examples. Each is one preview block on the Dock page. */
export const docks: RegistryEntry[] = [
  dockMagnifying,
  dockMinimal,
  dockKeyboard,
];
