import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dockMagnifying: RegistryEntry = entry({
    id: "dock-magnifying",
    title: "Magnifying Dock",
    description:
      "Full macOS-style dock — icons swell around the cursor, labels pop on hover, running apps get a dot, and icons drag to reorder.",
    source: `import { Dock, type DockItem } from "@/components/ui";
import type { ReactNode } from "react";

function AppIcon({ gradient, children }: { gradient: string; children: ReactNode }) {
  return (
    <div className={\`flex h-full w-full items-center justify-center rounded-[26%] shadow-inner \${gradient}\`}>
      <span className="text-white/95">{children}</span>
    </div>
  );
}

const apps: DockItem[] = [
  {
    id: "finder",
    label: "Finder",
    active: true,
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-sky-300 to-blue-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 10h.01M15.5 10h.01" strokeWidth={2.6} strokeLinecap="round" />
          <path d="M8 14.5c.9 1.2 2.4 1.9 4 1.9s3.1-.7 4-1.9" strokeLinecap="round" />
        </svg>
      </AppIcon>
    ),
  },
  {
    id: "safari",
    label: "Safari",
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-cyan-300 to-blue-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2.5 5-5 2.5 2.5-5 5-2.5z" fill="currentColor" stroke="none" />
        </svg>
      </AppIcon>
    ),
  },
  {
    id: "mail",
    label: "Mail",
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-indigo-400 to-blue-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3 7.5l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </AppIcon>
    ),
  },
  {
    id: "messages",
    label: "Messages",
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-emerald-300 to-green-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.5 0-2.9-.4-4.1-1L3 21l1.9-5.5a8.5 8.5 0 1116.1-4z" strokeLinejoin="round" />
        </svg>
      </AppIcon>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-rose-300 to-pink-600">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 19a3 3 0 11-2-2.83V6l12-2v10.17A3 3 0 1119 14V5.4l-10 1.67V19z" />
        </svg>
      </AppIcon>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: (
      <AppIcon gradient="bg-zinc-700 dark:bg-zinc-800">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M7 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 16h4" strokeLinecap="round" />
        </svg>
      </AppIcon>
    ),
  },
];

export default function DockMagnifying() {
  return (
    <div className="flex w-full items-end justify-center py-14">
      <Dock items={apps} />
    </div>
  );
}`,
  });
