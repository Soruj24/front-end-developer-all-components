"use client";

import { Image, ImagePreview } from "@/components/ui/Image";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const IMAGE_SOURCE = `"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { ImageProps } from "./Image.types";

export function Image({ src, alt, width, height, fill, className, onClick }: ImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setError(false); setLoading(true); }, [src]);
  const handleError = useCallback(() => { setError(true); setLoading(false); }, []);
  const handleLoad = useCallback(() => { setLoading(false); }, []);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", fill ? "absolute inset-0 h-full w-full" : "h-32 w-32", className)}>
        <svg className="h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
        </svg>
      </div>
    );
  }

  if (fill) {
    return (<>
      {loading && <div className={cn("absolute inset-0 h-full w-full animate-pulse rounded-xl bg-muted", className)} />}
      <img src={src} alt={alt} onError={handleError} onLoad={handleLoad} onClick={onClick}
        className={cn("absolute inset-0 h-full w-full object-cover rounded-xl transition-opacity duration-300", onClick && "cursor-pointer hover:opacity-90", loading && "opacity-0", className)} />
    </>);
  }

  return (<>
    {loading && <div className={cn("animate-pulse rounded-xl bg-muted", className)} />}
    <img src={src} alt={alt} width={width} height={height} onError={handleError} onLoad={handleLoad} onClick={onClick}
      className={cn("max-w-full h-auto rounded-xl transition-opacity duration-300", onClick && "cursor-pointer hover:opacity-90", loading && "opacity-0 absolute", className)} />
  </>);
}

export function ImagePreview({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  return (<>
    <img src={src} alt={alt} onClick={() => setOpen(true)} tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
      className={cn("cursor-pointer rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card", className)} />
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={close}>
        <button onClick={close} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20" aria-label="Close preview">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />
      </div>
    )}
  </>);
}`;

const IMG = "https://picsum.photos/seed";

const SIZES_SRC = `import { Image } from "@/components/ui/Image";

<Image src="${IMG}/sm/200/133" alt="Small" width={200} height={133} className="rounded-xl" />
<Image src="${IMG}/md/400/267" alt="Medium" width={400} height={267} className="rounded-xl" />
<Image src="${IMG}/lg/600/400" alt="Large" width={600} height={400} className="rounded-xl" />`;

const RADIUS_SRC = `import { Image } from "@/components/ui/Image";

<Image src="${IMG}/r1/160/160" alt="No radius" width={160} height={160} className="rounded-none" />
<Image src="${IMG}/r2/160/160" alt="Rounded" width={160} height={160} className="rounded-xl" />
<Image src="${IMG}/r3/160/160" alt="Circle" width={160} height={160} className="rounded-full" />`;

const PREVIEW_SRC = `import { ImagePreview } from "@/components/ui/Image";

<ImagePreview src="${IMG}/prev/600/400" alt="Click to preview" className="h-48 w-auto rounded-xl object-cover" />`;

const FILL_SRC = `import { Image } from "@/components/ui/Image";

<div className="relative h-64 w-full max-w-md overflow-hidden rounded-xl">
  <Image src="${IMG}/fill/600/400" alt="Fill mode" fill className="rounded-xl" />
</div>`;

const ERROR_SRC = `import { Image } from "@/components/ui/Image";

<Image src="/broken-image.jpg" alt="Error fallback" width={300} height={200} />`;

const OBJECT_FIT_SRC = `import { Image } from "@/components/ui/Image";

<Image src="${IMG}/of/256/256" alt="cover" width={128} height={128} className="rounded-xl object-cover" />
<Image src="${IMG}/of2/256/256" alt="contain" width={128} height={128} className="rounded-xl object-contain" />`;

const GALLERY_SRC = `import { ImagePreview } from "@/components/ui/Image";

<div className="grid grid-cols-3 gap-4">
  {images.map((img) => (
    <ImagePreview key={img.src} src={img.src} alt={img.alt} className="h-32 w-full rounded-xl object-cover" />
  ))}
</div>`;

const FIT_TYPES = ["object-cover", "object-contain", "object-fill", "object-scale-down"] as const;

export default function ImagePage() {
  return (
    <ComponentDocPage
      name="Image"
      category="Data Display"
      description="Responsive image component with lazy loading, error handling, loading states, fill mode, and lightbox preview with keyboard navigation."
    >
      <PreviewPanel filename="image-preview.tsx">
        <div className="flex flex-wrap justify-center gap-4">
          <Image
            src={`${IMG}/hero1/400/267`}
            alt="Mountain"
            width={400}
            height={267}
            className="rounded-xl"
          />
          <Image
            src={`${IMG}/hero2/400/267`}
            alt="Ocean"
            width={400}
            height={267}
            className="rounded-xl"
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={IMAGE_SOURCE}
        filename="components/ui/Image/Image.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Sizes"
          description="Different width and height combinations."
          code={SIZES_SRC}
          filename="sizes.tsx"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Image
              src={`${IMG}/sz1/200/133`}
              alt="Small"
              width={200}
              height={133}
              className="rounded-xl"
            />
            <Image
              src={`${IMG}/sz2/400/267`}
              alt="Medium"
              width={400}
              height={267}
              className="rounded-xl"
            />
            <Image
              src={`${IMG}/sz3/600/400`}
              alt="Large"
              width={600}
              height={400}
              className="rounded-xl"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Border Radius"
          description="Rounded corners from none to full circle."
          code={RADIUS_SRC}
          filename="radius.tsx"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {[
              ["rounded-none", "No radius"],
              ["rounded-xl", "Rounded"],
              ["rounded-full", "Circle"],
            ].map(([cls, label]) => (
              <div key={cls} className="text-center">
                <Image
                  src={`${IMG}/rd/160/160`}
                  alt={label}
                  width={160}
                  height={160}
                  className={cls}
                />
                <p className="mt-2 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Lightbox Preview"
          description="Click to open fullscreen preview. Press Escape or click outside to close."
          code={PREVIEW_SRC}
          filename="preview.tsx"
        >
          <div className="flex justify-center">
            <ImagePreview
              src={`${IMG}/lb/600/400`}
              alt="Click to preview"
              className="h-48 w-auto rounded-xl object-cover"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Fill Mode"
          description="Image fills its parent container using absolute positioning."
          code={FILL_SRC}
          filename="fill.tsx"
        >
          <div className="relative h-64 w-full max-w-md overflow-hidden rounded-xl">
            <Image
              src={`${IMG}/fl/600/400`}
              alt="Fill mode"
              fill
              className="rounded-xl"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Error Fallback"
          description="Graceful fallback when an image fails to load."
          code={ERROR_SRC}
          filename="error.tsx"
        >
          <div className="flex justify-center">
            <Image
              src="/this-image-does-not-exist.jpg"
              alt="Error fallback"
              width={300}
              height={200}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Object Fit"
          description="Different ways to fit images in their container."
          code={OBJECT_FIT_SRC}
          filename="object-fit.tsx"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {FIT_TYPES.map((fit) => (
              <div key={fit} className="text-center">
                <div className="h-32 w-32 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={`${IMG}/of/256/256`}
                    alt={fit}
                    width={128}
                    height={128}
                    className={fit}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{fit}</p>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Gallery Grid"
          description="Grid of images with lightbox preview on each."
          code={GALLERY_SRC}
          filename="gallery.tsx"
        >
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <ImagePreview
                key={i}
                src={`${IMG}/gal${i}/400/300`}
                alt={`Gallery image ${i + 1}`}
                className="h-32 w-full rounded-xl object-cover"
              />
            ))}
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
                  Tab
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Focus ImagePreview thumbnail
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Enter / Space
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Open fullscreen preview
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  Escape
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Close fullscreen preview
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
