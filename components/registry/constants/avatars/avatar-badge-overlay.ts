import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarBadgeOverlay: RegistryEntry = entry({
    id: "avatar-badge-overlay",
    title: "With Badge Overlay",
    description: "Count and status badges pinned to the avatar corner.",
    source: `export default function AvatarBadgeOverlay() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-lg font-medium text-white">JD</div>
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">3</span>
      </div>
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-medium text-white">AK</div>
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-500 text-2xl font-medium text-white">ML</div>
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white ring-2 ring-white dark:ring-zinc-900">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
  );
}`,
  });
