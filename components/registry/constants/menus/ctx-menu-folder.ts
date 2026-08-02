import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { folderMenu, ctxSource } from "./shared";

export const ctxMenuFolder: RegistryEntry = entry({
    id: "ctx-menu-folder",
    title: "Folder Menu",
    description: "Open, copy path, paste here, and create new items.",
    source: ctxSource({
      comp: "ContextMenuFolder",
      zone: "Folder",
      color: "border-amber-300 bg-warning-soft text-warning dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300",
      menu: folderMenu,
      menuVar: "folderMenu",
    }),
  });
