import { paginationButtonGroup } from "./pagination-button-group";
import { paginationColorThemes } from "./pagination-color-themes";
import { paginationGradient } from "./pagination-gradient";
import { paginationLoadMore } from "./pagination-load-more";
import { paginationStepper } from "./pagination-stepper";

export { chevronSource } from "./shared";
import type { RegistryEntry } from "../../types";

/** Pagination examples. */
export const pagination: RegistryEntry[] = [
  paginationButtonGroup,
  paginationColorThemes,
  paginationGradient,
  paginationLoadMore,
  paginationStepper,
];
