import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { tableMenu, ctxSource } from "./shared";

export const ctxMenuTable: RegistryEntry = entry({
    id: "ctx-menu-table",
    title: "Table Row Menu",
    description: "Edit, duplicate, sort, and delete a row.",
    source: ctxSource({
      comp: "ContextMenuTable",
      zone: "Table Row",
      color: "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-700 dark:bg-rose-900/20 dark:text-rose-300",
      menu: tableMenu,
      menuVar: "tableMenu",
    }),
  });
