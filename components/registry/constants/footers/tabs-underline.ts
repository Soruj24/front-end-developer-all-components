import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsUnderline: RegistryEntry = entry({
    id: "tabs-underline",
    title: "Underline Styles",
    description: "Underline, minimal, large-label, colored, and counter variants.",
    source: `import { useState } from "react";

function Underline() {
  const [active, setActive] = useState("First");
  return (
    <div className="flex w-full flex-col">
      <div className="flex border-b border-black/[.08] dark:border-white/[.145]">
        {["First", "Second", "Third"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`px-4 py-2 text-xs font-medium transition-colors \${active === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
        ))}
      </div>
      <div className="mt-2 text-xs text-zinc-500">{active} content</div>
    </div>
  );
}

function MinimalUnderline() {
  const [active, setActive] = useState("Tab A");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4">
        {["Tab A", "Tab B", "Tab C"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`pb-1 text-xs font-medium transition-colors \${active === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-300 hover:text-zinc-500"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function LargeLabels() {
  const [active, setActive] = useState("Products");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-6 border-b border-black/[.08] dark:border-white/[.145]">
        {["Products", "Services", "Support"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`px-1 pb-3 text-sm font-semibold transition-colors \${active === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function ColoredActive() {
  const [active, setActive] = useState("Active");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4 border-b border-black/[.08] dark:border-white/[.145]">
        {["Active", "Inactive", "Disabled"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`pb-2 text-xs font-medium transition-colors \${active === t ? "border-b-2 border-primary text-primary dark:text-blue-400" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function WithCounters() {
  const [active, setActive] = useState("All");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-3">
        {[
          { label: "All", count: 42 },
          { label: "Active", count: 18 },
          { label: "Completed", count: 24 },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={\`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors \${active === t.label ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>
            {t.label}
            <span className="text-[10px] text-zinc-400">({t.count})</span>
          </button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

export default function TabsUnderline() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Underline />
      <MinimalUnderline />
      <LargeLabels />
      <ColoredActive />
      <WithCounters />
    </div>
  );
}`,
  });
