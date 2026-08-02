import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerLanguageAuth: RegistryEntry = entry({
    id: "header-language-auth",
    title: "Language & Auth",
    description: "Language selectors with auth actions and split utility actions.",
    source: `export default function HeaderLanguageAuth() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold">Global</span>
            <nav className="flex gap-4 text-xs text-zinc-500">
              <span>Home</span>
              <span>Products</span>
              <span>Support</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded border border-black/[.08] bg-transparent px-2 py-0.5 text-xs dark:border-white/[.145]">
              <option>EN</option>
              <option>ES</option>
              <option>FR</option>
              <option>DE</option>
            </select>
            <button className="text-xs text-zinc-500 hover:text-zinc-950">Log In</button>
            <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Sign Up</button>
          </div>
        </header>
        <div className={content}>Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold">App</span>
            <nav className="flex gap-4 text-xs text-zinc-500">
              <span className="text-zinc-950 dark:text-zinc-50">Dashboard</span>
              <span>Team</span>
              <span>Projects</span>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">Help</span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-500">Settings</span>
          </div>
        </header>
        <div className={content}>Content</div>
      </div>
    </div>
  );
}`,
  });
