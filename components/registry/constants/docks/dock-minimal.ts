import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dockMinimal: RegistryEntry = entry({
    id: "dock-minimal",
    title: "Minimal Dock",
    description:
      "A quiet variant — no magnification, no drag, just tooltips, the active dot, and keyboard support for compact toolbars.",
    source: `import { Dock, type DockItem } from "@/components/ui";

function AppIcon({ gradient, glyph }: { gradient: string; glyph: string }) {
  return (
    <div className={\`flex h-full w-full items-center justify-center rounded-[26%] shadow-inner \${gradient}\`}>
      <span className="text-lg font-bold text-white/95 md:text-xl">{glyph}</span>
    </div>
  );
}

const apps: DockItem[] = [
  { id: "home", label: "Home", active: true, icon: <AppIcon gradient="bg-gradient-to-br from-sky-400 to-blue-600" glyph="⌂" /> },
  { id: "inbox", label: "Inbox", icon: <AppIcon gradient="bg-gradient-to-br from-indigo-400 to-violet-600" glyph="✉" /> },
  { id: "tasks", label: "Tasks", icon: <AppIcon gradient="bg-gradient-to-br from-emerald-400 to-green-600" glyph="✓" /> },
  { id: "media", label: "Media", icon: <AppIcon gradient="bg-gradient-to-br from-rose-400 to-pink-600" glyph="♫" /> },
  { id: "settings", label: "Settings", icon: <AppIcon gradient="bg-zinc-500 dark:bg-zinc-700" glyph="⚙" /> },
];

export default function DockMinimal() {
  return (
    <div className="flex w-full items-end justify-center py-10">
      <Dock items={apps} magnification={false} draggable={false} ariaLabel="Quick launch toolbar" />
    </div>
  );
}`,
  });
