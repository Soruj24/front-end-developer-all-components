import { searchCommandPalette } from "./search-command-palette";
import { searchFuzzyResults } from "./search-fuzzy-results";

import type { RegistryEntry } from "../../types";

/** Documentation search examples. Each is one preview block on the Search page. */
export const search: RegistryEntry[] = [
  searchCommandPalette,
  searchFuzzyResults,
];
