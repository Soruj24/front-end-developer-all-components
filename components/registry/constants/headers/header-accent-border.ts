import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerAccentBorder: RegistryEntry = entry({
    id: "header-accent-border",
    title: "Accent Border",
    description: "A thin colored accent border under a clean white header.",
    source: `export default function HeaderAccentBorder() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className={frame}>
      <header className="flex h-12 items-center justify-between border-b-2 border-primary bg-white px-4 dark:bg-black">
        <span className="text-sm font-bold text-primary dark:text-blue-400">Blue</span>
        <nav className="flex gap-4 text-xs text-zinc-500">
          <span className="text-primary dark:text-blue-400">Home</span>
          <span>About</span>
          <span>Contact</span>
        </nav>
      </header>
      <div className={content}>Content</div>
    </div>
  );
}`,
  });
