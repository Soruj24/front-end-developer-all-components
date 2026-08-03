import * as React from "react";
import { cn } from "@/lib/cn";
import type { CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps, CollapsibleHeaderProps, CollapsibleTitleProps } from "./Collapsible.types";
import { COLLAPSIBLE_STYLES } from "./Collapsible.constants";

export const CollapsibleContext = React.createContext<{
  open: boolean;
  toggle: () => void;
} | null>(null);

export function useCollapsibleContext() {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) throw new Error("useCollapsibleContext must be used within Collapsible");
  return ctx;
}

export function Collapsible({ children, defaultOpen = false, open, onOpenChange, className }: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, toggle }}>
      <div className={cn(className)}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({ children, className, ...props }: CollapsibleTriggerProps) {
  const { toggle } = useCollapsibleContext();
  return (
    <button className={cn(COLLAPSIBLE_STYLES.trigger, className)} onClick={toggle} {...props}>
      {children}
    </button>
  );
}

export function CollapsibleHeader({ children, className, ...props }: CollapsibleHeaderProps) {
  return <div className={cn(COLLAPSIBLE_STYLES.header, className)} {...props}>{children}</div>;
}

export function CollapsibleTitle({ children, className, ...props }: CollapsibleTitleProps) {
  return (
    <h3 className={cn(COLLAPSIBLE_STYLES.title, className)} {...props}>
      {children}
    </h3>
  );
}
