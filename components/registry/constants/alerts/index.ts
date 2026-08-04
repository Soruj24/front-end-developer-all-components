import { alertVariants } from "./alert-variants";
import { alertSizes } from "./alert-sizes";
import { alertWithAction } from "./alert-with-action";
import { alertDismissible } from "./alert-dismissible";
import { alertCustomContent } from "./alert-custom-content";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Alert page. */
export const alerts: RegistryEntry[] = [
  alertVariants,
  alertSizes,
  alertWithAction,
  alertDismissible,
  alertCustomContent,
];
