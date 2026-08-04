import { scrollAreaDefault } from "./scroll-area-default";
import { scrollAreaHorizontal } from "./scroll-area-horizontal";
import { scrollAreaSizes } from "./scroll-area-sizes";
import type { RegistryEntry } from "../../types";

export const scrollAreas: RegistryEntry[] = [
  scrollAreaDefault,
  scrollAreaHorizontal,
  scrollAreaSizes,
];
