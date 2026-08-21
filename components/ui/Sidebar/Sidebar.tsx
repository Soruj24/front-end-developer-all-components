"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { cn } from "@/lib/cn";
import type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarItemProps,
  SidebarGroupProps,
  SidebarTriggerProps,
  SidebarSide,
} from "./Sidebar.types";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  side: SidebarSide;
}

const SidebarCtx = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  side: "left",
});

function useSidebar() {
  return useContext(SidebarCtx);
}

export function Sidebar({
  children,
  side = "left",
  width = 256,
  collapsed: controlled,
  onCollapsedChange,
  className,
}: SidebarProps) {
  const [internal, setInternal] = useState(false);
  const collapsed = controlled ?? internal;
  const setCollapsed = onCollapsedChange ?? setInternal;

  return (
    <SidebarCtx.Provider value={{ collapsed, setCollapsed, side }}>
      <aside
        role="navigation"
        aria-label="Sidebar"
        className={cn(
          "flex h-full flex-col border-r border-border/60 bg-background text-foreground transition-[width] duration-200 ease-in-out",
          side === "right" && "border-l border-r-0",
          collapsed ? "w-16" : "w-[var(--sb-w)]",
          className,
        )}
        style={{ "--sb-w": `${width}px` } as React.CSSProperties}
      >
        {children}
      </aside>
    </SidebarCtx.Provider>
  );
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "flex items-center border-b border-border/60 px-3 py-3 transition-all duration-200",
        collapsed ? "justify-center px-2" : "gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-2 py-2", className)}>
      {children}
    </div>
  );
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "border-t border-border/60 px-3 py-3 transition-all duration-200",
        collapsed ? "justify-center px-2" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SidebarItem({
  children,
  active,
  disabled,
  onClick,
  className,
}: SidebarItemProps) {
  const { collapsed } = useSidebar();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium outline-none transition-all duration-150",
        "hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "active:bg-muted/80 disabled:pointer-events-none disabled:opacity-50",
        active && "bg-primary/10 text-primary hover:bg-primary/15",
        !active && "text-muted-foreground",
        collapsed && "justify-center px-0",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SidebarGroup({
  label,
  children,
  className,
}: SidebarGroupProps) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label && !collapsed && (
        <span className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <button
      type="button"
      onClick={() => setCollapsed(!collapsed)}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground outline-none transition-all duration-150",
        "hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "active:bg-muted/80",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("transition-transform duration-200", collapsed && "rotate-180")}
      >
        <path d="m11 17-5-5 5-5" />
        <path d="m18 17-5-5 5-5" />
      </svg>
    </button>
  );
}
