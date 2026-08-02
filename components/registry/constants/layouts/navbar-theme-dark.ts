import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarThemeDark: RegistryEntry = entry({
    id: "navbar-theme-dark",
    title: "Dark Navbars",
    description: "Dark and admin-style navigation bars.",
    source: `export default function NavbarThemeDark() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between rounded-lg bg-zinc-900 px-4 text-white">
        <span className="text-sm font-bold">Dark</span>
        <div className="flex gap-4 text-xs text-zinc-400">
          <span className="text-white">Home</span>
          <span>Features</span>
          <span>Pricing</span>
        </div>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg bg-zinc-900 px-4 text-white">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold">Admin</span>
          <div className="flex gap-3 text-[10px] text-zinc-400">
            <span className="text-white">Dashboard</span>
            <span>Users</span>
            <span>Analytics</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">🔔</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px]">A</span>
        </div>
      </nav>
    </div>
  );
}`,
  });
