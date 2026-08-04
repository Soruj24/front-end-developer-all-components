import { selectDefault } from "./select-default";
import { selectSizes } from "./select-sizes";
import { selectHelper } from "./select-helper";
import { selectGrouped } from "./select-grouped";
import type { RegistryEntry } from "../../types";

export const selects: RegistryEntry[] = [
  selectDefault,
  selectSizes,
  selectHelper,
  selectGrouped,
];
