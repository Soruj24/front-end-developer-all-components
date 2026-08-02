import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dockKeyboard: RegistryEntry = entry({
    id: "dock-keyboard",
    title: "Keyboard Navigation",
    description:
      "Fully keyboard operable — Tab into the dock, move with arrow keys, Home/End to jump, Enter to launch, with a visible focus ring.",
    source: `import { Dock, type DockItem } from "@/components/ui";

function AppIcon({ gradient, glyph }: { gradient: string; glyph: string }) {
  return (
    <div className={\`flex h-full w-full items-center justify-center rounded-[26%] shadow-inner \${gradient}\`}>
      <span className="text-lg font-bold text-white/95 md:text-xl">{glyph}</span>
    </div>
  );
}

const apps: DockItem[] = [
  { id: "finder", label: "Finder", active: true, icon: <AppIcon gradient="bg-gradient-to-br from-sky-400 to-blue-600" glyph="⌘" /> },
  { id: "mail", label: "Mail", icon: <AppIcon gradient="bg-gradient-to-br from-indigo-400 to-violet-600" glyph="✉" /> },
  { id: "photos", label: "Photos", icon: <AppIcon gradient="bg-gradient-to-br from-amber-400 to-orange-600" glyph="◉" /> },
  { id: "terminal", label: "Terminal", icon: <AppIcon gradient="bg-zinc-700 dark:bg-zinc-800" glyph="›_" /> },
];

export default function DockKeyboard() {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-10">
      <Dock items={apps} />
      <p className="text-xs text-subtle">
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">←</kbd>{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">→</kbd> move,{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> launch
      </p>
    </div>
  );
}`,
  });
