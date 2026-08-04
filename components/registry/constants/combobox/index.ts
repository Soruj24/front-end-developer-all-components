import { comboboxSingle } from "./combobox-single";
import { comboboxMultiple } from "./combobox-multiple";
import { comboboxWithIcons } from "./combobox-with-icons";
import { comboboxGrouped } from "./combobox-grouped";
import { comboboxDefaultValue } from "./combobox-default-value";
import { comboboxEmpty } from "./combobox-empty";
import { comboboxWithDescription } from "./combobox-with-description";
import { comboboxForm } from "./combobox-form";
import { comboboxCommandPalette } from "./combobox-command-palette";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Combobox page. */
export const comboboxes: RegistryEntry[] = [
  comboboxSingle,
  comboboxMultiple,
  comboboxWithIcons,
  comboboxGrouped,
  comboboxDefaultValue,
  comboboxEmpty,
  comboboxWithDescription,
  comboboxForm,
  comboboxCommandPalette,
];
