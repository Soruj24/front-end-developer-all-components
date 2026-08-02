import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { linkMenu, ctxSource } from "./shared";

export const ctxMenuLink: RegistryEntry = entry({
    id: "ctx-menu-link",
    title: "Link Menu",
    description: "Open, copy, bookmark, and share link actions.",
    source: ctxSource({
      comp: "ContextMenuLink",
      zone: "Link",
      color: "border-cyan-300 bg-cyan-50 text-cyan-600 dark:border-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300",
      menu: linkMenu,
      menuVar: "linkMenu",
    }),
  });
