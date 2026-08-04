import { radioGroupDefault } from "./radio-group-default";
import { radioGroupDisabled } from "./radio-group-disabled";
import { radioGroupHorizontal } from "./radio-group-horizontal";
import { radioGroupDescription } from "./radio-group-description";
import type { RegistryEntry } from "../../types";

export const radioGroups: RegistryEntry[] = [
  radioGroupDefault,
  radioGroupDisabled,
  radioGroupHorizontal,
  radioGroupDescription,
];
