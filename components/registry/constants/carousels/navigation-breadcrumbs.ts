import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationBreadcrumbs: RegistryEntry = entry({
    id: "navigation-breadcrumbs",
    title: "Breadcrumbs",
    description: "Current location trail with link separators.",
    source: `import Link from "next/link";

export default function NavigationBreadcrumbs() {
  return (
    <nav className="flex w-full items-center gap-2 text-sm text-zinc-500">
      <Link href="#" className="hover:text-zinc-950 dark:hover:text-zinc-50">Home</Link>
      <span>/</span>
      <Link href="#" className="hover:text-zinc-950 dark:hover:text-zinc-50">Products</Link>
      <span>/</span>
      <span className="text-zinc-950 dark:text-zinc-50">Shoes</span>
    </nav>
  );
}`,
  });
