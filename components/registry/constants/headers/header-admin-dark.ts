import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerAdminDark: RegistryEntry = entry({
    id: "header-admin-dark",
    title: "Admin & Dark",
    description: "Dark admin headers, gradient surfaces, and a terminal-style bar.",
    source: `export default function HeaderAdminDark() {
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className="flex h-64 w-full flex-col rounded-lg border border-zinc-700">
        <header className="flex h-12 items-center justify-between bg-zinc-900 px-4 text-white">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold">Admin</span>
            <nav className="flex gap-3 text-[10px] text-zinc-400">
              <span className="text-white">Dashboard</span>
              <span>Users</span>
              <span>Analytics</span>
              <span>Settings</span>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span>🔔</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px]">A</span>
          </div>
        </header>
        <div className="flex flex-1 items-center justify-center bg-zinc-950 text-[10px] text-zinc-600">
          Admin Panel
        </div>
      </div>

      <div className="flex h-64 w-full flex-col rounded-lg">
        <header className="flex h-12 items-center justify-between rounded-t-lg bg-gradient-to-r from-slate-800 via-zinc-800 to-slate-800 px-4 text-white">
          <span className="text-sm font-bold">Dark</span>
          <nav className="flex gap-4 text-xs text-zinc-400">
            <span className="text-white">Dashboard</span>
            <span>Analytics</span>
            <span>Settings</span>
          </nav>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px]">D</span>
        </header>
        <div className="flex flex-1 items-center justify-center rounded-b-lg bg-zinc-900 text-[10px] text-zinc-600">
          Content
        </div>
      </div>

      <div className="flex h-64 w-full flex-col rounded-lg overflow-hidden">
        <header className="flex h-9 items-center justify-between bg-zinc-900 px-4 text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-success-soft0" />
            </span>
            <span className="ml-3 text-xs text-zinc-500">terminal — bash</span>
          </div>
          <nav className="flex gap-3 text-[10px] text-zinc-500">
            <span className="text-zinc-300">File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Help</span>
          </nav>
        </header>
        <div className="flex flex-1 items-center justify-center bg-black text-[10px] text-success/30">
          ~ $
        </div>
      </div>
    </div>
  );
}`,
  });
