"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { HoverCard } from "@/components/ui/HoverCard";

const HOVERCARD_SOURCE = `"use client";

import { useState, useRef, useEffect, useCallback, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { HoverCardProps } from "./HoverCard.types";

export function HoverCard({
  trigger, children, open: controlledOpen, onOpenChange, delayDuration = 300, className,
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

  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === "Escape") scheduleClose(); }
    if (open) { document.addEventListener("keydown", handler); return () => document.removeEventListener("keydown", handler); }
  }, [open, scheduleClose]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <span onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose} onFocus={scheduleOpen} onBlur={scheduleClose} tabIndex={0}
        className="inline-flex cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary/50">{trigger}</span>
      {open && (
        <div onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose} role="tooltip"
          className={cn("absolute z-50 mt-2 w-80 rounded-xl border border-border bg-popover p-4 shadow-xl", "animate-in fade-in-0 zoom-in-95")}>
          {children}
        </div>
      )}
    </div>
  );
}`;

const PROFILE_SRC = `import { HoverCard } from "@/components/ui/HoverCard";

<HoverCard
  trigger={<span className="text-sm font-medium text-primary hover:underline">@username</span>}
>
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-medium text-white">JD</div>
    <div>
      <p className="text-sm font-semibold text-foreground">John Doe</p>
      <p className="text-xs text-muted-foreground">@johndoe</p>
    </div>
  </div>
  <p className="mt-3 text-sm text-muted-foreground">Full-stack developer interested in React, TypeScript, and design systems.</p>
</HoverCard>`;

const PROJECT_SRC = `import { HoverCard } from "@/components/ui/HoverCard";

<HoverCard trigger={<span className="text-sm font-medium text-primary hover:underline">View project</span>}>
  <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500" />
  <div className="mt-3">
    <h3 className="text-sm font-semibold text-foreground">Project Name</h3>
    <p className="mt-1 text-xs text-muted-foreground">A brief description of the project and its main features.</p>
    <div className="mt-3 flex gap-2">
      <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">React</span>
      <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">TypeScript</span>
    </div>
  </div>
</HoverCard>`;

const DELAY_SRC = `import { HoverCard } from "@/components/ui/HoverCard";

<HoverCard trigger={<span className="text-sm font-medium text-primary hover:underline">Slow hover</span>} delayDuration={600}>
  <p className="text-sm text-foreground">This card appears after a longer delay (600ms).</p>
</HoverCard>`;

const IMAGE_SRC = `import { HoverCard } from "@/components/ui/HoverCard";

<HoverCard trigger={<span className="text-sm font-medium text-primary hover:underline">Preview</span>}>
  <img src="https://picsum.photos/seed/preview/400/200" alt="Preview" className="w-full rounded-xl object-cover" />
  <p className="mt-3 text-sm text-muted-foreground">Image preview with caption text below.</p>
</HoverCard>`;

const INLINE_SRC = `import { HoverCard } from "@/components/ui/HoverCard";

<p className="text-sm text-muted-foreground">
  Check out the{" "}
  <HoverCard trigger={<span className="font-medium text-foreground hover:underline">documentation</span>}>
    <p className="text-sm text-foreground">The docs cover API reference, examples, and migration guides.</p>
  </HoverCard>{" "}
  for more details.
</p>`;

export default function HoverCardPage() {
  return (
    <ComponentDocPage
      name="Hover Card"
      category="Overlays"
      description="A card that appears when hovering over a trigger element, useful for showing previews, additional context, or rich content. Supports keyboard navigation and escape to close."
    >
      <PreviewPanel filename="hover-card-preview.tsx">
        <HoverCard
          trigger={
            <span className="text-sm font-medium text-primary hover:underline">
              @username
            </span>
          }
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-medium text-white">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">@johndoe</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Full-stack developer interested in React, TypeScript, and design
            systems.
          </p>
        </HoverCard>
      </PreviewPanel>

      <SourceCodeViewer
        source={HOVERCARD_SOURCE}
        filename="components/ui/HoverCard/HoverCard.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Profile Preview"
          description="User profile card with avatar, name, and bio."
          code={PROFILE_SRC}
          filename="profile.tsx"
        >
          <HoverCard
            trigger={
              <span className="text-sm font-medium text-primary hover:underline">
                @username
              </span>
            }
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-medium text-white">
                JD
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground">@johndoe</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Full-stack developer interested in React, TypeScript, and design
              systems.
            </p>
          </HoverCard>
        </ExampleBlock>

        <ExampleBlock
          title="Project Card"
          description="Hover card with image, description, and tags."
          code={PROJECT_SRC}
          filename="project.tsx"
        >
          <HoverCard
            trigger={
              <span className="text-sm font-medium text-primary hover:underline">
                View project
              </span>
            }
          >
            <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500" />
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-foreground">
                Project Name
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                A brief description of the project and its main features.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  React
                </span>
                <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  TypeScript
                </span>
              </div>
            </div>
          </HoverCard>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Delay"
          description="Adjust the delay before the hover card appears."
          code={DELAY_SRC}
          filename="delay.tsx"
        >
          <HoverCard
            trigger={
              <span className="text-sm font-medium text-primary hover:underline">
                Slow hover
              </span>
            }
            delayDuration={600}
          >
            <p className="text-sm text-foreground">
              This card appears after a longer delay (600ms).
            </p>
          </HoverCard>
        </ExampleBlock>

        <ExampleBlock
          title="Image Preview"
          description="Hover card with an image and caption."
          code={IMAGE_SRC}
          filename="image.tsx"
        >
          <HoverCard
            trigger={
              <span className="text-sm font-medium text-primary hover:underline">
                Preview
              </span>
            }
          >
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src="https://picsum.photos/seed/preview/400/200"
                alt="Preview"
                className="w-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Image preview with caption text below.
            </p>
          </HoverCard>
        </ExampleBlock>

        <ExampleBlock
          title="Inline Usage"
          description="Use hover cards inline within text."
          code={INLINE_SRC}
          filename="inline.tsx"
        >
          <p className="text-sm text-muted-foreground">
            Check out the{" "}
            <HoverCard
              trigger={
                <span className="font-medium text-foreground hover:underline">
                  documentation
                </span>
              }
            >
              <p className="text-sm text-foreground">
                The docs cover API reference, examples, and migration guides.
              </p>
            </HoverCard>{" "}
            for more details.
          </p>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Key
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Tab
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Focus trigger to open, blur to close
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Escape
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Close the hover card
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Default
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Required
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  trigger
                </td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  children
                </td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  open
                </td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">uncontrolled</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  onOpenChange
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  (open: boolean) =&gt; void
                </td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  delayDuration
                </td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">300</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  className
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
