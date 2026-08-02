import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { editorMenu, ctxSource } from "./shared";

export const ctxMenuEditor: RegistryEntry = entry({
    id: "ctx-menu-editor",
    title: "Editor Menu",
    description: "Format, comment, navigate to definition, and rename symbol.",
    source: ctxSource({
      comp: "ContextMenuEditor",
      zone: "Editor",
      color: "border-indigo-300 bg-indigo-50 text-primary dark:border-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300",
      menu: editorMenu,
      menuVar: "editorMenu",
    }),
  });
