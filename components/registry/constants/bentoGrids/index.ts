import { bentoGridAnalytics } from "./bento-grid-analytics";
import { bentoGridPlayground } from "./bento-grid-playground";
import { bentoGridNested } from "./bento-grid-nested";

import type { RegistryEntry } from "../../types";

/** BentoGrid examples. Each is one preview block on the page. */
export const bentoGrids: RegistryEntry[] = [
  bentoGridAnalytics,
  bentoGridPlayground,
  bentoGridNested,
];
