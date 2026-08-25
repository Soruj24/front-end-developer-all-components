"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { ImageComparison } from "@/components/ui/ImageComparison";

const IMAGECOMPARISON_SOURCE = `"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { ImageComparisonProps } from "./ImageComparison.types";

export function ImageComparison({
  beforeSrc, afterSrc, beforeLabel = "Before", afterLabel = "After",
  beforeContent, afterContent, initialPosition = 50, height = 320,
  showLabels = true, onPositionChange, className,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
    onPositionChange?.(pct);
  }, [onPositionChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  useEffect(() => {
    if (!isDragging) return;
    function onMove(e: PointerEvent) { updatePosition(e.clientX); }
    function onUp() { setIsDragging(false); }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    return () => { document.removeEventListener("pointermove", onMove); document.removeEventListener("pointerup", onUp); };
  }, [isDragging, updatePosition]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") { e.preventDefault(); setPosition((p) => { const next = Math.max(0, p - step); onPositionChange?.(next); return next; }); }
    if (e.key === "ArrowRight") { e.preventDefault(); setPosition((p) => { const next = Math.min(100, p + step); onPositionChange?.(next); return next; }); }
  }, [onPositionChange]);

  return (
    <div className={cn("w-full", className)}>
      <div ref={containerRef} role="slider" aria-label="Image comparison"
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)}
        tabIndex={0} onKeyDown={handleKeyDown} onPointerDown={handlePointerDown}
        className={cn("relative overflow-hidden rounded-2xl cursor-ew-resize select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          isDragging && "cursor-grabbing",
        )} style={{ height }}>
        {beforeSrc && <img src={beforeSrc} alt={beforeLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />}
        {!beforeSrc && beforeContent && <div className="absolute inset-0">{beforeContent}</div>}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: \`inset(0 \${100 - position}% 0 0)\` }}>
          {afterSrc && <img src={afterSrc} alt={afterLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />}
          {!afterSrc && afterContent && <div className="absolute inset-0">{afterContent}</div>}
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg" style={{ left: \`\${position}%\` }}>
          <div className={cn("absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
            "rounded-full bg-white shadow-xl transition-transform duration-150", isDragging && "scale-110")}>
            <svg className="h-5 w-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        {showLabels && (
          <>
            <div className="absolute left-3 top-3"><span className="rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{beforeLabel}</span></div>
            <div className="absolute right-3 top-3"><span className="rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{afterLabel}</span></div>
          </>
        )}
      </div>
    </div>
  );
}`;

const BASIC_SRC = `import { ImageComparison } from "@/components/ui/ImageComparison";

<ImageComparison
  beforeSrc="/before.jpg"
  afterSrc="/after.jpg"
  beforeLabel="Before"
  afterLabel="After"
/>`;

const CONTENT_SRC = `import { ImageComparison } from "@/components/ui/ImageComparison";

<ImageComparison
  beforeContent={<div className="flex h-full items-center justify-center bg-gray-200">Original</div>}
  afterContent={<div className="flex h-full items-center justify-center bg-emerald-200">Enhanced</div>}
/>`;

const NO_LABELS_SRC = `import { ImageComparison } from "@/components/ui/ImageComparison";

<ImageComparison beforeSrc="/before.jpg" afterSrc="/after.jpg" showLabels={false} />`;

const HEIGHT_SRC = `import { ImageComparison } from "@/components/ui/ImageComparison";

<ImageComparison beforeSrc="/before.jpg" afterSrc="/after.jpg" height={400} />`;

const CONTROLLED_SRC = `const [pos, setPos] = useState(50);

<ImageComparison beforeSrc="/before.jpg" afterSrc="/after.jpg" onPositionChange={setPos} />
<p>Slider at: {pos.toFixed(1)}%</p>`;

const THEMES_SRC = `import { ImageComparison } from "@/components/ui/ImageComparison";

<ImageComparison
  beforeContent={<div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-medium">Light Mode</div>}
  afterContent={<div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900 text-white font-medium">Dark Mode</div>}
  height={300}
/>`;

export default function ImageComparisonPage() {
  const [pos, setPos] = useState(50);

  return (
    <ComponentDocPage
      name="Image Comparison"
      category="Visual"
      description="Before/after image comparison slider with drag interaction, labels, keyboard navigation, and responsive sizing for product demos."
    >
      <PreviewPanel filename="image-comparison-preview.tsx">
        <div className="w-full max-w-md">
          <ImageComparison
            beforeContent={
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                <span className="text-sm font-medium text-slate-600">Before</span>
              </div>
            }
            afterContent={
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-200 to-orange-300">
                <span className="text-sm font-medium text-orange-700">After</span>
              </div>
            }
            onPositionChange={setPos}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={IMAGECOMPARISON_SOURCE}
        filename="components/ui/ImageComparison/ImageComparison.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="With Images"
          description="Compare two images using src props."
          code={BASIC_SRC}
          filename="basic.tsx"
        >
          <div className="w-full max-w-md">
            <ImageComparison
              beforeContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                  <span className="text-sm font-medium text-slate-600">Original</span>
                </div>
              }
              afterContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-200 to-emerald-300">
                  <span className="text-sm font-medium text-emerald-700">Enhanced</span>
                </div>
              }
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Content"
          description="Pass ReactNode content instead of image sources."
          code={CONTENT_SRC}
          filename="content.tsx"
        >
          <div className="w-full max-w-md">
            <ImageComparison
              beforeContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <span className="text-sm font-medium text-gray-600">Original</span>
                </div>
              }
              afterContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-200 to-emerald-300">
                  <span className="text-sm font-medium text-emerald-700">Enhanced</span>
                </div>
              }
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Labels"
          description="Hide the before/after labels."
          code={NO_LABELS_SRC}
          filename="no-labels.tsx"
        >
          <div className="w-full max-w-md">
            <ImageComparison
              showLabels={false}
              beforeContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                  <span className="text-sm font-medium text-slate-600">Original</span>
                </div>
              }
              afterContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-rose-200 to-rose-300">
                  <span className="text-sm font-medium text-rose-700">Processed</span>
                </div>
              }
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Height"
          description="Set a custom height for the comparison."
          code={HEIGHT_SRC}
          filename="height.tsx"
        >
          <div className="w-full max-w-md">
            <ImageComparison
              height={400}
              beforeContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                  <span className="text-sm font-medium text-slate-600">Before</span>
                </div>
              }
              afterContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-200 to-orange-300">
                  <span className="text-sm font-medium text-orange-700">After</span>
                </div>
              }
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled Position"
          description="Track and display the slider position."
          code={CONTROLLED_SRC}
          filename="controlled.tsx"
        >
          <div className="w-full max-w-md">
            <ImageComparison
              beforeContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                  <span className="text-sm font-medium text-slate-600">Before</span>
                </div>
              }
              afterContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-200 to-orange-300">
                  <span className="text-sm font-medium text-orange-700">After</span>
                </div>
              }
              onPositionChange={setPos}
            />
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Slider at: {pos.toFixed(1)}%
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Theme Comparison"
          description="Compare light and dark mode designs."
          code={THEMES_SRC}
          filename="themes.tsx"
        >
          <div className="w-full max-w-md">
            <ImageComparison
              height={300}
              beforeContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <span className="text-sm font-medium text-blue-600">Light Mode</span>
                </div>
              }
              afterContent={
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900">
                  <span className="text-sm font-medium text-white">Dark Mode</span>
                </div>
              }
            />
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
                  Arrow Left / Right
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Move slider 2%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Shift + Arrow
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Move slider 10%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


    </ComponentDocPage>
  );
}
