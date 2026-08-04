import { toggleDefault } from "./toggle-default";
import { toggleVariants } from "./toggle-variants";
import { toggleSizes } from "./toggle-sizes";
import { togglePressed } from "./toggle-pressed";
import type { RegistryEntry } from "../../types";

export const toggles: RegistryEntry[] = [
  toggleDefault,
  toggleVariants,
  toggleSizes,
  togglePressed,
];
