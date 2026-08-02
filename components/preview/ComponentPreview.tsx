"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { getRegistryItem } from "@/components/registry";
import { cn } from "@/lib/cn";
import { AnimatedTabs } from "./AnimatedTabs";
import { ExpandablePreview } from "./ExpandablePreview";
import { PreviewToolbar, FrameWidth } from "./PreviewToolbar";
import { CodePanel, CliPanel, InstallPanel, DependenciesPanel } from "./panels";
import {
  BoxesIcon,
  CodeIcon,
  EyeIcon,
  PackageIcon,
  TerminalIcon,
} from "./icons";

type TabId = "preview" | "code" | "cli" | "install" | "deps";

const TABS: Array<{ id: TabId; label: string; icon: ReactNode }> = [
  { id: "preview", label: "Preview", icon: <EyeIcon className="h-3.5 w-3.5" /> },
  { id: "code", label: "Code", icon: <CodeIcon className="h-3.5 w-3.5" /> },
  { id: "cli", label: "CLI", icon: <TerminalIcon className="h-3.5 w-3.5" /> },
  { id: "install", label: "Installation", icon: <PackageIcon className="h-3.5 w-3.5" /> },
  { id: "deps", label: "Dependencies", icon: <BoxesIcon className="h-3.5 w-3.5" /> },
];

const FRAME_CLASSES: Record<FrameWidth, string> = {
  desktop: "w-full",
  tablet: "w-full max-w-[768px]",
  mobile: "w-full max-w-[390px]",
};

interface ComponentPreviewProps {
  /** Registry id — drives the Code, CLI, Installation, and Dependencies tabs. */
  id: string;
  /** Overrides the registry title. */
  title?: string;
  /** Overrides the registry description. */
  description?: string;
  /** Live, interactive demo rendered in the Preview tab and expand overlay. */
  children: ReactNode;
  className?: string;
}

/**
 * shadcn-inspired component preview block. Renders the live demo as `children`
 * and pulls source, CLI, install, and dependency metadata from the registry.
 */
export function ComponentPreview({
  id,
  title,
  description,
  children,
  className,
}: ComponentPreviewProps) {
  const item = useMemo(() => getRegistryItem(id), [id]);
  const [activeTab, setActiveTab] = useState<TabId>("preview");
  const [frame, setFrame] = useState<FrameWidth>("desktop");
  const [forcedDark, setForcedDark] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const resolvedTitle = title ?? item?.title ?? id;
  const resolvedDescription = description ?? item?.description;

  const handleClose = useCallback(() => setExpanded(false), []);

  const onCopy = async () => {
    if (!item) return;
    try {
      await navigator.clipboard.writeText(item.source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable; ignore.
    }
  };

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-background shadow-card",
        className
      )}
    >
      <header className="flex flex-col gap-3 border-b border-border p-4 sm:p-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {resolvedTitle}
          </h3>
          {resolvedDescription && (
            <p className="text-sm text-muted-foreground">{resolvedDescription}</p>
          )}
        </div>
        <div className="-mx-1 overflow-x-auto px-1 scrollbar-thin">
          <AnimatedTabs
            className="min-w-max"
            tabs={TABS}
            active={activeTab}
            onChange={(tab) => setActiveTab(tab as TabId)}
          />
        </div>
      </header>

      <div key={activeTab} className="animate-fade-slide">
        {activeTab === "preview" && (
          <div className="relative">
            <PreviewToolbar
              frame={frame}
              onFrameChange={setFrame}
              forcedDark={forcedDark}
              onToggleDark={() => setForcedDark((v) => !v)}
              copied={copied}
              onCopy={onCopy}
              onExpand={() => setExpanded(true)}
              playgroundHref={`/playground?component=${encodeURIComponent(id)}`}
            />
            <div
              className={cn(
                "relative border-t border-border",
                forcedDark && "dark bg-[#0b0b10]"
              )}
            >
              <div className="relative flex min-h-[16rem] items-center justify-center overflow-hidden bg-muted/40 p-4 sm:p-8">
                <div
                  className="absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                  aria-hidden="true"
                />
                <div
                  className={cn(
                    "relative z-10 w-full transition-[max-width] duration-500 ease-out",
                    FRAME_CLASSES[frame]
                  )}
                >
                  <div className="flex min-h-[12rem] w-full items-center justify-center rounded-xl border border-border/70 bg-background p-6 shadow-card sm:p-8">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "code" && item && <CodePanel item={item} />}
        {activeTab === "cli" && item && <CliPanel item={item} />}
        {activeTab === "install" && item && <InstallPanel item={item} />}
        {activeTab === "deps" && item && <DependenciesPanel item={item} />}
      </div>

      <ExpandablePreview open={expanded} title={resolvedTitle} onClose={handleClose}>
        {children}
      </ExpandablePreview>
    </section>
  );
}
