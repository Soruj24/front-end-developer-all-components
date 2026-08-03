export type {
  Breakpoint,
  FieldDef,
  TextField,
  NumberField,
  BooleanField,
  SelectField,
  RadioField,
  ColorField,
  SliderField,
  IconField,
  ImageField,
  BoxField,
  ShadowField,
  WidthHeightField,
  PropValue,
  BoxValue,
  WidthHeightValue,
  ResponsiveValue,
  Values,
  Preset,
} from "./types";

export {
  DEFAULT_BREAKPOINTS,
  BASE_BREAKPOINT,
  breakpointIndex,
  SHADOW_PRESETS,
  getShadowPreset,
  COLOR_SWATCHES,
  DEFAULT_COLOR,
  ICON_PATHS,
  ICON_NAMES,
  DEFAULT_ICON,
  getIcon,
} from "./constants";

export {
  RESPONSIVE_MARKER,
  isResponsiveValue,
  cloneValues,
  fieldDefault,
  buildInitialValues,
  getFieldValue,
  isOverriddenAt,
  setFieldValue,
  clearOverrideAt,
} from "./utils/value";

export { boxToCss, sizeToCss, shadowToCss, boxStyle } from "./utils/style";

export { usePropsEditor, type UsePropsEditorOptions, type UsePropsEditorResult } from "./hooks/usePropsEditor";
export { usePresets, type UsePresetsResult } from "./hooks/usePresets";

export { VisualPropsEditor, type VisualPropsEditorProps } from "./components/VisualPropsEditor";
export { Icon, type IconProps } from "./components/Icon";

export { profileCardSchema, profileCardDefaults, ProfileCard } from "./demo";
