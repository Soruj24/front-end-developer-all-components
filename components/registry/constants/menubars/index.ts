import { menubarDefault } from "./menubar-default";
import { menubarIcons } from "./menubar-icons";
import { menubarDisabled } from "./menubar-disabled";
import type { RegistryEntry } from "../../types";

export const menubars: RegistryEntry[] = [
  menubarDefault,
  menubarIcons,
  menubarDisabled,
];
