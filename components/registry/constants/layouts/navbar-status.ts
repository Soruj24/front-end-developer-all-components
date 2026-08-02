import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarStatus: RegistryEntry = entry({
    id: "navbar-status",
    title: "Status Dot & Colored Accent",
    description: "Presence indicators and brand-tinted navs.",
    source: `export default function NavbarStatus() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success-soft0" />
          <span className="text-sm font-bold">Online</span>
        </div>
        <span className="text-xs text-zinc-400">Connected</span>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 dark:border-emerald-800 dark:bg-emerald-950">
        <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Eco</span>
        <div className="flex gap-4 text-xs text-emerald-600 dark:text-emerald-400">
          <span className="font-medium text-emerald-800 dark:text-emerald-200">Dashboard</span>
          <span>Analytics</span>
          <span>Reports</span>
        </div>
      </nav>
    </div>
  );
}`,
  });
