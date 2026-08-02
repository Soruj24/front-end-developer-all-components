"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";

function UnderlineDemo() {
  const [active, setActive] = useState("First");
  return (
    <div className="flex w-full flex-col">
      <div className="flex border-b border-border">
        {["First", "Second", "Third"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`px-4 py-2 text-xs font-medium transition-colors ${active === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{active} content</div>
    </div>
  );
}

function MinimalUnderlineDemo() {
  const [active, setActive] = useState("Tab A");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4">
        {["Tab A", "Tab B", "Tab C"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`pb-1 text-xs font-medium transition-colors ${active === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-zinc-300 hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function LargeLabelsDemo() {
  const [active, setActive] = useState("Products");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-6 border-b border-border">
        {["Products", "Services", "Support"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`px-1 pb-3 text-sm font-semibold transition-colors ${active === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function ColoredActiveDemo() {
  const [active, setActive] = useState("Active");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4 border-b border-border">
        {["Active", "Inactive", "Disabled"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`pb-2 text-xs font-medium transition-colors ${active === t ? "border-b-2 border-primary text-primary dark:text-blue-400" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function WithCountersDemo() {
  const [active, setActive] = useState("All");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-3">
        {[
          { label: "All", count: 42 },
          { label: "Active", count: 18 },
          { label: "Completed", count: 24 },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${active === t.label ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>
            {t.label}
            <span className="text-[10px] text-muted-foreground/70">({t.count})</span>
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function TabsUnderlineGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <UnderlineDemo />
      <MinimalUnderlineDemo />
      <LargeLabelsDemo />
      <ColoredActiveDemo />
      <WithCountersDemo />
    </div>
  );
}

function PillsDemo() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-1 rounded-lg bg-muted p-1 dark:bg-muted">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${active === t ? "bg-white text-foreground shadow-sm dark:bg-muted dark:text-foreground" : "text-muted-foreground hover:text-muted-foreground dark:text-muted-foreground/70"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} content</div>
    </div>
  );
}

function CapsuleDemo() {
  const [active, setActive] = useState("First");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        {["First", "Second", "Third"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${active === t ? "bg-foreground text-background" : "border border-black/[.08] text-muted-foreground hover:bg-muted/40 dark:border-white/[.145] dark:hover:bg-zinc-900"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} content</div>
    </div>
  );
}

function SegmentedControlDemo() {
  const [active, setActive] = useState("Day");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="inline-flex rounded-lg border border-black/[.08] p-0.5 dark:border-white/[.145]">
        {["Day", "Week", "Month", "Year"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${active === t ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} view</div>
    </div>
  );
}

function RoundedBoxDemo() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-1 rounded-xl border border-black/[.08] p-1 dark:border-white/[.145]">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${active === t ? "bg-muted" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function SmallCompactDemo() {
  const [active, setActive] = useState("All");
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex gap-0.5 rounded-md bg-muted p-0.5 dark:bg-muted">
        {["All", "Active", "Draft", "Archived"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${active === t ? "bg-white text-foreground shadow-sm dark:bg-muted dark:text-foreground" : "text-muted-foreground/70"}`}>{t}</button>
        ))}
      </div>
      <div className="text-[10px] text-muted-foreground/70">{active} items</div>
    </div>
  );
}

function TabsPillsCapsuleGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <PillsDemo />
      <CapsuleDemo />
      <SegmentedControlDemo />
      <RoundedBoxDemo />
      <SmallCompactDemo />
    </div>
  );
}

function IconsLabelsDemo() {
  const [active, setActive] = useState("Home");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex border-b border-border">
        {[
          { label: "Home", icon: "⌂" },
          { label: "Search", icon: "⌕" },
          { label: "Settings", icon: "⚙" },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors ${active === t.label ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} content</div>
    </div>
  );
}

function IconOnlyDemo() {
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
          <button key={t.id} onClick={() => setActive(t.id)} className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${active === t.id ? "bg-muted" : "text-muted-foreground/70 hover:bg-muted dark:hover:bg-muted"}`}>{t.icon}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">Selected: {active}</div>
    </div>
  );
}

function IconsUnderlineDemo() {
  const [active, setActive] = useState("Home");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4 border-b border-border">
        {[
          { label: "Home", icon: "⌂" },
          { label: "Browse", icon: "⌕" },
          { label: "Favorites", icon: "♥" },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={`flex flex-col items-center gap-1 px-3 pb-2 text-xs font-medium transition-colors ${active === t.label ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>
            <span className="text-sm">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function TabsIconsGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <IconsLabelsDemo />
      <IconOnlyDemo />
      <IconsUnderlineDemo />
    </div>
  );
}

function WithBadgesDemo() {
  const [active, setActive] = useState("Inbox");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex border-b border-border">
        {[
          { label: "Inbox", count: 12 },
          { label: "Sent", count: 0 },
          { label: "Spam", count: 3 },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors ${active === t.label ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>
            {t.label}
            {t.count > 0 && <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-muted px-1 text-[10px] font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground">{t.count}</span>}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} content</div>
    </div>
  );
}

function WithDescriptionsDemo() {
  const [active, setActive] = useState("Profile");
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex border-b border-border">
        {[
          { label: "Profile", desc: "Personal info" },
          { label: "Account", desc: "Login & email" },
          { label: "Privacy", desc: "Data & sharing" },
        ].map((t) => (
          <button key={t.label} onClick={() => setActive(t.label)} className={`flex flex-1 flex-col px-3 py-2 text-left transition-colors ${active === t.label ? "border-b-2 border-zinc-950 dark:border-zinc-50" : "opacity-60"}`}>
            <span className="text-xs font-medium">{t.label}</span>
            <span className="text-[10px] text-muted-foreground/70">{t.desc}</span>
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} settings</div>
    </div>
  );
}

function TabsBadgesDescriptionsGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <WithBadgesDemo />
      <WithDescriptionsDemo />
    </div>
  );
}

function VerticalPillsDemo() {
  const [active, setActive] = useState("Account");
  return (
    <div className="flex w-full gap-4">
      <div className="flex w-24 flex-col gap-0.5">
        {["Account", "Security", "Billing"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors ${active === t ? "bg-muted text-foreground dark:bg-muted dark:text-foreground" : "text-muted-foreground hover:bg-muted dark:hover:bg-muted/50"}`}>{t}</button>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-black/[.08] p-3 text-xs text-muted-foreground dark:border-white/[.145]">{active} settings</div>
    </div>
  );
}

function VerticalIconsDemo() {
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
          <button key={t.id} onClick={() => setActive(t.id)} className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${active === t.id ? "bg-muted" : "text-muted-foreground/70 hover:bg-muted dark:hover:bg-muted"}`}>{t.icon}</button>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-black/[.08] p-3 text-xs text-muted-foreground dark:border-white/[.145]">Selected: {active}</div>
    </div>
  );
}

function TabsVerticalGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <VerticalPillsDemo />
      <VerticalIconsDemo />
    </div>
  );
}

function BoxedTabsDemo() {
  const [active, setActive] = useState("Details");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-0">
        {["Details", "Activity", "Settings"].map((t, i) => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 border border-black/[.08] px-3 py-2 text-xs font-medium transition-colors dark:border-white/[.145] ${active === t ? "bg-muted/40 text-foreground dark:bg-muted dark:text-foreground" : "bg-white text-muted-foreground/70 hover:bg-muted/40 dark:bg-black dark:hover:bg-zinc-900"} ${i === 0 ? "rounded-l-lg" : ""} ${i === 2 ? "rounded-r-lg" : ""} ${i > 0 ? "-ml-px" : ""}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} panel</div>
    </div>
  );
}

function FullWidthDemo() {
  const [active, setActive] = useState("Section 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full border-b border-border">
        {["Section 1", "Section 2", "Section 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 px-3 py-2 text-center text-xs font-medium transition-colors ${active === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function JustifiedDemo() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full border-b border-border">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 px-3 py-2 text-center text-xs font-medium transition-colors ${active === t ? "bg-muted/40 text-foreground dark:bg-muted dark:text-foreground" : "text-muted-foreground/70 hover:bg-muted/40/50 dark:hover:bg-muted/50"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function CardTabsDemo() {
  const [active, setActive] = useState("Monthly");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        {["Monthly", "Annual", "Lifetime"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 rounded-lg border px-3 py-2.5 text-center text-xs font-medium transition-all ${active === t ? "border-zinc-950 bg-muted/40 text-foreground shadow-sm dark:border-zinc-50 dark:bg-muted dark:text-foreground" : "border-black/[.08] text-muted-foreground/70 hover:border-foreground/20 dark:border-white/[.145] dark:hover:border-foreground/20"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} plan</div>
    </div>
  );
}

function BorderOnlyActiveDemo() {
  const [active, setActive] = useState("Overview");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-0">
        {["Overview", "Details", "History"].map((t, i) => (
          <button key={t} onClick={() => setActive(t)} className={`px-4 py-2 text-xs font-medium transition-colors ${active === t ? "border border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "border-b border-black/[.08] text-muted-foreground/70 hover:text-muted-foreground dark:border-white/[.145]"} ${i === 0 && active === t ? "rounded-t-lg" : ""} ${i === 2 && active === t ? "rounded-t-lg" : ""} ${active === t ? "border-b-white dark:border-b-black" : ""}`}>{t}</button>
        ))}
      </div>
      <div className="-mt-px rounded-b-lg border border-black/[.08] p-3 text-xs text-muted-foreground dark:border-white/[.145]">{active}</div>
    </div>
  );
}

function TabsBoxedCardGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BoxedTabsDemo />
      <FullWidthDemo />
      <JustifiedDemo />
      <CardTabsDemo />
      <BorderOnlyActiveDemo />
    </div>
  );
}

function DarkBackgroundDemo() {
  const [active, setActive] = useState("Tab 1");
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-zinc-900 p-3">
      <div className="flex gap-1">
        {["Tab 1", "Tab 2", "Tab 3"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${active === t ? "bg-zinc-700 text-white" : "text-muted-foreground/70 hover:text-zinc-200"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground/70">{active} content in dark</div>
    </div>
  );
}

function ColoredBackgroundDemo() {
  const [active, setActive] = useState("Features");
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
      <div className="flex gap-1">
        {["Features", "Pricing", "FAQ"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${active === t ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary-soft dark:text-blue-400 dark:hover:bg-blue-900"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-primary/70 dark:text-blue-400/70">{active}</div>
    </div>
  );
}

function TabsColoredBackgroundsGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DarkBackgroundDemo />
      <ColoredBackgroundDemo />
    </div>
  );
}

function AnimatedIndicatorDemo() {
  const [active, setActive] = useState("Tab 1");
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex border-b border-border">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`relative px-4 py-2 text-xs font-medium transition-colors ${active === t ? "text-foreground" : "text-muted-foreground/70"}`}>
            {t}
            {active === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-muted/40 transition-all" />}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function ScrollableDemo() {
  const [active, setActive] = useState("Tab 5");
  const tabs = Array.from({ length: 12 }, (_, i) => `Tab ${i + 1}`);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-0 border-b border-border min-w-max">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActive(t)} className={`whitespace-nowrap px-3 py-2 text-xs font-medium transition-colors ${active === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{active}</div>
    </div>
  );
}

function StickyTabsDemo() {
  return (
    <div className="flex w-full flex-col rounded-lg border border-border">
      <div className="sticky top-0 flex border-b border-black/[.08] bg-white px-2 pt-2 dark:border-white/[.145] dark:bg-black">
        {["Tab A", "Tab B", "Tab C"].map((t, i) => (
          <button key={t} className={`px-3 py-1.5 text-xs font-medium ${i === 1 ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70"}`}>{t}</button>
        ))}
      </div>
      <div className="p-3 text-xs text-muted-foreground/70">Scrollable content below</div>
    </div>
  );
}

function StepIndicatorDemo() {
  const [step, setStep] = useState(2);
  const steps = ["Cart", "Payment", "Confirm"];
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <button onClick={() => setStep(i + 1)} className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${i + 1 <= step ? "bg-foreground text-background" : "border-2 border-border text-muted-foreground/70 dark:border-border"}`}>{i + 1}</button>
            {i < 2 && <div className={`h-0.5 w-8 ${i + 1 < step ? "bg-foreground" : "bg-muted"}`} />}
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">Step {step}: {steps[step - 1]}</div>
    </div>
  );
}

function TabsAnimatedScrollStepsGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatedIndicatorDemo />
      <ScrollableDemo />
      <StickyTabsDemo />
      <StepIndicatorDemo />
    </div>
  );
}

function DropdownTabsDemo() {
  const [active, setActive] = useState("Week");
  const [open, setOpen] = useState(false);
  const options = ["Day", "Week", "Month", "Year"];
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-lg border border-black/[.08] px-3 py-1.5 text-xs font-medium dark:border-white/[.145]">
          {active}
          <span className="text-muted-foreground/70">▾</span>
        </button>
        {open && (
          <div className="absolute left-0 top-full z-10 mt-1 w-24 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
            {options.map((o) => (
              <button key={o} onClick={() => { setActive(o); setOpen(false); }} className={`w-full px-3 py-1 text-left text-xs ${active === o ? "font-medium text-foreground" : "text-muted-foreground/70 hover:bg-muted/40 dark:hover:bg-zinc-900"}`}>{o}</button>
            ))}
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground">{active} view</div>
    </div>
  );
}

function AccordionTabsDemo() {
  const [active, setActive] = useState("Section 1");
  return (
    <div className="flex w-full flex-col gap-1">
      {[
        { title: "Section 1", content: "Content for section one." },
        { title: "Section 2", content: "Content for section two." },
        { title: "Section 3", content: "Content for section three." },
      ].map((s) => (
        <div key={s.title} className="rounded-lg border border-border">
          <button onClick={() => setActive(active === s.title ? "" : s.title)} className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium">
            {s.title}
            <span className={`text-muted-foreground/70 transition-transform ${active === s.title ? "rotate-180" : ""}`}>▾</span>
          </button>
          {active === s.title && <div className="border-t border-black/[.08] px-3 py-2 text-xs text-muted-foreground dark:border-white/[.145]">{s.content}</div>}
        </div>
      ))}
    </div>
  );
}

function GhostTabsDemo() {
  const [active, setActive] = useState("Preview");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-3">
        {["Preview", "Code", "Diff"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${active === t ? "bg-muted text-foreground dark:bg-muted dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{active} mode</div>
    </div>
  );
}

function SkeletonLoadingDemo() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4 border-b border-border">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-16 animate-pulse rounded bg-muted" />
        ))}
      </div>
      <div className="h-4 w-32 animate-pulse rounded bg-muted dark:bg-muted" />
    </div>
  );
}

function MixedContentDemo() {
  const [active, setActive] = useState("Login");
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex border-b border-border">
        {["Login", "Sign Up", "Reset"].map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 px-3 py-2 text-center text-xs font-medium transition-colors ${active === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70 hover:text-muted-foreground"}`}>{t}</button>
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
        {active === "Sign Up" && <div className="text-xs text-muted-foreground">Sign up form</div>}
        {active === "Reset" && <div className="text-xs text-muted-foreground">Reset form</div>}
      </div>
    </div>
  );
}

function TabsDropdownAccordionMixedGroup() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DropdownTabsDemo />
      <AccordionTabsDemo />
      <GhostTabsDemo />
      <SkeletonLoadingDemo />
      <MixedContentDemo />
    </div>
  );
}

export default function TabsPage() {
  return (
    <div className="flex flex-col gap-8 p-6 sm:p-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tabs</h1>
        <p className="max-w-2xl text-muted-foreground dark:text-muted-foreground/70">
          33 tab patterns — underline, pills, capsule, icons, badges, vertical,
          scrollable, and more.
        </p>
      </header>

      <ComponentPreview id="tabs-underline">
        <TabsUnderlineGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-pills-capsule">
        <TabsPillsCapsuleGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-icons">
        <TabsIconsGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-badges-descriptions">
        <TabsBadgesDescriptionsGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-vertical">
        <TabsVerticalGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-boxed-card">
        <TabsBoxedCardGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-colored-backgrounds">
        <TabsColoredBackgroundsGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-animated-scroll-steps">
        <TabsAnimatedScrollStepsGroup />
      </ComponentPreview>

      <ComponentPreview id="tabs-dropdown-accordion-mixed">
        <TabsDropdownAccordionMixedGroup />
      </ComponentPreview>
    </div>
  );
}
