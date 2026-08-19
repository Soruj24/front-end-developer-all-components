"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import {
  ASPECTCONTAINER_SOURCE,
  RATIO4X3_EXAMPLE,
  RATIO1X1_EXAMPLE,
  RESPONSIVE_EXAMPLE,
  IMAGEGRID_EXAMPLE,
} from "./aspect-container-source";

function AspectRatio16x9() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RectangleHorizontal className="h-4 w-4" />
        <span>16:9</span>
      </div>
      <div className="w-full max-w-md overflow-hidden rounded-lg border">
        <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">16:9 Container</span>
        </div>
      </div>
    </div>
  );
}

function AspectRatio4x3() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RectangleVertical className="h-4 w-4" />
        <span>4:3</span>
      </div>
      <div className="w-full max-w-xs overflow-hidden rounded-lg border">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">4:3 Container</span>
        </div>
      </div>
    </div>
  );
}

function AspectRatio1x1() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Square className="h-4 w-4" />
        <span>1:1</span>
      </div>
      <div className="w-full max-w-[200px] overflow-hidden rounded-lg border">
        <div className="relative aspect-square bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">1:1 Container</span>
        </div>
      </div>
    </div>
  );
}

function AspectRatioResponsive() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Responsive aspect ratios</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[21/9] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">21:9</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-video bg-gradient-to-r from-violet-500/20 to-pink-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">16:9</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[4/3] bg-gradient-to-r from-green-500/20 to-teal-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">4:3</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-square bg-gradient-to-r from-rose-500/20 to-red-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">1:1</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[3/4] bg-gradient-to-r from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">3:4</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[9/16] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">9:16</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AspectRatioImageGrid() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Image grid with consistent aspect ratios</p>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="overflow-hidden rounded-lg border">
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">{i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AspectContainerPage() {
  return (
    <ComponentDocPage
      name="Aspect Container"
      category="Layout"
      description="Maintain consistent aspect ratios for media elements. Supports any ratio like 16:9, 4:3, 1:1, and custom values for responsive layouts."
    >
      <PreviewPanel filename="aspect-container.tsx">
        <AspectRatio16x9 />
      </PreviewPanel>

      <SourceCodeViewer source={ASPECTCONTAINER_SOURCE} filename="components/ui/AspectContainer/AspectContainer.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="4:3 Ratio" description="Classic standard ratio for photos and presentations." code={RATIO4X3_EXAMPLE}>
          <AspectRatio4x3 />
        </ExampleBlock>

        <ExampleBlock title="1:1 Ratio" description="Perfect square for avatars, thumbnails, and social media." code={RATIO1X1_EXAMPLE}>
          <AspectRatio1x1 />
        </ExampleBlock>

        <ExampleBlock title="Responsive Ratios" description="Multiple aspect ratios in a responsive grid." code={RESPONSIVE_EXAMPLE}>
          <AspectRatioResponsive />
        </ExampleBlock>

        <ExampleBlock title="Image Grid" description="Uniform image grid with square aspect ratios." code={IMAGEGRID_EXAMPLE}>
          <AspectRatioImageGrid />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}