"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Sheet } from "@/components/ui/Sheet";

const SHEET_SOURCE = `"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type SheetSide = "top" | "right" | "bottom" | "left";
type SheetSize = "sm" | "md" | "lg" | "xl" | "full";

interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: SheetSide;
  size?: SheetSize;
  trigger?: ReactNode;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  closable?: boolean;
  className?: string;
  overlayClassName?: string;
}

const SIDE_CLASSES = {
  left: "inset-y-0 left-0 h-full w-80 max-w-[85vw] border-r rounded-r-2xl",
  right: "inset-y-0 right-0 h-full w-80 max-w-[85vw] border-l rounded-l-2xl",
  top: "inset-x-0 top-0 w-full max-h-[85vh] border-b rounded-b-2xl",
  bottom: "inset-x-0 bottom-0 w-full max-h-[85vh] border-t rounded-t-2xl",
};

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "inset-0 h-full w-full max-w-none rounded-none",
};

const SLIDE_CLASSES = {
  left: "-translate-x-full data-[state=open]:translate-x-0",
  right: "translate-x-full data-[state=open]:translate-x-0",
  top: "-translate-y-full data-[state=open]:translate-y-0",
  bottom: "translate-y-full data-[state=open]:translate-y-0",
};

export function Sheet({ open: controlledOpen, defaultOpen = false, onOpenChange, side = "right", size = "md", trigger, children, title, description, closable = true, className, overlayClassName }: SheetProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const setOpen = useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); e.stopPropagation(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const triggerNode = trigger ? (
    <div onClick={() => setOpen(true)} role="button" tabIndex={0} className="inline-block cursor-pointer">
      {trigger}
    </div>
  ) : null;

  if (!isOpen || !mounted) return triggerNode;

  return (
    <>
      {triggerNode}
      {createPortal(
        <div className="fixed inset-0 z-50">
          <div className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm", overlayClassName)} onClick={() => setOpen(false)} />
          <div ref={panelRef} data-state={isOpen ? "open" : "closed"} role="dialog" aria-modal="true"
            className={cn("fixed z-50 flex flex-col bg-background shadow-2xl shadow-black/10 border-border/50 duration-300 ease-out", SIDE_CLASSES[side], size !== "full" ? SIZE_CLASSES[size] : "", SLIDE_CLASSES[side], size === "full" && SIZE_CLASSES.full, className)}>
            {(title || description || closable) && (
              <div className="flex flex-col gap-1 border-b border-border/50 px-6 pt-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  {title && <h2 className="text-lg font-semibold leading-none tracking-tight text-foreground">{title}</h2>}
                  {closable && <button onClick={() => setOpen(false)} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" aria-label="Close"><CloseIcon /></button>}
                </div>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}`;

export default function SheetPage() {
  return (
    <ComponentDocPage
      name="Sheet"
      category="Overlays"
      description="A sliding panel that overlays content from any edge of the screen. Supports four directions, multiple sizes, controlled/uncontrolled state, and keyboard dismissal."
    >
      <PreviewPanel filename="sheet-preview.tsx">
        <div className="flex flex-wrap items-center gap-3">
          {(["left", "right", "top", "bottom"] as const).map((s) => (
            <Sheet
              key={s}
              side={s}
              title={`${s.charAt(0).toUpperCase() + s.slice(1)} Sheet`}
              description={`This sheet slides in from the ${s}.`}
              trigger={
                <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
              }
            >
              <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
            </Sheet>
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SHEET_SOURCE}
        filename="components/ui/Sheet/Sheet.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        {/* Default */}
        <ExampleBlock
          title="Default"
          description="Right sheet with title, description, and form content."
          code={`import { Sheet } from "@/components/ui/Sheet";\n\n<Sheet\n  trigger={<button>Open</button>}\n  title="Edit Profile"\n  description="Make changes to your profile here."\n>\n  <div className="flex flex-col gap-4">\n    <div className="flex flex-col gap-2">\n      <label className="text-sm font-medium">Name</label>\n      <input className="rounded-xl border border-border bg-background px-3 py-2 text-sm" />\n    </div>\n    <div className="flex flex-col gap-2">\n      <label className="text-sm font-medium">Email</label>\n      <input className="rounded-xl border border-border bg-background px-3 py-2 text-sm" />\n    </div>\n  </div>\n</Sheet>`}
          filename="sheet-default.tsx"
        >
          <Sheet
            trigger={
              <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                Open Sheet
              </span>
            }
            title="Edit Profile"
            description="Make changes to your profile here."
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <input
                  className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </Sheet>
        </ExampleBlock>

        {/* Left */}
        <ExampleBlock
          title="Left"
          description="Sheet slides in from the left edge."
          code={`<Sheet side="left" trigger={<button>Open Left</button>} title="Left Sheet">\n  <p>Content from the left.</p>\n</Sheet>`}
          filename="sheet-left.tsx"
        >
          <Sheet
            side="left"
            trigger={
              <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                Left
              </span>
            }
            title="Left Sheet"
            description="This sheet slides in from the left."
          >
            <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
          </Sheet>
        </ExampleBlock>

        {/* Right */}
        <ExampleBlock
          title="Right"
          description="Sheet slides in from the right edge (default)."
          code={`<Sheet side="right" trigger={<button>Open Right</button>} title="Right Sheet">\n  <p>Content from the right.</p>\n</Sheet>`}
          filename="sheet-right.tsx"
        >
          <Sheet
            side="right"
            trigger={
              <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                Right
              </span>
            }
            title="Right Sheet"
            description="This sheet slides in from the right."
          >
            <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
          </Sheet>
        </ExampleBlock>

        {/* Top */}
        <ExampleBlock
          title="Top"
          description="Sheet slides in from the top edge."
          code={`<Sheet side="top" trigger={<button>Open Top</button>} title="Top Sheet">\n  <p>Content from the top.</p>\n</Sheet>`}
          filename="sheet-top.tsx"
        >
          <Sheet
            side="top"
            trigger={
              <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                Top
              </span>
            }
            title="Top Sheet"
            description="This sheet slides in from the top."
          >
            <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
          </Sheet>
        </ExampleBlock>

        {/* Bottom */}
        <ExampleBlock
          title="Bottom"
          description="Sheet slides in from the bottom edge."
          code={`<Sheet side="bottom" trigger={<button>Open Bottom</button>} title="Bottom Sheet">\n  <p>Content from the bottom.</p>\n</Sheet>`}
          filename="sheet-bottom.tsx"
        >
          <Sheet
            side="bottom"
            trigger={
              <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                Bottom
              </span>
            }
            title="Bottom Sheet"
            description="This sheet slides in from the bottom."
          >
            <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
          </Sheet>
        </ExampleBlock>

        {/* Sizes */}
        <ExampleBlock
          title="Sizes"
          description="Sheets come in sm, md (default), lg, xl, and full sizes."
          code={`<Sheet size="lg" trigger={<button>Large</button>} title="Large Sheet">\n  <p>Wide content area.</p>\n</Sheet>`}
          filename="sheet-sizes.tsx"
        >
          <div className="flex flex-wrap gap-3">
            {(["sm", "md", "lg", "xl", "full"] as const).map((s) => (
              <Sheet
                key={s}
                size={s}
                trigger={
                  <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                    {s.toUpperCase()}
                  </span>
                }
                title={`${s.toUpperCase()} Sheet`}
                description={`This sheet uses the "${s}" size.`}
              >
                <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
              </Sheet>
            ))}
          </div>
        </ExampleBlock>

        {/* Not Closable */}
        <ExampleBlock
          title="Not Closable"
          description="Disable the close button. Escape key still works."
          code={`<Sheet closable={false} trigger={<button>No Close Button</button>} title="Locked">\n  <p>Use Escape to dismiss.</p>\n</Sheet>`}
          filename="sheet-not-closable.tsx"
        >
          <Sheet
            closable={false}
            trigger={
              <span className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                No Close Button
              </span>
            }
            title="Locked"
            description="This sheet has no close button. Press Escape to dismiss."
          >
            <p className="text-sm text-muted-foreground">
              Use the Escape key to dismiss this sheet.
            </p>
          </Sheet>
        </ExampleBlock>

        {/* Controlled */}
        <ExampleBlock
          title="Controlled"
          description="Control open state externally."
          code={`const [open, setOpen] = useState(false);\n\n<button onClick={() => setOpen(true)}>Open</button>\n<Sheet open={open} onOpenChange={setOpen} title="Controlled">\n  <p>Controlled content.</p>\n</Sheet>`}
          filename="sheet-controlled.tsx"
        >
          <ControlledSheetDemo />
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}

function ControlledSheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
      >
        Open Controlled
      </button>
      <Sheet open={open} onOpenChange={setOpen} title="Controlled Sheet">
        <p className="text-sm text-muted-foreground">
          This sheet&apos;s open state is managed externally.
        </p>
      </Sheet>
    </>
  );
}
