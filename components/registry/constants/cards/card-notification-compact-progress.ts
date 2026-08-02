import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardNotificationCompactProgress: RegistryEntry = entry({
    id: "card-notification-compact-progress",
    title: "Notification, Compact & Progress",
    description: "Alert, inline profile, and progress cards.",
    source: `export default function CardNotificationCompactProgress() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔔</span>
          <div className="flex-1">
            <p className="text-sm font-medium">New Update Available</p>
            <p className="text-xs text-zinc-500">Version 3.2.1 is ready to install</p>
            <p className="mt-1 text-xs text-zinc-400">2 minutes ago</p>
          </div>
          <button className="text-xs text-zinc-400 hover:text-zinc-600">✕</button>
        </div>
      </div>
      <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white">AK</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Alex Kim</p>
            <p className="truncate text-xs text-zinc-500">Online</p>
          </div>
          <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Project Completion</span>
          <span className="text-sm font-bold">72%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
        <p className="mt-1 text-xs text-zinc-500">14 of 19 tasks completed</p>
      </div>
    </div>
  );
}`,
  });
