import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sidebarGradientPremium: RegistryEntry = entry({
    id: "sidebar-gradient-premium",
    title: "Gradient Premium",
    description: "A vibrant gradient sidebar with a user footer.",
    source: `export default function SidebarGradientPremium() {
  const items = [
    { icon: "◆", label: "Overview" },
    { icon: "♢", label: "Analytics" },
    { icon: "◇", label: "Reports" },
    { icon: "○", label: "Settings" },
  ];

  return (
    <div className="flex h-64 w-full overflow-hidden rounded-lg">
      <div className="flex w-40 flex-col gap-1 bg-gradient-to-b from-purple-600 to-indigo-700 p-3 text-white">
        <span className="mb-3 text-xs font-bold tracking-wide text-white/80">Premium</span>
        {items.map((item, i) => (
          <button key={item.label} className={\`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs \${i === 0 ? "bg-white/20 font-medium" : "text-white/70 hover:bg-white/10"}\`}>
            <span className="text-sm">{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div className="mt-auto border-t border-white/10 pt-3">
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-white/60">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px]">JD</span>
            <span>John Doe</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">
        Content
      </div>
    </div>
  );
}`,
  });
