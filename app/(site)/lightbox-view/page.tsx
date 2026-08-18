"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Image, Maximize2, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from "lucide-react";

const installCommand = `npx component-library@latest add lightbox-view`;
const usageCode = `import { Lightbox } from '@/components/lightbox-view';

export default function Gallery() {
  const images = [
    { src: '/img1.jpg', alt: 'Image 1', caption: 'Sunset at the beach' },
    { src: '/img2.jpg', alt: 'Image 2', caption: 'Mountain landscape' },
    { src: '/img3.jpg', alt: 'Image 3', caption: 'City skyline' },
  ];

  return (
    <Lightbox
      images={images}
      initialIndex={0}
      showThumbnails={true}
      showCaptions={true}
      enableZoom={true}
      onClose={() => console.log('closed')}
    />
  );
}`;

  function ImageLightbox() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ImageLightbox</h3>
          <Badge variant="outline" className="ml-auto">Demo 1</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Image className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ImageLightbox demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'ImageLightbox', category: 'Media', icon: 'Image' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function GalleryLightbox() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Maximize2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">GalleryLightbox</h3>
          <Badge variant="outline" className="ml-auto">Demo 2</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Maximize2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">GalleryLightbox demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'GalleryLightbox', category: 'Media', icon: 'Maximize2' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function VideoLightbox() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">VideoLightbox</h3>
          <Badge variant="outline" className="ml-auto">Demo 3</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <ChevronLeft className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">VideoLightbox demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'VideoLightbox', category: 'Media', icon: 'ChevronLeft' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function CarouselLightbox() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ChevronRight className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">CarouselLightbox</h3>
          <Badge variant="outline" className="ml-auto">Demo 4</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <ChevronRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">CarouselLightbox demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'CarouselLightbox', category: 'Media', icon: 'ChevronRight' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function CaptionLightbox() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ZoomIn className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">CaptionLightbox</h3>
          <Badge variant="outline" className="ml-auto">Demo 5</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <ZoomIn className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">CaptionLightbox demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'CaptionLightbox', category: 'Media', icon: 'ZoomIn' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function ThumbnailLightbox() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Download className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ThumbnailLightbox</h3>
          <Badge variant="outline" className="ml-auto">Demo 6</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Download className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ThumbnailLightbox demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'ThumbnailLightbox', category: 'Media', icon: 'Download' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function FullscreenLightbox() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">FullscreenLightbox</h3>
          <Badge variant="outline" className="ml-auto">Demo 7</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Share2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">FullscreenLightbox demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'FullscreenLightbox', category: 'Media', icon: 'Share2' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

export default function LightboxViewPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Lightbox View</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A lightbox overlay component that displays media content in a full-screen modal with zoom and navigation.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive demonstrations of Lightbox View variants.</p>
        </div>
        <ComponentPreview id="lightbox-view">
          <div className="w-full p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ImageLightbox />
        <GalleryLightbox />
        <VideoLightbox />
        <CarouselLightbox />
        <CaptionLightbox />
        <ThumbnailLightbox />
        <FullscreenLightbox />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">images</td><td className="px-4 py-3 text-muted-foreground">{src: string; alt: string; caption?: string}[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">initialIndex</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showThumbnails</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showCaptions</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">enableZoom</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onClose</td><td className="px-4 py-3 text-muted-foreground">() => void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
