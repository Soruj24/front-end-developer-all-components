import { formBasicValidation } from "./form-basic-validation";
import { formInputVariants } from "./form-input-variants";
import { formTextareaVariants } from "./form-textarea-variants";
import { formSelectChoice } from "./form-select-choice";
import { formToggleSwitches } from "./form-toggle-switches";
import { formDateTime } from "./form-date-time";
import { formFileUpload } from "./form-file-upload";
import { formMultiStep } from "./form-multi-step";
import { formInlineHorizontal } from "./form-inline-horizontal";
import { formAddress } from "./form-address";
import { formPayment } from "./form-payment";
import { formPlanSelection } from "./form-plan-selection";
import { formRating } from "./form-rating";
import { formPrefixSuffix } from "./form-prefix-suffix";
import { formSearch } from "./form-search";
import { formLogin } from "./form-login";
import { formRegister } from "./form-register";
import { formNewsletter } from "./form-newsletter";

import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Forms page. */
export const forms: RegistryEntry[] = [
  formBasicValidation,
  formInputVariants,
  formTextareaVariants,
  formSelectChoice,
  formToggleSwitches,
  formDateTime,
  formFileUpload,
  formMultiStep,
  formInlineHorizontal,
  formAddress,
  formPayment,
  formPlanSelection,
  formRating,
  formPrefixSuffix,
  formSearch,
  formLogin,
  formRegister,
  formNewsletter,
];
