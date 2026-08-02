import { modalInteractive } from "./modal-interactive";
import { modalSizes } from "./modal-sizes";
import { modalConfirm } from "./modal-confirm";
import { modalQuickView } from "./modal-quick-view";
import { modalPlans } from "./modal-plans";
import { modalForm } from "./modal-form";
import { modalWizard } from "./modal-wizard";
import { modalNested } from "./modal-nested";
import { modalGallery } from "./modal-gallery";
import { modalNotifications } from "./modal-notifications";
import { modalVariants } from "./modal-variants";
import { modalUseCases } from "./modal-use-cases";

import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Modal page. */
export const modals: RegistryEntry[] = [
  modalInteractive,
  modalSizes,
  modalConfirm,
  modalQuickView,
  modalPlans,
  modalForm,
  modalWizard,
  modalNested,
  modalGallery,
  modalNotifications,
  modalVariants,
  modalUseCases,
];
