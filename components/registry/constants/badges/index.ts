import { badgeVariants } from "./badge-variants";
import { badgeSizes } from "./badge-sizes";
import { badgeWithIcon } from "./badge-with-icon";
import { badgeDismissible } from "./badge-dismissible";
import { badgeAsLink } from "./badge-as-link";
import { badgeOnBell } from "./badge-on-bell";
import { badgeDot } from "./badge-dot";
import { badgePulsating } from "./badge-pulsating";
import type { RegistryEntry } from "../../types";

/** Badge examples. */
export const badges: RegistryEntry[] = [
  badgeVariants,
  badgeSizes,
  badgeWithIcon,
  badgeDismissible,
  badgeAsLink,
  badgeOnBell,
  badgeDot,
  badgePulsating,
];
