/**
 * Component registry — single source of truth for what the preview blocks show.
 *
 * Each entry carries the runnable source (Code tab + playground), the CLI and
 * per-package-manager install commands, the shipped file list, and the runtime
 * dependencies. Pages render their live demo as children and reference an entry
 * by `id`; the block looks the rest up here so docs and code can never drift.
 */

export { entry } from "./utils";
export type { InstallManager, RegistryEntry, RegistryItem } from "./types";

import type { RegistryEntry, RegistryItem } from "./types";

import { buttons } from "./constants/buttons";
import { badges } from "./constants/badges";
import { avatars } from "./constants/avatars";
import { inputs } from "./constants/inputs";
import { cards } from "./constants/cards";
import { headers } from "./constants/headers";
import { forms } from "./constants/forms";
import { tables } from "./constants/tables";
import { pagination } from "./constants/pagination";
import { timelines } from "./constants/timelines";
import { carousels } from "./constants/carousels";
import { modals } from "./constants/modals";
import { dialogs } from "./constants/dialogs";
import { footers } from "./constants/footers";
import { layouts } from "./constants/layouts";
import { menus } from "./constants/menus";
import { drawers } from "./constants/drawers";
import { feedback } from "./constants/feedback";
import { search } from "./constants/search";
import { promptBuilders } from "./constants/promptBuilders";
import { commandPalettes } from "./constants/commandPalettes";
import { apiExplorers } from "./constants/apiExplorers";
import { jsonTreeViewers } from "./constants/jsonTreeViewers";
import { terminalEmulators } from "./constants/terminalEmulators";
import { docks } from "./constants/docks";
import { floatingToolbars } from "./constants/floatingToolbars";
import { bentoGrids } from "./constants/bentoGrids";
import { spotlightSearches } from "./constants/spotlightSearches";
import { dependencyGraphs } from "./constants/dependencyGraphs";
import { pricingCalculators } from "./constants/pricingCalculators";
import { propsEditors } from "./constants/propsEditors";
import { commands } from "./constants/commands";
import { alerts } from "./constants/alerts";
import { alertDialogs } from "./constants/alert-dialogs";
import { aspectRatios } from "./constants/aspect-ratios";
import { attachments } from "./constants/attachments";
import { breadcrumbs } from "./constants/breadcrumbs";
import { bubbles } from "./constants/bubbles";
import { buttonGroups } from "./constants/button-groups";
import { checkboxes } from "./constants/checkboxes";

import { comboboxes } from "./constants/combobox";
import { contextMenus } from "./constants/context-menu";
import { directions } from "./constants/directions";
import { items } from "./constants/items";
import { kbds } from "./constants/kbds";
import { markers } from "./constants/markers";
import { messages } from "./constants/messages";
import { messageScrollers } from "./constants/message-scrollers";
import { nativeSelects } from "./constants/native-selects";
import { navigationMenus } from "./constants/navigation-menus";
import { progresses } from "./constants/progresses";
import { radioGroups } from "./constants/radio-groups";
import { scrollAreas } from "./constants/scroll-areas";
import { selects } from "./constants/selects";
import { separators } from "./constants/separators";
import { sheets } from "./constants/sheets";
import { sliders } from "./constants/sliders";
import { spinners } from "./constants/spinners";
import { typographies } from "./constants/typographies";
import { toggleGroups } from "./constants/toggle-groups";
import { toggles } from "./constants/toggles";
import { textareas } from "./constants/textareas";
import { auth } from "./constants/auth";
import { faq } from "./constants/faq";
import { testimonials } from "./constants/testimonials";
import { pricing } from "./constants/pricing";
import { hero } from "./constants/hero";
import { charts } from "./constants/charts";
import { calendar } from "./constants/calendar";
import { blogEntries } from "./constants/blog";

/** All registered examples, keyed by id. */
const allEntries: RegistryEntry[] = [
  ...buttons,
  ...badges,
  ...avatars,
  ...inputs,
  ...cards,
  ...headers,
  ...forms,
  ...tables,
  ...pagination,
  ...timelines,
  ...layouts,
  ...menus,
  ...drawers,
  ...footers,
  ...modals,
  ...dialogs,
  ...carousels,
  ...feedback,
  ...search,
  ...promptBuilders,
  ...commandPalettes,
  ...apiExplorers,
  ...jsonTreeViewers,
  ...terminalEmulators,
  ...docks,
  ...floatingToolbars,
  ...bentoGrids,
  ...spotlightSearches,
  ...dependencyGraphs,
  ...pricingCalculators,
  ...propsEditors,
  ...commands,
  ...alerts,
  ...alertDialogs,
  ...aspectRatios,
  ...attachments,
  ...breadcrumbs,
  ...bubbles,
  ...buttonGroups,
  ...checkboxes,

  ...comboboxes,
  ...contextMenus,
  ...directions,
  ...items,
  ...kbds,
  ...markers,
  ...messages,
  ...messageScrollers,
  ...nativeSelects,
  ...navigationMenus,
  ...progresses,
  ...radioGroups,
  ...scrollAreas,
  ...selects,
  ...separators,
  ...sheets,
  ...sliders,
  ...spinners,
  ...typographies,
  ...toggleGroups,
  ...toggles,
  ...textareas,
  ...auth,
  ...faq,
  ...testimonials,
  ...pricing,
  ...hero,
  ...charts,
  ...calendar,
  ...blogEntries,
];

export const registry: Record<string, RegistryItem> = Object.fromEntries(
  allEntries.map((item) => [item.id, item])
) as Record<string, RegistryItem>;

/** Ordered list of registry ids, e.g. for the page-level table of contents. */
export const registryIds: string[] = allEntries.map((item) => item.id);

export function getRegistryItem(id: string): RegistryItem | undefined {
  return registry[id];
}
