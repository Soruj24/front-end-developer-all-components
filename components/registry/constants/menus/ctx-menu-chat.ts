import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { chatMenu, ctxSource } from "./shared";

export const ctxMenuChat: RegistryEntry = entry({
    id: "ctx-menu-chat",
    title: "Chat Menu",
    description: "Reply, react with an emoji submenu, forward, and pin.",
    source: ctxSource({
      comp: "ContextMenuChat",
      zone: "Chat",
      color: "border-violet-300 bg-violet-50 text-violet-600 dark:border-violet-700 dark:bg-violet-900/20 dark:text-violet-300",
      menu: chatMenu,
      menuVar: "chatMenu",
    }),
  });
