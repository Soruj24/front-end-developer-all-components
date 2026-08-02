import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface KbdProps extends HTMLAttributes<HTMLSpanElement> {
  keys?: string[];
}

function MacKeys() {
  return (
    <>
      <span className="font-mono text-[10px] opacity-60">⌘</span>
      <span className="font-mono text-[10px]">K</span>
    </>
  );
}

function WinKeys() {
  return <span className="font-mono text-[10px]">Ctrl K</span>;
}

/**
 * Premium SaaS keyboard shortcut indicator.
 *
 * Shows platform-aware key combinations with a soft pill styling.
 */
export const Kbd = forwardRef<HTMLSpanElement, KbdProps>(
  ({ className, children, ...props }, ref) => {
    const isMac =
      typeof window !== "undefined" &&
      /mac/i.test(navigator.platform);

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-md border border-border bg-muted/40 px-1.5 font-mono text-[10px] font-medium text-muted-foreground",
          className
        )}
        {...props}
      >
        {children ?? (isMac ? <MacKeys /> : <WinKeys />)}
      </span>
    );
  }
);
Kbd.displayName = "Kbd";
