export interface Breakpoint {
  id: string;
  label: string;
  minWidth: number;
}

export interface Option {
  value: string;
  label: string;
}

/** Four-sided spacing/radius value (px). */
export interface BoxValue {
  top: number;
  right: number;
  bottom: number;
  left: number;
  linked: boolean;
}

/** Width/height with unit choice; `auto` means "no explicit size". */
export interface WidthHeightValue {
  auto: boolean;
  value: number;
  unit: "px" | "rem" | "%";
}

/** Per-breakpoint value wrapper for responsive fields. */
export interface ResponsiveValue {
  __responsive: true;
  [breakpointId: string]: PropValue | boolean;
}

export type PropValue =
  | string
  | number
  | boolean
  | BoxValue
  | WidthHeightValue
  | ResponsiveValue;

export type PropFieldType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "radio"
  | "color"
  | "slider"
  | "icon"
  | "image"
  | "padding"
  | "margin"
  | "borderRadius"
  | "shadow"
  | "width"
  | "height";

interface FieldBase {
  id: string;
  label: string;
  type: PropFieldType;
  group?: string;
  description?: string;
  /** When true the value is resolved per breakpoint. */
  responsive?: boolean;
  defaultValue?: PropValue;
}

export interface TextField extends FieldBase {
  type: "text";
  placeholder?: string;
}

export interface NumberField extends FieldBase {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface BooleanField extends FieldBase {
  type: "boolean";
}

export interface SelectField extends FieldBase {
  type: "select";
  options: Option[];
}

export interface RadioField extends FieldBase {
  type: "radio";
  options: Option[];
}

export interface ColorField extends FieldBase {
  type: "color";
  swatches?: string[];
}

export interface SliderField extends FieldBase {
  type: "slider";
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export interface IconField extends FieldBase {
  type: "icon";
  icons?: string[];
}

export interface ImageField extends FieldBase {
  type: "image";
  placeholder?: string;
}

export interface BoxField extends FieldBase {
  type: "padding" | "margin" | "borderRadius";
  min?: number;
  max?: number;
}

export interface ShadowField extends FieldBase {
  type: "shadow";
  presets?: string[];
}

export interface WidthHeightField extends FieldBase {
  type: "width" | "height";
  min?: number;
  max?: number;
}

export type FieldDef =
  | TextField
  | NumberField
  | BooleanField
  | SelectField
  | RadioField
  | ColorField
  | SliderField
  | IconField
  | ImageField
  | BoxField
  | ShadowField
  | WidthHeightField;

export type Values = Record<string, PropValue>;

/** A named snapshot of values, persisted in localStorage. */
export interface Preset {
  id: string;
  name: string;
  values: Values;
  createdAt: number;
}
