import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsIcons: RegistryEntry = entry({
    id: "tabs-icons",
    title: "With Icons",
    description: "Icons with labels, icon-only, and icons above underline labels.",
    source: `import { useState } from "react";

function IconsLabels() {
  const [active, setActive] = useState("Home");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex border-b border-black/[.08] dark:border-white/[.145]">
        {[
          { label: "Home", icon: "⌂" },
          { label: "Search", icon: "⌕" },
          { label: "Settings", icon: "⚙" },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={\`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors \${active === t.label ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} content</div>
    </div>
  );
}

function IconOnly() {
  const [active, setActive] = useState("heart");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-1">
        {[
          { id: "home", icon: "⌂" },
          { id: "heart", icon: "♥" },
          { id: "bell", icon: "🔔" },
          { id: "user", icon: "👤" },
        ].map((t) => (
          <button key={t.id} onClick={() => setActive(t.id)} className={\`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors \${active === t.id ? "bg-zinc-200 dark:bg-zinc-700" : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}>{t.icon}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">Selected: {active}</div>
    </div>
  );
}

function IconsUnderline() {
  const [active, setActive] = useState("Home");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4 border-b border-black/[.08] dark:border-white/[.145]">
        {[
          { label: "Home", icon: "⌂" },
          { label: "Browse", icon: "⌕" },
          { label: "Favorites", icon: "♥" },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={\`flex flex-col items-center gap-1 px-3 pb-2 text-xs font-medium transition-colors \${active === t.label ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>
            <span className="text-sm">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

export default function TabsIcons() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <IconsLabels />
      <IconOnly />
      <IconsUnderline />
    </div>
  );
}`,
  });
