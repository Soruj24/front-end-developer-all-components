import { variantMatrixButtons } from "./variant-matrix-buttons";
import { variantMatrixInputs } from "./variant-matrix-inputs";
import { variantMatrixBadges } from "./variant-matrix-badges";

export { matrixImport } from "./shared";
import type { RegistryEntry } from "../../types";

/** Variant Matrix examples. Each is one preview block on the Variant Matrix page. */
export const variantMatrices: RegistryEntry[] = [
  variantMatrixButtons,
  variantMatrixInputs,
  variantMatrixBadges,
];
