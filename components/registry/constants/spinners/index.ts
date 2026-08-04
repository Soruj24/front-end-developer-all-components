import { spinnerDefault } from "./spinner-default";
import { spinnerVariants } from "./spinner-variants";
import { spinnerSizes } from "./spinner-sizes";
import { spinnerLabel } from "./spinner-label";
import type { RegistryEntry } from "../../types";

export const spinners: RegistryEntry[] = [
  spinnerDefault,
  spinnerVariants,
  spinnerSizes,
  spinnerLabel,
];
