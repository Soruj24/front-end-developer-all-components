import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { tabMenu, ctxSource } from "./shared";

export const ctxMenuTab: RegistryEntry = entry({
    id: "ctx-menu-tab",
    title: "Browser Tab Menu",
    description: "Reload, duplicate, pin, mute, and close tabs.",
    source: ctxSource({
      comp: "ContextMenuTab",
      zone: "Browser Tab",
      color: "border-lime-300 bg-lime-50 text-lime-600 dark:border-lime-700 dark:bg-lime-900/20 dark:text-lime-300",
      menu: tabMenu,
      menuVar: "tabMenu",
    }),
  });
