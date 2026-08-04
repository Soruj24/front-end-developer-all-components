import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationMenuSubmenu: RegistryEntry = entry({
  id: "navigation-menu-submenu",
  title: "With Submenu",
  description: "Navigation menu with nested dropdown items.",
  source: `import { NavigationMenu } from "@/components/_navigation-menu";

const items = [
  { label: "Home", href: "/" },
  {
    label: "Components",
    children: [
      { label: "Button", href: "/components/button" },
      { label: "Card", href: "/components/card" },
      { label: "Input", href: "/components/input" },
    ],
  },
  {
    label: "Docs",
    children: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
    ],
  },
];

export default function NavigationMenuSubmenu() {
  return <NavigationMenu items={items} />;
}`,
});
