"use client";

import { AspectRatio } from "@/components/_aspect-ratio";
import { ComponentPreview } from "@/components/preview";

const ratios = ["16:9", "4:3", "1:1", "2:3", "3:4", "9:16"] as const;

export default function AspectRatioPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Aspect Ratio</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Displays content within a desired ratio. Useful for embedding images,
          videos, or other media that need to maintain consistent proportions.
        </p>
      </header>

      <ComponentPreview id="aspect-ratio-ratios">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {ratios.map((ratio) => (
            <div key={ratio} className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">{ratio}</p>
              <AspectRatio ratio={ratio}>
                <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                  <span className="text-sm font-medium text-zinc-500">{ratio}</span>
                </div>
              </AspectRatio>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="aspect-ratio-images">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">16:9 Landscape</p>
            <AspectRatio ratio="16:9">
              <img
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Landscape"
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">4:3 Standard</p>
            <AspectRatio ratio="4:3">
              <img
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&dpr=2&q=80"
                alt="Standard"
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">1:1 Square</p>
            <AspectRatio ratio="1:1">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&dpr=2&q=80"
                alt="Square"
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="aspect-ratio-video">
        <div className="mx-auto w-full max-w-md">
          <AspectRatio ratio="16:9">
            <div className="flex h-full items-center justify-center rounded-md bg-zinc-900 text-white">
              <svg className="h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            </div>
          </AspectRatio>
        </div>
      </ComponentPreview>

      <ComponentPreview id="aspect-ratio-custom">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">2:3 Portrait</p>
            <AspectRatio ratio="2:3">
              <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <span className="text-sm font-medium">2:3</span>
              </div>
            </AspectRatio>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">3:4 Photo</p>
            <AspectRatio ratio="3:4">
              <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-teal-500 text-white">
                <span className="text-sm font-medium">3:4</span>
              </div>
            </AspectRatio>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">9:16 Mobile</p>
            <AspectRatio ratio="9:16">
              <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <span className="text-sm font-medium">9:16</span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="aspect-ratio-card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg border">
            <AspectRatio ratio="16:9">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&dpr=2&q=80"
                alt="Nature"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-semibold">Nature Photography</h3>
              <p className="text-sm text-muted-foreground">Beautiful landscapes captured in 16:9 ratio.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <AspectRatio ratio="4:3">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80"
                alt="Mountains"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-semibold">Mountain Views</h3>
              <p className="text-sm text-muted-foreground">Stunning mountain scenes in 4:3 ratio.</p>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
