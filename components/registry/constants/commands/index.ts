import { commandDefault } from "./command-default";
import { commandGroups } from "./command-groups";
import { commandShortcuts } from "./command-shortcuts";
import { commandIcons } from "./command-icons";
import { commandBadges } from "./command-badges";
import { commandDialog } from "./command-dialog";
import { commandNested } from "./command-nested";
import { commandMaxResults } from "./command-max-results";
import { commandCustomEmpty } from "./command-custom-empty";
import { commandTheme } from "./command-theme";
import type { RegistryEntry } from "../../types";

export const commands: RegistryEntry[] = [
  commandDefault,
  commandGroups,
  commandShortcuts,
  commandIcons,
  commandBadges,
  commandDialog,
  commandNested,
  commandMaxResults,
  commandCustomEmpty,
  commandTheme,
];
