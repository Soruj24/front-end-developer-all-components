import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sidebarClassicDashboard: RegistryEntry = entry({
    id: "sidebar-classic-dashboard",
    title: "Classic Dashboard",
    description: "Classic light sidebars with active items and a collapsed icon rail.",
    source: `export default function SidebarClassicDashboard() {
  const frame =
    "flex h-64 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <div className="flex w-36 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
          <span className="mb-2 px-2 text-[10px] font-bold">CL</span>
          {["⌂", "📊", "📝", "👤"].map((icon, i) => (
            <button key={i} className={\`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs \${i === 0 ? "bg-zinc-200 font-medium dark:bg-zinc-800" : "text-zinc-400 hover:bg-black/[.04]"}\`}>
              <span>{icon}</span>
              <span className="text-[10px]">{["Home", "Analytics", "Posts", "Profile"][i]}</span>
            </button>
          ))}
          <div className="mt-auto border-t border-black/[.08] pt-2 dark:border-white/[.145]">
            <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-400 hover:bg-black/[.04]">
              <span>⚙</span>
              <span className="text-[10px]">Settings</span>
            </button>
          </div>
        </div>
        <div className={content}>Dashboard Content</div>
      </div>

      <div className={frame}>
        <div className="flex w-14 flex-col items-center gap-2 border-r border-black/[.08] bg-zinc-50 py-3 dark:border-white/[.145] dark:bg-black">
          <span className="mb-1 text-sm font-bold">C</span>
          {["⌂", "📊", "📝", "👤", "⚙"].map((icon, i) => (
            <button key={i} className={\`flex h-9 w-9 items-center justify-center rounded-lg text-sm \${i === 0 ? "bg-foreground text-background" : "text-zinc-400 hover:bg-black/[.04]"}\`}>
              {icon}
            </button>
          ))}
        </div>
        <div className={content}>Content Area</div>
      </div>
    </div>
  );
}`,
  });
