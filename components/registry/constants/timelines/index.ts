import { timelineBasic } from "./timeline-basic";
import { timelineAlternating } from "./timeline-alternating";
import { timelineCards } from "./timeline-cards";
import { timelineStatus } from "./timeline-status";
import { timelineColorCoded } from "./timeline-color-coded";
import { timelineAvatars } from "./timeline-avatars";
import { timelineCompact } from "./timeline-compact";
import { timelineNumbered } from "./timeline-numbered";
import { timelineProgress } from "./timeline-progress";
import { timelineHistory } from "./timeline-history";
import { timelineFeed } from "./timeline-feed";
import { timelineFull } from "./timeline-full";
import { timelineWizard } from "./timeline-wizard";
import { timelineExpandable } from "./timeline-expandable";
import { timelineDark } from "./timeline-dark";
import { timelineResponsive } from "./timeline-responsive";

import type { RegistryEntry } from "../../types";

/** Timeline examples. */
export const timelines: RegistryEntry[] = [
  timelineBasic,
  timelineAlternating,
  timelineCards,
  timelineStatus,
  timelineColorCoded,
  timelineAvatars,
  timelineCompact,
  timelineNumbered,
  timelineProgress,
  timelineHistory,
  timelineFeed,
  timelineFull,
  timelineWizard,
  timelineExpandable,
  timelineDark,
  timelineResponsive,
];
