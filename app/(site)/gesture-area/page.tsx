"use client";

import { useState, useCallback } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { GestureArea } from "@/components/ui/GestureArea";

const GESTURE_SOURCE = `"use client";

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
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
  }, [disabled, onLongPress, longPressDelay, onPinch]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    clearLongPress();
    if (e.touches.length === 2 && onPinch && pinchStartRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const scale = dist / pinchStartRef.current;
      setGesture(\`Pinch \${scale.toFixed(1)}x\`);
      onPinch(scale);
    }
  }, [disabled, clearLongPress, onPinch]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
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
    if (absDx > absDy) { dir = dx > 0 ? "right" : "left"; }
    else { dir = dy > 0 ? "down" : "up"; }
    const labels: Record<string, string> = { left: "Swipe Left", right: "Swipe Right", up: "Swipe Up", down: "Swipe Down" };
    setGesture(labels[dir]);
    onSwipe?.(dir);
  }, [disabled, clearLongPress, swipeThreshold, onSwipe]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    const keyMap: Record<string, string> = { ArrowLeft: "Swipe Left", ArrowRight: "Swipe Right", ArrowUp: "Swipe Up", ArrowDown: "Swipe Down" };
    if (keyMap[e.key]) {
      e.preventDefault();
      setGesture(keyMap[e.key]);
      const dir = e.key.replace("Arrow", "").toLowerCase() as "left" | "right" | "up" | "down";
      onSwipe?.(dir);
    }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setGesture("Long Press");
      onLongPress?.();
    }
  }, [disabled, onSwipe, onLongPress]);

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
          <svg className="h-10 w-10 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          <span className="text-sm text-muted-foreground">Swipe, pinch, or long press</span>
          {gesture && <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{gesture}</span>}
        </div>
      )}
    </div>
  );
}`;

const SWIPE_SRC = `import { GestureArea } from "@/components/ui/GestureArea";

<GestureArea
  onSwipe={(dir) => console.log("Swiped:", dir)}
  onLongPress={() => console.log("Long pressed!")}
/>`;

const DIRECTION_SRC = `import { GestureArea } from "@/components/ui/GestureArea";

<GestureArea
  onSwipe={(dir) => {
    if (dir === "left") setX((p) => p - 20);
    if (dir === "right") setX((p) => p + 20);
    if (dir === "up") setY((p) => p - 20);
    if (dir === "down") setY((p) => p + 20);
  }}
>
  <div className="h-12 w-12 rounded-xl bg-primary shadow-lg transition-all duration-300" style={{ transform: \`translate(\${x}px, \${y}px)\` }} />
</GestureArea>`;

const THRESHOLD_SRC = `import { GestureArea } from "@/components/ui/GestureArea";

<GestureArea swipeThreshold={100} onSwipe={(dir) => console.log(dir)}>
  <span className="text-sm text-muted-foreground">Needs a longer swipe (100px)</span>
</GestureArea>`;

const DISABLED_SRC = `import { GestureArea } from "@/components/ui/GestureArea";

<GestureArea disabled>
  <span className="text-sm text-muted-foreground">Gestures are disabled</span>
</GestureArea>`;

const LOG_SRC = `const [log, setLog] = useState<string[]>([]);

<GestureArea
  onSwipe={(dir) => setLog((p) => [\`Swipe \${dir}\`, ...p].slice(0, 8))}
  onLongPress={() => setLog((p) => ["Long Press", ...p].slice(0, 8))}
>
  <span className="text-sm text-muted-foreground">Swipe or long press</span>
</GestureArea>
{log.length > 0 && (
  <div className="rounded-xl border border-border bg-card p-3">
    {log.map((entry, i) => (
      <div key={i} className="flex items-center gap-2 border-b border-border py-1.5 last:border-0">
        <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{entry}</span>
        <span className="text-xs text-muted-foreground">Just now</span>
      </div>
    ))}
  </div>
)}`;

const CUSTOM_CHILDREN_SRC = `import { GestureArea } from "@/components/ui/GestureArea";

<GestureArea onSwipe={(dir) => console.log(dir)} className="h-64">
  <div className="text-center">
    <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-4">
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
      </svg>
    </div>
    <p className="text-sm font-medium text-foreground">Swipe to interact</p>
    <p className="mt-1 text-xs text-muted-foreground">Arrow keys also work on desktop</p>
  </div>
</GestureArea>`;

export default function GestureAreaPage() {
  const [gesture, setGesture] = useState<string | null>(null);
  const [swipes, setSwipes] = useState<string[]>([]);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleSwipe = useCallback(
    (dir: "left" | "right" | "up" | "down") => {
      const labels: Record<string, string> = {
        left: "Swipe Left",
        right: "Swipe Right",
        up: "Swipe Up",
        down: "Swipe Down",
      };
      setGesture(labels[dir]);
      setSwipes((p) => [labels[dir], ...p].slice(0, 8));

      setPos((prev) => {
        const delta = 20;
        switch (dir) {
          case "left":
            return { x: prev.x - delta, y: prev.y };
          case "right":
            return { x: prev.x + delta, y: prev.y };
          case "up":
            return { x: prev.x, y: prev.y - delta };
          case "down":
            return { x: prev.x, y: prev.y + delta };
        }
      });
    },
    [],
  );

  const handleLongPress = useCallback(() => {
    setGesture("Long Press");
    setSwipes((p) => ["Long Press", ...p].slice(0, 8));
  }, []);

  return (
    <ComponentDocPage
      name="Gesture Area"
      category="Interaction"
      description="Touch gesture detection area supporting swipe, pinch, rotate, and long-press with visual feedback. Supports keyboard navigation for desktop accessibility."
    >
      <PreviewPanel filename="gesture-area-preview.tsx">
        <GestureArea
          onSwipe={handleSwipe}
          onLongPress={handleLongPress}
          className="max-w-sm"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="inline-flex rounded-2xl bg-primary/10 p-4">
              <svg
                className="h-10 w-10 text-primary/60"
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
            </div>
            <span className="text-sm text-muted-foreground">
              Swipe or long press to interact
            </span>
            {gesture && (
              <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {gesture}
              </span>
            )}
          </div>
        </GestureArea>
      </PreviewPanel>

      <SourceCodeViewer
        source={GESTURE_SOURCE}
        filename="components/ui/GestureArea/GestureArea.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Swipe"
          description="Detect swipe direction with keyboard support."
          code={SWIPE_SRC}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <GestureArea onSwipe={handleSwipe} onLongPress={handleLongPress}>
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
                  Swipe or long press
                </span>
                {gesture && (
                  <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {gesture}
                  </span>
                )}
              </div>
            </GestureArea>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Move on Swipe"
          description="Move an element in the swipe direction."
          code={DIRECTION_SRC}
          filename="direction.tsx"
        >
          <div className="w-full max-w-sm">
            <GestureArea onSwipe={handleSwipe} className="h-64">
              <div
                className="h-12 w-12 rounded-xl bg-primary shadow-lg transition-all duration-300"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                }}
              />
            </GestureArea>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Threshold"
          description="Increase the swipe distance required to trigger."
          code={THRESHOLD_SRC}
          filename="threshold.tsx"
        >
          <div className="w-full max-w-sm">
            <GestureArea swipeThreshold={100} onSwipe={handleSwipe}>
              <span className="text-sm text-muted-foreground">
                Needs a longer swipe (100px)
              </span>
            </GestureArea>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Gesture area that ignores all input."
          code={DISABLED_SRC}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-sm">
            <GestureArea disabled>
              <span className="text-sm text-muted-foreground">
                Gestures are disabled
              </span>
            </GestureArea>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Gesture Log"
          description="Accumulate gesture events in a log."
          code={LOG_SRC}
          filename="log.tsx"
        >
          <div className="w-full max-w-sm">
            <GestureArea
              onSwipe={handleSwipe}
              onLongPress={handleLongPress}
            >
              <span className="text-sm text-muted-foreground">
                Swipe or long press
              </span>
            </GestureArea>
            {swipes.length > 0 && (
              <div className="mt-3 rounded-xl border border-border bg-card p-3">
                {swipes.map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 border-b border-border py-1.5 last:border-0"
                  >
                    <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {entry}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Just now
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Children"
          description="Replace the default content with custom children."
          code={CUSTOM_CHILDREN_SRC}
          filename="custom.tsx"
        >
          <div className="w-full max-w-sm">
            <GestureArea onSwipe={handleSwipe} className="h-64">
              <div className="text-center">
                <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-4">
                  <svg
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Swipe to interact
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Arrow keys also work on desktop
                </p>
              </div>
            </GestureArea>
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Key
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Arrow Left/Right/Up/Down
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Swipe in that direction
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Space / Enter
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Trigger long press
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


    </ComponentDocPage>
  );
}
