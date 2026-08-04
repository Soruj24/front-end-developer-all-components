import { ctxMenuText } from "./ctx-menu-text";
import { ctxMenuImage } from "./ctx-menu-image";
import { ctxMenuFile } from "./ctx-menu-file";
import { ctxMenuFolder } from "./ctx-menu-folder";
import { ctxMenuLink } from "./ctx-menu-link";
import { ctxMenuTable } from "./ctx-menu-table";
import { ctxMenuDesktop } from "./ctx-menu-desktop";
import { ctxMenuEditor } from "./ctx-menu-editor";
import { ctxMenuCanvas } from "./ctx-menu-canvas";
import { ctxMenuEmail } from "./ctx-menu-email";
import { ctxMenuChat } from "./ctx-menu-chat";
import { ctxMenuBookmark } from "./ctx-menu-bookmark";
import { ctxMenuTab } from "./ctx-menu-tab";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Context Menu page. */
export const contextMenus: RegistryEntry[] = [
  ctxMenuText,
  ctxMenuImage,
  ctxMenuFile,
  ctxMenuFolder,
  ctxMenuLink,
  ctxMenuTable,
  ctxMenuDesktop,
  ctxMenuEditor,
  ctxMenuCanvas,
  ctxMenuEmail,
  ctxMenuChat,
  ctxMenuBookmark,
  ctxMenuTab,
];
