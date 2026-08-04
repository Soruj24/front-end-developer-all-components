import { attachmentDefault } from "./attachment-default";
import { attachmentVariants } from "./attachment-variants";
import { attachmentSizes } from "./attachment-sizes";
import { attachmentRemovable } from "./attachment-removable";
import { attachmentCustomIcon } from "./attachment-custom-icon";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Attachment page. */
export const attachments: RegistryEntry[] = [
  attachmentDefault,
  attachmentVariants,
  attachmentSizes,
  attachmentRemovable,
  attachmentCustomIcon,
];
