import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardBadgeAvatarStats: RegistryEntry = entry({
    id: "card-badge-avatar-stats",
    title: "Badge, Avatar & Stats",
    description: "Status badge, user, and metrics cards.",
    source: `export default function CardBadgeAvatarStats() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <div className="flex items-start justify-between">
          <span className="text-3xl">🏷️</span>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">New</span>
        </div>
        <h3 className="mt-3 font-semibold">Badge Card</h3>
        <p className="mt-1 text-sm text-zinc-500">Highlight status or category with a colorful badge.</p>
      </div>
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">AK</div>
          <div><p className="font-semibold">Alex Kim</p><p className="text-xs text-zinc-500">Product Designer</p></div>
        </div>
        <p className="mt-3 text-sm text-zinc-500">User card with avatar, name, and role.</p>
      </div>
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <span className="text-3xl">📊</span>
        <p className="mt-2 text-2xl font-bold">$84.2K</p>
        <p className="text-sm text-zinc-500">Monthly Revenue</p>
        <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">↑ 12.5%</span>
      </div>
    </div>
  );
}`,
  });
