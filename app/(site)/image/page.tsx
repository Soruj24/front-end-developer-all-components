"use client";

import { useState } from "react";
import { Image, ImagePreview } from "@/components/ui/Image";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const IMAGE_SOURCE = `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ImageProps } from "./Image.types";

export function Image({ src, alt, width, height, fill, className, onClick }: ImageProps) {
  const [error, setError] = useState(false);

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onClick={onClick}
        className={cn("absolute inset-0 h-full w-full object-cover", onClick && "cursor-pointer", error && "hidden", className)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      onClick={onClick}
      className={cn("max-w-full h-auto", onClick && "cursor-pointer", error && "hidden", className)}
    />
  );
}

export function ImagePreview({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img src={src} alt={alt} onClick={() => setOpen(true)} className={cn("cursor-pointer hover:opacity-80", className)} />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] object-contain" />
        </div>
      )}
    </>
  );
}`;

const IMG = "https://picsum.photos/seed";

const SIZES_SOURCE = `<Image src="${IMG}/sm/200/133" alt="Small" width={200} height={133} className="rounded-lg" />
<Image src="${IMG}/md/400/267" alt="Medium" width={400} height={267} className="rounded-lg" />
<Image src="${IMG}/lg/600/400" alt="Large" width={600} height={400} className="rounded-lg" />`;

const RADIUS_SOURCE = `<Image src="${IMG}/r1/160/160" alt="No radius" width={160} height={160} className="rounded-none" />
<Image src="${IMG}/r2/160/160" alt="Rounded" width={160} height={160} className="rounded-md" />
<Image src="${IMG}/r3/160/160" alt="Large radius" width={160} height={160} className="rounded-lg" />
<Image src="${IMG}/r4/160/160" alt="Circle" width={160} height={160} className="rounded-full" />`;

const PREVIEW_SOURCE = `<ImagePreview src="${IMG}/prev/600/400" alt="Click to preview" className="h-48 w-auto rounded-lg object-cover" />`;

const FILL_SOURCE = `<div className="relative h-64 w-full max-w-md rounded-lg">
  <Image src="${IMG}/fill/600/400" alt="Fill mode" fill className="rounded-lg" />
</div>`;

const FIT_TYPES = ["object-cover", "object-contain", "object-fill", "object-scale-down"] as const;

function ImgPreview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-4">
        <Image src={`${IMG}/sz1/200/133`} alt="Small" width={200} height={133} className="rounded-lg" />
        <Image src={`${IMG}/sz2/400/267`} alt="Medium" width={400} height={267} className="rounded-lg" />
        <Image src={`${IMG}/sz3/600/400`} alt="Large" width={600} height={400} className="rounded-lg" />
      </div>
    </div>
  );
}

function RadiusPreview() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {[["rounded-none", "No radius"], ["rounded-md", "Rounded"], ["rounded-lg", "Large radius"], ["rounded-full", "Circle"]].map(([cls, label]) => (
        <div key={cls} className="text-center">
          <Image src={`${IMG}/rd/160/160`} alt={label} width={160} height={160} className={cls} />
          <p className="mt-2 text-xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}

function LightboxPreview() {
  return (
    <div className="flex justify-center">
      <ImagePreview src={`${IMG}/lb/600/400`} alt="Click to preview" className="h-48 w-auto rounded-lg object-cover" />
    </div>
  );
}

function FillPreview() {
  return (
    <div className="relative h-64 w-full max-w-md rounded-lg">
      <Image src={`${IMG}/fl/600/400`} alt="Fill mode" fill className="rounded-lg" />
    </div>
  );
}

function ObjectFitPreview() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {FIT_TYPES.map((fit) => (
        <div key={fit} className="text-center">
          <div className="h-32 w-32 overflow-hidden rounded-lg border border-border">
            <Image src={`${IMG}/of/256/256`} alt={fit} width={128} height={128} className={fit} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{fit}</p>
        </div>
      ))}
    </div>
  );
}

function GalleryPreview() {
  const images = Array.from({ length: 6 }, (_, i) => ({
    src: `${IMG}/gal${i}/400/300`,
    alt: `Gallery image ${i + 1}`,
  }));

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img) => (
        <ImagePreview key={img.src} src={img.src} alt={img.alt} className="h-32 w-full rounded-lg object-cover" />
      ))}
    </div>
  );
}

export default function ImagePage() {
  return (
    <ComponentDocPage
      name="Image"
      category="Data Display"
      description="Responsive image component with lazy loading, error handling, aspect ratios, fill mode, and lightbox preview."
    >
      <PreviewPanel filename="image-preview.tsx">
        <div className="flex flex-wrap justify-center gap-4">
          <Image src={`${IMG}/hero1/400/267`} alt="Mountain" width={400} height={267} className="rounded-lg" />
          <Image src={`${IMG}/hero2/400/267`} alt="Ocean" width={400} height={267} className="rounded-lg" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={IMAGE_SOURCE} filename="components/ui/Image.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Sizes" description="Different width and height combinations." code={SIZES_SOURCE} filename="sizes.tsx">
          <ImgPreview />
        </ExampleBlock>

        <ExampleBlock title="Border Radius" description="Rounded corners from none to full circle." code={RADIUS_SOURCE} filename="radius.tsx">
          <RadiusPreview />
        </ExampleBlock>

        <ExampleBlock title="Lightbox Preview" description="Click to open fullscreen preview overlay." code={PREVIEW_SOURCE} filename="preview.tsx">
          <LightboxPreview />
        </ExampleBlock>

        <ExampleBlock title="Fill Mode" description="Image fills its parent container using absolute positioning." code={FILL_SOURCE} filename="fill.tsx">
          <FillPreview />
        </ExampleBlock>

        <ExampleBlock title="Object Fit" description="Different ways to fit images in their container." code={`<Image src="${IMG}/of/256/256" alt="cover" width={128} height={128} className="object-cover" />\n<Image src="${IMG}/of2/256/256" alt="contain" width={128} height={128} className="object-contain" />`} filename="object-fit.tsx">
          <ObjectFitPreview />
        </ExampleBlock>

        <ExampleBlock title="Gallery Grid" description="Grid of images with lightbox preview on each." code={`<div className="grid grid-cols-3 gap-4">\n  {images.map((img) => (\n    <ImagePreview key={img.src} src={img.src} alt={img.alt} className="h-32 w-full rounded-lg object-cover" />\n  ))}\n</div>`} filename="gallery.tsx">
          <GalleryPreview />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
