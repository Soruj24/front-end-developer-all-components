import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { bookmarkMenu, ctxSource } from "./shared";

export const ctxMenuBookmark: RegistryEntry = entry({
    id: "ctx-menu-bookmark",
    title: "Bookmark Menu",
    description: "Open, edit, move to a folder, and delete.",
    source: ctxSource({
      comp: "ContextMenuBookmark",
      zone: "Bookmark",
      color: "border-orange-300 bg-orange-50 text-orange-600 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
      menu: bookmarkMenu,
      menuVar: "bookmarkMenu",
    }),
  });
