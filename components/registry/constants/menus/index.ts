import { cmdPaletteDefault } from "./cmd-palette-default";
import { cmdPaletteLayouts } from "./cmd-palette-layouts";
import { cmdPaletteFiltered } from "./cmd-palette-filtered";
import { cmdPaletteDanger } from "./cmd-palette-danger";
import { cmdPaletteDensity } from "./cmd-palette-density";
import { cmdPaletteDisplay } from "./cmd-palette-display";
import { cmdPalettePlaceholders } from "./cmd-palette-placeholders";
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

export { bookmarkMenu, canvasMenu, chatMenu, cmdButtonSource, cmdData, cmdPaletteSource, ctxSubmenu, desktopMenu, editorMenu, emailMenu, fileMenu, folderMenu, imageMenu, linkMenu, tabMenu, tableMenu, textMenu } from "./shared";
import type { RegistryEntry } from "../../types";

/** Command menu examples. Each is one preview block on the Command Menu page. */
export const menus: RegistryEntry[] = [
  cmdPaletteDefault,
  cmdPaletteLayouts,
  cmdPaletteFiltered,
  cmdPaletteDanger,
  cmdPaletteDensity,
  cmdPaletteDisplay,
  cmdPalettePlaceholders,
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
