import { floatingToolbarSelection } from "./floating-toolbar-selection";
import { floatingToolbarSticky } from "./floating-toolbar-sticky";
import { floatingToolbarSelectionAware } from "./floating-toolbar-selection-aware";

import type { RegistryEntry } from "../../types";

/** FloatingToolbar examples. Each is one preview block on the page. */
export const floatingToolbars: RegistryEntry[] = [
  floatingToolbarSelection,
  floatingToolbarSticky,
  floatingToolbarSelectionAware,
];
