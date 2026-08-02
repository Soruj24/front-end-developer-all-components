import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { desktopMenu, ctxSource } from "./shared";

export const ctxMenuDesktop: RegistryEntry = entry({
    id: "ctx-menu-desktop",
    title: "Desktop Menu",
    description: "New items, paste, refresh, and display settings.",
    source: ctxSource({
      comp: "ContextMenuDesktop",
      zone: "Desktop",
      color: "border-zinc-300 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/20 dark:text-zinc-300",
      menu: desktopMenu,
      menuVar: "desktopMenu",
    }),
  });
