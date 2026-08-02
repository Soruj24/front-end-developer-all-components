import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationBasic: RegistryEntry = entry({
    id: "navigation-basic",
    title: "Basic Horizontal Nav",
    description: "Simple inline link navigation bar.",
    source: `import Link from "next/link";

const navItems = ["Home", "Products", "About", "Contact"];

export default function NavigationBasic() {
  return (
    <nav className="flex w-full items-center gap-6 rounded-lg border border-black/[.08] px-4 py-3 dark:border-white/[.145]">
      {navItems.map((item) => (
        <Link key={item} href="#" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
          {item}
        </Link>
      ))}
    </nav>
  );
}`,
  });
