import { jsonTreeViewerFull } from "./json-tree-viewer-full";
import { jsonTreeViewerNested } from "./json-tree-viewer-nested";
import { jsonTreeViewerResponse } from "./json-tree-viewer-response";
import { jsonTreeViewerLarge } from "./json-tree-viewer-large";

import type { RegistryEntry } from "../../types";

/** JSON Tree Viewer examples. Each is one preview block on the JSON Tree Viewer page. */
export const jsonTreeViewers: RegistryEntry[] = [
  jsonTreeViewerFull,
  jsonTreeViewerNested,
  jsonTreeViewerResponse,
  jsonTreeViewerLarge,
];
