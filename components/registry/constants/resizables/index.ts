import { resizableDefault } from "./resizable-default";
import { resizableThree } from "./resizable-three";
import { resizableMin } from "./resizable-min";
import type { RegistryEntry } from "../../types";

export const resizables: RegistryEntry[] = [
  resizableDefault,
  resizableThree,
  resizableMin,
];
