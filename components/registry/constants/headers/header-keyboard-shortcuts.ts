import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerKeyboardShortcuts: RegistryEntry = entry({
    id: "header-keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    description: "Navigation with visible keyboard shortcut hints.",
    source: `export default function HeaderKeyboardShortcuts() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className={frame}>
      <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">Shortcuts</span>
        <nav className="flex items-center gap-4 text-xs text-zinc-500">
          {["Home", "Search", "Settings"].map((l, i) => (
            <span key={l} className={\`flex items-center gap-1.5 \${i === 0 ? "text-zinc-950 dark:text-zinc-50" : ""}\`}>
              {l}
              <kbd className="rounded border border-black/[.08] px-1 text-[10px] text-zinc-400 dark:border-white/[.145]">⌘{["1", "K", ","][i]}</kbd>
            </span>
          ))}
        </nav>
      </header>
      <div className={content}>Content</div>
    </div>
  );
}`,
  });
