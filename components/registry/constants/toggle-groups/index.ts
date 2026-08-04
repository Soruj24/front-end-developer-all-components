import { toggleGroupSingle } from "./toggle-group-single";
import { toggleGroupMultiple } from "./toggle-group-multiple";
import { toggleGroupVariants } from "./toggle-group-variants";
import { toggleGroupSizes } from "./toggle-group-sizes";
import type { RegistryEntry } from "../../types";

export const toggleGroups: RegistryEntry[] = [
  toggleGroupSingle,
  toggleGroupMultiple,
  toggleGroupVariants,
  toggleGroupSizes,
];
