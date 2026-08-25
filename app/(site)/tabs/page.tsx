"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import Tabs from "@/components/ui/Tabs";
import type { Tab } from "@/components/ui/Tabs";

const TABS_SOURCE = `"use client";

import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/cn";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pills" | "capsule";
  orientation?: "horizontal" | "vertical";
}

const listClasses = {
  underline: "border-b border-border/60",
  pills: "gap-1.5",
  capsule: "gap-1 rounded-xl bg-muted/50 p-1 backdrop-blur-sm",
};

const tabClasses = {
  underline: cn(
    "relative flex items-center gap-2 px-4 py-2.5",
    "text-[13px] font-medium text-muted-foreground",
    "transition-colors duration-150",
    "hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ),
  pills: cn(
    "flex items-center gap-2 rounded-lg px-3.5 py-2",
    "text-[13px] font-medium text-muted-foreground",
    "transition-all duration-150",
    "hover:bg-muted/60 hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:shadow-sm",
  ),
  capsule: cn(
    "flex items-center gap-2 rounded-lg px-3.5 py-2",
    "text-[13px] font-medium text-muted-foreground",
    "transition-all duration-150",
    "hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm data-[active=true]:ring-1 data-[active=true]:ring-border/60",
  ),
};

const Tabs = ({ tabs, activeTab, onChange, variant = "underline", orientation = "horizontal" }: TabsProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const activeContent = tabs.find((t) => t.id === activeTab)?.content;
  return (
    <div className={cn("flex", orientation === "vertical" ? "flex-row gap-4" : "flex-col gap-3")}>
      <div ref={listRef} role="tablist" aria-orientation={orientation} className={cn("flex", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap", listClasses[variant])}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button key={tab.id} role="tab" id={\`tab-\${tab.id}\`} aria-selected={isActive} aria-controls={\`panel-\${tab.id}\`} tabIndex={isActive ? 0 : -1} disabled={tab.disabled} data-active={isActive} onClick={() => !tab.disabled && onChange(tab.id)} data-tab={tab.id} className={cn(tabClasses[variant], isActive && variant === "underline" && "text-foreground")}>
              {tab.icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && <Badge count={tab.badge} active={isActive} />}
              {variant === "underline" && isActive && <span className="absolute inset-x-0 -bottom-px h-[2px] origin-center rounded-full bg-primary transition-all duration-200 ease-out" />}
            </button>
          );
        })}
      </div>
      <div key={activeTab} id={\`panel-\${activeTab}\`} role="tabpanel" aria-labelledby={\`tab-\${activeTab}\`} tabIndex={0} className="min-h-0 animate-fade-slide rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;`;

function mkTabs(items: { id: string; label: string; icon?: ReactNode; badge?: string | number; disabled?: boolean }[]): Tab[] {
  return items.map((t) => ({
    ...t,
    content: (
      <div className="rounded-xl border border-border/60 bg-background p-5">
        <p className="text-sm font-medium text-foreground">{t.label}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          This is the content panel for <strong className="text-foreground">{t.label}</strong>. It
          demonstrates tab switching with proper ARIA attributes and keyboard
          navigation.
        </p>
      </div>
    ),
  }));
}

function RichContent({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background p-5">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Content panels support arbitrary React nodes including forms, tables,
        images, and interactive elements.
      </p>
      <div className="mt-3 flex gap-2">
        <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Tag 1</span>
        <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Tag 2</span>
      </div>
    </div>
  );
}

const SvgIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function TabsPage() {
  const [underlineTab, setUnderlineTab] = useState("overview");
  const [pillsTab, setPillsTab] = useState("all");
  const [capsuleTab, setCapsuleTab] = useState("day");
  const [iconsTab, setIconsTab] = useState("home");
  const [disabledTab, setDisabledTab] = useState("active");
  const [badgeTab, setBadgeTab] = useState("inbox");
  const [verticalTab, setVerticalTab] = useState("profile");
  const [richTab, setRichTab] = useState("editor");

  const overviewTabs = mkTabs([
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
  ]);

  const filterTabs = mkTabs([
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
  ]);

  const periodTabs = mkTabs([
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
  ]);

  const iconTabs: Tab[] = [
    { id: "home", label: "Home", icon: <SvgIcon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />, content: <RichContent label="Home" /> },
    { id: "search", label: "Search", icon: <SvgIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />, content: <RichContent label="Search" /> },
    { id: "settings", label: "Settings", icon: <SvgIcon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />, content: <RichContent label="Settings" /> },
  ];

  const disabledTabs: Tab[] = [
    { id: "active", label: "Active" },
    { id: "disabled1", label: "Disabled", disabled: true },
    { id: "active2", label: "Also Active" },
  ];

  const badgeTabs: Tab[] = [
    { id: "inbox", label: "Inbox", badge: 12 },
    { id: "sent", label: "Sent", badge: 3 },
    { id: "drafts", label: "Drafts", badge: 0 },
  ];

  const verticalTabs = mkTabs([
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "Integrations" },
  ]);

  const richTabs: Tab[] = [
    { id: "editor", label: "Editor", content: <RichContent label="Rich Editor" /> },
    { id: "preview", label: "Preview", content: <RichContent label="Preview Pane" /> },
    { id: "settings", label: "Settings", content: <RichContent label="Tab Settings" /> },
  ];

  return (
    <ComponentDocPage
      name="Tabs"
      category="Navigation"
      description="Organize content into switchable panels with underline, pills, or capsule variants. Supports icons, badges, keyboard navigation, and vertical orientation."
    >
      <PreviewPanel filename="tabs-preview.tsx">
        <div className="w-full max-w-lg">
          <Tabs tabs={overviewTabs} activeTab={underlineTab} onChange={setUnderlineTab} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={TABS_SOURCE} filename="components/ui/Tabs.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Underline"
          description="Classic underline tabs with an animated primary indicator."
          code={`import Tabs from "@/components/ui/Tabs";\n\n<Tabs tabs={tabs} activeTab={active} onChange={setActive} variant="underline" />`}
          filename="underline.tsx"
        >
          <div className="w-full max-w-md">
            <Tabs tabs={overviewTabs} activeTab={underlineTab} onChange={setUnderlineTab} variant="underline" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Pills"
          description="Pill-style tabs with a highlighted background on the active tab."
          code={`import Tabs from "@/components/ui/Tabs";\n\n<Tabs tabs={tabs} activeTab={active} onChange={setActive} variant="pills" />`}
          filename="pills.tsx"
        >
          <div className="w-full max-w-md">
            <Tabs tabs={filterTabs} activeTab={pillsTab} onChange={setPillsTab} variant="pills" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Capsule"
          description="Rounded capsule tabs with a raised shadow effect on the active tab."
          code={`import Tabs from "@/components/ui/Tabs";\n\n<Tabs tabs={tabs} activeTab={active} onChange={setActive} variant="capsule" />`}
          filename="capsule.tsx"
        >
          <div className="w-full max-w-md">
            <Tabs tabs={periodTabs} activeTab={capsuleTab} onChange={setCapsuleTab} variant="capsule" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Tabs that include Lucide-style SVG icons alongside labels."
          code={`import Tabs from "@/components/ui/Tabs";\n\nconst tabs = [\n  { id: "home", label: "Home", icon: <HomeIcon />, content: <HomeContent /> },\n  { id: "search", label: "Search", icon: <SearchIcon />, content: <SearchContent /> },\n];\n\n<Tabs tabs={tabs} activeTab={active} onChange={setActive} />`}
          filename="icons.tsx"
        >
          <div className="w-full max-w-md">
            <Tabs tabs={iconTabs} activeTab={iconsTab} onChange={setIconsTab} variant="underline" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Badges"
          description="Tabs with numeric or text badges for counts and status."
          code={`import Tabs from "@/components/ui/Tabs";\n\nconst tabs = [\n  { id: "inbox", label: "Inbox", badge: 12, content: <InboxContent /> },\n  { id: "sent", label: "Sent", badge: 3, content: <SentContent /> },\n];\n\n<Tabs tabs={tabs} activeTab={active} onChange={setActive} />`}
          filename="badges.tsx"
        >
          <div className="w-full max-w-md">
            <Tabs tabs={badgeTabs} activeTab={badgeTab} onChange={setBadgeTab} variant="pills" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Tabs"
          description="Tabs can be individually disabled while keeping others interactive."
          code={`import Tabs from "@/components/ui/Tabs";\n\nconst tabs = [\n  { id: "active", label: "Active" },\n  { id: "locked", label: "Locked", disabled: true },\n  { id: "active2", label: "Also Active" },\n];\n\n<Tabs tabs={tabs} activeTab={active} onChange={setActive} />`}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-md">
            <Tabs tabs={disabledTabs} activeTab={disabledTab} onChange={setDisabledTab} variant="pills" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description="Tabs arranged vertically, ideal for sidebar navigation."
          code={`import Tabs from "@/components/ui/Tabs";\n\n<Tabs\n  tabs={tabs}\n  activeTab={active}\n  onChange={setActive}\n  orientation="vertical"\n/>`}
          filename="vertical.tsx"
        >
          <div className="w-full max-w-lg">
            <Tabs tabs={verticalTabs} activeTab={verticalTab} onChange={setVerticalTab} orientation="vertical" variant="pills" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Rich Content"
          description="Content panels can contain arbitrary React elements."
          code={`const tabs = [\n  { id: "editor", label: "Editor", content: <EditorPanel /> },\n  { id: "preview", label: "Preview", content: <PreviewPanel /> },\n];\n\n<Tabs tabs={tabs} activeTab={active} onChange={setActive} />`}
          filename="rich-content.tsx"
        >
          <div className="w-full max-w-md">
            <Tabs tabs={richTabs} activeTab={richTab} onChange={setRichTab} variant="underline" />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
