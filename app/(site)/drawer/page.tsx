"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/Drawer";

const DRAWER_SOURCE = `"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  setOpen: () => {},
});

export function Drawer({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: ReactNode }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useContext(DrawerContext);
  return <button type="button" onClick={() => setOpen(true)}>{children}</button>;
}

const sideClasses: Record<string, string> = {
  left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
  right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
  top: "inset-x-0 top-0 border-b",
  bottom: "inset-x-0 bottom-0 border-t",
};

export function DrawerContent({ children, className, side = "right" }: { children: ReactNode; className?: string; side?: "left" | "right" | "top" | "bottom" }) {
  const { open, setOpen } = useContext(DrawerContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className={\`fixed z-50 bg-white dark:bg-zinc-900 shadow-lg transition-transform \${sideClasses[side]} \${className ?? ""}\`}>
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={\`p-6 \${className ?? ""}\`}>{children}</div>;
}

export function DrawerTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={\`text-lg font-semibold \${className ?? ""}\`}>{children}</h2>;
}

export function DrawerDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={\`text-sm text-zinc-500 dark:text-zinc-400 \${className ?? ""}\`}>{children}</p>;
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={\`flex gap-2 p-6 \${className ?? ""}\`}>{children}</div>;
}`;

const LEFT_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Left</DrawerTrigger>
  <DrawerContent side="left">
    <DrawerHeader>
      <DrawerTitle>Left Drawer</DrawerTitle>
    </DrawerHeader>
    <p className="px-6 text-sm text-zinc-500">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

const RIGHT_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Right</DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Right Drawer</DrawerTitle>
    </DrawerHeader>
    <p className="px-6 text-sm text-zinc-500">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

const TOP_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Top</DrawerTrigger>
  <DrawerContent side="top">
    <DrawerHeader>
      <DrawerTitle>Top Drawer</DrawerTitle>
    </DrawerHeader>
    <p className="px-6 text-sm text-zinc-500">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

const BOTTOM_SOURCE = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";

<Drawer>
  <DrawerTrigger>Open Bottom</DrawerTrigger>
  <DrawerContent side="bottom">
    <DrawerHeader>
      <DrawerTitle>Bottom Drawer</DrawerTitle>
    </DrawerHeader>
    <p className="px-6 text-sm text-zinc-500">Content goes here.</p>
  </DrawerContent>
</Drawer>`;

function DrawerDemo({ side }: { side: "left" | "right" | "top" | "bottom" }) {
  return (
    <Drawer>
      <DrawerTrigger className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
        {side.charAt(0).toUpperCase() + side.slice(1)}
      </DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerHeader>
          <DrawerTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Drawer</DrawerTitle>
          <DrawerDescription>This drawer slides in from the {side}.</DrawerDescription>
        </DrawerHeader>
        <p className="px-6 text-sm text-zinc-500">Drawer content goes here.</p>
        <DrawerFooter>
          <DrawerTrigger className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Close</DrawerTrigger>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function DrawerPage() {
  return (
    <ComponentDocPage name="Drawer" category="Overlays" description="An overlay panel that slides in from the edge of the screen. Supports four directions: left, right, top, and bottom.">
      <PreviewPanel filename="drawer-preview.tsx">
        <div className="flex flex-wrap items-center gap-4">
          <DrawerDemo side="left" />
          <DrawerDemo side="right" />
          <DrawerDemo side="top" />
          <DrawerDemo side="bottom" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={DRAWER_SOURCE} filename="components/ui/Drawer.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Left" description="Drawer slides in from the left edge." code={LEFT_SOURCE} filename="drawer-left.tsx">
          <DrawerDemo side="left" />
        </ExampleBlock>

        <ExampleBlock title="Right" description="Drawer slides in from the right edge." code={RIGHT_SOURCE} filename="drawer-right.tsx">
          <DrawerDemo side="right" />
        </ExampleBlock>

        <ExampleBlock title="Top" description="Drawer slides in from the top edge." code={TOP_SOURCE} filename="drawer-top.tsx">
          <DrawerDemo side="top" />
        </ExampleBlock>

        <ExampleBlock title="Bottom" description="Drawer slides in from the bottom edge." code={BOTTOM_SOURCE} filename="drawer-bottom.tsx">
          <DrawerDemo side="bottom" />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
