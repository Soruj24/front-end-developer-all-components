"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { AspectRatio } from "@/components/ui/AspectRatio";

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
      className={cn("relative w-full", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
}`;

const SQUARE_EXAMPLE = `<AspectRatio ratio={1}>
  <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
    <span className="text-sm font-medium text-zinc-500">1:1</span>
  </div>
</AspectRatio>`;

const LANDSCAPE_EXAMPLE = `<AspectRatio ratio={4 / 3}>
  <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
    <span className="text-sm font-medium text-zinc-500">4:3</span>
  </div>
</AspectRatio>`;

const WIDESCREEN_EXAMPLE = `<AspectRatio ratio={16 / 9}>
  <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
    <span className="text-sm font-medium text-zinc-500">16:9</span>
  </div>
</AspectRatio>`;

const PORTRAIT_EXAMPLE = `<AspectRatio ratio={3 / 4}>
  <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white">
    <span className="text-sm font-medium">3:4</span>
  </div>
</AspectRatio>`;

export default function AspectRatioPage() {
  return (
    <ComponentDocPage
      name="Aspect Ratio"
      category="Layout"
      description="Displays content within a desired ratio. Useful for images, videos, or any content that needs to maintain consistent proportions."
    >
      <PreviewPanel filename="aspect-ratio-preview">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">1:1</p>
            <AspectRatio ratio={1}>
              <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <span className="text-sm font-medium text-zinc-500">1:1</span>
              </div>
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">4:3</p>
            <AspectRatio ratio={4 / 3}>
              <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <span className="text-sm font-medium text-zinc-500">4:3</span>
              </div>
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">16:9</p>
            <AspectRatio ratio={16 / 9}>
              <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <span className="text-sm font-medium text-zinc-500">16:9</span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ASPECTRATIO_SOURCE}
        filename="AspectRatio.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Square"
          description="A 1:1 square aspect ratio."
          code={SQUARE_EXAMPLE}
        >
          <div className="w-40">
            <AspectRatio ratio={1}>
              <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <span className="text-sm font-medium text-zinc-500">1:1</span>
              </div>
            </AspectRatio>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Landscape"
          description="Standard 4:3 landscape aspect ratio."
          code={LANDSCAPE_EXAMPLE}
        >
          <div className="w-48">
            <AspectRatio ratio={4 / 3}>
              <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <span className="text-sm font-medium text-zinc-500">4:3</span>
              </div>
            </AspectRatio>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Widescreen"
          description="16:9 widescreen aspect ratio for video content."
          code={WIDESCREEN_EXAMPLE}
        >
          <div className="w-56">
            <AspectRatio ratio={16 / 9}>
              <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <span className="text-sm font-medium text-zinc-500">16:9</span>
              </div>
            </AspectRatio>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Portrait"
          description="Vertical portrait aspect ratio for tall content."
          code={PORTRAIT_EXAMPLE}
        >
          <div className="w-32">
            <AspectRatio ratio={3 / 4}>
              <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <span className="text-sm font-medium">3:4</span>
              </div>
            </AspectRatio>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
