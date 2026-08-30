import type { RegistryCategory } from "../types/category";

/** Fixed category taxonomy. Add new categories here to extend the registry. */
export const registryCategories: RegistryCategory[] = [
  {
    id: "buttons",
    label: "Buttons",
    description: "Actions, toggles, and segmented controls",
    icon: "▦",
  },
  {
    id: "inputs",
    label: "Inputs",
    description: "Text fields, selects, switches, and sliders",
    icon: "⌨",
  },
  {
    id: "data-display",
    label: "Data Display",
    description: "Tables, cards, avatars, and badges",
    icon: "⊟",
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Alerts, toasts, skeletons, and spinners",
    icon: "⚠",
  },
  {
    id: "overlays",
    label: "Overlays",
    description: "Modals, dialogs, tooltips, and menus",
    icon: "⊕",
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Accordions, tabs, docks, and toolbars",
    icon: "➤",
  },
  {
    id: "surfaces",
    label: "Surfaces",
    description: "Playgrounds, grids, and explorers",
    icon: "▣",
  },
  {
    id: "dsa",
    label: "DSA",
    description: "Data structures and algorithms with interactive visualizations",
    icon: "◆",
  },
];

export const categoryBySlug = Object.fromEntries(
  registryCategories.map((category) => [category.id, category])
);
