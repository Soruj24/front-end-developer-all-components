"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { ImageComparisonProps } from "./ImageComparison.types";

export function ImageComparison({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeContent,
  afterContent,
  initialPosition = 50,
  height = 320,
  showLabels = true,
  onPositionChange,
  className,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(pct);
      onPositionChange?.(pct);
    },
    [onPositionChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  useEffect(() => {
    if (!isDragging) return;

    function onMove(e: PointerEvent) {
      updatePosition(e.clientX);
    }
    function onUp() {
      setIsDragging(false);
    }

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, [isDragging, updatePosition]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 2;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPosition((p) => {
          const next = Math.max(0, p - step);
          onPositionChange?.(next);
          return next;
        });
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setPosition((p) => {
          const next = Math.min(100, p + step);
          onPositionChange?.(next);
          return next;
        });
      }
    },
    [onPositionChange],
  );

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        role="slider"
        aria-label="Image comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "cursor-ew-resize select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          isDragging && "cursor-grabbing",
        )}
        style={{ height }}
      >
        {beforeSrc && (
          <img
            src={beforeSrc}
            alt={beforeLabel}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {!beforeSrc && beforeContent && (
          <div className="absolute inset-0">{beforeContent}</div>
        )}

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {afterSrc && (
            <img
              src={afterSrc}
              alt={afterLabel}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {!afterSrc && afterContent && (
            <div className="absolute inset-0">{afterContent}</div>
          )}
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg"
          style={{ left: `${position}%` }}
        >
          <div
            className={cn(
              "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
              "rounded-full bg-white shadow-xl",
              "transition-transform duration-150",
              isDragging && "scale-110",
            )}
          >
            <svg
              className="h-5 w-5 text-foreground/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {showLabels && (
          <>
            <div className="absolute left-3 top-3">
              <span className="rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {beforeLabel}
              </span>
            </div>
            <div className="absolute right-3 top-3">
              <span className="rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {afterLabel}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
