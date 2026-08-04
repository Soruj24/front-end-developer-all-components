import { progressDefault } from "./progress-default";
import { progressVariants } from "./progress-variants";
import { progressSizes } from "./progress-sizes";
import { progressLabel } from "./progress-label";
import type { RegistryEntry } from "../../types";

export const progresses: RegistryEntry[] = [
  progressDefault,
  progressVariants,
  progressSizes,
  progressLabel,
];
