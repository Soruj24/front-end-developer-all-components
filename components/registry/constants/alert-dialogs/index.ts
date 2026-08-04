import { alertDialogDestructive } from "./alert-dialog-destructive";
import { alertDialogDefault } from "./alert-dialog-default";
import { alertDialogCustomText } from "./alert-dialog-custom-text";
import { alertDialogDisabled } from "./alert-dialog-disabled";
import { alertDialogControlled } from "./alert-dialog-controlled";
import { alertDialogIcons } from "./alert-dialog-icons";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Alert Dialog page. */
export const alertDialogs: RegistryEntry[] = [
  alertDialogDestructive,
  alertDialogDefault,
  alertDialogCustomText,
  alertDialogDisabled,
  alertDialogControlled,
  alertDialogIcons,
];
