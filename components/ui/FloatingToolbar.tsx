"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface FloatingToolbarAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  /** Keyboard hint shown in the tooltip, e.g. "⌘B". */
  shortcut?: string;
  disabled?: boolean;
  /** Rendered as a pressed state (e.g. Bold active). */
  active?: boolean;
}

export interface FloatingToolbarProps {
  className?: string;
  /** Actions, grouped — each group is separated by a divider. */
  groups: FloatingToolbarAction[][];
  onAction?: (action: FloatingToolbarAction) => void;
  /** Small chip rendered before the actions (e.g. "3 selected"). */
  selectionLabel?: string;
  /** Disables every action in the bar (e.g. when nothing is selected). */
  disabled?: boolean;
  /** Controlled active action id. */
  activeItemId?: string;
  /**
   * Positioning mode.
   * - `fixed`: floats over the viewport at the default (or dragged) position.
   * - `absolute`: floats within the nearest positioned ancestor, draggable.
   * - `sticky`: sticks to the top of its scroll container, not draggable.
   */
  position?: "fixed" | "absolute" | "sticky";
  /** Allow collapse to a small handle. Default true. */
  collapsible?: boolean;
  ariaLabel?: string;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const GripIcon = (
  <svg
    className="h-4 w-4"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
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

/* ------------------------------------------------------------------ */
/* FloatingToolbar                                                     */
/* ------------------------------------------------------------------ */

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
  const rowRef = useRef<HTMLDivElement | null>(null);
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
    [stopCount, flatActions.length]
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
    [focusStop, stopCount]
  );

  const handleActionClick = useCallback(
    (action: FloatingToolbarAction) => {
      if (disabled || action.disabled) return;
      onAction?.(action);
    },
    [disabled, onAction]
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
    [position]
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
    const maxLeft = Math.max(parentRect.left + 8, parentRect.left + parentRect.width - el.offsetWidth - 8);
    const maxTop = Math.max(parentRect.top + 8, parentRect.top + parentRect.height - el.offsetHeight - 8);
    const left = clamp(ds.startLeft + dx, parentRect.left + 8, maxLeft) - parentRect.left;
    const top = clamp(ds.startTop + dy, parentRect.top + 8, maxTop) - parentRect.top;
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
        "z-50 flex w-max select-none items-center gap-1 rounded-2xl border border-black/[0.08] bg-white/80 p-1.5 shadow-card backdrop-blur-xl dark:border-white/[0.1] dark:bg-zinc-900/80",
        position === "fixed" && "fixed",
        position === "absolute" && "absolute",
        position === "sticky" && "sticky top-4 mx-auto",
        "transition-[width,left,top,transform] duration-300 ease-spring",
        dragging && "transition-none",
        className
      )}
      style={style}
    >
      <div ref={rowRef} className="flex items-center gap-1">
        {showHandle && (
          <button
            type="button"
            aria-label={collapsed ? "Expand toolbar" : "Drag toolbar"}
            className={cn(
              "grid size-9 shrink-0 cursor-grab touch-none place-items-center rounded-xl text-zinc-400 outline-none hover:bg-black/[0.05] hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-ring/70 active:cursor-grabbing dark:text-zinc-500 dark:hover:bg-white/[0.08] dark:hover:text-zinc-200"
            )}
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
            collapsed ? "grid-cols-[0fr]" : "grid-cols-[1fr]"
          )}
        >
          <div className="min-w-0 overflow-x-clip overflow-y-visible">
            <div
              className={cn(
                "flex items-center gap-0.5 transition-opacity duration-200",
                collapsed && "opacity-0"
              )}
            >
              {selectionLabel && (
                <span className="mx-1 hidden h-9 shrink-0 items-center rounded-lg bg-black/[0.05] px-2.5 text-xs font-medium text-zinc-500 dark:bg-white/[0.08] dark:text-zinc-400 sm:flex sm:h-10">
                  {selectionLabel}
                </span>
              )}
              {groups.map((group, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  {groupIndex > 0 && (
                    <span
                      aria-hidden="true"
                      className="mx-0.5 h-6 w-px shrink-0 bg-black/[0.08] dark:bg-white/[0.12]"
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
                            "flex size-9 shrink-0 items-center justify-center rounded-xl text-zinc-600 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/70 sm:size-10",
                            isActive
                              ? "bg-foreground text-background"
                              : "hover:bg-black/[0.05] hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-zinc-50",
                            isDisabled &&
                              "cursor-not-allowed opacity-40 hover:bg-transparent hover:text-zinc-600 dark:hover:bg-transparent dark:hover:text-zinc-300"
                          )}
                        >
                          {action.icon}
                        </button>
                        <span className="pointer-events-none absolute -top-9 left-1/2 z-40 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-all duration-150 ease-out group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 group-focus-visible/tooltip:scale-100 group-focus-visible/tooltip:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
                          {action.label}
                          {action.shortcut && (
                            <span className="ml-1.5 font-normal opacity-60">
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
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl text-zinc-400 outline-none hover:bg-black/[0.05] hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-ring/70 dark:text-zinc-500 dark:hover:bg-white/[0.08] dark:hover:text-zinc-200 sm:size-10"
                >
                  <svg
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      collapsed ? "rotate-0" : "rotate-180"
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
