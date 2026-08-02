import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsPillsCapsule: RegistryEntry = entry({
    id: "tabs-pills-capsule",
    title: "Pills, Capsule & Segmented",
    description: "Pills, capsule, segmented control, rounded box, and small compact variants.",
    source: `import { useState } from "react";

function Pills() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors \${active === t ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} content</div>
    </div>
  );
}

function Capsule() {
  const [active, setActive] = useState("First");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        {["First", "Second", "Third"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`rounded-full px-4 py-1.5 text-xs font-medium transition-colors \${active === t ? "bg-foreground text-background" : "border border-black/[.08] text-zinc-500 hover:bg-zinc-50 dark:border-white/[.145] dark:hover:bg-zinc-900"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} content</div>
    </div>
  );
}

function SegmentedControl() {
  const [active, setActive] = useState("Day");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="inline-flex rounded-lg border border-black/[.08] p-0.5 dark:border-white/[.145]">
        {["Day", "Week", "Month", "Year"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`rounded-md px-3 py-1 text-xs font-medium transition-colors \${active === t ? "bg-foreground text-background shadow-sm" : "text-zinc-500 hover:text-zinc-700"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} view</div>
    </div>
  );
}

function RoundedBox() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-1 rounded-xl border border-black/[.08] p-1 dark:border-white/[.145]">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors \${active === t ? "bg-zinc-200 dark:bg-zinc-700" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function SmallCompact() {
  const [active, setActive] = useState("All");
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex gap-0.5 rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-800">
        {["All", "Active", "Draft", "Archived"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`rounded px-2 py-0.5 text-[10px] font-medium transition-colors \${active === t ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-zinc-50" : "text-zinc-400"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-[10px] text-zinc-400">{active} items</div>
    </div>
  );
}

export default function TabsPillsCapsule() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Pills />
      <Capsule />
      <SegmentedControl />
      <RoundedBox />
      <SmallCompact />
    </div>
  );
}`,
  });
