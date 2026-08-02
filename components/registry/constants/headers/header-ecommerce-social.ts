import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerEcommerceSocial: RegistryEntry = entry({
    id: "header-ecommerce-social",
    title: "E-commerce & Social",
    description: "Storefront category nav with cart badge and community feed headers.",
    source: `export default function HeaderEcommerceSocial() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold">Shop</span>
            <nav className="flex gap-4 text-xs text-zinc-500">
              <span className="text-zinc-950 dark:text-zinc-50">All</span>
              <span>Men</span>
              <span>Women</span>
              <span>Accessories</span>
              <span>Sale</span>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span>🔍</span>
            <span className="relative">
              🛒
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[8px] text-background">2</span>
            </span>
          </div>
        </header>
        <div className={content}>Products</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold tracking-tight">◆</span>
            <nav className="flex gap-4 text-xs font-medium text-zinc-500">
              <span className="text-zinc-950 dark:text-zinc-50">Home</span>
              <span>Explore</span>
              <span>Notifications</span>
              <span>Messages</span>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🔍</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs dark:bg-zinc-700">👤</span>
          </div>
        </header>
        <div className={content}>Feed</div>
      </div>
    </div>
  );
}`,
  });
