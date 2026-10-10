import { component } from "./factory";
import { modalProps, modalSource } from "./sources/modal";
import { dialogProps, dialogSource } from "./sources/dialog";
import { drawerProps, drawerSource } from "./sources/drawer";
import { popoverProps, popoverSource } from "./sources/popover";
import { tooltipProps, tooltipSource } from "./sources/tooltip";
import { dropdownProps, dropdownSource } from "./sources/dropdown";
import { contextMenuProps, contextMenuSource } from "./sources/context-menu";
import { commandMenuProps, commandMenuSource } from "./sources/command-menu";
import { commandPaletteProps, commandPaletteSource } from "./sources/command-palette";
import { spotlightSearchProps, spotlightSearchSource } from "./sources/spotlight-search";

export const overlays = [
  component({
    slug: "modal",
    name: "Modal",
    description: "Centered dialogs with focus trap, backdrop, and escape handling.",
    category: "overlays",
    tags: ["dialog", "popup", "focus"],
    updatedAt: "2026-04-25T00:00:00.000Z",
    stats: { downloads: 394_760, likes: 4_806, bookmarks: 1_788, comments: 218, views: 915_000 },
    dependencies: ["react", "react-dom"],
    files: ["components/ui/Modal.tsx"],
    sizes: ["sm", "md", "lg", "xl", "fullscreen"],
    features: ["sizes", "dark-mode", "accessibility", "responsive"],
    longDescription:
      "Modal is a controlled, portal-based dialog with a real focus trap (Tab cycles inside the panel), " +
      "Escape-to-close, backdrop-click dismiss, scroll locking, and focus restoration. Pick a size preset from sm to fullscreen.",
    props: modalProps,
    source: modalSource,
  }),
  component({
    slug: "dialog",
    name: "Dialog",
    description: "Confirm, alert, and form dialogs with actions.",
    category: "overlays",
    tags: ["confirm", "alert", "popup"],
    updatedAt: "2026-03-28T00:00:00.000Z",
    stats: { downloads: 301_540, likes: 3_688, bookmarks: 1_371, comments: 156, views: 705_000 },
    dependencies: ["react", "react-dom"],
    files: ["components/ui/Dialog.tsx"],
    features: ["dark-mode", "accessibility"],
    longDescription:
      "Dialog is a compound, portal-based component (Dialog + Trigger, Content, Header, Title, Description, Footer) " +
      "with Escape-to-close, backdrop-click dismiss, scroll locking, and initial focus management. " +
      "There are no built-in confirm/alert/prompt presets — compose them from the parts.",
    props: dialogProps,
    source: dialogSource,
  }),
  component({
    slug: "drawer",
    name: "Drawer",
    description: "Side panels that slide in from any screen edge.",
    category: "overlays",
    tags: ["panel", "side", "offcanvas"],
    updatedAt: "2026-04-05T00:00:00.000Z",
    stats: { downloads: 264_890, likes: 3_214, bookmarks: 1_198, comments: 134, views: 615_000 },
    files: ["components/ui/Drawer/Drawer.tsx", "components/ui/Drawer/Drawer.types.ts", "components/ui/Drawer/index.ts"],
    variants: ["left", "right", "top", "bottom"],
    features: ["variants", "dark-mode", "accessibility", "responsive"],
    longDescription:
      "Drawer is a compound slide-in panel (Drawer + Trigger, Content, Header, Title, Description, Footer, Close) " +
      "supporting all four screen edges, with Escape-to-close, backdrop-click dismiss, and scroll locking.",
    props: drawerProps,
    source: drawerSource,
  }),
  component({
    slug: "popover",
    name: "Popover",
    description: "Click-triggered floating panels anchored to a trigger.",
    category: "overlays",
    tags: ["floating", "panel", "menu"],
    updatedAt: "2026-02-08T00:00:00.000Z",
    stats: { downloads: 176_430, likes: 2_188, bookmarks: 830, comments: 81, views: 415_000 },
    files: ["components/ui/Popover.tsx"],
    variants: ["top", "bottom", "left", "right"],
    features: ["variants", "dark-mode", "accessibility", "responsive"],
    longDescription:
      "Popover is a controlled, click-triggered floating panel anchored to a trigger in four placements. " +
      "It closes on outside mousedown; there is no Escape handling or focus management.",
    props: popoverProps,
    source: popoverSource,
  }),
  component({
    slug: "tooltip",
    name: "Tooltip",
    description: "Hover and focus tooltips in all four placements.",
    category: "overlays",
    tags: ["hint", "floating", "label"],
    updatedAt: "2026-01-22T00:00:00.000Z",
    stats: { downloads: 342_910, likes: 4_205, bookmarks: 1_566, comments: 178, views: 800_000 },
    files: ["components/ui/Tooltip/Tooltip.tsx", "components/ui/Tooltip/Tooltip.types.ts", "components/ui/Tooltip/index.ts"],
    variants: ["top", "bottom", "left", "right"],
    features: ["variants", "dark-mode", "accessibility"],
    longDescription:
      "Tooltip shows a role=tooltip label on hover and keyboard focus in four placements, with a configurable show delay.",
    props: tooltipProps,
    source: tooltipSource,
  }),
  component({
    slug: "dropdown",
    name: "Dropdown",
    description: "Click-triggered menu dropdowns with icons, shortcuts, and danger states.",
    category: "overlays",
    tags: ["menu", "select", "list"],
    updatedAt: "2026-03-15T00:00:00.000Z",
    stats: { downloads: 289_760, likes: 3_512, bookmarks: 1_305, comments: 148, views: 675_000 },
    files: ["components/ui/Dropdown.tsx"],
    features: ["dark-mode", "accessibility", "responsive"],
    longDescription:
      "Dropdown (default export from components/ui/Dropdown.tsx — not the separate DropdownMenu compound) is an " +
      "uncontrolled click-triggered menu driven by an items array with dividers, icons, shortcuts, disabled, and " +
      "danger rows. It closes on outside click; there is no Escape or arrow-key navigation.",
    props: dropdownProps,
    source: dropdownSource,
  }),
  component({
    slug: "context-menu",
    name: "Context Menu",
    description: "Right-click menus with nested submenus.",
    category: "overlays",
    tags: ["right-click", "menu", "nested"],
    updatedAt: "2026-02-20T00:00:00.000Z",
    stats: { downloads: 108_920, likes: 1_402, bookmarks: 512, comments: 47, views: 256_000 },
    files: ["components/ui/ContextMenu.tsx"],
    features: ["dark-mode", "accessibility"],
    longDescription:
      "ContextMenu opens at the cursor on right-click, renders at a fixed position with hover-driven nested submenus, " +
      "and dismisses on outside click or Escape.",
    props: contextMenuProps,
    source: contextMenuSource,
  }),
  component({
    slug: "command-menu",
    name: "Command Menu",
    description: "Grouped command lists with search filtering and keyboard navigation.",
    category: "overlays",
    tags: ["palette", "shortcut", "command"],
    updatedAt: "2026-04-18T00:00:00.000Z",
    stats: { downloads: 218_340, likes: 2_876, bookmarks: 1_098, comments: 121, views: 520_000 },
    files: ["components/ui/CommandMenu.tsx"],
    features: ["icons", "dark-mode", "accessibility"],
    longDescription:
      "CommandMenu is a controlled overlay of grouped actions with live filtering and full keyboard support " +
      "(ArrowUp/Down, Enter, Escape). It has no built-in Cmd+K shortcut binding — control open state yourself.",
    props: commandMenuProps,
    source: commandMenuSource,
  }),
  component({
    slug: "command-palette",
    name: "Command Palette",
    description: "Feature-rich command search with recent and favorites.",
    category: "overlays",
    tags: ["palette", "search", "command"],
    updatedAt: "2026-05-11T00:00:00.000Z",
    stats: { downloads: 121_450, likes: 1_668, bookmarks: 634, comments: 58, views: 289_000 },
    dependencies: ["react", "lucide-react"],
    files: [
      "components/ui/CommandPalette/CommandPalette.tsx",
      "components/ui/CommandPalette/CommandPalette.types.ts",
      "components/ui/CommandPalette/CommandPalette.utils.ts",
      "components/ui/CommandPalette/CommandPalettePieces.tsx",
      "components/ui/CommandPalette/CommandPalettePieces2.tsx",
      "components/ui/CommandPalette/CommandPalette.icons.tsx",
      "components/ui/CommandPalette/index.ts",
    ],
    features: ["icons", "dark-mode", "accessibility", "responsive"],
    longDescription:
      "CommandPalette is a Cmd+K command runner with fuzzy grouped search, submenus with breadcrumbs, recents, " +
      "favorites and pins persisted to localStorage, match highlighting, and full keyboard navigation " +
      "(arrows, Home/End, Enter, Escape, Backspace to go back).",
    props: commandPaletteProps,
    source: commandPaletteSource,
  }),
  component({
    slug: "spotlight-search",
    name: "Spotlight Search",
    description: "Animated spotlight search with highlights and recents.",
    category: "overlays",
    tags: ["search", "spotlight", "keyboard"],
    updatedAt: "2026-04-12T00:00:00.000Z",
    stats: { downloads: 88_140, likes: 1_215, bookmarks: 447, comments: 36, views: 212_000 },
    dependencies: ["react", "react-dom", "lucide-react"],
    files: [
      "components/ui/SpotlightSearch/SpotlightSearch.tsx",
      "components/ui/SpotlightSearch/SpotlightSearch.types.ts",
      "components/ui/SpotlightSearch/SpotlightSearch.utils.ts",
      "components/ui/SpotlightSearch/SpotlightSearchPieces.tsx",
      "components/ui/SpotlightSearch/SpotlightSearchPieces2.tsx",
      "components/ui/SpotlightSearch/SpotlightSearch.icons.tsx",
      "components/ui/SpotlightSearch/index.ts",
    ],
    features: ["icons", "dark-mode", "accessibility", "responsive"],
    longDescription:
      "SpotlightSearch is a portal-based Cmd+K search panel with match highlighting, popular and recent sections " +
      "(recents persisted to localStorage), a Tab focus trap, and arrow-key plus Enter/Escape keyboard support.",
    props: spotlightSearchProps,
    source: spotlightSearchSource,
  }),
];
