"use client";

import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type DropdownAlign = "start" | "center" | "end";

interface MenuCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
  align: DropdownAlign;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MenuContext = createContext<MenuCtx>({
  open: false,
  setOpen: () => {},
  align: "start",
  triggerRef: { current: null },
});

export interface DropdownMenuProps {
  trigger: ReactNode | ((open: boolean) => ReactNode);
  children: ReactNode;
  align?: DropdownAlign;
  className?: string;
}

function useClickOutside(onClose: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, enabled]);
  return ref;
}

export function DropdownMenu({
  trigger,
  children,
  align = "start",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useClickOutside(() => setOpen(false), open);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <MenuContext.Provider value={{ open, setOpen, align, triggerRef }}>
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        <div className="outline-none">
          {typeof trigger === "function" ? trigger(open) : trigger}
        </div>
        <div
          data-state={open ? "open" : "closed"}
          className={cn(
            "pointer-events-none absolute z-50 mt-1.5 min-w-[12rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 text-foreground shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50",
            "data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-200",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            align === "end"
              ? "right-0"
              : align === "center"
                ? "left-1/2 -translate-x-1/2"
                : "left-0",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setOpen, open } = useContext(MenuContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="menu"
      data-state={open ? "open" : "closed"}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border/60 bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/[0.04] transition-all duration-150",
        "hover:bg-muted hover:text-foreground hover:border-border/80",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none",
        "active:scale-[0.98]",
        "dark:ring-white/[0.08]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { align } = useContext(MenuContext);
  const alignClass =
    align === "end"
      ? "right-0"
      : align === "center"
        ? "left-1/2 -translate-x-1/2"
        : "left-0";
  return (
    <div
      role="menu"
      data-state="open"
      className={cn(
        "min-w-[12rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 text-foreground shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-200",
        alignClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  shortcut,
  icon,
  disabled,
  destructive,
  onClick,
  className,
}: {
  children: ReactNode;
  shortcut?: string;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const { setOpen } = useContext(MenuContext);
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors duration-100",
        "text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        destructive &&
          "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      {icon && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground/70">
          {icon}
        </span>
      )}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="ml-auto font-mono text-[11px] tracking-wider text-muted-foreground/50">
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function DropdownMenuSeparator({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
    />
  );
}

export function DropdownMenuLabel({
  children,
  className,
  inset,
}: {
  children: ReactNode;
  className?: string;
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-2.5 py-1.5 text-xs font-semibold text-muted-foreground/70",
        inset && "pl-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div role="group" className={cn("p-0.5", className)}>
      {children}
    </div>
  );
}
