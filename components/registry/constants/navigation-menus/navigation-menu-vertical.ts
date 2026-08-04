import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationMenuVertical: RegistryEntry = entry({
  id: "navigation-menu-vertical",
  title: "Vertical",
  description: "Vertical navigation menu for sidebars.",
  source: `import { NavigationMenu } from "@/components/_navigation-menu";

const items = [
  { label: "Getting Started", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Examples", href: "/examples" },
  { label: "Themes", href: "/themes" },
];

export default function NavigationMenuVertical() {
  return (
    <div className="w-48">
      <NavigationMenu items={items} orientation="vertical" />
    </div>
  );
}`,
});
