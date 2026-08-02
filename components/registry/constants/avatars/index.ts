import { avatarSizesInitials } from "./avatar-sizes-initials";
import { avatarSizesImage } from "./avatar-sizes-image";
import { avatarGroup } from "./avatar-group";
import { avatarStatus } from "./avatar-status";
import { avatarFallback } from "./avatar-fallback";
import { avatarBadgeOverlay } from "./avatar-badge-overlay";
import { avatarWithLabel } from "./avatar-with-label";
import { avatarPresence } from "./avatar-presence";
import type { RegistryEntry } from "../../types";

/** Avatar examples. */
export const avatars: RegistryEntry[] = [
  avatarSizesInitials,
  avatarSizesImage,
  avatarGroup,
  avatarStatus,
  avatarFallback,
  avatarBadgeOverlay,
  avatarWithLabel,
  avatarPresence,
];
