import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarLanguage: RegistryEntry = entry({
    id: "navbar-language",
    title: "Language Switcher",
    description: "A locale select paired with auth actions.",
    source: `export default function NavbarLanguage() {
  return (
    <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
      <span className="text-sm font-bold">Global</span>
      <div className="flex items-center gap-3">
        <select className="rounded border border-black/[.08] bg-transparent px-2 py-0.5 text-xs dark:border-white/[.145]">
          <option>EN</option>
          <option>ES</option>
          <option>FR</option>
        </select>
        <span className="text-xs text-zinc-500">Login</span>
        <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
      </div>
    </nav>
  );
}`,
  });
