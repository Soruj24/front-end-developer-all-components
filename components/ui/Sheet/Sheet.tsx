"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { SheetProps } from "./Sheet.types";

const sideClasses = {
  left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
  right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
  top: "inset-x-0 top-0 h-auto max-h-[80vh] border-b",
  bottom: "inset-x-0 bottom-0 h-auto max-h-[80vh] border-t",
};

const slideFromClasses = {
  left: "-translate-x-full data-[state=open]:translate-x-0",
  right: "translate-x-full data-[state=open]:translate-x-0",
  top: "-translate-y-full data-[state=open]:translate-y-0",
  bottom: "translate-y-full data-[state=open]:translate-y-0",
};

export default function Sheet({
  open,
  onOpenChange,
  side = "right",
  children,
  className,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in-fast"
        onClick={() => onOpenChange(false)}
      />
      <div
        data-state={open ? "open" : "closed"}
        className={cn(
          "fixed z-50 bg-surface shadow-lg transition-transform duration-300 ease-out",
          sideClasses[side],
          slideFromClasses[side],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
