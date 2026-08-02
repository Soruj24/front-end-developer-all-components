import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { fileMenu, ctxSource } from "./shared";

export const ctxMenuFile: RegistryEntry = entry({
    id: "ctx-menu-file",
    title: "File Area Menu",
    description: "Open, rename, duplicate, a Move-to submenu, and delete.",
    source: ctxSource({
      comp: "ContextMenuFile",
      zone: "File Area",
      color: "border-purple-300 bg-purple-50 text-purple-600 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
      menu: fileMenu,
      menuVar: "fileMenu",
    }),
  });
