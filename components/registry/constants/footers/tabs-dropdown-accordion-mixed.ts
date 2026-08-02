import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsDropdownAccordionMixed: RegistryEntry = entry({
    id: "tabs-dropdown-accordion-mixed",
    title: "Dropdown, Accordion & More",
    description: "Dropdown tabs, accordion tabs, ghost, skeleton loading, and mixed content.",
    source: `import { useState } from "react";

function DropdownTabs() {
  const [active, setActive] = useState("Week");
  const [open, setOpen] = useState(false);
  const options = ["Day", "Week", "Month", "Year"];
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-lg border border-black/[.08] px-3 py-1.5 text-xs font-medium dark:border-white/[.145]">
          {active}
          <span className="text-zinc-400">▾</span>
        </button>
        {open && (
          <div className="absolute left-0 top-full z-10 mt-1 w-24 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
            {options.map((o) => (
              <button key={o} onClick={() => { setActive(o); setOpen(false); }} className={\`w-full px-3 py-1 text-left text-xs \${active === o ? "font-medium text-zinc-950 dark:text-zinc-50" : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"}\`}>{o}</button>
            ))}
          </div>
        )}
      </div>
      <div className="text-xs text-zinc-500">{active} view</div>
    </div>
  );
}

function AccordionTabs() {
  const [active, setActive] = useState("Section 1");
  return (
    <div className="flex w-full flex-col gap-1">
      {[
        { title: "Section 1", content: "Content for section one." },
        { title: "Section 2", content: "Content for section two." },
        { title: "Section 3", content: "Content for section three." },
      ].map((s) => (
        <div key={s.title} className="rounded-lg border border-black/[.08] dark:border-white/[.145]">
          <button onClick={() => setActive(active === s.title ? "" : s.title)} className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium">
            {s.title}
            <span className={\`text-zinc-400 transition-transform \${active === s.title ? "rotate-180" : ""}\`}>▾</span>
          </button>
          {active === s.title && <div className="border-t border-black/[.08] px-3 py-2 text-xs text-zinc-500 dark:border-white/[.145]">{s.content}</div>}
        </div>
      ))}
    </div>
  );
}

function GhostTabs() {
  const [active, setActive] = useState("Preview");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-3">
        {["Preview", "Code", "Diff"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`rounded-md px-3 py-1.5 text-xs font-medium transition-colors \${active === t ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} mode</div>
    </div>
  );
}

function SkeletonLoading() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4 border-b border-black/[.08] dark:border-white/[.145]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        ))}
      </div>
      <div className="h-4 w-32 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
    </div>
  );
}

function MixedContent() {
  const [active, setActive] = useState("Login");
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex border-b border-black/[.08] dark:border-white/[.145]">
        {["Login", "Sign Up", "Reset"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`flex-1 px-3 py-2 text-center text-xs font-medium transition-colors \${active === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
        ))}
      </div>
      <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
        {active === "Login" && (
          <div className="flex flex-col gap-2">
            <div className="h-6 rounded border border-black/[.08] px-2 text-xs dark:border-white/[.145]" />
            <div className="h-6 rounded border border-black/[.08] px-2 text-xs dark:border-white/[.145]" />
            <div className="mt-1 flex h-7 items-center justify-center rounded bg-foreground text-xs font-medium text-background">Login</div>
          </div>
        )}
        {active === "Sign Up" && <div className="text-xs text-zinc-500">Sign up form</div>}
        {active === "Reset" && <div className="text-xs text-zinc-500">Reset form</div>}
      </div>
    </div>
  );
}

export default function TabsDropdownAccordionMixed() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DropdownTabs />
      <AccordionTabs />
      <GhostTabs />
      <SkeletonLoading />
      <MixedContent />
    </div>
  );
}`,
  });
