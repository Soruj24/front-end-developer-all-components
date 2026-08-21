"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/Drawer";

const DRAWER_SOURCE = `"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const DrawerContext = createContext<{ open: boolean; setOpen: (open: boolean) => void }>({ open: false, setOpen: () => {} });

export function Drawer({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: ReactNode }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  return <DrawerContext.Provider value={{ open, setOpen }}>{children}</DrawerContext.Provider>;
}

export function DrawerTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { setOpen } = useContext(DrawerContext);
  return <button type="button" onClick={() => setOpen(true)} className={cn("inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-muted hover:border-border focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-[0.98]", className)}>{children}</button>;
}

const sideStyles = { left: { panel: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r", slide: "slide-in-from-left" }, right: { panel: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l", slide: "slide-in-from-right" }, top: { panel: "inset-x-0 top-0 border-b", slide: "slide-in-from-top" }, bottom: { panel: "inset-x-0 bottom-0 border-t", slide: "slide-in-from-bottom" } } as const;

export function DrawerContent({ children, className, side = "right" }: { children: ReactNode; className?: string; side?: "left" | "right" | "top" | "bottom" }) {
  const { open, setOpen } = useContext(DrawerContext);
  const handleEscape = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }, [setOpen]);
  useEffect(() => { if (open) { document.addEventListener("keydown", handleEscape); document.body.style.overflow = "hidden"; return () => { document.removeEventListener("keydown", handleEscape); document.body.style.overflow = ""; }; } }, [open, handleEscape]);
  if (!open) return null;
  const { panel, slide } = sideStyles[side];
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0" onClick={() => setOpen(false)} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className={cn("fixed z-50 flex flex-col bg-card shadow-xl animate-in duration-300 ease-out fill-mode-forwards", panel, slide, className)}>{children}</div>
    </div>
  );
}

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex items-start justify-between gap-4 border-b border-border px-6 py-5", className)}>{children}</div>;
}

export function DrawerTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-base font-semibold text-foreground", className)}>{children}</h2>;
}

export function DrawerDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-1 text-sm text-muted-foreground", className)}>{children}</p>;
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex items-center gap-2 border-t border-border px-6 py-4", className)}>{children}</div>;
}

export function DrawerClose({ children, className }: { children?: ReactNode; className?: string }) {
  const { setOpen } = useContext(DrawerContext);
  return <button type="button" onClick={() => setOpen(false)} className={cn("inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card", className)} aria-label="Close drawer">{children ?? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}</button>;
}`;

const LEFT_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Left</DrawerTrigger>
  <DrawerContent side="left">
    <DrawerHeader>
      <DrawerTitle>Left Drawer</DrawerTitle>
      <DrawerClose />
    </DrawerHeader>
    <p className="px-6 text-sm text-muted-foreground">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

const RIGHT_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Right</DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Right Drawer</DrawerTitle>
      <DrawerClose />
    </DrawerHeader>
    <p className="px-6 text-sm text-muted-foreground">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

const TOP_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Top</DrawerTrigger>
  <DrawerContent side="top">
    <DrawerHeader>
      <DrawerTitle>Top Drawer</DrawerTitle>
      <DrawerClose />
    </DrawerHeader>
    <p className="px-6 text-sm text-muted-foreground">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

const BOTTOM_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Bottom</DrawerTrigger>
  <DrawerContent side="bottom">
    <DrawerHeader>
      <DrawerTitle>Bottom Drawer</DrawerTitle>
      <DrawerClose />
    </DrawerHeader>
    <p className="px-6 text-sm text-muted-foreground">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

const CONTROLLED_SOURCE = `import { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/Drawer";

function ControlledDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>Open Controlled</DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Controlled Drawer</DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          <p className="px-6 text-sm text-muted-foreground">This drawer state is managed externally.</p>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <p className="text-sm text-muted-foreground">State: {open ? "Open" : "Closed"}</p>
    </div>
  );
}`;

const WITH_CLOSE_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open with Footer</DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Drawer with Footer</DrawerTitle>
      <DrawerDescription>Has a close button in header and footer actions.</DrawerDescription>
    </DrawerHeader>
    <div className="flex-1 px-6 py-4 text-sm text-muted-foreground">Body content goes here.</div>
    <DrawerFooter>
      <DrawerClose className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</DrawerClose>
      <button type="button" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Confirm</button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;

function DrawerDemo({ side }: { side: "left" | "right" | "top" | "bottom" }) {
  return (
    <Drawer>
      <DrawerTrigger>
        {side.charAt(0).toUpperCase() + side.slice(1)}
      </DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerHeader>
          <div>
            <DrawerTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Drawer</DrawerTitle>
            <DrawerDescription>This drawer slides in from the {side}.</DrawerDescription>
          </div>
          <DrawerClose />
        </DrawerHeader>
        <div className="flex-1 px-6 py-4 text-sm text-muted-foreground">
          Drawer content goes here. Press Escape or click the backdrop to close.
        </div>
        <DrawerFooter>
          <DrawerClose className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function DrawerPage() {
  return (
    <ComponentDocPage name="Drawer" category="Overlays" description="An overlay panel that slides in from the edge of the screen. Supports four directions, Escape key to close, backdrop blur, and composable sub-components.">
      <PreviewPanel filename="drawer-preview.tsx">
        <div className="flex flex-wrap items-center gap-3">
          <DrawerDemo side="left" />
          <DrawerDemo side="right" />
          <DrawerDemo side="top" />
          <DrawerDemo side="bottom" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={DRAWER_SOURCE} filename="components/ui/Drawer/Drawer.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Left" description="Slides in from the left edge." code={LEFT_SOURCE} filename="drawer-left.tsx">
          <DrawerDemo side="left" />
        </ExampleBlock>

        <ExampleBlock title="Right" description="Slides in from the right edge." code={RIGHT_SOURCE} filename="drawer-right.tsx">
          <DrawerDemo side="right" />
        </ExampleBlock>

        <ExampleBlock title="Top" description="Slides in from the top edge." code={TOP_SOURCE} filename="drawer-top.tsx">
          <DrawerDemo side="top" />
        </ExampleBlock>

        <ExampleBlock title="Bottom" description="Slides in from the bottom edge." code={BOTTOM_SOURCE} filename="drawer-bottom.tsx">
          <DrawerDemo side="bottom" />
        </ExampleBlock>

        <ExampleBlock title="Controlled" description="Drawer state managed externally via open/onOpenChange props." code={CONTROLLED_SOURCE} filename="controlled.tsx">
          <ControlledDemo />
        </ExampleBlock>

        <ExampleBlock title="With Footer Actions" description="Header close button plus footer action buttons." code={WITH_CLOSE_SOURCE} filename="with-footer.tsx">
          <Drawer>
            <DrawerTrigger>Open with Footer</DrawerTrigger>
            <DrawerContent side="right">
              <DrawerHeader>
                <div>
                  <DrawerTitle>Drawer with Footer</DrawerTitle>
                  <DrawerDescription>Has a close button in header and footer actions.</DrawerDescription>
                </div>
                <DrawerClose />
              </DrawerHeader>
              <div className="flex-1 px-6 py-4 text-sm text-muted-foreground">Body content goes here.</div>
              <DrawerFooter>
                <DrawerClose className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</DrawerClose>
                <button type="button" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Confirm</button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>Open Controlled</DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <div>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>This drawer state is managed externally.</DrawerDescription>
            </div>
            <DrawerClose />
          </DrawerHeader>
          <div className="flex-1 px-6 py-4 text-sm text-muted-foreground">This drawer state is managed externally.</div>
          <DrawerFooter>
            <DrawerClose className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <p className="text-sm text-muted-foreground">State: {open ? "Open" : "Closed"}</p>
    </div>
  );
}
