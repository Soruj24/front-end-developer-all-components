"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
} from "@/components/ui/Sidebar";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const SIDEBAR_SOURCE = `"use client";

import { createContext, useState } from "react";
import { cn } from "@/lib/cn";
import type { SidebarProps, SidebarHeaderProps, SidebarContentProps, SidebarFooterProps, SidebarItemProps } from "./Sidebar.types";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: true,
  setOpen: () => {},
});

export function Sidebar({ children, open: controlledOpen, onOpenChange, side = "left", className }: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <aside className={cn("flex h-full flex-col border-r bg-white dark:bg-zinc-900", side === "right" && "border-l border-r-0", !open && "hidden", className)}>
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return <div className={cn("p-4 border-b", className)}>{children}</div>;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto p-2", className)}>{children}</div>;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return <div className={cn("p-4 border-t", className)}>{children}</div>;
}

export function SidebarItem({ children, active, onClick, className }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
        active && "bg-zinc-100 dark:bg-zinc-800",
        className
      )}
    >
      {children}
    </button>
  );
}`;

const BASIC_CODE = `import { Sidebar, SidebarHeader, SidebarContent, SidebarItem } from "@/components/ui/Sidebar";

<Sidebar className="w-52">
  <SidebarHeader>
    <div className="px-2 py-2 text-sm font-bold">Acme</div>
  </SidebarHeader>
  <SidebarContent>
    <SidebarItem active>🏠 Dashboard</SidebarItem>
    <SidebarItem>📊 Analytics</SidebarItem>
    <SidebarItem>📄 Reports</SidebarItem>
  </SidebarContent>
</Sidebar>`;

const COLLAPSIBLE_CODE = `import { useState } from "react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem } from "@/components/ui/Sidebar";

function Page() {
  const [open, setOpen] = useState(true);
  return (
    <Sidebar open={open} onOpenChange={setOpen} className="w-52">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-2 text-sm font-bold">
          <span>Acme</span>
          <button onClick={() => setOpen(!open)}>☰</button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem active>Dashboard</SidebarItem>
      </SidebarContent>
    </Sidebar>
  );
}`;

function SidebarNav({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <div className="flex h-64 w-52 overflow-hidden rounded-lg border border-border">
      <Sidebar open={open} onOpenChange={onOpenChange}>
        <SidebarHeader>
          <div className="flex items-center justify-between px-2 py-2 text-sm font-bold">
            <span>Acme</span>
            <button
              type="button"
              onClick={() => onOpenChange(!open)}
              className="flex h-5 w-5 items-center justify-center rounded opacity-60 hover:opacity-100"
            >
              ☐
            </button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-1">
            <SidebarItem active>🏠 Dashboard</SidebarItem>
            <SidebarItem>📊 Analytics</SidebarItem>
            <SidebarItem>📄 Reports</SidebarItem>
            <SidebarItem>👤 Profile</SidebarItem>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem>⚙ Settings</SidebarItem>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 border-l bg-muted/20" />
    </div>
  );
}

export default function SidebarPage() {
  const [open, setOpen] = useState(true);

  return (
    <ComponentDocPage
      name="Sidebar"
      category="Navigation"
      description="A composable navigation sidebar with header, scrollable content, item list, and footer, supporting controlled open state and right-side placement."
    >
      <PreviewPanel filename="sidebar-demo.tsx">
        <SidebarNav open={open} onOpenChange={setOpen} />
      </PreviewPanel>

      <SourceCodeViewer source={SIDEBAR_SOURCE} filename="Sidebar.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default Sidebar" description="Header, content, and footer layout." code={BASIC_CODE}>
          <SidebarNav open={true} onOpenChange={() => {}} />
        </ExampleBlock>

        <ExampleBlock title="Collapsible" description="Controlled open state with a toggle button." code={COLLAPSIBLE_CODE}>
          <SidebarNav open={open} onOpenChange={setOpen} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
