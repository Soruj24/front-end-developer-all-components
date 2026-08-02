import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerTwoLine: RegistryEntry = entry({
    id: "header-two-line",
    title: "Two-Line & Utility Bars",
    description: "Two-row headers with announcement or utility bars on top.",
    source: `export default function HeaderTwoLine() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex w-full flex-col">
          <div className="flex h-7 items-center justify-between bg-zinc-100 px-4 text-[10px] text-zinc-500 dark:bg-zinc-800">
            <span>🚀 New: Analytics dashboard is live!</span>
            <span>✕</span>
          </div>
          <div className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">AppName</span>
            <nav className="flex gap-4 text-xs text-zinc-500">
              <span>Dashboard</span>
              <span>Team</span>
              <span>Settings</span>
            </nav>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs dark:bg-zinc-700">👤</span>
          </div>
        </header>
        <div className={content}>Content</div>
      </div>

      <div className={frame}>
        <header className="flex w-full flex-col">
          <div className="flex h-7 items-center justify-between bg-zinc-100 px-4 text-[10px] text-zinc-500 dark:bg-zinc-800">
            <span className="flex items-center gap-2">
              <span>📞</span>
              <span>1-800-555-0199</span>
            </span>
            <div className="flex items-center gap-3">
              <span>Help</span>
              <span>|</span>
              <span>EN ▾</span>
            </div>
          </div>
          <div className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Brand</span>
            <nav className="flex gap-4 text-xs text-zinc-500">
              <span className="text-zinc-950 dark:text-zinc-50">Home</span>
              <span>Shop</span>
              <span>About</span>
              <span>Contact</span>
            </nav>
            <span className="text-sm">🛒</span>
          </div>
        </header>
        <div className={content}>Content</div>
      </div>

      <div className={frame}>
        <header className="flex w-full flex-col">
          <div className="flex h-7 items-center justify-between bg-zinc-100 px-4 text-[10px] text-zinc-500 dark:bg-zinc-800">
            <span>📢 New release 3.0 available</span>
            <span className="flex items-center gap-2">
              <span>EN ▾</span>
              <span>Support</span>
            </span>
          </div>
          <div className="flex h-10 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold">Product</span>
              <nav className="flex gap-4 text-xs text-zinc-500">
                <span className="text-zinc-950 dark:text-zinc-50">Features</span>
                <span>Pricing</span>
                <span>Docs</span>
                <span>Blog</span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-1 rounded-md border border-black/[.08] bg-zinc-50 px-2 py-1 text-xs text-zinc-400 sm:flex dark:border-white/[.145] dark:bg-zinc-900">
                <span>⌕</span>
                <span>Search</span>
              </div>
              <button className="text-xs text-zinc-500">Log In</button>
              <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Sign Up</button>
            </div>
          </div>
        </header>
        <div className={content}>Hero Section</div>
      </div>
    </div>
  );
}`,
  });
