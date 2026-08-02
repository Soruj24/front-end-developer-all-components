import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { imageMenu, ctxSource } from "./shared";

export const ctxMenuImage: RegistryEntry = entry({
    id: "ctx-menu-image",
    title: "Image Area Menu",
    description: "Save, copy, open, share, and download actions.",
    source: ctxSource({
      comp: "ContextMenuImage",
      zone: "Image Area",
      color: "border-green-300 bg-success-soft text-success dark:border-green-700 dark:bg-green-900/20 dark:text-green-300",
      menu: imageMenu,
      menuVar: "imageMenu",
    }),
  });
