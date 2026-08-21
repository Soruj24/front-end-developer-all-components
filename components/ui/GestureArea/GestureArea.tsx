"use client";

import { useRef, useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import type { GestureAreaProps } from "./GestureArea.types";

export function GestureArea({
  children,
  onSwipe,
  onLongPress,
  onPinch,
  swipeThreshold = 50,
  longPressDelay = 500,
  className,
  disabled = false,
}: GestureAreaProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinchStartRef = useRef<number | null>(null);
  const [gesture, setGesture] = useState<string | null>(null);

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;

      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };

      if (e.touches.length === 2 && onPinch) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchStartRef.current = Math.sqrt(dx * dx + dy * dy);
      }

      if (onLongPress) {
        longPressTimerRef.current = setTimeout(() => {
          setGesture("Long Press");
          onLongPress();
        }, longPressDelay);
      }
    },
    [disabled, onLongPress, longPressDelay, onPinch],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      clearLongPress();

      if (e.touches.length === 2 && onPinch && pinchStartRef.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const scale = dist / pinchStartRef.current;
        setGesture(`Pinch ${scale.toFixed(1)}x`);
        onPinch(scale);
      }
    },
    [disabled, clearLongPress, onPinch],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      clearLongPress();
      pinchStartRef.current = null;

      const start = touchStartRef.current;
      if (!start || e.changedTouches.length === 0) return;

      const end = e.changedTouches[0];
      const dx = end.clientX - start.x;
      const dy = end.clientY - start.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < swipeThreshold) return;

      let dir: "left" | "right" | "up" | "down";
      if (absDx > absDy) {
        dir = dx > 0 ? "right" : "left";
      } else {
        dir = dy > 0 ? "down" : "up";
      }

      const labels: Record<string, string> = {
        left: "Swipe Left",
        right: "Swipe Right",
        up: "Swipe Up",
        down: "Swipe Down",
      };
      setGesture(labels[dir]);
      onSwipe?.(dir);
    },
    [disabled, clearLongPress, swipeThreshold, onSwipe],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      const keyMap: Record<string, string> = {
        ArrowLeft: "Swipe Left",
        ArrowRight: "Swipe Right",
        ArrowUp: "Swipe Up",
        ArrowDown: "Swipe Down",
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        setGesture(keyMap[e.key]);
        const dir = e.key.replace("Arrow", "").toLowerCase() as
          | "left"
          | "right"
          | "up"
          | "down";
        onSwipe?.(dir);
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setGesture("Long Press");
        onLongPress?.();
      }
    },
    [disabled, onSwipe, onLongPress],
  );

  return (
    <div
      role="application"
      aria-label="Gesture detection area"
      tabIndex={disabled ? -1 : 0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex h-48 cursor-grab select-none items-center justify-center",
        "rounded-2xl border-2 border-dashed border-border bg-muted/30",
        "transition-all duration-300",
        "hover:border-primary/40 hover:bg-primary/5",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none",
        "active:cursor-grabbing active:scale-[0.98]",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {children ?? (
        <div className="flex flex-col items-center gap-2 text-center">
          <svg
            className="h-10 w-10 text-muted-foreground/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
          <span className="text-sm text-muted-foreground">
            Swipe, pinch, or long press
          </span>
          {gesture && (
            <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {gesture}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
