import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarBreadcrumbs: RegistryEntry = entry({
    id: "navbar-breadcrumbs",
    title: "Breadcrumbs & Version Badge",
    description: "Crumb trails and version-tagged doc navs.",
    source: `export default function NavbarBreadcrumbs() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Home</span>
          <span>/</span>
          <span className="font-medium text-zinc-950 dark:text-zinc-50">Products</span>
        </div>
        <span className="text-xs text-zinc-400">Actions</span>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">Docs</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-800">v2.0</span>
        </div>
        <div className="flex gap-4 text-xs text-zinc-500">
          <span>API</span>
          <span>Guides</span>
        </div>
      </nav>
    </div>
  );
}`,
  });
