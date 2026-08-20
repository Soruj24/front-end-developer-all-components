"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { cn } from "@/lib/cn";

const ASPECTRATIO_SOURCE = `"use client";

import { cn } from "@/lib/cn";

interface AspectRatioProps {
  ratio?: number;
  className?: string;
  children: React.ReactNode;
}

export function AspectRatio({
  ratio = 1,
  className,
  children,
}: AspectRatioProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
}`;

const COMMON_RATIOS = [
  { label: "1:1", ratio: 1, desc: "Square — avatars, thumbnails" },
  { label: "4:3", ratio: 4 / 3, desc: "Classic — photos, presentations" },
  { label: "16:9", ratio: 16 / 9, desc: "Widescreen — video, hero images" },
  { label: "3:2", ratio: 3 / 2, desc: "Photo — DSLR standard" },
  { label: "21:9", ratio: 21 / 9, desc: "Ultra-wide — cinematic" },
  { label: "3:4", ratio: 3 / 4, desc: "Portrait — mobile, cards" },
  { label: "9:16", ratio: 9 / 16, desc: "Tall — stories, reels" },
  { label: "2:3", ratio: 2 / 3, desc: "Tall portrait — book covers" },
];

function RatioCard({ label, ratio, desc }: { label: string; ratio: number; desc: string }) {
  return (
    <div className="flex flex-col gap-2">
      <AspectRatio ratio={ratio}>
        <div className="flex h-full items-center justify-center rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted/80">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold tabular-nums text-foreground">{label}</span>
            <span className="text-[10px] text-muted-foreground">{desc}</span>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}

const RATIOS_EXAMPLE = `<AspectRatio ratio={16 / 9}>
  <div className="flex h-full items-center justify-center rounded-xl bg-muted">
    <span className="text-sm font-medium">16:9</span>
  </div>
</AspectRatio>`;

const IMAGE_EXAMPLE = `<AspectRatio ratio={16 / 9}>
  <img
    src="/photo.jpg"
    alt="Landscape photo"
    className="h-full w-full object-cover rounded-xl"
  />
</AspectRatio>`;

const VIDEO_EXAMPLE = `<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    className="h-full w-full rounded-xl"
    allowFullScreen
  />
</AspectRatio>`;

const GRID_EXAMPLE = `<div className="grid grid-cols-2 gap-4">
  <AspectRatio ratio={1}>
    <div className="h-full rounded-xl bg-muted" />
  </AspectRatio>
  <AspectRatio ratio={1}>
    <div className="h-full rounded-xl bg-muted" />
  </AspectRatio>
</div>`;

const CUSTOM_EXAMPLE = `<AspectRatio ratio={2.5}>
  <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white">
    <span className="text-sm font-bold">2.5:1 Banner</span>
  </div>
</AspectRatio>`;

function RatiosExample() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {COMMON_RATIOS.slice(0, 4).map((r) => (
        <RatioCard key={r.label} {...r} />
      ))}
    </div>
  );
}

function ImageExample() {
  return (
    <div className="w-full max-w-lg">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-pink-500/10 border border-border">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
            </svg>
            <span className="text-sm font-medium">16:9 Image Container</span>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}

function VideoExample() {
  return (
    <div className="w-full max-w-xl">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/10 via-red-500/10 to-orange-500/10 border border-border">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground/10 backdrop-blur-sm">
              <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Video Player Placeholder</span>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}

function GridExample() {
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <AspectRatio key={i} ratio={1}>
            <div className={cn(
              "flex h-full items-center justify-center rounded-xl border border-border",
              i === 1 && "bg-gradient-to-br from-blue-500/15 to-blue-600/5",
              i === 2 && "bg-gradient-to-br from-emerald-500/15 to-emerald-600/5",
              i === 3 && "bg-gradient-to-br from-violet-500/15 to-violet-600/5",
              i === 4 && "bg-gradient-to-br from-amber-500/15 to-amber-600/5",
            )}>
              <span className="text-xs font-medium text-muted-foreground">{i}</span>
            </div>
          </AspectRatio>
        ))}
      </div>
    </div>
  );
}

function CustomExample() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Banner (2.5:1)</p>
        <AspectRatio ratio={2.5}>
          <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20">
            <span className="text-sm font-bold tracking-wide">2.5 : 1</span>
          </div>
        </AspectRatio>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Cinematic (21:9)</p>
        <AspectRatio ratio={21 / 9}>
          <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-500/20">
            <span className="text-sm font-bold tracking-wide">21 : 9</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}

function PlaygroundDemo() {
  const [ratio, setRatio] = useState(16 / 9);
  const labels: Record<number, string> = {
    1: "1:1",
    [4 / 3]: "4:3",
    [16 / 9]: "16:9",
    [3 / 2]: "3:2",
    [3 / 4]: "3:4",
    [9 / 16]: "9:16",
    [2.5]: "2.5:1",
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {[1, 4 / 3, 16 / 9, 3 / 2, 3 / 4, 9 / 16, 2.5].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRatio(r)}
            className={cn(
              "inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              ratio === r
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:bg-muted",
            )}
          >
            {labels[r] ?? `${r}:1`}
          </button>
        ))}
      </div>
      <div className="w-full max-w-md">
        <AspectRatio ratio={ratio}>
          <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold tabular-nums text-foreground">{labels[ratio]}</span>
              <span className="text-xs text-muted-foreground">ratio={ratio}</span>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function AspectRatioPage() {
  return (
    <ComponentDocPage
      name="Aspect Ratio"
      category="Layout"
      description="Displays content within a desired ratio. Wraps CSS aspect-ratio with overflow-hidden and responsive width for images, videos, and media."
    >
      <PreviewPanel filename="aspect-ratio.tsx">
        <div className="grid grid-cols-3 gap-4">
          {COMMON_RATIOS.slice(0, 3).map((r) => (
            <RatioCard key={r.label} {...r} />
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ASPECTRATIO_SOURCE}
        filename="components/ui/AspectRatio/AspectRatio.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Common Ratios"
          description="Standard aspect ratios for photos, video, and layout."
          code={RATIOS_EXAMPLE}
        >
          <RatiosExample />
        </ExampleBlock>

        <ExampleBlock
          title="Image Container"
          description="Wrap images to maintain ratio across screen sizes."
          code={IMAGE_EXAMPLE}
        >
          <ImageExample />
        </ExampleBlock>

        <ExampleBlock
          title="Video Embed"
          description="16:9 container for video players and iframes."
          code={VIDEO_EXAMPLE}
        >
          <VideoExample />
        </ExampleBlock>

        <ExampleBlock
          title="Grid Layout"
          description="Square aspect ratio grid for image galleries."
          code={GRID_EXAMPLE}
        >
          <GridExample />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Ratios"
          description="Non-standard ratios for banners and cinematic layouts."
          code={CUSTOM_EXAMPLE}
        >
          <CustomExample />
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Try different ratios interactively."
          code={CUSTOM_EXAMPLE}
        >
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
