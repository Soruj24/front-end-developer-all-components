import * as React from "react";
import { cn } from "@/lib/cn";
import type { PopoverProps } from "./Popover.types";
import { POPOVER_STYLES } from "./Popover.constants";

export function Popover({ trigger, content, open, defaultOpen, onOpenChange, offset = 8, overlay = true, closeOnEscape = true, closeOnOutsideClick = true, triggerClassName, contentClassName }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (closeOnOutsideClick && contentRef.current && !contentRef.current.contains(e.target as Node) && !triggerRef.current?.contains(e.target as Node)) {
        toggle();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") toggle();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeOnEscape, closeOnOutsideClick]);

  React.useLayoutEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      setCoords({
        x: triggerRect.left,
        y: triggerRect.bottom + offset,
      });
    }
  }, [isOpen, offset]);

  return (
    <>
      <span ref={triggerRef} className={cn(POPOVER_STYLES.trigger, triggerClassName)} onClick={toggle}>
        {trigger}
      </span>
      {isOpen && (
        <>
          {overlay && <div className={POPOVER_STYLES.overlay} />}
          <div ref={contentRef} className={cn(POPOVER_STYLES.content, contentClassName)} style={{ left: coords.x, top: coords.y }}>
            {content}
          </div>
        </>
      )}
    </>
  );
}
