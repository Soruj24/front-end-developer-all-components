"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { getRegistryItem } from "@/components/registry";
import { cn } from "@/lib/cn";
import { AnimatedTabs } from "./AnimatedTabs";
import { ExpandablePreview } from "./ExpandablePreview";
import { PreviewToolbar } from "./PreviewToolbar";
import { PreviewFrame } from "./PreviewFrame";
import { PreviewCanvas } from "./PreviewCanvas";
import { DEFAULT_DEVICE_ID, getDevice } from "./devices";
import type { DeviceId } from "./devices";
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
 * inside a device-responsive frame and pulls source, CLI, install, and
 * dependency metadata from the registry.
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
  const [device, setDevice] = useState<DeviceId>(DEFAULT_DEVICE_ID);
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
              device={device}
              onDeviceChange={setDevice}
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
              <PreviewCanvas>
                <PreviewFrame device={getDevice(device)}>
                  {children}
                </PreviewFrame>
              </PreviewCanvas>
            </div>
          </div>
        )}

        {activeTab === "code" && item && <CodePanel item={item} />}
        {activeTab === "cli" && item && <CliPanel item={item} />}
        {activeTab === "install" && item && <InstallPanel item={item} />}
        {activeTab === "deps" && item && <DependenciesPanel item={item} />}
      </div>

      <ExpandablePreview
        key={device}
        open={expanded}
        title={resolvedTitle}
        onClose={handleClose}
        initialDevice={getDevice(device)}
      >
        {children}
      </ExpandablePreview>
    </section>
  );
}
