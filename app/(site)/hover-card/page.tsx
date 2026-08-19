"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { HoverCard } from "@/components/ui/HoverCard";

const HOVERCARD_SOURCE = `import { useState, useRef, useEffect, useCallback, isValidElement } from "react";
import { cn } from "@/lib/cn";

interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  className?: string;
}

export function HoverCard({
  trigger, children, open: controlledOpen, onOpenChange,
  delayDuration = 300, className,
}: HoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scheduleOpen = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(true), delayDuration);
  }, [delayDuration, setOpen]);

  const scheduleClose = useCallback(() => {
    clearTimeout(timerRef.current!);
    setOpen(false);
  }, [setOpen]);

  useEffect(() => () => clearTimeout(timerRef.current!), []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) scheduleClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [scheduleClose]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <span onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}>{trigger}</span>
      {open && (
        <div onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}
          className="absolute z-50 mt-2 w-80 rounded-md border bg-white p-4 shadow-md dark:bg-zinc-900 dark:border-zinc-700">
          {children}
        </div>
      )}
    </div>
  );
}`;

const DEFAULT_SOURCE = `import { HoverCard } from "@/components/ui/HoverCard";

<HoverCard
  trigger={<span className="cursor-pointer text-sm font-medium text-primary hover:underline">@username</span>}
>
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-medium text-white">JD</div>
    <div>
      <p className="text-sm font-semibold">John Doe</p>
      <p className="text-xs text-muted-foreground">@johndoe</p>
    </div>
  </div>
  <p className="mt-3 text-sm text-muted-foreground">Full-stack developer interested in React, TypeScript, and design systems.</p>
</HoverCard>`;

const IMAGE_SOURCE = `import { HoverCard } from "@/components/ui/HoverCard";

<HoverCard trigger={<span className="cursor-pointer text-sm font-medium text-primary hover:underline">View project</span>}>
  <div className="h-32 rounded bg-gradient-to-br from-green-400 to-blue-500" />
  <div className="mt-3">
    <h3 className="text-sm font-semibold">Project Name</h3>
    <p className="mt-1 text-xs text-muted-foreground">A brief description of the project and its main features.</p>
    <div className="mt-3 flex gap-2">
      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">React</span>
      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">TypeScript</span>
    </div>
  </div>
</HoverCard>`;

const DELAY_SOURCE = `import { HoverCard } from "@/components/ui/HoverCard";

<HoverCard
  trigger={<span className="cursor-pointer text-sm font-medium text-primary hover:underline">Slow hover</span>}
  delayDuration={600}
>
  <p className="text-sm">This card appears after a longer delay (600ms).</p>
</HoverCard>`;

export default function HoverCardPage() {
  return (
    <ComponentDocPage name="Hover Card" category="Overlays" description="A card that appears when hovering over a trigger element, useful for showing previews, additional context, or rich content.">
      <PreviewPanel filename="hover-card-preview.tsx">
        <HoverCard trigger={<span className="cursor-pointer text-sm font-medium text-primary hover:underline">@username</span>}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-medium text-white">JD</div>
            <div>
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground">@johndoe</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Full-stack developer interested in React, TypeScript, and design systems.</p>
        </HoverCard>
      </PreviewPanel>

      <SourceCodeViewer source={HOVERCARD_SOURCE} filename="components/ui/HoverCard.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Basic hover card with a user profile preview." code={DEFAULT_SOURCE} filename="hover-card-default.tsx">
          <HoverCard trigger={<span className="cursor-pointer text-sm font-medium text-primary hover:underline">@username</span>}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-medium text-white">JD</div>
              <div>
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">@johndoe</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Full-stack developer interested in React, TypeScript, and design systems.</p>
          </HoverCard>
        </ExampleBlock>

        <ExampleBlock title="With Image" description="Hover card containing an image preview and tags." code={IMAGE_SOURCE} filename="hover-card-image.tsx">
          <HoverCard trigger={<span className="cursor-pointer text-sm font-medium text-primary hover:underline">View project</span>}>
            <div className="h-32 rounded bg-gradient-to-br from-green-400 to-blue-500" />
            <div className="mt-3">
              <h3 className="text-sm font-semibold">Project Name</h3>
              <p className="mt-1 text-xs text-muted-foreground">A brief description of the project and its main features.</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">React</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">TypeScript</span>
              </div>
            </div>
          </HoverCard>
        </ExampleBlock>

        <ExampleBlock title="Custom Delay" description="Adjust the delay before the hover card appears." code={DELAY_SOURCE} filename="hover-card-delay.tsx">
          <HoverCard trigger={<span className="cursor-pointer text-sm font-medium text-primary hover:underline">Slow hover</span>} delayDuration={600}>
            <p className="text-sm">This card appears after a longer delay (600ms).</p>
          </HoverCard>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
