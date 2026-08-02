import { dialogStatusAlert } from "./dialog-status-alert";
import { dialogConfirmation } from "./dialog-confirmation";
import { dialogRiskWarning } from "./dialog-risk-warning";
import { dialogFormSchedule } from "./dialog-form-schedule";
import { dialogFeedbackRating } from "./dialog-feedback-rating";
import { dialogSelection } from "./dialog-selection";
import { dialogTabsScroll } from "./dialog-tabs-scroll";
import { dialogInfoUpgrade } from "./dialog-info-upgrade";
import { dialogUseCase } from "./dialog-use-case";

import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Dialog page. */
export const dialogs: RegistryEntry[] = [
  dialogStatusAlert,
  dialogConfirmation,
  dialogRiskWarning,
  dialogFormSchedule,
  dialogFeedbackRating,
  dialogSelection,
  dialogTabsScroll,
  dialogInfoUpgrade,
  dialogUseCase,
];
