import { breadcrumbDefault } from "./breadcrumb-default";
import { breadcrumbWithIcons } from "./breadcrumb-with-icons";
import { breadcrumbSeparators } from "./breadcrumb-separators";
import { breadcrumbDeep } from "./breadcrumb-deep";
import { breadcrumbClickable } from "./breadcrumb-clickable";
import { breadcrumbCustomStyles } from "./breadcrumb-custom-styles";
import { breadcrumbTruncated } from "./breadcrumb-truncated";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Breadcrumb page. */
export const breadcrumbs: RegistryEntry[] = [
  breadcrumbDefault,
  breadcrumbWithIcons,
  breadcrumbSeparators,
  breadcrumbDeep,
  breadcrumbClickable,
  breadcrumbCustomStyles,
  breadcrumbTruncated,
];
