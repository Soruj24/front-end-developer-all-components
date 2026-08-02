import * as React from "react";
import { cn } from "@/lib/cn";
import type { DockItem } from "@/components/ui";

function AppIcon({
  gradient,
  children,
}: {
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center overflow-hidden rounded-[26%] shadow-inner",
        gradient
      )}
    >
      <span className="text-white/95">{children}</span>
    </div>
  );
}

const FinderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 10h.01M15.5 10h.01" strokeWidth={2.6} strokeLinecap="round" />
    <path d="M8 14.5c.9 1.2 2.4 1.9 4 1.9s3.1-.7 4-1.9" strokeLinecap="round" />
  </svg>
);

const SafariIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2.5 5-5 2.5 2.5-5 5-2.5z" fill="currentColor" stroke="none" />
  </svg>
);

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3 7.5l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MessagesIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path
      d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.5 0-2.9-.4-4.1-1L3 21l1.9-5.5a8.5 8.5 0 1116.1-4z"
      strokeLinejoin="round"
    />
  </svg>
);

const MusicIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19a3 3 0 11-2-2.83V6l12-2v10.17A3 3 0 1119 14V5.4l-10 1.67V19z" />
  </svg>
);

const PhotosIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="3.2" />
    <path
      d="M9.4 9.4c1-1.9 3-2.8 5.2-2.6M14.6 14.6c-1 1.9-3 2.8-5.2 2.6M9.4 14.6c-1.9-1-2.8-3-2.6-5.2M14.6 9.4c1.9 1 2.8 3 2.6 5.2"
      strokeLinecap="round"
    />
  </svg>
);

const TerminalIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 16h4" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3" />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.01a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h.01a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.01a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
      strokeLinejoin="round"
    />
  </svg>
);

export const dockApps: DockItem[] = [
  {
    id: "finder",
    label: "Finder",
    active: true,
    icon: <AppIcon gradient="bg-gradient-to-br from-sky-300 to-blue-600">{FinderIcon}</AppIcon>,
  },
  {
    id: "safari",
    label: "Safari",
    icon: <AppIcon gradient="bg-gradient-to-br from-cyan-300 to-blue-600">{SafariIcon}</AppIcon>,
  },
  {
    id: "mail",
    label: "Mail",
    icon: <AppIcon gradient="bg-gradient-to-br from-indigo-400 to-blue-700">{MailIcon}</AppIcon>,
  },
  {
    id: "messages",
    label: "Messages",
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-emerald-300 to-green-600">{MessagesIcon}</AppIcon>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: <AppIcon gradient="bg-gradient-to-br from-rose-300 to-pink-600">{MusicIcon}</AppIcon>,
  },
  {
    id: "photos",
    label: "Photos",
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-amber-300 to-orange-600">{PhotosIcon}</AppIcon>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <AppIcon gradient="bg-zinc-700 dark:bg-zinc-800">{TerminalIcon}</AppIcon>,
  },
  {
    id: "settings",
    label: "System Settings",
    icon: (
      <AppIcon gradient="bg-gradient-to-br from-zinc-400 to-zinc-600">{SettingsIcon}</AppIcon>
    ),
  },
];

export const minimalApps: DockItem[] = [
  dockApps[0],
  dockApps[1],
  dockApps[2],
  dockApps[5],
  dockApps[6],
  dockApps[7],
];
