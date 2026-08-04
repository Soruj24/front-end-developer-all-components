import { nativeSelectDefault } from "./native-select-default";
import { nativeSelectSizes } from "./native-select-sizes";
import { nativeSelectHelper } from "./native-select-helper";
import type { RegistryEntry } from "../../types";

export const nativeSelects: RegistryEntry[] = [
  nativeSelectDefault,
  nativeSelectSizes,
  nativeSelectHelper,
];
