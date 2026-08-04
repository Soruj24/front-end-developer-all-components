import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationMenuDefault: RegistryEntry = entry({
  id: "navigation-menu-default",
  title: "Default",
  description: "Default horizontal navigation menu.",
  source: `import { NavigationMenu } from "@/components/_navigation-menu";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
];

export default function NavigationMenuDefault() {
  return <NavigationMenu items={items} />;
}`,
});
