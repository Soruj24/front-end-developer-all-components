import { drawerDirections } from "./drawer-directions";
import { drawerSizes } from "./drawer-sizes";
import { drawerCart } from "./drawer-cart";
import { drawerFilter } from "./drawer-filter";
import { drawerNotificationsProfile } from "./drawer-notifications-profile";
import { drawerNavigation } from "./drawer-navigation";
import { drawerForms } from "./drawer-forms";
import { drawerTeam } from "./drawer-team";
import { drawerActivity } from "./drawer-activity";
import { drawerComments } from "./drawer-comments";
import { drawerActions } from "./drawer-actions";
import { drawerSettingsTools } from "./drawer-settings-tools";
import { drawerPricingAnalytics } from "./drawer-pricing-analytics";
import { drawerBookmarksLanguage } from "./drawer-bookmarks-language";
import { drawerCalendarExport } from "./drawer-calendar-export";
import { popoverActionMenus } from "./popover-action-menus";
import { popoverInfoTooltips } from "./popover-info-tooltips";
import { popoverLinkPreview } from "./popover-link-preview";
import { popoverForms } from "./popover-forms";
import { popoverUserCard } from "./popover-user-card";
import { popoverNotifications } from "./popover-notifications";
import { popoverStatusPriority } from "./popover-status-priority";
import { popoverFilterSort } from "./popover-filter-sort";
import { popoverLanguageAccess } from "./popover-language-access";
import { popoverDateTime } from "./popover-date-time";
import { popoverColumnsLabelsTags } from "./popover-columns-labels-tags";
import { popoverAssignee } from "./popover-assignee";
import { popoverColorEmoji } from "./popover-color-emoji";
import { popoverShare } from "./popover-share";
import { popoverFlag } from "./popover-flag";
import { popoverProgressZoom } from "./popover-progress-zoom";

import type { RegistryEntry } from "../../types";

/** Drawer examples. */
export const drawers: RegistryEntry[] = [
  drawerDirections,
  drawerSizes,
  drawerCart,
  drawerFilter,
  drawerNotificationsProfile,
  drawerNavigation,
  drawerForms,
  drawerTeam,
  drawerActivity,
  drawerComments,
  drawerActions,
  drawerSettingsTools,
  drawerPricingAnalytics,
  drawerBookmarksLanguage,
  drawerCalendarExport,
  popoverActionMenus,
  popoverInfoTooltips,
  popoverLinkPreview,
  popoverForms,
  popoverUserCard,
  popoverNotifications,
  popoverStatusPriority,
  popoverFilterSort,
  popoverLanguageAccess,
  popoverDateTime,
  popoverColumnsLabelsTags,
  popoverAssignee,
  popoverColorEmoji,
  popoverShare,
  popoverFlag,
  popoverProgressZoom,
];
