export {
  DEFAULT_BREAKPOINTS,
  BASE_BREAKPOINT,
  breakpointIndex,
} from "./breakpoints";
export {
  SHADOW_PRESETS,
  getShadowPreset,
  type ShadowPreset,
} from "./shadows";
export { COLOR_SWATCHES, DEFAULT_COLOR } from "./swatches";
export {
  ICON_PATHS,
  ICON_NAMES,
  DEFAULT_ICON,
  getIcon,
} from "./icons";

export const PRESETS_STORAGE_KEY = "props-editor:presets";
export const MAX_PRESETS = 24;
export const MAX_HISTORY = 60;
