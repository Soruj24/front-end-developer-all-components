import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const badgeOnBell: RegistryEntry = entry({
    id: "badge-on-bell",
    title: "On Notification Bell",
    description: "Count badges anchored to icons and buttons.",
    source: `export default function BadgeOnBell() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">3</span>
      </div>
      <div className="relative">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">9+</span>
      </div>
      <div className="relative">
        <button className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">
          Notifications
        </button>
        <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">12</span>
      </div>
    </div>
  );
}`,
  });
