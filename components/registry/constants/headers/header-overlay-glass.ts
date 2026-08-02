import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerOverlayGlass: RegistryEntry = entry({
    id: "header-overlay-glass",
    title: "Overlay & Glass",
    description: "Transparent headers over imagery plus glassmorphism and sticky blur.",
    source: `export default function HeaderOverlayGlass() {
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className="relative flex h-64 w-full flex-col rounded-lg">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <header className="relative flex h-14 items-center justify-between px-6 text-white">
          <span className="text-sm font-bold">Overlay</span>
          <nav className="flex gap-6 text-xs text-white/70">
            <span className="text-white">Home</span>
            <span>Work</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
          <button className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/10">Get in Touch</button>
        </header>
        <div className="relative flex flex-1 items-center justify-center text-sm text-white/40">
          Hero Background
        </div>
      </div>

      <div className="relative flex h-64 w-full flex-col rounded-lg">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500" />
        <header className="relative mx-2 mt-2 flex h-11 items-center justify-between rounded-xl border border-white/20 bg-white/60 px-4 backdrop-blur-md">
          <span className="text-sm font-bold text-zinc-800">Glass</span>
          <nav className="flex gap-4 text-xs text-zinc-600">
            <span className="font-medium text-zinc-900">Home</span>
            <span>Features</span>
            <span>Pricing</span>
          </nav>
          <button className="rounded-full bg-zinc-900 px-4 py-1 text-xs font-medium text-white">Sign Up</button>
        </header>
        <div className="relative flex flex-1 items-center justify-center text-xs text-white/50">
          Hero Section
        </div>
      </div>

      <div className="relative flex h-64 w-full flex-col rounded-lg overflow-y-auto">
        <div className="sticky top-0 z-10 flex h-11 items-center justify-between border-b border-black/[.08] bg-white/80 px-4 backdrop-blur-md dark:border-white/[.145] dark:bg-black/80">
          <span className="text-sm font-bold">Sticky</span>
          <nav className="flex gap-4 text-xs text-zinc-500">
            <span>Section 1</span>
            <span>Section 2</span>
            <span>Section 3</span>
          </nav>
        </div>
        <div className={content}>Scrollable Content</div>
      </div>
    </div>
  );
}`,
  });
