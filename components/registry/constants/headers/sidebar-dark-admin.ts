import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sidebarDarkAdmin: RegistryEntry = entry({
    id: "sidebar-dark-admin",
    title: "Dark Admin",
    description: "A dark admin sidebar with compact nav.",
    source: `export default function SidebarDarkAdmin() {
  const items = [
    { icon: "⌂", label: "Dashboard" },
    { icon: "👥", label: "Users" },
    { icon: "📊", label: "Analytics" },
    { icon: "⚙", label: "Settings" },
  ];

  return (
    <div className="flex h-64 w-full overflow-hidden rounded-lg border border-zinc-700">
      <div className="flex w-36 flex-col gap-1 border-r border-zinc-700 bg-zinc-900 p-2">
        <span className="mb-2 px-2 text-[10px] font-bold text-zinc-300">Admin</span>
        {items.map((item, i) => (
          <button key={item.label} className={\`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs \${i === 0 ? "bg-zinc-800 font-medium text-white" : "text-zinc-400 hover:bg-zinc-800"}\`}>
            <span>{item.icon}</span>
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center bg-zinc-950 text-[10px] text-zinc-600">
        Main Content
      </div>
    </div>
  );
}`,
  });
