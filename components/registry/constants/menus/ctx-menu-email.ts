import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { emailMenu, ctxSource } from "./shared";

export const ctxMenuEmail: RegistryEntry = entry({
    id: "ctx-menu-email",
    title: "Email Menu",
    description: "Reply, forward, read state, archive, and delete.",
    source: ctxSource({
      comp: "ContextMenuEmail",
      zone: "Email",
      color: "border-teal-300 bg-teal-50 text-teal-600 dark:border-teal-700 dark:bg-teal-900/20 dark:text-teal-300",
      menu: emailMenu,
      menuVar: "emailMenu",
    }),
  });
