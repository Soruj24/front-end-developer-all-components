import { collapsibleDefault } from "./collapsible-default";
import { collapsibleControlled } from "./collapsible-controlled";
import { collapsibleDefaultOpen } from "./collapsible-default-open";
import { collapsibleNested } from "./collapsible-nested";
import { collapsibleFaq } from "./collapsible-faq";
import { collapsibleSidebar } from "./collapsible-sidebar";
import { collapsibleCode } from "./collapsible-code";
import { collapsibleSettings } from "./collapsible-settings";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Collapsible page. */
export const collapsibles: RegistryEntry[] = [
  collapsibleDefault,
  collapsibleControlled,
  collapsibleDefaultOpen,
  collapsibleNested,
  collapsibleFaq,
  collapsibleSidebar,
  collapsibleCode,
  collapsibleSettings,
];
