import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsBoxedCard: RegistryEntry = entry({
    id: "tabs-boxed-card",
    title: "Boxed, Full Width & Card",
    description: "Boxed tabs, full-width, justified, card, and border-only-active variants.",
    source: `import { useState } from "react";

function BoxedTabs() {
  const [active, setActive] = useState("Details");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-0">
        {["Details", "Activity", "Settings"].map((t, i) => (
          <button key={t} onClick={() => setActive(t)} className={\`flex-1 border border-black/[.08] px-3 py-2 text-xs font-medium transition-colors dark:border-white/[.145] \${active === t ? "bg-zinc-50 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50" : "bg-white text-zinc-400 hover:bg-zinc-50 dark:bg-black dark:hover:bg-zinc-900"} \${i === 0 ? "rounded-l-lg" : ""} \${i === 2 ? "rounded-r-lg" : ""} \${i > 0 ? "-ml-px" : ""}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} panel</div>
    </div>
  );
}

function FullWidth() {
  const [active, setActive] = useState("Section 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full border-b border-black/[.08] dark:border-white/[.145]">
        {["Section 1", "Section 2", "Section 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`flex-1 px-3 py-2 text-center text-xs font-medium transition-colors \${active === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function Justified() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full border-b border-black/[.08] dark:border-white/[.145]">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`flex-1 px-3 py-2 text-center text-xs font-medium transition-colors \${active === t ? "bg-zinc-50 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-400 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function CardTabs() {
  const [active, setActive] = useState("Monthly");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        {["Monthly", "Annual", "Lifetime"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`flex-1 rounded-lg border px-3 py-2.5 text-center text-xs font-medium transition-all \${active === t ? "border-zinc-950 bg-zinc-50 text-zinc-950 shadow-sm dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-50" : "border-black/[.08] text-zinc-400 hover:border-zinc-300 dark:border-white/[.145] dark:hover:border-zinc-600"}\`}>
            {t}
          </button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} plan</div>
    </div>
  );
}

function BorderOnlyActive() {
  const [active, setActive] = useState("Overview");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-0">
        {["Overview", "Details", "History"].map((t, i) => (
          <button key={t} onClick={() => setActive(t)} className={\`px-4 py-2 text-xs font-medium transition-colors \${active === t ? "border border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "border-b border-black/[.08] text-zinc-400 hover:text-zinc-600 dark:border-white/[.145]"} \${i === 0 && active === t ? "rounded-t-lg" : ""} \${i === 2 && active === t ? "rounded-t-lg" : ""} \${active === t ? "border-b-white dark:border-b-black" : ""}\`}>{t}</button>
        ))}
      </div>
      <div className="-mt-px rounded-b-lg border border-black/[.08] p-3 text-xs text-zinc-500 dark:border-white/[.145]">{active}</div>
    </div>
  );
}

export default function TabsBoxedCard() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BoxedTabs />
      <FullWidth />
      <Justified />
      <CardTabs />
      <BorderOnlyActive />
    </div>
  );
}`,
  });
