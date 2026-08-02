import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tabsAnimatedScrollSteps: RegistryEntry = entry({
    id: "tabs-animated-scroll-steps",
    title: "Animated, Scrollable & Steps",
    description: "Animated indicator, scrollable tabs, sticky tabs, and step indicator.",
    source: `import { useState } from "react";

function AnimatedIndicator() {
  const [active, setActive] = useState("Tab 1");
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex border-b border-black/[.08] dark:border-white/[.145]">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActive(t)} className={\`relative px-4 py-2 text-xs font-medium transition-colors \${active === t ? "text-zinc-950 dark:text-zinc-50" : "text-zinc-400"}\`}>
            {t}
            {active === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-zinc-50 transition-all" />}
          </button>
        ))}
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function Scrollable() {
  const [active, setActive] = useState("Tab 5");
  const tabs = Array.from({ length: 12 }, (_, i) => \`Tab \${i + 1}\`);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-0 border-b border-black/[.08] dark:border-white/[.145] min-w-max">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActive(t)} className={\`whitespace-nowrap px-3 py-2 text-xs font-medium transition-colors \${active === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400 hover:text-zinc-600"}\`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="text-xs text-zinc-500">{active}</div>
    </div>
  );
}

function StickyTabs() {
  return (
    <div className="flex w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="sticky top-0 flex border-b border-black/[.08] bg-white px-2 pt-2 dark:border-white/[.145] dark:bg-black">
        {["Tab A", "Tab B", "Tab C"].map((t, i) => (
          <button key={t} className={\`px-3 py-1.5 text-xs font-medium \${i === 1 ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400"}\`}>{t}</button>
        ))}
      </div>
      <div className="p-3 text-xs text-zinc-400">Scrollable content below</div>
    </div>
  );
}

function StepIndicator() {
  const [step, setStep] = useState(2);
  const steps = ["Cart", "Payment", "Confirm"];
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <button onClick={() => setStep(i + 1)} className={\`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors \${i + 1 <= step ? "bg-foreground text-background" : "border-2 border-zinc-300 text-zinc-400 dark:border-zinc-600"}\`}>{i + 1}</button>
            {i < 2 && <div className={\`h-0.5 w-8 \${i + 1 < step ? "bg-foreground" : "bg-zinc-200 dark:bg-zinc-700"}\`} />}
          </div>
        ))}
      </div>
      <div className="text-xs text-zinc-500">Step {step}: {steps[step - 1]}</div>
    </div>
  );
}

export default function TabsAnimatedScrollSteps() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatedIndicator />
      <Scrollable />
      <StickyTabs />
      <StepIndicator />
    </div>
  );
}`,
  });
