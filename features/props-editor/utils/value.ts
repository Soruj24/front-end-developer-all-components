import type {
  BoxValue,
  Breakpoint,
  FieldDef,
  PropValue,
  ResponsiveValue,
  Values,
  WidthHeightValue,
} from "../types";
import { breakpointIndex } from "../constants";

export const RESPONSIVE_MARKER = "__responsive";

export function isResponsiveValue(value: unknown): value is ResponsiveValue {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as ResponsiveValue).__responsive === true
  );
}

export function cloneValue<T>(value: T): T {
  if (typeof value !== "object" || value === null) return value;
  if (Array.isArray(value)) return value.map(cloneValue) as unknown as T;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(value)) {
    out[key] = cloneValue((value as Record<string, unknown>)[key]);
  }
  return out as T;
}

export function cloneValues(values: Values): Values {
  const out: Values = {};
  for (const key of Object.keys(values)) out[key] = cloneValue(values[key]);
  return out;
}

/** Default value for a field when none is supplied. */
export function fieldDefault(field: FieldDef): PropValue {
  switch (field.type) {
    case "text":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "select":
    case "radio":
      return field.options[0]?.value ?? "";
    case "color":
      return "#6366f1";
    case "slider":
      return field.min;
    case "icon":
      return field.icons?.[0] ?? "star";
    case "image":
      return "";
    case "padding":
    case "margin":
    case "borderRadius":
      return { top: 0, right: 0, bottom: 0, left: 0, linked: true } as BoxValue;
    case "shadow":
      return "none";
    case "width":
    case "height":
      return { auto: true, value: 320, unit: "px" } as WidthHeightValue;
  }
}

/** Initial values object from schema + optional overrides. */
export function buildInitialValues(
  schema: FieldDef[],
  defaults?: Values
): Values {
  const values: Values = {};
  for (const field of schema) {
    values[field.id] =
      defaults?.[field.id] !== undefined
        ? cloneValue(defaults[field.id])
        : field.defaultValue !== undefined
          ? cloneValue(field.defaultValue)
          : fieldDefault(field);
  }
  return values;
}

/** Resolves a field's value for a breakpoint, inheriting from smaller ones. */
export function getFieldValue(
  values: Values,
  field: FieldDef,
  bps: Breakpoint[],
  breakpointId: string
): PropValue {
  const stored = values[field.id];
  if (!field.responsive) return stored !== undefined ? stored : (field.defaultValue ?? fieldDefault(field));
  if (stored === undefined) return field.defaultValue ?? fieldDefault(field);
  const rv = isResponsiveValue(stored)
    ? stored
    : ({ [RESPONSIVE_MARKER]: true, base: stored } as ResponsiveValue);
  const index = breakpointIndex(bps, breakpointId);
  for (let i = index; i >= 0; i -= 1) {
    const id = bps[i].id;
    if (id in rv) return rv[id] as PropValue;
  }
  return (rv.base ?? field.defaultValue ?? fieldDefault(field)) as PropValue;
}

/** True when the active breakpoint holds an explicit override. */
export function isOverriddenAt(
  values: Values,
  field: FieldDef,
  breakpointId: string
): boolean {
  if (!field.responsive || breakpointId === "base") return false;
  const stored = values[field.id];
  return isResponsiveValue(stored) && breakpointId in stored;
}

/** Sets a field's value at a breakpoint (responsive-aware). */
export function setFieldValue(
  values: Values,
  field: FieldDef,
  breakpointId: string,
  value: PropValue
): Values {
  if (!field.responsive) {
    return { ...values, [field.id]: value };
  }
  const stored = values[field.id];
  const rv: ResponsiveValue = isResponsiveValue(stored)
    ? cloneValue(stored)
    : ({ [RESPONSIVE_MARKER]: true, base: stored ?? (field.defaultValue ?? fieldDefault(field)) } as ResponsiveValue);
  rv[breakpointId] = value;
  return { ...values, [field.id]: rv };
}

/** Removes the explicit override at a breakpoint so it inherits again. */
export function clearOverrideAt(
  values: Values,
  field: FieldDef,
  breakpointId: string
): Values {
  if (!field.responsive || breakpointId === "base") return values;
  const stored = values[field.id];
  if (!isResponsiveValue(stored) || !(breakpointId in stored)) return values;
  const rv = cloneValue(stored);
  delete rv[breakpointId];
  return { ...values, [field.id]: rv };
}
