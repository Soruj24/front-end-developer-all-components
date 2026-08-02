import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsColoredBackgrounds: RegistryEntry = entry({
    id: "tabs-colored-backgrounds",
    title: "Colored Backgrounds",
    description: "Always-dark and blue-tinted tab groups.",
    source: `import { useState } from "react";

function DarkBackground() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-zinc-900 p-3">
      <div className="flex gap-1">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`rounded-md px-3 py-1.5 text-xs font-medium transition-colors \${active === t ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-400">{active} content in dark</div>
    </div>
  );
}

function ColoredBackground() {
  const [active, setActive] = useState("Features");
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
      <div className="flex gap-1">
        {["Features", "Pricing", "FAQ"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`rounded-md px-3 py-1.5 text-xs font-medium transition-colors \${active === t ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary-soft dark:text-blue-400 dark:hover:bg-blue-900"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-primary/70 dark:text-blue-400/70">{active}</div>
    </div>
  );
}

export default function TabsColoredBackgrounds() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DarkBackground />
      <ColoredBackground />
    </div>
  );
}`,
  });
