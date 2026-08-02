import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { textMenu, ctxSource } from "./shared";

export const ctxMenuText: RegistryEntry = entry({
    id: "ctx-menu-text",
    title: "Text Area Menu",
    description: "Copy, paste, cut (disabled), and select-all.",
    source: ctxSource({
      comp: "ContextMenuText",
      zone: "Text Area",
      color: "border-blue-300 bg-blue-50 text-primary dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
      menu: textMenu,
      menuVar: "textMenu",
    }),
  });
