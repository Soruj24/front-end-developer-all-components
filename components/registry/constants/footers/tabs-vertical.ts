import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsVertical: RegistryEntry = entry({
    id: "tabs-vertical",
    title: "Vertical",
    description: "Vertical pills for navigation and icon-only vertical rails.",
    source: `import { useState } from "react";

function VerticalPills() {
  const [active, setActive] = useState("Account");
  return (
    <div className="flex w-full gap-4">
      <div className="flex w-24 flex-col gap-0.5">
        {["Account", "Security", "Billing"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors \${active === t ? "bg-zinc-200 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"}\`}>{t}</button>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-black/[.08] p-3 text-xs text-zinc-500 dark:border-white/[.145]">{active} settings</div>
    </div>
  );
}

function VerticalIcons() {
  const [active, setActive] = useState("home");
  return (
    <div className="flex w-full gap-3">
      <div className="flex w-10 flex-col gap-1">
        {[
          { id: "home", icon: "⌂" },
          { id: "search", icon: "⌕" },
          { id: "bell", icon: "🔔" },
          { id: "user", icon: "👤" },
        ].map((t) => (
          <button key={t.id} onClick={() => setActive(t.id)} className={\`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors \${active === t.id ? "bg-zinc-200 dark:bg-zinc-700" : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}>{t.icon}</button>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-black/[.08] p-3 text-xs text-zinc-500 dark:border-white/[.145]">Selected: {active}</div>
    </div>
  );
}

export default function TabsVertical() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <VerticalPills />
      <VerticalIcons />
    </div>
  );
}`,
  });
