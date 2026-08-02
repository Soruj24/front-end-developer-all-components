import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarEcommerce: RegistryEntry = entry({
    id: "navbar-ecommerce",
    title: "E-commerce & Underline Tabs",
    description: "Storefront navs with cart badges and underline links.",
    source: `export default function NavbarEcommerce() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-11 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold">Shop</span>
          <div className="hidden gap-4 text-xs text-zinc-500 sm:flex">
            <span className="text-zinc-950 dark:text-zinc-50">All</span>
            <span>Men</span>
            <span>Women</span>
            <span>Sale</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>🔍</span>
          <span className="relative">
            🛒
            <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[7px] text-background">3</span>
          </span>
        </div>
      </nav>
      <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
        <div className="flex h-9 items-center justify-between px-4">
          <span className="text-sm font-bold">Brand</span>
          <span className="text-xs text-zinc-400">Get Started →</span>
        </div>
        <div className="flex">
          {["Home", "Products", "About"].map((l, i) => (
            <span key={l} className={\`flex-1 border-r border-black/[.08] px-3 py-1.5 text-center text-[10px] dark:border-white/[.145] \${i === 0 ? "border-b-2 border-zinc-950 font-medium text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400"}\`}>{l}</span>
          ))}
        </div>
      </nav>
    </div>
  );
}`,
  });
