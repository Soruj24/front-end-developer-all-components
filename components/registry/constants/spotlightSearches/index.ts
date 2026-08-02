import { spotlightSearchFull } from "./spotlight-search-full";
import { spotlightSearchQuick } from "./spotlight-search-quick";
import { spotlightSearchTrigger } from "./spotlight-search-trigger";

export { defaultTrigger, spotlightIcons, withActionsBlock } from "./shared";
import type { RegistryEntry } from "../../types";

/** Spotlight Search examples. Each is one preview block on the Spotlight Search page. */
export const spotlightSearches: RegistryEntry[] = [
  spotlightSearchFull,
  spotlightSearchQuick,
  spotlightSearchTrigger,
];
