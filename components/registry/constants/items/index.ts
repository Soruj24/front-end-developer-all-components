import { itemBasic } from "./item-basic";
import { itemSelected } from "./item-selected";
import { itemDisabled } from "./item-disabled";
import { itemIcon } from "./item-icon";
import { itemInset } from "./item-inset";
import { itemVariants } from "./item-variants";
import { itemGroup } from "./item-group";
import { itemNavigation } from "./item-navigation";
import type { RegistryEntry } from "../../types";

export const items: RegistryEntry[] = [
  itemBasic,
  itemSelected,
  itemDisabled,
  itemIcon,
  itemInset,
  itemVariants,
  itemGroup,
  itemNavigation,
];
