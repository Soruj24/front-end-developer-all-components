import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarTwoLine: RegistryEntry = entry({
    id: "navbar-two-line",
    title: "Two-Line & Full Feature",
    description: "Announcement bars stacked above the main navigation.",
    source: `export default function NavbarTwoLine() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
        <div className="flex h-6 items-center justify-between bg-zinc-100 px-4 text-[10px] text-zinc-500 dark:bg-zinc-800">
          <span>📢 Announcement bar</span>
          <span>✕</span>
        </div>
        <div className="flex h-9 items-center justify-between px-4">
          <span className="text-sm font-bold">Brand</span>
          <div className="flex gap-4 text-xs text-zinc-500">
            <span>Home</span>
            <span>Products</span>
            <span>About</span>
          </div>
        </div>
      </nav>
      <nav className="flex w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-6 items-center justify-between bg-zinc-100 px-4 text-[10px] text-zinc-500 dark:bg-zinc-800">
          <span>📢 New: Analytics dashboard live</span>
          <span className="flex items-center gap-2">
            <span>EN ▾</span>
            <span>Support</span>
          </span>
        </div>
        <div className="flex h-9 items-center justify-between bg-white px-4 dark:bg-black">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold">Product</span>
            <div className="flex gap-4 text-xs text-zinc-500">
              <span className="text-zinc-950 dark:text-zinc-50">Features</span>
              <span>Pricing</span>
              <span>Docs</span>
              <span>Blog</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-md border border-black/[.08] bg-zinc-50 px-2 py-1 text-xs text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900">
              <span>⌕</span>
              <span>Search</span>
            </div>
            <span className="text-xs text-zinc-500">Log In</span>
            <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
          </div>
        </div>
      </nav>
    </div>
  );
}`,
  });
