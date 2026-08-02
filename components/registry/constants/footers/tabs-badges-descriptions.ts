import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsBadgesDescriptions: RegistryEntry = entry({
    id: "tabs-badges-descriptions",
    title: "With Badges & Descriptions",
    description: "Count badges and two-line labels with helper descriptions.",
    source: `import { useState } from "react";

function WithBadges() {
  const [active, setActive] = useState("Inbox");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex border-b border-black/[.08] dark:border-white/[.145]">
        {[
          { label: "Inbox", count: 12 },
          { label: "Sent", count: 0 },
          { label: "Spam", count: 3 },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={\`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors \${active === t.label ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>
            {t.label}
            {t.count > 0 && <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-zinc-200 px-1 text-[10px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">{t.count}</span>}
          </button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} content</div>
    </div>
  );
}

function WithDescriptions() {
  const [active, setActive] = useState("Profile");
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex border-b border-black/[.08] dark:border-white/[.145]">
        {[
          { label: "Profile", desc: "Personal info" },
          { label: "Account", desc: "Login & email" },
          { label: "Privacy", desc: "Data & sharing" },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={\`flex flex-1 flex-col px-3 py-2 text-left transition-colors \${active === t.label ? "border-b-2 border-zinc-950 dark:border-zinc-50" : "opacity-60"}\`}>
            <span className="text-xs font-medium">{t.label}</span>
            <span className="text-[10px] text-zinc-400">{t.desc}</span>
          </button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active} settings</div>
    </div>
  );
}

export default function TabsBadgesDescriptions() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <WithBadges />
      <WithDescriptions />
    </div>
  );
}`,
  });
