import { apiExplorerFull } from "./api-explorer-full";
import { apiExplorerQuick } from "./api-explorer-quick";

import type { RegistryEntry } from "../../types";

/** API Explorer examples. Each is one preview block on the API Explorer page. */
export const apiExplorers: RegistryEntry[] = [
  apiExplorerFull,
  apiExplorerQuick,
];
