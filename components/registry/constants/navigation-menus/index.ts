import { navigationMenuDefault } from "./navigation-menu-default";
import { navigationMenuVertical } from "./navigation-menu-vertical";
import { navigationMenuSubmenu } from "./navigation-menu-submenu";
import type { RegistryEntry } from "../../types";

export const navigationMenus: RegistryEntry[] = [
  navigationMenuDefault,
  navigationMenuVertical,
  navigationMenuSubmenu,
];
