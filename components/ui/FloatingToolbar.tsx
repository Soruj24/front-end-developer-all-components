"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface FloatingToolbarAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  active?: boolean;
}

export interface FloatingToolbarProps {
  className?: string;
  groups: FloatingToolbarAction[][];
  onAction?: (action: FloatingToolbarAction) => void;
  selectionLabel?: string;
  disabled?: boolean;
  activeItemId?: string;
  position?: "fixed" | "absolute" | "sticky";
  collapsible?: boolean;
  ariaLabel?: string;
}

const GripIcon = (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="4" r="1.1" />
    <circle cx="11" cy="4" r="1.1" />
    <circle cx="5" cy="8" r="1.1" />
    <circle cx="11" cy="8" r="1.1" />
    <circle cx="5" cy="12" r="1.1" />
    <circle cx="11" cy="12" r="1.1" />
  </svg>
);

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

export function FloatingToolbar({
  className,
  groups,
  onAction,
  selectionLabel,
  disabled = false,
  activeItemId,
  position = "fixed",
  collapsible = true,
  ariaLabel = "Floating toolbar",
}: FloatingToolbarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [rowWidth, setRowWidth] = useState<number | null>(null);

  const pillRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const collapseRef = useRef<HTMLButtonElement | null>(null);
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  const flatActions = useMemo(() => groups.flat(), [groups]);
  const groupStarts = useMemo(() => {
    const starts = [0];
    let count = 0;
    for (const group of groups) {
      count += group.length;
      starts.push(count);
    }
    return starts;
  }, [groups]);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setRowWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stopCount = flatActions.length + (collapsible ? 1 : 0);

  const focusStop = useCallback(
    (index: number) => {
      const next = clamp(index, 0, stopCount - 1);
      setFocusedIndex(next);
      if (next < flatActions.length) buttonRefs.current[next]?.focus();
      else collapseRef.current?.focus();
    },
    [stopCount, flatActions.length],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        focusStop(index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        focusStop(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        focusStop(0);
      } else if (event.key === "End") {
        event.preventDefault();
        focusStop(stopCount - 1);
      }
    },
    [focusStop, stopCount],
  );

  const handleActionClick = useCallback(
    (action: FloatingToolbarAction) => {
      if (disabled || action.disabled) return;
      onAction?.(action);
    },
    [disabled, onAction],
  );

  const startDrag = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (position === "sticky") return;
      if (event.button !== 0) return;
      const el = pillRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      dragStateRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        startLeft: rect.left,
        startTop: rect.top,
      };
      setDragging(true);
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* capture unsupported */
      }
    },
    [position],
  );

  const moveDrag = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const ds = dragStateRef.current;
    const el = pillRef.current;
    if (!ds || !el) return;
    const parent = el.offsetParent as HTMLElement | null;
    const vw = typeof window !== "undefined" ? window.innerWidth : 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 0;
    const parentRect = parent
      ? parent.getBoundingClientRect()
      : { left: 0, top: 0, width: vw, height: vh };
    const dx = event.clientX - ds.startX;
    const dy = event.clientY - ds.startY;
    const maxLeft = Math.max(
      parentRect.left + 8,
      parentRect.left + parentRect.width - el.offsetWidth - 8,
    );
    const maxTop = Math.max(
      parentRect.top + 8,
      parentRect.top + parentRect.height - el.offsetHeight - 8,
    );
    const left =
      clamp(ds.startLeft + dx, parentRect.left + 8, maxLeft) - parentRect.left;
    const top =
      clamp(ds.startTop + dy, parentRect.top + 8, maxTop) - parentRect.top;
    setPos({ left, top });
  }, []);

  const endDrag = useCallback(() => {
    dragStateRef.current = null;
    setDragging(false);
  }, []);

  const pillWidth = rowWidth != null ? Math.ceil(rowWidth) + 14 : undefined;

  const style: React.CSSProperties = { width: pillWidth };
  if (position === "fixed" || position === "absolute") {
    if (pos) {
      style.left = pos.left;
      style.top = pos.top;
      style.transform = "translate(0, 0)";
    } else {
      style.left = "50%";
      style.top = 24;
      style.transform = "translateX(-50%)";
    }
  }

  const showHandle = position !== "sticky" || collapsed;
  const stopIndex = (index: number) =>
    collapsed ? -1 : focusedIndex === index ? 0 : -1;

  return (
    <div
      ref={pillRef}
      role="toolbar"
      aria-label={ariaLabel}
      className={cn(
        "z-50 flex w-max max-w-full select-none items-center gap-1 rounded-2xl border border-border bg-card/80 p-1.5 shadow-lg backdrop-blur-xl",
        position === "fixed" && "fixed",
        position === "absolute" && "absolute",
        position === "sticky" && "sticky top-4 mx-auto",
        "transition-[width,left,top,transform] duration-300 ease-spring",
        dragging && "transition-none",
        className,
      )}
      style={style}
    >
      <div ref={rowRef} className="flex items-center gap-1">
        {showHandle && (
          <button
            type="button"
            aria-label={collapsed ? "Expand toolbar" : "Drag toolbar"}
            className="grid size-9 shrink-0 cursor-grab touch-none place-items-center rounded-xl text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:cursor-grabbing sm:size-10"
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClick={() => setCollapsed(false)}
          >
            {GripIcon}
          </button>
        )}
        <div
          aria-hidden={collapsed ? "true" : undefined}
          inert={collapsed}
          className={cn(
            "grid transition-[grid-template-columns] duration-300 ease-out",
            collapsed ? "grid-cols-[0fr]" : "grid-cols-[1fr]",
          )}
        >
          <div className="min-w-0 overflow-x-clip overflow-y-visible">
            <div
              className={cn(
                "flex items-center gap-0.5 transition-opacity duration-200",
                collapsed && "opacity-0",
              )}
            >
              {selectionLabel && (
                <span className="mx-1 hidden h-9 shrink-0 items-center rounded-lg bg-muted px-2.5 text-xs font-medium text-muted-foreground sm:flex sm:h-10">
                  {selectionLabel}
                </span>
              )}
              {groups.map((group, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  {groupIndex > 0 && (
                    <span
                      aria-hidden="true"
                      className="mx-0.5 h-6 w-px shrink-0 bg-border"
                    />
                  )}
                  {group.map((action, actionIndex) => {
                    const index = groupStarts[groupIndex] + actionIndex;
                    const isActive =
                      action.active === true || action.id === activeItemId;
                    const isDisabled = disabled || action.disabled;
                    return (
                      <div key={action.id} className="group/tooltip relative">
                        <button
                          type="button"
                          ref={(el) => {
                            buttonRefs.current[index] = el;
                          }}
                          aria-label={action.label}
                          aria-pressed={isActive}
                          tabIndex={stopIndex(index)}
                          onFocus={() => setFocusedIndex(index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onClick={() => handleActionClick(action)}
                          disabled={isDisabled}
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:size-10",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted hover:text-foreground",
                            isDisabled &&
                              "cursor-not-allowed opacity-40 hover:bg-transparent hover:text-muted-foreground",
                          )}
                        >
                          {action.icon}
                        </button>
                        <span className="pointer-events-none absolute -top-9 left-1/2 z-40 -translate-x-1/2 scale-95 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground shadow-md opacity-0 transition-all duration-150 ease-out group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 group-focus-visible/tooltip:scale-100 group-focus-visible/tooltip:opacity-100">
                          {action.label}
                          {action.shortcut && (
                            <span className="ml-1.5 font-normal text-muted-foreground">
                              {action.shortcut}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
              {collapsible && (
                <button
                  type="button"
                  ref={collapseRef}
                  aria-label={collapsed ? "Expand toolbar" : "Collapse toolbar"}
                  aria-expanded={!collapsed}
                  tabIndex={stopIndex(flatActions.length)}
                  onFocus={() => setFocusedIndex(flatActions.length)}
                  onKeyDown={(e) => handleKeyDown(e, flatActions.length)}
                  onClick={() => setCollapsed((c) => !c)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground outline-none transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:size-10"
                >
                  <svg
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      collapsed ? "rotate-0" : "rotate-180",
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
