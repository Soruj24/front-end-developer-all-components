import { sheetDefault } from "./sheet-default";
import { sheetSides } from "./sheet-sides";
import { sheetSizes } from "./sheet-sizes";
import type { RegistryEntry } from "../../types";

export const sheets: RegistryEntry[] = [
  sheetDefault,
  sheetSides,
  sheetSizes,
];
