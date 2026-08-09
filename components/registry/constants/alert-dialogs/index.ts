import { alertDialogDestructive } from "./alert-dialog-destructive";
import { alertDialogDefault } from "./alert-dialog-default";
import { alertDialogCustomText } from "./alert-dialog-custom-text";
import { alertDialogDisabled } from "./alert-dialog-disabled";
import { alertDialogControlled } from "./alert-dialog-controlled";
import { alertDialogIcons } from "./alert-dialog-icons";
import { alertDialogAsync } from "./alert-dialog-async";
import { alertDialogTypeConfirm } from "./alert-dialog-type-confirm";
import { alertDialogForm } from "./alert-dialog-form";
import { alertDialogNested } from "./alert-dialog-nested";
import { alertDialogSuccess } from "./alert-dialog-success";
import { alertDialogWarning } from "./alert-dialog-warning";
import { alertDialogError } from "./alert-dialog-error";
import { alertDialogPayment } from "./alert-dialog-payment";
import { alertDialogStandalone } from "./alert-dialog-standalone";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Alert Dialog page. */
export const alertDialogs: RegistryEntry[] = [
  alertDialogDestructive,
  alertDialogDefault,
  alertDialogCustomText,
  alertDialogDisabled,
  alertDialogControlled,
  alertDialogIcons,
  alertDialogAsync,
  alertDialogTypeConfirm,
  alertDialogForm,
  alertDialogNested,
  alertDialogSuccess,
  alertDialogWarning,
  alertDialogError,
  alertDialogPayment,
  alertDialogStandalone,
];
