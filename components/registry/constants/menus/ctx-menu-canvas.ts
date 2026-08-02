import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { canvasMenu, ctxSource } from "./shared";

export const ctxMenuCanvas: RegistryEntry = entry({
    id: "ctx-menu-canvas",
    title: "Canvas Menu",
    description: "Undo, redo, layer ordering, grouping, and delete.",
    source: ctxSource({
      comp: "ContextMenuCanvas",
      zone: "Canvas",
      color: "border-pink-300 bg-pink-50 text-pink-600 dark:border-pink-700 dark:bg-pink-900/20 dark:text-pink-300",
      menu: canvasMenu,
      menuVar: "canvasMenu",
    }),
  });
